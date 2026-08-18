/**
 * ProspectPulse AI — Mobile Direct Live Web Intelligence Engine
 * Uses the on-device standalone engine (phone internet, no local server).
 */
(function () {
  window.MobileLiveWebEngine = {
    async fetchLiveCompanyData(domainOrName) {
      if (window.StandaloneClientEngine) {
        return window.StandaloneClientEngine.generateAccountIntel(domainOrName);
      }
      return null;
    },

    async queryDirectGemini(companyName, domain, apiKey) {
      if (apiKey) {
        localStorage.setItem('prospectpulse_gemini_key', apiKey);
      }
      if (window.StandaloneClientEngine) {
        return window.StandaloneClientEngine.generateAccountIntel(domain || companyName);
      }
      return null;
    }
  };
})();
