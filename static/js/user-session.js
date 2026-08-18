/**
 * Per-person local login for the standalone app.
 * Identity and API keys stay on this device, namespaced by email.
 * Nobody inherits Travis's profile or keys.
 */
(function () {
  const SESSION_KEY = 'prospectpulse_session';
  const ACCOUNTS_KEY = 'prospectpulse_local_accounts';
  const DEMO_EMAILS = {
    'travis.scott@enterprise.io': true,
    'sarah.lin@salesgrowth.com': true,
  };

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function keyName(email, kind) {
    const id = String(email || 'local').trim().toLowerCase();
    return 'prospectpulse_user_' + encodeURIComponent(id) + '_' + kind;
  }

  function isDemoProfile(profile) {
    if (!profile) return true;
    const email = String(profile.email || '').trim().toLowerCase();
    return !email || !!DEMO_EMAILS[email];
  }

  function listAccounts() {
    const accounts = readJson(ACCOUNTS_KEY, []);
    return accounts.filter(function (a) { return a && a.email && !DEMO_EMAILS[String(a.email).toLowerCase()]; });
  }

  function upsertAccount(profile) {
    const email = String(profile.email || '').trim().toLowerCase();
    if (!email || DEMO_EMAILS[email]) return;
    const accounts = listAccounts().filter(function (a) {
      return String(a.email).toLowerCase() !== email;
    });
    accounts.unshift({
      email: email,
      name: profile.name || email,
      title: profile.title || '',
      company: profile.company || '',
      preset: profile.preset || 'sockclub',
      avatar_url: profile.avatar_url || '',
      updated_at: new Date().toISOString()
    });
    writeJson(ACCOUNTS_KEY, accounts.slice(0, 20));
  }

  function loadKeys(email) {
    return {
      xai: localStorage.getItem(keyName(email, 'xai')) || '',
      gemini: localStorage.getItem(keyName(email, 'gemini')) || '',
      tavily: localStorage.getItem(keyName(email, 'tavily')) || ''
    };
  }

  function saveKeys(email, keys) {
    if (!email) return;
    if (keys.xai !== undefined) {
      if (keys.xai) localStorage.setItem(keyName(email, 'xai'), keys.xai.trim());
      else localStorage.removeItem(keyName(email, 'xai'));
      localStorage.setItem('prospectpulse_xai_key', (keys.xai || '').trim());
    }
    if (keys.gemini !== undefined) {
      if (keys.gemini) localStorage.setItem(keyName(email, 'gemini'), keys.gemini.trim());
      else localStorage.removeItem(keyName(email, 'gemini'));
      localStorage.setItem('prospectpulse_gemini_key', (keys.gemini || '').trim());
    }
    if (keys.tavily !== undefined) {
      if (keys.tavily) localStorage.setItem(keyName(email, 'tavily'), keys.tavily.trim());
      else localStorage.removeItem(keyName(email, 'tavily'));
      localStorage.setItem('prospectpulse_tavily_key', (keys.tavily || '').trim());
    }
    if (window.StandaloneClientEngine && window.StandaloneClientEngine.saveKeys) {
      window.StandaloneClientEngine.saveKeys({
        xai: keys.xai,
        gemini: keys.gemini,
        tavily: keys.tavily
      });
    }
  }

  function applyActiveKeys(email) {
    const keys = loadKeys(email);
    if (window.StandaloneClientEngine && window.StandaloneClientEngine.saveKeys) {
      window.StandaloneClientEngine.saveKeys(keys);
    } else {
      if (keys.xai) localStorage.setItem('prospectpulse_xai_key', keys.xai);
      else localStorage.removeItem('prospectpulse_xai_key');
      if (keys.gemini) localStorage.setItem('prospectpulse_gemini_key', keys.gemini);
      else localStorage.removeItem('prospectpulse_gemini_key');
      if (keys.tavily) localStorage.setItem('prospectpulse_tavily_key', keys.tavily);
      else localStorage.removeItem('prospectpulse_tavily_key');
    }
    return keys;
  }

  function getSession() {
    const session = readJson(SESSION_KEY, null);
    if (!session || isDemoProfile(session)) return null;
    return session;
  }

  function saveSession(profile, keys) {
    const clean = {
      email: String(profile.email || '').trim().toLowerCase(),
      name: (profile.name || '').trim(),
      title: (profile.title || '').trim(),
      company: (profile.company || '').trim(),
      preset: profile.preset || 'sockclub',
      avatar_url: profile.avatar_url || ''
    };
    if (!clean.email || !clean.email.includes('@')) {
      throw new Error('A real work email is required');
    }
    writeJson(SESSION_KEY, clean);
    localStorage.setItem('prospectpulse_google_user', JSON.stringify(clean));
    localStorage.setItem('prospectpulse_user_profile', JSON.stringify({
      name: clean.name,
      email: clean.email,
      title: clean.title,
      company: clean.company,
      avatar: clean.avatar_url,
      isGoogleConnected: false
    }));
    upsertAccount(clean);
    if (keys) saveKeys(clean.email, keys);
    applyActiveKeys(clean.email);
    return clean;
  }

  function signOut() {
    const session = getSession();
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('prospectpulse_google_user');
    localStorage.removeItem('prospectpulse_user_profile');
    localStorage.removeItem('prospectpulse_xai_key');
    localStorage.removeItem('prospectpulse_gemini_key');
    localStorage.removeItem('prospectpulse_tavily_key');
    if (window.StandaloneClientEngine && window.StandaloneClientEngine.saveKeys) {
      window.StandaloneClientEngine.saveKeys({ xai: '', gemini: '', tavily: '' });
    }
    fetch('/api/auth/logout', { method: 'POST' }).catch(function () {});
    return session;
  }

  function switchAccount(email) {
    const acc = listAccounts().find(function (a) {
      return String(a.email).toLowerCase() === String(email || '').toLowerCase();
    });
    if (!acc) throw new Error('No saved login for that email on this device');
    return saveSession(acc, loadKeys(acc.email));
  }

  function getWorkspace() {
    return readJson('prospectpulse_workspace', { enabled: false, has_xai: false, has_gemini: false });
  }

  function setWorkspaceMeta(meta) {
    writeJson('prospectpulse_workspace', meta || { enabled: false });
  }

  window.UserSession = {
    DEMO_EMAILS: DEMO_EMAILS,
    isDemoProfile: isDemoProfile,
    listAccounts: listAccounts,
    getSession: getSession,
    saveSession: saveSession,
    loadKeys: loadKeys,
    saveKeys: saveKeys,
    applyActiveKeys: applyActiveKeys,
    switchAccount: switchAccount,
    signOut: signOut,
    getWorkspace: getWorkspace,
    setWorkspaceMeta: setWorkspaceMeta
  };
})();
