/**
 * Universal User Session Management for Testing & Production.
 * Automatically provides a default tester identity so no API key entry is required.
 * Testers can freely customize their Name, Title, Email, Company, and Preset.
 */
(function () {
  const SESSION_KEY = 'prospectpulse_session';
  const ACCOUNTS_KEY = 'prospectpulse_local_accounts';

  const DEFAULT_PROFILE = {
    email: 'alex.rivera@zendesk.com',
    name: 'Alex Rivera',
    title: 'Enterprise Account Executive',
    company: 'Zendesk',
    preset: 'zendesk',
    avatar_url: 'https://ui-avatars.com/api/?name=Alex+Rivera&background=6366F1&color=fff'
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
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }

  function listAccounts() {
    const accounts = readJson(ACCOUNTS_KEY, [DEFAULT_PROFILE]);
    return accounts.filter(function (a) { return a && a.email; });
  }

  function upsertAccount(profile) {
    const email = String(profile.email || '').trim().toLowerCase();
    if (!email) return;
    const accounts = listAccounts().filter(function (a) {
      return String(a.email).toLowerCase() !== email;
    });
    accounts.unshift({
      email: email,
      name: profile.name || email,
      title: profile.title || 'Account Executive',
      company: profile.company || 'Zendesk',
      preset: profile.preset || 'zendesk',
      avatar_url: profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || email)}&background=6366F1&color=fff`,
      updated_at: new Date().toISOString()
    });
    writeJson(ACCOUNTS_KEY, accounts.slice(0, 20));
  }

  function loadKeys(email) {
    return {
      xai: localStorage.getItem('prospectpulse_xai_key') || '',
      gemini: localStorage.getItem('prospectpulse_gemini_key') || '',
      tavily: localStorage.getItem('prospectpulse_tavily_key') || ''
    };
  }

  function saveKeys(email, keys) {
    // Key storage fallback if user enters custom ones
  }

  function applyActiveKeys(email) {
    return loadKeys(email);
  }

  function getSession() {
    let session = readJson(SESSION_KEY, null);
    if (!session || !session.email) {
      session = DEFAULT_PROFILE;
      writeJson(SESSION_KEY, session);
      upsertAccount(session);
    }
    return session;
  }

  function saveSession(profile, keys) {
    const clean = {
      email: String(profile.email || DEFAULT_PROFILE.email).trim().toLowerCase(),
      name: (profile.name || DEFAULT_PROFILE.name).trim(),
      title: (profile.title || DEFAULT_PROFILE.title).trim(),
      company: (profile.company || DEFAULT_PROFILE.company).trim(),
      preset: profile.preset || 'zendesk',
      avatar_url: profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'User')}&background=6366F1&color=fff`
    };
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
    return clean;
  }

  function signOut() {
    const session = DEFAULT_PROFILE;
    writeJson(SESSION_KEY, session);
    return session;
  }

  function switchAccount(email) {
    const acc = listAccounts().find(function (a) {
      return String(a.email).toLowerCase() === String(email || '').toLowerCase();
    });
    if (!acc) return getSession();
    return saveSession(acc);
  }

  function getWorkspace() {
    return { enabled: true, has_xai: true, has_gemini: true };
  }

  function setWorkspaceMeta(meta) {}

  window.UserSession = {
    DEMO_EMAILS: {},
    isDemoProfile: function() { return false; },
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
