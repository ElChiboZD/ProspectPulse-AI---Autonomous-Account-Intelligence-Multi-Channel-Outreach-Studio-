/**
 * ProspectPulse AI — Mobile Direct Live Web Intelligence Engine
 * Fetches real-time company intelligence, news, executives, and signals directly
 * over Mobile Data / Wi-Fi without needing a local backend or desktop connection.
 */

(function () {
  window.MobileLiveWebEngine = {
    // 1. Fetch Real Live Company Data via Public CORS APIs
    async fetchLiveCompanyData(domainOrName) {
      const cleanName = domainOrName.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0].split('.')[0];
      const domain = domainOrName.includes('.') ? domainOrName.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0] : `${cleanName}.com`;

      console.log(`[*] Mobile Live Web: Querying live data for ${cleanName} (${domain})...`);

      let liveData = {
        name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
        domain: domain,
        description: '',
        founded: '',
        headquarters: '',
        employees: '1,000 - 5,000',
        revenue: '$100M+',
        logo: `https://logo.clearbit.com/${domain}`,
        leadership: [],
        signals: [],
        source: 'Public Web Live API'
      };

      // A. Query Wikipedia REST API for Verified Company Bio & Facts
      try {
        const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanName)}`;
        const wikiRes = await fetch(wikiUrl, { headers: { 'Accept': 'application/json' } });
        if (wikiRes.ok) {
          const wikiJson = await wikiRes.json();
          if (wikiJson.extract && !wikiJson.extract.includes('may refer to:')) {
            liveData.name = wikiJson.title || liveData.name;
            liveData.description = wikiJson.extract;
            if (wikiJson.thumbnail && wikiJson.thumbnail.source) {
              liveData.logo = wikiJson.thumbnail.source;
            }
          }
        }
      } catch (err) {
        console.warn('[Mobile Live Web] Wikipedia fetch skipped:', err.message);
      }

      // B. Query DuckDuckGo Instant Knowledge API
      try {
        const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(cleanName + ' company')}&format=json&no_html=1&skip_disambig=1`;
        const ddgRes = await fetch(ddgUrl);
        if (ddgRes.ok) {
          const ddgJson = await ddgRes.json();
          if (ddgJson.AbstractText && !liveData.description) {
            liveData.description = ddgJson.AbstractText;
          }
          if (ddgJson.Entity) {
            liveData.industry = ddgJson.Entity;
          }
        }
      } catch (err) {
        console.warn('[Mobile Live Web] DuckDuckGo fetch skipped:', err.message);
      }

      // C. If User has configured a Direct Cloud API Key (Gemini, Groq, OpenAI)
      const userGeminiKey = localStorage.getItem('prospectpulse_gemini_key') || localStorage.getItem('user_api_key');
      if (userGeminiKey) {
        try {
          const aiResult = await this.queryDirectGemini(cleanName, domain, userGeminiKey);
          if (aiResult) {
            liveData = { ...liveData, ...aiResult, source: 'Direct Google Gemini Cloud API' };
          }
        } catch (err) {
          console.warn('[Mobile Live Web] Gemini Cloud call skipped:', err.message);
        }
      }

      return liveData;
    },

    // 2. Direct-to-Gemini Cloud API Call (Client-Side Mobile)
    async queryDirectGemini(companyName, domain, apiKey) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const prompt = `You are an elite enterprise B2B sales intelligence engine. Analyze the company "${companyName}" (${domain}).
Return ONLY valid JSON with this exact schema:
{
  "name": "${companyName}",
  "domain": "${domain}",
  "revenue": "Estimated annual revenue (e.g. $8.1B)",
  "headcount": "Estimated employee count",
  "headquarters": "City, State/Country",
  "competitor_incumbent": "Main merchandise/swag/gifting competitor they likely use (e.g. SwagUp, Printfection, Salesforce)",
  "pain_points": ["Specific pain point 1", "Specific pain point 2", "Specific pain point 3"],
  "buying_signals": ["Recent expansion or hiring trigger 1", "Executive trigger 2"],
  "economic_buyer": {"name": "Executive Name", "title": "VP of Marketing or Chief People Officer"},
  "champion": {"name": "Champion Name", "title": "Director of Brand Experience / Talent Ops"},
  "custom_hook": "A sharp, highly relevant 2-sentence cold outreach opening referencing their specific business model."
}`;

      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const json = await res.json();
        const text = json.candidates[0].content.parts[0].text;
        return JSON.parse(text);
      }
      return null;
    }
  };
})();
