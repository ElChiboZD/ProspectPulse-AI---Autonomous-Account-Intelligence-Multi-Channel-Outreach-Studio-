/**
 * Google login + Gemini fallback for ProspectPulse.
 * Phone uses native Google Sign-In (no JS origin). Desktop uses GIS / localhost OAuth.
 */
(function () {
  const ANDROID_SHA1 = '64:9A:9F:45:45:3A:29:73:9D:B5:E4:9A:8C:4F:09:5D:90:98:E4:E6';
  const ANDROID_PACKAGE = 'ai.prospectpulse.app';

  const GEMINI_SCOPES = [
    'openid',
    'email',
    'profile',
    'https://www.googleapis.com/auth/generative-language',
    'https://www.googleapis.com/auth/generative-language.retriever'
  ].join(' ');

  function currentOrigin() {
    try { return window.location.origin || ''; } catch (e) { return ''; }
  }

  function isNativeApp() {
    return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  }

  function setupChecklistHtml() {
    const origin = currentOrigin() || 'https://localhost';
    return `
      <div style="width:100%;text-align:left;background:#111827;border:1px solid rgba(248,113,113,0.4);border-radius:14px;padding:12px;margin-top:8px;">
        <div style="font-size:13px;font-weight:800;color:#FCA5A5;margin-bottom:6px;">Google login setup</div>
        <div style="font-size:12px;color:#CBD5E1;line-height:1.5;">
          Open <a href="https://console.cloud.google.com/apis/credentials" target="_blank" style="color:#93C5FD;">Google Cloud Credentials</a> and create <strong>two</strong> clients in the same project:
          <br><br><strong>Windows standalone — type Desktop app</strong><br>
          Redirect used by the app: <code>http://127.0.0.1:8765/api/auth/google/callback</code>
          <br>Paste that Desktop client ID into this screen.
          <br><br><strong>Android phone — type Android</strong><br>
          Package: <code>${ANDROID_PACKAGE}</code><br>
          SHA-1: <code>${ANDROID_SHA1}</code>
          <br>Also create a <strong>Web application</strong> client and use its ID as the phone's client ID (no JavaScript origins needed now).
        </div>
      </div>`;
  }

  function decodeJwt(credential) {
    const parts = String(credential || '').split('.');
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '==='.slice((base64.length + 3) % 4);
    try {
      const json = decodeURIComponent(atob(padded).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }

  function saveGoogleToken(token, expiresIn) {
    const exp = Date.now() + (Number(expiresIn || 3600) * 1000);
    localStorage.setItem('prospectpulse_google_access_token', token || '');
    localStorage.setItem('prospectpulse_google_token_exp', String(exp));
  }

  function getGoogleToken() {
    const token = localStorage.getItem('prospectpulse_google_access_token') || '';
    const exp = Number(localStorage.getItem('prospectpulse_google_token_exp') || 0);
    if (!token || !exp || Date.now() > exp - 15000) return '';
    return token;
  }

  const GoogleIdentity = {
    clientId: '',
    ready: false,
    lastProfile: null,

    async loadConfig() {
      const stored = localStorage.getItem('prospectpulse_google_client_id') || '';
      if (stored) this.clientId = stored.trim();
      try {
        const res = await fetch('/api/auth/config');
        if (res.ok) {
          const json = await res.json();
          if (json.google_client_id) this.clientId = json.google_client_id;
        }
      } catch (e) {}
      return this.clientId;
    },

    setClientId(id) {
      this.clientId = String(id || '').trim();
      if (this.clientId) localStorage.setItem('prospectpulse_google_client_id', this.clientId);
      else localStorage.removeItem('prospectpulse_google_client_id');
    },

    isAvailable() {
      return !!(this.clientId && window.google && window.google.accounts);
    },

    startDesktopOAuth() {
      if (!this.clientId) return false;
      const url = '/api/auth/google/start?client_id=' + encodeURIComponent(this.clientId);
      if (window.pywebview && window.pywebview.api && window.pywebview.api.start_google_login) {
        window.pywebview.api.start_google_login(this.clientId);
        return 'browser';
      }
      window.open(url, '_blank');
      return 'browser';
    },

    watchDesktopLogin(onProfile) {
      const self = this;
      let tries = 0;
      const timer = setInterval(async function () {
        tries += 1;
        if (tries > 90) {
          clearInterval(timer);
          return;
        }
        try {
          const res = await fetch('/api/auth/profile');
          if (!res.ok) return;
          const json = await res.json();
          const email = (json.email || (json.profile && json.profile.email) || '').toLowerCase();
          if (!email) return;
          clearInterval(timer);
          const profile = {
            email: email,
            name: (json.profile && json.profile.name) || email.split('@')[0],
            avatar_url: (json.profile && json.profile.avatar_url) || '',
            google_connected: true,
            gemini_oauth: true
          };
          self.lastProfile = profile;
          if (onProfile) onProfile(profile);
        } catch (e) {}
      }, 1500);
    },

    nativePlugin() {
      return window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.GoogleAuth
        ? window.Capacitor.Plugins.GoogleAuth
        : null;
    },

    async signInNative(onProfile) {
      const plugin = this.nativePlugin();
      if (!plugin) return false;
      try {
        if (plugin.initialize) {
          plugin.initialize({
            clientId: this.clientId,
            scopes: GEMINI_SCOPES.split(' '),
            grantOfflineAccess: true
          });
        }
        const user = await plugin.signIn();
        const email = (user.email || (user.authentication && user.authentication.idToken && decodeJwt(user.authentication.idToken).email) || '').toLowerCase();
        if (!email) throw new Error('Google did not return an email');
        const access = (user.authentication && (user.authentication.accessToken || user.authentication.access_token)) || '';
        if (access) saveGoogleToken(access, 3600);
        const profile = {
          email: email,
          name: user.name || user.displayName || email.split('@')[0],
          avatar_url: user.imageUrl || user.picture || '',
          google_sub: user.id || '',
          email_verified: true,
          google_connected: true,
          gemini_oauth: !!access
        };
        this.lastProfile = profile;
        if (onProfile) onProfile(profile);
        return true;
      } catch (err) {
        console.warn('[Google native sign-in]', err);
        return false;
      }
    },

    requestGeminiToken(onToken) {
      if (!this.clientId || !window.google || !window.google.accounts || !window.google.accounts.oauth2) {
        if (onToken) onToken(null);
        return;
      }
      const self = this;
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: this.clientId,
        scope: GEMINI_SCOPES,
        callback: function (resp) {
          if (resp && resp.access_token) {
            saveGoogleToken(resp.access_token, resp.expires_in);
            fetch('/api/auth/google/session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: (self.lastProfile && self.lastProfile.email) || '',
                name: (self.lastProfile && self.lastProfile.name) || '',
                access_token: resp.access_token,
                expires_in: resp.expires_in || 3600
              })
            }).catch(function () {});
            if (onToken) onToken(resp.access_token);
          } else if (onToken) onToken(null);
        },
        error_callback: function () {
          if (onToken) onToken(null);
        }
      });
      client.requestAccessToken({ prompt: '' });
    },

    renderButton(elementId, onProfile) {
      const el = typeof elementId === 'string' ? document.getElementById(elementId) : elementId;
      if (!el) return false;
      const self = this;

      el.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;flex-direction:column;gap:10px;width:100%;align-items:stretch;';

      if (!this.clientId) {
        wrap.innerHTML = `
          <div style="font-size:12px;color:#94A3B8;">Paste a Google Cloud client ID. Use type <strong>Desktop app</strong> for the Windows app, and also create an <strong>Android</strong> client for the phone.</div>
          <input id="inlineGoogleClientId" type="text" placeholder="123-abc.apps.googleusercontent.com" style="width:100%;height:40px;border-radius:10px;border:1px solid rgba(255,255,255,0.12);background:#111827;color:#fff;padding:0 10px;" />
          <button type="button" id="inlineGoogleClientSave" style="width:100%;height:42px;border:none;border-radius:10px;background:#4285F4;color:#fff;font-weight:700;cursor:pointer;">Save client ID</button>
          ${setupChecklistHtml()}`;
        el.appendChild(wrap);
        const btn = document.getElementById('inlineGoogleClientSave');
        if (btn) {
          btn.onclick = function () {
            const val = (document.getElementById('inlineGoogleClientId') || {}).value || '';
            self.setClientId(val);
            self.renderButton(el, onProfile);
          };
        }
        return false;
      }

      const nativeBtn = document.createElement('button');
      nativeBtn.type = 'button';
      nativeBtn.className = 'btn-google-signin';
      nativeBtn.innerHTML = '<span>Continue with Google</span>';
      nativeBtn.onclick = async function () {
        if (isNativeApp()) {
          const ok = await self.signInNative(onProfile);
          if (!ok) {
            const help = document.getElementById('googleOriginHelp');
            if (help) help.style.display = 'block';
          }
          return;
        }
        const started = self.startDesktopOAuth();
        if (!started) {
          alert('Add a Google client ID first.');
          return;
        }
        nativeBtn.textContent = 'Waiting for Google in your browser…';
        self.watchDesktopLogin(onProfile);
      };
      wrap.appendChild(nativeBtn);

      const help = document.createElement('div');
      help.id = 'googleOriginHelp';
      help.style.display = 'none';
      help.innerHTML = setupChecklistHtml();
      wrap.appendChild(help);

      el.appendChild(wrap);
      return true;
    }
  };

  window.GoogleIdentity = GoogleIdentity;
  window.decodeGoogleJwt = decodeJwt;
  window.getGoogleAccessToken = getGoogleToken;
  window.saveGoogleAccessToken = saveGoogleToken;
})();
