/* auth-setup.js - Google Account Login & Desktop Setup Wizard */

let currentAuthStep = 1;
let currentAuthData = {
  email: '',
  name: '',
  title: 'Enterprise Account Executive',
  company: 'Sock Club',
  preset: 'sockclub',
  api_key: '',
  avatar_url: ''
};

function initAuthSetup() {
  const savedUser = localStorage.getItem('prospectpulse_google_user');
  if (!savedUser) {
    showAuthSetupModal();
  } else {
    try {
      currentAuthData = JSON.parse(savedUser);
      renderNavUserProfileChip(currentAuthData);
    } catch(e) {
      showAuthSetupModal();
    }
  }
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
}

function closeAuthSetupModal() {
  const modal = document.getElementById('authSetupModal');
  if (modal) modal.style.display = 'none';
}

function renderAuthModalStep() {
  const modal = document.getElementById('authSetupModal');
  if (!modal) return;

  let stepHtml = '';

  if (currentAuthStep === 1) {
    stepHtml = `
      <div class="auth-modal-card">
        <div class="auth-step-dots">
          <div class="auth-step-dot active"></div>
          <div class="auth-step-dot"></div>
          <div class="auth-step-dot"></div>
        </div>

        <div style="text-align: center; margin-bottom: 16px;">
          <span style="font-size: 32px;">⚡</span>
        </div>
        <h2 class="auth-hero-title">Welcome to ProspectPulse AI</h2>
        <p class="auth-hero-sub">Sign in with your Google Workspace account to configure your sales intelligence territory.</p>

        <!-- Official Google Sign-In Button -->
        <button class="btn-google-signin" onclick="handleGoogleSignInPrompt()">
          <svg class="google-icon-svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span>Continue with Google Workspace</span>
        </button>

        <div class="auth-divider"><span>or select account</span></div>

        <div class="quick-google-accounts">
          <div class="google-acc-pill" onclick="selectQuickGoogleAccount('travis.scott@enterprise.io', 'Travis Scott', 'Senior Enterprise AE')">
            <div class="acc-avatar" style="background:#6366F1;">TS</div>
            <div>
              <div style="font-weight: 700; font-size: 13px;">Travis Scott (Enterprise AE)</div>
              <div style="font-size: 11.5px; color: var(--text-muted);">travis.scott@enterprise.io</div>
            </div>
            <span style="margin-left: auto; color: #10B981; font-size: 12px; font-weight: 700;">🟢 Connect</span>
          </div>

          <div class="google-acc-pill" onclick="selectQuickGoogleAccount('sarah.lin@salesgrowth.com', 'Sarah Lin', 'VP of Sales')">
            <div class="acc-avatar" style="background:#EC4899;">SL</div>
            <div>
              <div style="font-weight: 700; font-size: 13px;">Sarah Lin (VP of Sales)</div>
              <div style="font-size: 11.5px; color: var(--text-muted);">sarah.lin@salesgrowth.com</div>
            </div>
            <span style="margin-left: auto; color: #10B981; font-size: 12px; font-weight: 700;">🟢 Connect</span>
          </div>
        </div>
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

        <h2 class="auth-hero-title">Step 2: Workspace &amp; Pitch Profile</h2>
        <p class="auth-hero-sub">Configure how your autonomous agent will position your product.</p>

        <div class="auth-form-group">
          <label>Representative Full Name:</label>
          <input type="text" class="auth-input" id="authNameInput" value="${currentAuthData.name || 'Travis Scott'}">
        </div>

        <div class="auth-form-group">
          <label>Job Title / Role:</label>
          <input type="text" class="auth-input" id="authTitleInput" value="${currentAuthData.title || 'Enterprise Account Executive'}">
        </div>

        <div class="auth-form-group">
          <label>Default Pitch Preset:</label>
          <select class="auth-input" id="authPresetInput">
            <option value="sockclub" ${currentAuthData.preset === 'sockclub' ? 'selected' : ''}>🧦 Sock Club (Direct USA Mill &amp; Custom Merch)</option>
            <option value="zendesk" ${currentAuthData.preset === 'zendesk' ? 'selected' : ''}>🎧 Zendesk (Enterprise AI Customer Service)</option>
            <option value="stripe" ${currentAuthData.preset === 'stripe' ? 'selected' : ''}>💳 Stripe (Global Fintech &amp; Payments)</option>
            <option value="snowflake" ${currentAuthData.preset === 'snowflake' ? 'selected' : ''}>❄️ Snowflake (Enterprise Data Cloud)</option>
          </select>
        </div>

        <div style="display: flex; gap: 10px; margin-top: 24px;">
          <button class="btn btn-secondary" onclick="currentAuthStep = 1; renderAuthModalStep();">← Back</button>
          <button class="btn btn-primary" style="flex: 1;" onclick="submitStep2();">Next: AI Intelligence Engine →</button>
        </div>
      </div>
    `;
  } else if (currentAuthStep === 3) {
    stepHtml = `
      <div class="auth-modal-card">
        <div class="auth-step-dots">
          <div class="auth-step-dot completed"></div>
          <div class="auth-step-dot completed"></div>
          <div class="auth-step-dot active"></div>
        </div>

        <h2 class="auth-hero-title">Step 3: This computer is the engine</h2>
        <p class="auth-hero-sub">No server to start. Paste a Gemini key and the app researches accounts over this PC's internet.</p>

        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 10px; font-weight: 700; color: #10B981; font-size: 13.5px; margin-bottom: 4px;">
            <div class="pulse-dot"></div>
            <span>Standalone desktop — keys stay on this machine</span>
          </div>
          <p style="font-size: 12px; color: var(--text-muted); margin: 0;">
            Saved under AppData\\ProspectPulseAI\\keys.json. Demo accounts still work without a key.
          </p>
        </div>

        <div class="auth-form-group">
          <label>Gemini API key (recommended for live research):</label>
          <input type="password" class="auth-input" id="authApiKeyInput" placeholder="AIzaSy...">
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Get one at <a href="https://aistudio.google.com/app/apikey" target="_blank">aistudio.google.com</a></div>
        </div>

        <div class="auth-form-group">
          <label>Optional Tavily key (news / LinkedIn x-ray):</label>
          <input type="password" class="auth-input" id="authTavilyKeyInput" placeholder="tvly-... (optional)">
        </div>

        <div class="auth-form-group">
          <label>Optional xAI key (backup model):</label>
          <input type="password" class="auth-input" id="authXaiKeyInput" placeholder="xai-... (optional)">
        </div>

        <div style="display: flex; gap: 10px; margin-top: 24px;">
          <button class="btn btn-secondary" onclick="currentAuthStep = 2; renderAuthModalStep();">← Back</button>
          <button class="btn btn-primary" style="flex: 1;" onclick="completeAuthSetup();">🚀 Launch ProspectPulse Desktop Studio</button>
        </div>
      </div>
    `;
  }

  modal.innerHTML = stepHtml;
}

