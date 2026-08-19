/**
 * ProspectPulse — on-device research engine.
 * Runs inside the Android app and the desktop window.
 * Talks to xAI Grok first (live web search), then Gemini / Wikipedia / Tavily.
 * No local Python server is required on mobile.
 */
(function () {
  const KEYS = {
    gemini: 'prospectpulse_gemini_key',
    tavily: 'prospectpulse_tavily_key',
    xai: 'prospectpulse_xai_key'
  };

  const GEMINI_MODELS = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-3.6-flash',
    'gemini-1.5-flash'
  ];

  const XAI_MODELS = ['grok-4.6', 'grok-4.5'];

  function readKey(name) {
    try {
      return (localStorage.getItem(name) || '').trim();
    } catch (e) {
      return '';
    }
  }

  function writeKey(name, value) {
    try {
      if (value) localStorage.setItem(name, value.trim());
      else localStorage.removeItem(name);
    } catch (e) {}
  }

  function isNativeApp() {
    return !!(window.Capacitor || window.ProspectPulseNative);
  }

  function googleAccessToken() {
    try {
      if (typeof window.getGoogleAccessToken === 'function') {
        return window.getGoogleAccessToken() || '';
      }
      const token = localStorage.getItem('prospectpulse_google_access_token') || '';
      const exp = Number(localStorage.getItem('prospectpulse_google_token_exp') || 0);
      if (!token || !exp || Date.now() > exp - 15000) return '';
      return token;
    } catch (e) {
      return '';
    }
  }

  function hasAnyLiveKey() {
    return !!(readKey(KEYS.gemini) || readKey('prospectpulse_google_api_key') || readKey(KEYS.xai) || readKey(KEYS.tavily) || googleAccessToken());
  }

  function parseDomain(raw) {
    const cleaned = String(raw || '')
      .trim()
      .replace(/^https?:\/\//i, '')
      .replace(/^www\./i, '')
      .split('/')[0]
      .split('?')[0]
      .trim();
    if (!cleaned) return { name: 'Acme', domain: 'acme.com' };
    if (cleaned.includes('.')) {
      const name = cleaned.split('.')[0];
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        domain: cleaned.toLowerCase()
      };
    }
    return {
      name: cleaned.charAt(0).toUpperCase() + cleaned.slice(1),
      domain: cleaned.toLowerCase() + '.com'
    };
  }

  function safeJson(text) {
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch (e) {}
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch (e2) {}
    }
    return null;
  }

  async function httpJson(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
      const err = new Error('HTTP ' + res.status);
      err.status = res.status;
      throw err;
    }
    return res.json();
  }

  async function fetchWikipedia(name) {
    const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(name);
    const json = await httpJson(url, { headers: { Accept: 'application/json' } });
    if (json.extract && !String(json.extract).includes('may refer to:')) {
      return {
        name: json.title || name,
        description: json.extract,
        logo: json.thumbnail && json.thumbnail.source
      };
    }
    return null;
  }

  async function callGemini(prompt, { jsonMode } = {}) {
    const apiKey = readKey(KEYS.gemini) || readKey('prospectpulse_google_api_key');
    const oauth = googleAccessToken();
    if (!apiKey && !oauth) return null;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: jsonMode
        ? { responseMimeType: 'application/json', temperature: 0.4 }
        : { temperature: 0.5 }
    };

    let lastErr = null;
    for (const model of GEMINI_MODELS) {
      const base = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent';
      const attempts = [];
      if (oauth) {
        attempts.push({
          url: base,
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + oauth }
        });
      }
      if (apiKey) {
        attempts.push({
          url: base,
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey }
        });
        attempts.push({
          url: base + '?key=' + encodeURIComponent(apiKey),
          headers: { 'Content-Type': 'application/json' }
        });
      }
      for (const attempt of attempts) {
        try {
          const json = await httpJson(attempt.url, {
            method: 'POST',
            headers: attempt.headers,
            body: JSON.stringify(payload)
          });
          const text = (((json.candidates || [])[0] || {}).content || {}).parts
            ? json.candidates[0].content.parts.map(function (p) { return p.text || ''; }).join('')
            : '';
          if (!text) continue;
          return jsonMode ? safeJson(text) : text;
        } catch (err) {
          lastErr = err;
        }
      }
    }
    if (lastErr) throw lastErr;
    return null;
  }

  function extractXaiText(payload) {
    if (!payload || typeof payload !== 'object') return '';
    if (payload.output_text) return String(payload.output_text);
    const chunks = [];
    (payload.output || []).forEach(function (item) {
      if (!item) return;
      if (item.type === 'message') {
        (item.content || []).forEach(function (part) {
          if (part && part.text) chunks.push(part.text);
        });
      }
    });
    if (chunks.length) return chunks.join('\n');
    const choice = (payload.choices || [])[0];
    return (choice && choice.message && choice.message.content) || '';
  }

  async function callXai(prompt, { jsonMode, liveSearch } = {}) {
    const apiKey = readKey(KEYS.xai);
    if (!apiKey) return null;

    let lastErr = null;
    for (const model of XAI_MODELS) {
      if (liveSearch) {
        try {
          const json = await httpJson('https://api.x.ai/v1/responses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + apiKey
            },
            body: JSON.stringify({
              model: model,
              input: [{ role: 'user', content: prompt }],
              tools: [{ type: 'web_search' }]
            })
          });
          const text = extractXaiText(json);
          if (text) return jsonMode ? safeJson(text) : text;
        } catch (err) {
          lastErr = err;
        }
      }

      try {
        const body = {
          model: model,
          temperature: 0.4,
          messages: [
            { role: 'system', content: jsonMode ? 'Return only valid JSON. No markdown. Use live public facts.' : 'Be concise and specific.' },
            { role: 'user', content: prompt }
          ]
        };
        if (liveSearch) body.search_parameters = { mode: 'auto', return_citations: true };
        const json = await httpJson('https://api.x.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + apiKey
          },
          body: JSON.stringify(body)
        });
        const text = extractXaiText(json);
        if (text) return jsonMode ? safeJson(text) : text;
      } catch (err) {
        lastErr = err;
      }
    }
    if (lastErr) throw lastErr;
    return null;
  }

  async function callTavily(query, maxResults) {
    const apiKey = readKey(KEYS.tavily);
    if (!apiKey) return [];
    try {
      const json = await httpJson('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + apiKey
        },
        body: JSON.stringify({ query: query, max_results: maxResults || 5 })
      });
      return json.results || [];
    } catch (err) {
      console.warn('[StandaloneEngine] Tavily skipped:', err.message);
      return [];
    }
  }

  async function generateAccountIntel(query) {
    const parsed = parseDomain(query);
    const company = parsed.name;
    const domain = parsed.domain;

    const base = {
      name: company,
      domain: domain,
      industry: 'Technology',
      headcount: '—',
      revenue: '—',
      headquarters: '',
      description: '',
      incumbent: 'SwagUp / catalog promo',
      wedge: 'Direct custom knit vs catalog markup',
      painPoints: 'Catalog markup, slow turnaround, low keep-rate swag.',
      buyer: 'VP Marketing',
      buyerTitle: 'Economic Buyer',
      champion: 'Director Brand / People',
      championTitle: 'Champion',
      evaluator: 'Procurement Lead',
      evaluatorTitle: 'Evaluator',
      signals: [],
      logo: 'https://logo.clearbit.com/' + domain,
      source: 'On-device fallback',
      liveEnriched: false
    };

    try {
      const wiki = await fetchWikipedia(company);
      if (wiki) {
        if (wiki.name) base.name = wiki.name;
        if (wiki.description) base.description = wiki.description;
        if (wiki.logo) base.logo = wiki.logo;
        base.source = 'Wikipedia';
      }
    } catch (err) {
      console.warn('[StandaloneEngine] Wikipedia skipped:', err.message);
    }

    const tavilyHits = await callTavily(company + ' company overview latest news headquarters employees', 4);
    if (tavilyHits.length) {
      const snippet = tavilyHits.map(function (r) { return r.title + ': ' + (r.content || '').slice(0, 180); }).join('\n');
      if (!base.description) base.description = (tavilyHits[0].content || '').slice(0, 400);
      base.signals = tavilyHits.slice(0, 3).map(function (r) {
        return { type: 'news', text: r.title, date: 'Live' };
      });
      base.tavilyContext = snippet;
      base.source = 'Tavily + public web';
    }

    const intelPrompt =
      'You are an enterprise B2B sales intelligence engine. Research "' + company +
      '" (' + domain + '). Use live web search and current public knowledge.\n' +
      (base.description ? 'Known facts: ' + base.description + '\n' : '') +
      (base.tavilyContext ? 'Recent search snippets:\n' + base.tavilyContext + '\n' : '') +
      'Return ONLY JSON with this schema:\n' +
      '{\n' +
      '  "name": "Official company name",\n' +
      '  "domain": "' + domain + '",\n' +
      '  "industry": "Industry",\n' +
      '  "headcount": "Employee count like 12,400",\n' +
      '  "revenue": "Revenue like $4.2B",\n' +
      '  "headquarters": "City, Country",\n' +
      '  "description": "2-3 sentence company overview",\n' +
      '  "incumbent": "Likely merch/swag/gifting or CRM incumbent",\n' +
      '  "wedge": "One-line displacement wedge",\n' +
      '  "pain_points": ["pain 1", "pain 2", "pain 3"],\n' +
      '  "buying_signals": ["signal 1", "signal 2"],\n' +
      '  "economic_buyer": {"name": "Full Name", "title": "Title"},\n' +
      '  "champion": {"name": "Full Name", "title": "Title"},\n' +
      '  "evaluator": {"name": "Full Name", "title": "Title"},\n' +
      '  "custom_hook": "2-sentence cold open"\n' +
      '}';

    let ai = null;
    try {
      ai = await callXai(intelPrompt, { jsonMode: true, liveSearch: true });
      if (ai) base.source = 'xAI Grok + live web search';
    } catch (err) {
      console.warn('[StandaloneEngine] xAI skipped:', err.message);
    }
    if (!ai) {
      try {
        ai = await callGemini(intelPrompt, { jsonMode: true });
        if (ai) base.source = 'Gemini + device internet';
      } catch (err) {
        console.warn('[StandaloneEngine] Gemini skipped:', err.message);
      }
    }

    if (ai) {
      base.name = ai.name || base.name;
      base.domain = ai.domain || base.domain;
      base.industry = ai.industry || base.industry;
      base.headcount = ai.headcount || base.headcount;
      base.revenue = ai.revenue || base.revenue;
      base.headquarters = ai.headquarters || base.headquarters;
      base.description = ai.description || base.description;
      base.incumbent = ai.incumbent || ai.competitor_incumbent || base.incumbent;
      base.wedge = ai.wedge || base.wedge;
      if (Array.isArray(ai.pain_points) && ai.pain_points.length) {
        base.painPoints = ai.pain_points.join('; ');
      }
      if (Array.isArray(ai.buying_signals) && ai.buying_signals.length) {
        base.signals = ai.buying_signals.map(function (s) {
          return { type: 'signal', text: s, date: 'Live' };
        });
      }
      if (ai.economic_buyer) {
        base.buyer = ai.economic_buyer.name || base.buyer;
        base.buyerTitle = ai.economic_buyer.title || base.buyerTitle;
      }
      if (ai.champion) {
        base.champion = ai.champion.name || base.champion;
        base.championTitle = ai.champion.title || base.championTitle;
      }
      if (ai.evaluator) {
        base.evaluator = ai.evaluator.name || base.evaluator;
        base.evaluatorTitle = ai.evaluator.title || base.evaluatorTitle;
      }
      base.customHook = ai.custom_hook || '';
      base.liveEnriched = true;
    }

    return base;
  }

  async function generateCopy(account, channel, tone) {
    const acc = account || {};
    const prompt =
      'Write a ' + (tone || 'challenger') + ' ' + (channel || 'email') +
      ' for ' + (acc.buyer || 'the buyer') + ' (' + (acc.buyerTitle || 'economic buyer') +
      ') at ' + (acc.name || 'the account') + '.\n' +
      'Incumbent: ' + (acc.incumbent || 'catalog vendor') + '\n' +
      'Wedge: ' + (acc.wedge || 'direct manufacturer, higher keep rate') + '\n' +
      'Pain: ' + (acc.painPoints || '') + '\n' +
      'Return ONLY JSON: {"subject":"...","body":"..."}';
    try {
      const out = await callXai(prompt, { jsonMode: true });
      if (out && out.body) return out;
    } catch (e) {}
    try {
      const out = await callGemini(prompt, { jsonMode: true });
      if (out && out.body) return out;
    } catch (e) {}
    return null;
  }

  async function coachReply(account, question) {
    const acc = account || {};
    const prompt =
      'You are a live sales coach. Account: ' + (acc.name || 'Unknown') +
      '. Incumbent: ' + (acc.incumbent || 'unknown') +
      '. Wedge: ' + (acc.wedge || 'direct custom knit vs catalog markup') +
      '. Buyer: ' + (acc.buyer || '') + '.\n' +
      'Seller asked: "' + question + '"\n' +
      'Give a tight 3-5 sentence coaching answer they can use in the next 30 seconds.';
    try {
      const text = await callXai(prompt, { jsonMode: false });
      if (text) return text;
    } catch (e) {}
    try {
      const text = await callGemini(prompt, { jsonMode: false });
      if (text) return text;
    } catch (e) {}
    return 'For ' + (acc.name || 'this account') + ', lead with the ' +
      (acc.incumbent || 'incumbent') + ' weakness: ' + (acc.wedge || 'catalog markup and slow turnaround') +
      '. Open with a trap question about keep-rate, then offer a free 1-hour proof.';
  }

  window.StandaloneClientEngine = {
    KEYS: KEYS,
    isNativeApp: isNativeApp,
    hasAnyLiveKey: hasAnyLiveKey,
    getKeys: function () {
      return {
        gemini: readKey(KEYS.gemini),
        tavily: readKey(KEYS.tavily),
        xai: readKey(KEYS.xai)
      };
    },
    saveKeys: function (keys) {
      if (!keys) return;
      if (keys.gemini !== undefined) writeKey(KEYS.gemini, keys.gemini);
      if (keys.tavily !== undefined) writeKey(KEYS.tavily, keys.tavily);
      if (keys.xai !== undefined) writeKey(KEYS.xai, keys.xai);
    },
    parseDomain: parseDomain,
    generateAccountIntel: generateAccountIntel,
    generateCopy: generateCopy,
    coachReply: coachReply
  };
})();
