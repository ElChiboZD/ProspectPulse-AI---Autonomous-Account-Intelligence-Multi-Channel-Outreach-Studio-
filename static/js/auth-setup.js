/* Per-person login: Google identity or email, plus that person's keys or a device workspace key. */

let currentAuthStep = 1;
let currentAuthData = {
  email: '',
  name: '',
  title: '',
  company: '',
  preset: 'sockclub',
  api_key: '',
  xai_key: '',
  tavily_key: '',
  avatar_url: '',
  google_sub: ''
};

function initAuthSetup() {
  const session = window.UserSession ? window.UserSession.getSession() : null;
  if (!session) {
    showAuthSetupModal();
    bootGoogleButton();
    return;
  }
  currentAuthData = Object.assign({}, currentAuthData, session);
  if (window.UserSession) window.UserSession.applyActiveKeys(session.email);
  renderNavUserProfileChip(session);
  syncProfileToEngine(session);
}

function showAuthSetupModal() {
  let modal = document.getElementById('authSetupModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'auth-modal-overlay';
    modal.id = 'authSetupModal';
    document.body.appendChild(modal);
  }
  currentAuthStep = 1;
  renderAuthModalStep();
  modal.style.display = 'grid';
  bootGoogleButton();
}

function closeAuthSetupModal() {
  const modal = document.getElementById('authSetupModal');
  if (modal) modal.style.display = 'none';
}

function bootGoogleButton() {
  if (!window.GoogleIdentity) return;
  window.GoogleIdentity.loadConfig().then(function () {
    window.GoogleIdentity.renderButton('gsiDesktopButton', onGoogleProfile);
  });
}

function onGoogleProfile(profile) {
  currentAuthData.email = profile.email;
  currentAuthData.name = profile.name;
  currentAuthData.avatar_url = profile.avatar_url || '';
  currentAuthData.google_sub = profile.google_sub || '';
  const existing = window.UserSession
    ? window.UserSession.listAccounts().find(function (a) { return a.email === profile.email; })
    : null;
  if (existing) {
    currentAuthData.title = existing.title || currentAuthData.title;
    currentAuthData.company = existing.company || currentAuthData.company;
    currentAuthData.preset = existing.preset || currentAuthData.preset;
  }
  const keys = window.UserSession ? window.UserSession.loadKeys(profile.email) : {};
  const workspace = window.UserSession ? window.UserSession.getWorkspace() : {};
  if ((keys && keys.xai) || profile.gemini_oauth || (workspace && workspace.enabled && workspace.has_xai)) {
    finishLogin(keys || {});
    return;
  }
  currentAuthStep = 2;
  renderAuthModalStep();
}

