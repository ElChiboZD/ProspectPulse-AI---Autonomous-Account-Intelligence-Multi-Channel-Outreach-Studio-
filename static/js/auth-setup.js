/**
 * Streamlined User Identity & Profile Customization for Testing & Enterprise Workspaces.
 * Fully frictionless: Uses workspace backend API keys automatically.
 * Allows any tester or coworker to freely customize their name, title, company, and preset.
 */

let currentAuthData = {
  email: 'alex.rivera@zendesk.com',
  name: 'Alex Rivera',
  title: 'Enterprise Account Executive',
  company: 'Zendesk',
  preset: 'zendesk',
  avatar_url: 'https://ui-avatars.com/api/?name=Alex+Rivera&background=6366F1&color=fff'
};

function escHtml(str) {
  var div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function initAuthSetup() {
  const session = window.UserSession ? window.UserSession.getSession() : null;
  if (session) {
    currentAuthData = Object.assign({}, currentAuthData, session);
  }
  renderNavUserProfileChip(currentAuthData);
  syncProfileToEngine(currentAuthData);
  if (typeof updateAllAppComponentsForPreset === 'function') {
    updateAllAppComponentsForPreset(currentAuthData.preset || 'zendesk');
  }
}

function showAuthSetupModal() {
  openUserSettingsModal();
}

function closeAuthSetupModal() {
  const modal = document.getElementById('userSettingsModal');
  if (modal) modal.style.display = 'none';
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
  const name = user.name || user.email || 'Alex Rivera';
  const initials = name.split(' ').map(function (n) { return n[0]; }).join('').slice(0, 2).toUpperCase() || 'AR';
  chip.innerHTML = `
    <div class="user-avatar-sm" style="background: #6366F1; color: #fff; font-weight: 700; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; font-size: 11px;">${escHtml(initials)}</div>
    <span style="font-weight: 700; color: #fff; font-size: 13px;">${escHtml(name)}</span>
    <span style="color: var(--text-faint); font-size: 11px;">(${escHtml(user.title || 'Enterprise AE')})</span>
    <span style="color: var(--text-faint); font-size: 10px; margin-left: 2px;">▾</span>
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

  const existingAccounts = window.UserSession ? window.UserSession.listAccounts() : [];

  modal.innerHTML = `
    <div class="modal-content" style="max-width: 540px; padding: 28px; border-radius: 16px; background: #111827; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7); color: #fff;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="acc-avatar" style="width: 44px; height: 44px; font-size: 17px; background: linear-gradient(135deg, #6366F1, #8B5CF6); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800;">
            ${(currentAuthData.name || 'U')[0]}
          </div>
          <div>
            <div style="font-weight: 800; font-size: 17px; color: #fff;">Your Account &amp; Position Identity</div>
            <div style="font-size: 12px; color: #10B981; font-weight: 600; display: flex; align-items: center; gap: 5px;">
              <span style="display: inline-block; width: 7px; height: 7px; background: #10B981; border-radius: 50%;"></span>
              Live Autonomous Engine Connected
            </div>
          </div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('userSettingsModal').style.display='none';">✕</button>
      </div>

      <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px; line-height: 1.5;">
        Set your name, title, and company below. All research dossiers, cold emails, LinkedIn connection notes, and talk tracks will automatically adapt to your identity.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
        <div>
          <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Your Full Name</label>
          <input type="text" class="auth-input" id="profileModalName" placeholder="e.g. Alex Rivera" value="${escHtml(currentAuthData.name || '')}" style="width: 100%; margin-top: 4px; padding: 8px 12px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #fff;">
        </div>
        <div>
          <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Job Title / Role</label>
          <input type="text" class="auth-input" id="profileModalTitle" placeholder="e.g. Enterprise Account Executive" value="${escHtml(currentAuthData.title || '')}" style="width: 100%; margin-top: 4px; padding: 8px 12px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #fff;">
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
        <div>
          <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Your Company</label>
          <input type="text" class="auth-input" id="profileModalCompany" placeholder="e.g. Zendesk" value="${escHtml(currentAuthData.company || '')}" style="width: 100%; margin-top: 4px; padding: 8px 12px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #fff;">
        </div>
        <div>
          <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Sender Work Email</label>
          <input type="email" class="auth-input" id="profileModalEmail" placeholder="e.g. alex.rivera@zendesk.com" value="${escHtml(currentAuthData.email || '')}" style="width: 100%; margin-top: 4px; padding: 8px 12px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #fff;">
        </div>
      </div>

      <div style="margin-bottom: 18px;">
        <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Selling Focus &amp; Product Line</label>
        <select class="auth-input" id="profileModalPreset" style="width: 100%; margin-top: 4px; padding: 8px 12px; border-radius: 8px; background: #1F2937; border: 1px solid rgba(255,255,255,0.15); color: #fff;">
          <option value="zendesk" ${currentAuthData.preset === 'zendesk' ? 'selected' : ''}>🎧 Zendesk (Omnichannel Suite, AI, WFM &amp; QA)</option>
          <option value="forethought" ${currentAuthData.preset === 'forethought' ? 'selected' : ''}>🤖 Forethought (Autonomous AI Agents by Zendesk)</option>
          <option value="sockclub" ${currentAuthData.preset === 'sockclub' ? 'selected' : ''}>🧦 Sock Club (Direct USA Mill)</option>
          <option value="generic" ${currentAuthData.preset === 'generic' ? 'selected' : ''}>🏢 Generic B2B Enterprise SaaS</option>
          <option value="stripe" ${currentAuthData.preset === 'stripe' ? 'selected' : ''}>💳 Stripe (Global Fintech Platform)</option>
          <option value="saas" ${currentAuthData.preset === 'saas' ? 'selected' : ''}>⚡ Enterprise AI Cloud</option>
        </select>
      </div>

      ${existingAccounts.length > 1 ? `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 10px; margin-bottom: 16px;">
          <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">Switch Saved Identity</div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${existingAccounts.map(a => `
              <button class="btn btn-secondary btn-sm" onclick="switchUserAccount('${escHtml(a.email)}')" style="font-size: 11px; padding: 2px 8px; background: ${a.email === currentAuthData.email ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)'}; border-color: ${a.email === currentAuthData.email ? '#6366F1' : 'rgba(255,255,255,0.1)'};">
                ${escHtml(a.name)} (${escHtml(a.company)})
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="display: flex; gap: 10px;">
        <button class="btn btn-secondary" style="flex: 1;" onclick="document.getElementById('userSettingsModal').style.display='none';">Cancel</button>
        <button class="btn btn-primary" style="flex: 2; padding: 10px 16px; font-weight: 700;" onclick="saveCustomTesterProfile();">Save &amp; Use Identity</button>
      </div>
    </div>
  `;
  modal.style.display = 'grid';
}

function switchUserAccount(email) {
  if (window.UserSession) {
    const acc = window.UserSession.switchAccount(email);
    if (acc) {
      currentAuthData = Object.assign({}, currentAuthData, acc);
      renderNavUserProfileChip(currentAuthData);
      syncProfileToEngine(currentAuthData);
      if (window.updateAllAppComponentsForPreset) {
        window.updateAllAppComponentsForPreset(acc.preset || 'zendesk');
      }
      openUserSettingsModal();
      if (window.showToast) {
        window.showToast(`Switched account: ${acc.name} (${acc.company})`);
      }
    }
  }
}

function saveCustomTesterProfile() {
  const name = (document.getElementById('profileModalName').value || 'Alex Rivera').trim();
  const title = (document.getElementById('profileModalTitle').value || 'Enterprise Account Executive').trim();
  const company = (document.getElementById('profileModalCompany').value || 'Zendesk').trim();
  const email = (document.getElementById('profileModalEmail').value || 'alex.rivera@zendesk.com').trim().toLowerCase();
  const preset = document.getElementById('profileModalPreset').value || 'zendesk';

  currentAuthData = {
    name: name,
    title: title,
    company: company,
    email: email,
    preset: preset,
    avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366F1&color=fff`
  };

  if (window.UserSession) {
    window.UserSession.saveSession(currentAuthData);
  }

  // Update activeProfileData senderName
  if (window.activeProfileData) {
    window.activeProfileData.senderName = `${name} · ${title} at ${company}`;
    window.activeProfileData.companyName = company;
  }

  // Update preset if changed
  if (window.updateAllAppComponentsForPreset) {
    window.updateAllAppComponentsForPreset(preset);
  }

  renderNavUserProfileChip(currentAuthData);
  syncProfileToEngine(currentAuthData);
  closeAuthSetupModal();

  if (window.trackSiteEvent) {
    window.trackSiteEvent('account_saved', '', `${name} · ${title} at ${company}`);
  }

  if (window.showToast) {
    window.showToast(`✨ Account identity active: ${name} (${title})`);
  }
}

function syncProfileToEngine(profile) {
  fetch('/api/auth/save-profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile)
  }).catch(function (err) { console.warn('Profile sync failed:', err); });
}

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(initAuthSetup, 200);
});
