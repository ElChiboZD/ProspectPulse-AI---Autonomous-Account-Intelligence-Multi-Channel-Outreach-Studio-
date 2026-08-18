/**
 * Google login + Gemini fallback for ProspectPulse.
 * One Google click signs the person in and (when allowed) gets a Gemini token.
 */
(function () {
  const GEMINI_SCOPES = [
    'openid',
    'email',
    'profile',
    'https://www.googleapis.com/auth/generative-language',
    'https://www.googleapis.com/auth/generative-language.retriever'
  ].join(' ');

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
      window.location.href = url;
      return true;
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

      function finish(profile) {
        self.lastProfile = profile;
        self.requestGeminiToken(function (token) {
          profile.google_connected = true;
          profile.gemini_oauth = !!token;
          onProfile(profile);
        });
      }

      if (!this.clientId) {
        el.innerHTML = `
          <div style="width:100%;text-align:left;">
            <div style="font-size:12px;color:#94A3B8;margin-bottom:8px;">Paste your Google OAuth Web client ID once. Then everyone can tap Sign in with Google.</div>
            <input id="inlineGoogleClientId" type="text" placeholder="123-abc.apps.googleusercontent.com" style="width:100%;height:40px;border-radius:10px;border:1px solid rgba(255,255,255,0.12);background:#111827;color:#fff;padding:0 10px;margin-bottom:8px;" />
            <button type="button" id="inlineGoogleClientSave" style="width:100%;height:40px;border:none;border-radius:10px;background:#4285F4;color:#fff;font-weight:700;cursor:pointer;">Save and show Google sign-in</button>
          </div>`;
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

      const canGsi = window.google && window.google.accounts && window.google.accounts.id;
      el.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;flex-direction:column;gap:10px;width:100%;align-items:center;';
      const gsiHost = document.createElement('div');
      gsiHost.id = (el.id || 'gsi') + '_official';
      wrap.appendChild(gsiHost);
      const fallback = document.createElement('button');
      fallback.type = 'button';
      fallback.className = 'btn-google-signin';
      fallback.innerHTML = '<span>Continue with Google</span>';
      fallback.onclick = function () {
        if (!self.startDesktopOAuth()) {
          alert('Add a Google client ID first.');
        }
      };
      wrap.appendChild(fallback);
      el.appendChild(wrap);

      if (canGsi) {
        window.google.accounts.id.initialize({
          client_id: this.clientId,
          callback: function (response) {
            const payload = decodeJwt(response && response.credential);
            if (!payload || !payload.email) {
              alert('Google sign-in did not return an email.');
              return;
            }
            finish({
              email: payload.email,
              name: payload.name || payload.email.split('@')[0],
              avatar_url: payload.picture || '',
              google_sub: payload.sub || '',
              email_verified: !!payload.email_verified
            });
          },
          auto_select: false,
          cancel_on_tap_outside: true
        });
        window.google.accounts.id.renderButton(gsiHost, {
          theme: 'filled_black',
          size: 'large',
          shape: 'pill',
          text: 'signin_with',
          width: Math.min(360, el.clientWidth || 320)
        });
        fallback.style.display = 'none';
        this.ready = true;
        return true;
      }

      fallback.style.display = 'flex';
      return true;
    }
  };

  window.GoogleIdentity = GoogleIdentity;
  window.decodeGoogleJwt = decodeJwt;
  window.getGoogleAccessToken = getGoogleToken;
  window.saveGoogleAccessToken = saveGoogleToken;
})();