function renderAuthModalStep() {
  const modal = document.getElementById('authSetupModal');
  if (!modal) return;

  const localAccounts = window.UserSession ? window.UserSession.listAccounts() : [];
  let stepHtml = '';

  if (currentAuthStep === 1) {
    const accountPills = localAccounts.map(function (acc) {
      const initials = (acc.name || acc.email).split(' ').map(function (n) { return n[0]; }).join('').slice(0, 2).toUpperCase();
      return `
        <div class="google-acc-pill" onclick="continueAsLocalAccount('${acc.email.replace(/'/g, '')}')">
          <div class="acc-avatar" style="background:#6366F1;">${initials}</div>
          <div>
            <div style="font-weight: 700; font-size: 13px;">${acc.name || acc.email}</div>
            <div style="font-size: 11.5px; color: var(--text-muted);">${acc.email}</div>
          </div>
          <span style="margin-left: auto; color: #10B981; font-size: 12px; font-weight: 700;">Continue</span>
        </div>`;
    }).join('');

    stepHtml = `
      <div class="auth-modal-card">
        <div class="auth-step-dots">
          <div class="auth-step-dot active"></div>
          <div class="auth-step-dot"></div>
          <div class="auth-step-dot"></div>
        </div>
        <div style="text-align: center; margin-bottom: 16px;"><span style="font-size: 32px;">⚡</span></div>
        <h2 class="auth-hero-title">Sign in as yourself</h2>
        <p class="auth-hero-sub">Use your Google account or work email. Research keys stay on this device and never use someone else's login.</p>

        <div id="gsiDesktopButton" style="min-height:44px;display:flex;justify-content:center;margin-bottom:16px;"></div>

        <div class="auth-divider"><span>or use your email</span></div>

        <div class="auth-form-group">
          <label>Work email</label>
          <input type="email" class="auth-input" id="authEmailInput" placeholder="you@company.com" value="${currentAuthData.email || ''}">
        </div>
        <div class="auth-form-group">
          <label>Your name</label>
          <input type="text" class="auth-input" id="authNameInputStep1" placeholder="Alex Rivera" value="${currentAuthData.name || ''}">
        </div>
        <div class="auth-form-group">
          <label>Your company</label>
          <input type="text" class="auth-input" id="authCompanyInput" placeholder="Acme Sales" value="${currentAuthData.company || ''}">
        </div>

        <button class="btn btn-primary" style="width:100%;margin-top:8px;" onclick="submitStep1();">Continue with my account →</button>
        ${accountPills ? `<div class="auth-divider"><span>already on this computer</span></div><div class="quick-google-accounts">${accountPills}</div>` : ''}
      </div>
    `;
  } else if (currentAuthStep === 2) {
    stepHtml = `
      <div class="auth-modal-card">
        <div class="auth-step-dots">
          <div class="auth-step-dot completed"></div>
          <div class="auth-step-dot active"></div>
          <div class="auth-step-dot"></div>
        </div>
        <h2 class="auth-hero-title">Your pitch profile</h2>
        <p class="auth-hero-sub">Signed in as <strong>${currentAuthData.email}</strong>. This name is used on outreach, not someone else's.</p>
        <div class="auth-form-group">
          <label>Job title</label>
          <input type="text" class="auth-input" id="authTitleInput" value="${currentAuthData.title || 'Account Executive'}">
        </div>
        <div class="auth-form-group">
          <label>Default pitch preset</label>
          <select class="auth-input" id="authPresetInput">
            <option value="sockclub" ${currentAuthData.preset === 'sockclub' ? 'selected' : ''}>Sock Club</option>
            <option value="zendesk" ${currentAuthData.preset === 'zendesk' ? 'selected' : ''}>Zendesk</option>
            <option value="stripe" ${currentAuthData.preset === 'stripe' ? 'selected' : ''}>Stripe</option>
            <option value="snowflake" ${currentAuthData.preset === 'snowflake' ? 'selected' : ''}>Snowflake</option>
          </select>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 24px;">
          <button class="btn btn-secondary" onclick="currentAuthStep = 1; renderAuthModalStep(); bootGoogleButton();">← Back</button>
          <button class="btn btn-primary" style="flex: 1;" onclick="submitStep2();">Next: research keys →</button>
        </div>
      </div>
    `;
  } else {
    const existingKeys = (window.UserSession && currentAuthData.email)
      ? window.UserSession.loadKeys(currentAuthData.email)
      : { xai: '', gemini: '', tavily: '' };
    stepHtml = `
      <div class="auth-modal-card">
        <div class="auth-step-dots">
          <div class="auth-step-dot completed"></div>
          <div class="auth-step-dot completed"></div>
          <div class="auth-step-dot active"></div>
        </div>
        <h2 class="auth-hero-title">How this login researches accounts</h2>
        <p class="auth-hero-sub">If you signed in with Google, Gemini is already connected as a fallback. Add an xAI key if you want Grok as the primary researcher.</p>

        <div class="auth-form-group">
          <label>Your xAI API key (personal)</label>
          <input type="password" class="auth-input" id="authXaiKeyInput" placeholder="xai-..." value="${existingKeys.xai || ''}">
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Create one in <a href="https://console.x.ai/team/default/api-keys" target="_blank">your xAI console</a></div>
        </div>
        <div class="auth-form-group">
          <label>Optional Gemini key</label>
          <input type="password" class="auth-input" id="authApiKeyInput" placeholder="AIzaSy..." value="${existingKeys.gemini || ''}">
        </div>
        <div class="auth-form-group">
          <label>Optional Tavily key</label>
          <input type="password" class="auth-input" id="authTavilyKeyInput" placeholder="tvly-..." value="${existingKeys.tavily || ''}">
        </div>

        <div class="auth-form-group" style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.25);border-radius:12px;padding:12px;">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
            <input type="checkbox" id="authWorkspaceToggle">
            <span>Also save as this computer's workspace key (teammates can research without pasting a key)</span>
          </label>
        </div>

        <div style="display: flex; gap: 10px; margin-top: 24px;">
          <button class="btn btn-secondary" onclick="currentAuthStep = 2; renderAuthModalStep();">← Back</button>
          <button class="btn btn-primary" style="flex: 1;" onclick="completeAuthSetup();">Save my login</button>
        </div>
      </div>
    `;
  }

  modal.innerHTML = stepHtml;
  if (currentAuthStep === 1) setTimeout(bootGoogleButton, 50);
}