function handleGoogleSignInPrompt() {
  const email = prompt("Enter your Google Workspace email:", "travis.scott@enterprise.io");
  if (email && email.includes("@")) {
    const name = email.split("@")[0].replace(".", " ").replace(/\b\w/g, l => l.toUpperCase());
    selectQuickGoogleAccount(email, name, "Enterprise Account Executive");
  }
}

function selectQuickGoogleAccount(email, name, title) {
  currentAuthData.email = email;
  currentAuthData.name = name;
  currentAuthData.title = title;
  currentAuthData.avatar_url = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366F1&color=fff`;
  currentAuthStep = 2;
  renderAuthModalStep();
}

function submitStep2() {
  const name = document.getElementById('authNameInput').value;
  const title = document.getElementById('authTitleInput').value;
  const preset = document.getElementById('authPresetInput').value;
  currentAuthData.name = name || currentAuthData.name;
  currentAuthData.title = title || currentAuthData.title;
  currentAuthData.preset = preset;
  currentAuthStep = 3;
  renderAuthModalStep();
}

function completeAuthSetup() {
  const apiKey = document.getElementById('authApiKeyInput') ? document.getElementById('authApiKeyInput').value : '';
  const tavilyKey = document.getElementById('authTavilyKeyInput') ? document.getElementById('authTavilyKeyInput').value : '';
  const xaiKey = document.getElementById('authXaiKeyInput') ? document.getElementById('authXaiKeyInput').value : '';
  currentAuthData.api_key = apiKey;
  currentAuthData.tavily_key = tavilyKey;
  currentAuthData.xai_key = xaiKey;

  // Persist locally
  localStorage.setItem('prospectpulse_google_user', JSON.stringify(currentAuthData));
  if (apiKey) localStorage.setItem('prospectpulse_gemini_key', apiKey.trim());
  if (tavilyKey) localStorage.setItem('prospectpulse_tavily_key', tavilyKey.trim());
  if (xaiKey) localStorage.setItem('prospectpulse_xai_key', xaiKey.trim());

  // Sync with bundled local engine
  fetch('/api/auth/save-profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(currentAuthData)
  }).catch(err => console.log('Auth sync:', err));

  // Update app components
  if (window.updateAllAppComponentsForPreset) {
    window.updateAllAppComponentsForPreset(currentAuthData.preset);
  }

  renderNavUserProfileChip(currentAuthData);
  closeAuthSetupModal();

  if (window.showToast) {
    window.showToast(`✅ Welcome, ${currentAuthData.name}! Workspace setup complete.`);
  }
}

function renderNavUserProfileChip(user) {
  let chip = document.getElementById('navGoogleUserChip');
  if (!chip) {
    chip = document.createElement('div');
    chip.id = 'navGoogleUserChip';
    chip.className = 'user-profile-badge';
    chip.onclick = openUserSettingsModal;

    const navRight = document.querySelector('.nav-right');
    if (navRight) {
      navRight.insertBefore(chip, navRight.firstChild);
    }
  }

  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() : 'ME';
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
    modal.onclick = (e) => { if(e.target === modal) modal.style.display = 'none'; };
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content" style="max-width: 440px; padding: 28px;">
      <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border);">
        <div class="acc-avatar" style="width: 44px; height: 44px; font-size: 18px;">
          ${currentAuthData.name ? currentAuthData.name[0] : 'U'}
        </div>
        <div>
          <div style="font-weight: 800; font-size: 16px;">${currentAuthData.name}</div>
          <div style="font-size: 12.5px; color: var(--text-muted);">${currentAuthData.email}</div>
          <div style="font-size: 11px; color: var(--emerald); font-weight: 700;">🟢 Google Workspace Connected</div>
        </div>
      </div>

      <div style="margin-bottom: 20px; font-size: 13px; color: var(--text-muted); line-height: 1.8;">
        <div><strong>Role:</strong> ${currentAuthData.title}</div>
        <div><strong>Active Preset:</strong> ${currentAuthData.preset.toUpperCase()}</div>
      </div>

      <div style="display: flex; gap: 10px;">
        <button class="btn btn-secondary" style="flex: 1;" onclick="showAuthSetupModal(); document.getElementById('userSettingsModal').style.display = 'none';">⚙️ Edit Profile</button>
        <button class="btn btn-secondary" style="border-color: rgba(239,68,68,0.4); color: #fca5a5;" onclick="logoutGoogleUser()">🚪 Sign Out</button>
      </div>
    </div>
  `;
  modal.style.display = 'grid';
}

function logoutGoogleUser() {
  localStorage.removeItem('prospectpulse_google_user');
  fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  const chip = document.getElementById('navGoogleUserChip');
  if (chip) chip.remove();
  const settingsModal = document.getElementById('userSettingsModal');
  if (settingsModal) settingsModal.style.display = 'none';
  showAuthSetupModal();
}

// Auto-run on page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initAuthSetup, 400);
});