function submitStep1() {
  const email = (document.getElementById('authEmailInput').value || '').trim().toLowerCase();
  const name = (document.getElementById('authNameInputStep1').value || '').trim();
  const company = (document.getElementById('authCompanyInput').value || '').trim();
  if (!email || !email.includes('@')) {
    alert('Enter your own work email so this login is yours.');
    return;
  }
  if (window.UserSession && window.UserSession.DEMO_EMAILS[email]) {
    alert('Use your real email, not a demo account.');
    return;
  }
  currentAuthData.email = email;
  currentAuthData.name = name || email.split('@')[0];
  currentAuthData.company = company;
  const existing = window.UserSession ? window.UserSession.listAccounts().find(function (a) {
    return String(a.email).toLowerCase() === email;
  }) : null;
  if (existing) {
    currentAuthData.title = existing.title || currentAuthData.title;
    currentAuthData.preset = existing.preset || currentAuthData.preset;
    currentAuthData.avatar_url = existing.avatar_url || currentAuthData.avatar_url;
  }
  currentAuthStep = 2;
  renderAuthModalStep();
}

function continueAsLocalAccount(email) {
  try {
    const session = window.UserSession.switchAccount(email);
    currentAuthData = Object.assign({}, currentAuthData, session);
    syncProfileToEngine(Object.assign({}, session, window.UserSession.loadKeys(email)));
    renderNavUserProfileChip(session);
    closeAuthSetupModal();
    if (window.showToast) window.showToast('Switched to ' + session.email);
  } catch (err) {
    const acc = (window.UserSession ? window.UserSession.listAccounts() : []).find(function (a) {
      return String(a.email).toLowerCase() === String(email).toLowerCase();
    });
    if (!acc) return;
    currentAuthData = Object.assign({}, currentAuthData, acc);
    currentAuthStep = 2;
    renderAuthModalStep();
  }
}

function submitStep2() {
  currentAuthData.title = document.getElementById('authTitleInput').value || 'Account Executive';
  currentAuthData.preset = document.getElementById('authPresetInput').value;
  currentAuthStep = 3;
  renderAuthModalStep();
}

function syncProfileToEngine(profile) {
  fetch('/api/auth/save-profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile)
  }).catch(function () {});
  if (window.updateAllAppComponentsForPreset) {
    window.updateAllAppComponentsForPreset(profile.preset);
  }
}

function finishLogin(keys) {
  if (!currentAuthData.avatar_url) {
    currentAuthData.avatar_url = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentAuthData.name || currentAuthData.email)}&background=6366F1&color=fff`;
  }
  try {
    window.UserSession.saveSession(currentAuthData, keys || {});
  } catch (err) {
    alert(err.message || 'Could not save login');
    return false;
  }
  const payload = Object.assign({}, currentAuthData, {
    api_key: (keys && keys.gemini) || '',
    xai_key: (keys && keys.xai) || '',
    tavily_key: (keys && keys.tavily) || ''
  });
  syncProfileToEngine(payload);
  renderNavUserProfileChip(currentAuthData);
  closeAuthSetupModal();
  if (window.showToast) {
    window.showToast('Signed in as ' + currentAuthData.name + '.');
  }
  return true;
}

function completeAuthSetup() {
  const apiKey = document.getElementById('authApiKeyInput') ? document.getElementById('authApiKeyInput').value : '';
  const tavilyKey = document.getElementById('authTavilyKeyInput') ? document.getElementById('authTavilyKeyInput').value : '';
  const xaiKey = document.getElementById('authXaiKeyInput') ? document.getElementById('authXaiKeyInput').value : '';
  const shareWorkspace = document.getElementById('authWorkspaceToggle') && document.getElementById('authWorkspaceToggle').checked;
  currentAuthData.api_key = apiKey;
  currentAuthData.tavily_key = tavilyKey;
  currentAuthData.xai_key = xaiKey;

  if (shareWorkspace && xaiKey) {
    fetch('/api/auth/workspace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ xai_key: xaiKey, gemini_key: apiKey, tavily_key: tavilyKey, enabled: true })
    }).then(function () {
      if (window.UserSession) window.UserSession.setWorkspaceMeta({ enabled: true, has_xai: true, has_gemini: !!apiKey });
    }).catch(function () {});
  }

  finishLogin({ xai: xaiKey, gemini: apiKey, tavily: tavilyKey });
}

function renderNavUserProfileChip(user) {
  let chip = document.getElementById('navGoogleUserChip');
  if (!chip) {
    chip = document.createElement('div');
    chip.id = 'navGoogleUserChip';
    chip.className = 'user-profile-badge';
    chip.onclick = openUserSettingsModal;
    const navRight = document.querySelector('.nav-right');
    if (navRight) navRight.insertBefore(chip, navRight.firstChild);
  }
  const initials = user.name ? user.name.split(' ').map(function (n) { return n[0]; }).join('').slice(0, 2).toUpperCase() : 'ME';
  chip.innerHTML = `
    <div class="user-avatar-sm">${initials}</div>
    <span style="font-weight: 700; color: #fff;">${user.name || user.email}</span>
    <span style="color: var(--text-faint); font-size: 10px;">▾</span>
  `;
}

function openUserSettingsModal() {
  let modal = document.getElementById('userSettingsModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'userSettingsModal';
    modal.onclick = function (e) { if (e.target === modal) modal.style.display = 'none'; };
    document.body.appendChild(modal);
  }
  const accounts = window.UserSession ? window.UserSession.listAccounts() : [];
  const switcher = accounts.map(function (acc) {
    const active = acc.email === currentAuthData.email;
    return `<button class="btn btn-secondary" style="width:100%;text-align:left;margin-bottom:6px;${active ? 'border-color:#6366F1;' : ''}" onclick="continueAsLocalAccount('${acc.email.replace(/'/g, '')}'); document.getElementById('userSettingsModal').style.display='none';">${acc.name} · ${acc.email}${active ? ' (active)' : ''}</button>`;
  }).join('');

  modal.innerHTML = `
    <div class="modal-content" style="max-width: 460px; padding: 28px;">
      <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border);">
        <div class="acc-avatar" style="width: 44px; height: 44px; font-size: 18px;">
          ${currentAuthData.name ? currentAuthData.name[0] : 'U'}
        </div>
        <div>
          <div style="font-weight: 800; font-size: 16px;">${currentAuthData.name || 'Not signed in'}</div>
          <div style="font-size: 12.5px; color: var(--text-muted);">${currentAuthData.email || ''}</div>
          <div style="font-size: 11px; color: var(--emerald); font-weight: 700;">Signed in on this device</div>
        </div>
      </div>
      <div style="margin-bottom: 16px; font-size: 13px; color: var(--text-muted); line-height: 1.8;">
        <div><strong>Role:</strong> ${currentAuthData.title || '—'}</div>
        <div><strong>Company:</strong> ${currentAuthData.company || '—'}</div>
      </div>
      ${switcher ? `<div style="margin-bottom:16px;"><div style="font-size:11px;font-weight:700;color:var(--text-muted);margin-bottom:8px;">SWITCH ACCOUNT</div>${switcher}</div>` : ''}
      <div class="auth-form-group">
        <label>Google OAuth client ID (optional)</label>
        <input type="text" class="auth-input" id="settingsGoogleClientId" placeholder="123.apps.googleusercontent.com" value="${(window.GoogleIdentity && window.GoogleIdentity.clientId) || localStorage.getItem('prospectpulse_google_client_id') || ''}">
        <div style="font-size:11px;color:var(--text-muted);margin-top:6px;">Create a Web client in Google Cloud. Add origin <code>http://127.0.0.1:8765</code> and <code>https://localhost</code>.</div>
      </div>
      <div style="display: flex; gap: 10px; margin-top: 16px;">
        <button class="btn btn-secondary" style="flex: 1;" onclick="saveGoogleClientIdFromSettings(); showAuthSetupModal(); document.getElementById('userSettingsModal').style.display = 'none';">Edit profile / keys</button>
        <button class="btn btn-secondary" style="border-color: rgba(239,68,68,0.4); color: #fca5a5;" onclick="logoutGoogleUser()">Sign out</button>
      </div>
    </div>
  `;
  modal.style.display = 'grid';
}

function saveGoogleClientIdFromSettings() {
  const input = document.getElementById('settingsGoogleClientId');
  if (input && window.GoogleIdentity) window.GoogleIdentity.setClientId(input.value);
}

function logoutGoogleUser() {
  if (window.UserSession) window.UserSession.signOut();
  currentAuthData = {
    email: '', name: '', title: '', company: '', preset: 'sockclub',
    api_key: '', xai_key: '', tavily_key: '', avatar_url: '', google_sub: ''
  };
  const chip = document.getElementById('navGoogleUserChip');
  if (chip) chip.remove();
  const settingsModal = document.getElementById('userSettingsModal');
  if (settingsModal) settingsModal.style.display = 'none';
  showAuthSetupModal();
}

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(initAuthSetup, 400);
});
