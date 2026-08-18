/**
 * ProspectPulse AI - Mobile Standalone Intelligence Engine
 * Intercepts fetch calls and serves local data for offline/native mobile usage.
 */

window.ProspectPulseNative = true;

const ORIGINAL_FETCH = window.fetch;

// Helper to simulate network delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Mock Data Storage
const MOCK_COMPANIES = {
  'lululemon.com': {
    name: 'Lululemon Athletica',
    domain: 'lululemon.com',
    industry: 'Retail / Apparel',
    headcount: '29000',
    revenue: '$8.1B',
    techStack: ['Salesforce', 'Shopify Plus', 'AWS', 'Snowflake'],
    painPoints: ['Supply chain visibility', 'Omnichannel personalization at scale', 'Data siloing between retail and e-comm'],
    competitorIncumbent: 'Nike, Under Armour'
  },
  'uber.com': {
    name: 'Uber Technologies',
    domain: 'uber.com',
    industry: 'Transportation / Tech',
    headcount: '32000',
    revenue: '$31.8B',
    techStack: ['Oracle', 'GCP', 'Kafka', 'React'],
    painPoints: ['Driver retention', 'Regulatory compliance', 'Real-time routing optimization'],
    competitorIncumbent: 'Lyft'
  },
  'openai.com': {
    name: 'OpenAI',
    domain: 'openai.com',
    industry: 'Artificial Intelligence',
    headcount: '700',
    revenue: '$1.3B (Est)',
    techStack: ['Azure', 'PyTorch', 'Kubernetes', 'Ray'],
    painPoints: ['Compute cost optimization', 'Enterprise compliance constraints', 'Model latency'],
    competitorIncumbent: 'Anthropic, Google DeepMind'
  },
  'snowflake.com': {
    name: 'Snowflake',
    domain: 'snowflake.com',
    industry: 'Data Cloud / Software',
    headcount: '5800',
    revenue: '$2.06B',
    techStack: ['AWS', 'Azure', 'GCP', 'Java'],
    painPoints: ['Customer cloud cost anxiety', 'Sales cycle length', 'Marketplace adoption'],
    competitorIncumbent: 'Databricks, AWS Redshift'
  },
  'nike.com': {
    name: 'Nike',
    domain: 'nike.com',
    industry: 'Retail / Apparel',
    headcount: '79000',
    revenue: '$46.7B',
    techStack: ['SAP', 'AWS', 'Adobe Experience Cloud', 'Snowflake'],
    painPoints: ['DTC transition friction', 'Inventory forecasting', 'Counterfeit protection'],
    competitorIncumbent: 'Adidas, Lululemon'
  },
  'apple.com': {
    name: 'Apple',
    domain: 'apple.com',
    industry: 'Consumer Electronics / Software',
    headcount: '164000',
    revenue: '$394.3B',
    techStack: ['Swift', 'Objective-C', 'AWS', 'GCP'],
    painPoints: ['Supply chain diversification', 'Services revenue growth', 'Generative AI integration'],
    competitorIncumbent: 'Samsung, Google, Microsoft'
  },
  'stripe.com': {
    name: 'Stripe',
    domain: 'stripe.com',
    industry: 'Fintech',
    headcount: '7000',
    revenue: '$14.3B',
    techStack: ['Ruby', 'Go', 'AWS', 'React'],
    painPoints: ['Enterprise margin compression', 'Global regulatory complexity', 'Fraud prevention at scale'],
    competitorIncumbent: 'Adyen, Braintree, PayPal'
  }
};

function getCompanyData(query) {
    const q = (query || '').toLowerCase();
    // find matching domain
    let match = Object.values(MOCK_COMPANIES).find(c => c.domain.includes(q) || c.name.toLowerCase().includes(q));
    
    if (!match) {
        // dynamic heuristics
        match = {
            name: q ? (q.charAt(0).toUpperCase() + q.slice(1) + ' Inc') : 'Acme Corp',
            domain: q ? (q + '.com') : 'acme.com',
            industry: 'Technology',
            headcount: '100-500',
            revenue: '$10M-$50M',
            techStack: ['Salesforce', 'AWS', 'React', 'Node.js'],
            painPoints: ['Scaling infrastructure', 'Sales productivity', 'Data integration'],
            competitorIncumbent: 'Legacy Solutions'
        };
    }
    
    return {
        dossier: {
            ...match,
            summary: `${match.name} is a key player in ${match.industry}. Currently facing challenges with ${match.painPoints[0].toLowerCase()}.`
        }
    };
}

// Fetch Interceptor
window.fetch = async function(...args) {
    let [resource, config] = args;
    
    // Convert Request object to string if necessary
    const url = typeof resource === 'string' ? resource : resource.url;
    
    // Only intercept /api/ calls
    if (!url.includes('/api/')) {
        return ORIGINAL_FETCH(...args);
    }

    await delay(600); // Simulate network latency

    const method = (config?.method || 'GET').toUpperCase();
    let body = {};
    if (config?.body && typeof config.body === 'string') {
        try {
            body = JSON.parse(config.body);
        } catch (e) {
            console.warn('[MobileEngine] Failed to parse request body', e);
        }
    }

    const createResponse = (data, status = 200) => {
        return new Response(JSON.stringify(data), {
            status,
            headers: { 'Content-Type': 'application/json' }
        });
    };

    try {
        // 1. Search / Dossier
        if (url.includes('/api/search')) {
            let query = '';
            if (method === 'GET') {
                try {
                    query = new URL(url, window.location.origin).searchParams.get('q');
                } catch (e) {
                    // Fallback for relative URLs
                    const queryParams = url.split('?')[1];
                    if (queryParams) {
                        const params = new URLSearchParams(queryParams);
                        query = params.get('q');
                    }
                }
            } else {
                query = body.query || body.domain;
            }
            
            // Save to history
            if (query) {
                const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
                if (!history.includes(query)) {
                    history.unshift(query);
                    localStorage.setItem('searchHistory', JSON.stringify(history.slice(0, 50)));
                }
            }
            return createResponse(getCompanyData(query));
        }

        // 2. Deep Dive & Signals
        if (url.includes('/api/deep-dive') || url.includes('/api/signals')) {
            return createResponse({
                signals: [
                    { type: 'hiring', text: 'Recently opened 5 roles for VP of Revenue Operations', date: '2 days ago' },
                    { type: 'executive_move', text: 'New CMO joined from competitor', date: '1 week ago' },
                    { type: 'wedge', text: 'Current incumbent contract expiring in 4 months', date: 'Just now' }
                ]
            });
        }

        // 3. Generate & Tone Rewriter
        if (url.includes('/api/generate') || url.includes('/api/tone-rewriter')) {
            const repName = body.repName || 'Account Executive';
            return createResponse({
                emails: {
                    executive: `Hi,\n\nNoticed the strategic shift towards [Initiative] in your recent earnings call. I work with leaders like you to drive predictable ROI.\n\nBest,\n${repName}`,
                    challenger: `Most leaders in your space get [Pain Point] wrong. Here's how to fix it before Q4.\n\nBest,\n${repName}`,
                    punchy: `Quick question - are you still using [Incumbent] for [Process]? Might be time for an upgrade.\n\nCheers,\n${repName}`,
                    humorous: `I was going to write a long email, but realized you're probably fighting fires right now. So here's the TL;DR: we can solve [Pain Point].\n\nBest,\n${repName}`
                }
            });
        }

        // 4. Reply Copilot
        if (url.includes('/api/reply-copilot')) {
            const text = (body.text || '').toLowerCase();
            let type = 'brush_off';
            if (text.includes('budget') || text.includes('expensive')) type = 'budget_freeze';
            else if (text.includes('competitor') || text.includes('already use')) type = 'competitor_incumbent';
            else if (text.includes('later') || text.includes('next quarter')) type = 'latent_interest';

            return createResponse({
                classification: type,
                strategies: [
                    { name: 'The Pivot', copy: "I completely understand. If we could prove a 3x ROI within 30 days, would it make sense to carve out a pilot?" },
                    { name: 'The Empathy Push', copy: "Makes total sense. A lot of our best customers said the exact same thing before they saw how we handle [Specific Pain]." },
                    { name: 'The Soft Close', copy: "Fair enough. Would you be open to me circling back in Q3 when things settle?" }
                ]
            });
        }

        // 5. Deal Room
        if (url.includes('/api/dealroom/generate')) {
            const id = 'dr_' + Math.random().toString(36).substr(2, 9);
            const dealRoomData = {
                id,
                company: body.company || 'Acme Corp',
                roi: '$1.2M',
                phases: ['Discovery', 'Pilot', 'Rollout'],
                colorway: '#3b82f6'
            };
            localStorage.setItem(`dealroom_${id}`, JSON.stringify(dealRoomData));
            return createResponse(dealRoomData);
        }
        if (url.includes('/api/dealroom/')) {
            const match = url.match(/\/api\/dealroom\/(dr_\w+)/);
            if (match) {
                const data = localStorage.getItem(`dealroom_${match[1]}`);
                if (data) return createResponse(JSON.parse(data));
            }
            return createResponse({ error: 'Not found' }, 404);
        }

        // 6. Multithread
        if (url.includes('/api/multithread/generate')) {
            return createResponse({
                riskScore: 65, // Single-Thread Risk Gauge score
                committee: [
                    { role: 'Champion', title: 'VP of Operations', status: 'Engaged' },
                    { role: 'Economic Buyer', title: 'CFO', status: 'Unknown' },
                    { role: 'Evaluator', title: 'Director of IT', status: 'Skeptical' },
                    { role: 'Gatekeeper', title: 'Executive Assistant', status: 'Blocked' }
                ]
            });
        }

        // 7. Voice Arena
        if (url.includes('/api/voice-arena/turn')) {
            const reply = "I'm not sure we have the budget for this right now. Can you prove the ROI?";
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(reply);
                window.speechSynthesis.speak(utterance);
            }
            return createResponse({ audioText: reply });
        }

        // 8. Auth, History, Profile, Feedback
        if (url.includes('/api/auth/save-profile')) {
            localStorage.setItem('userProfile', JSON.stringify(body));
            return createResponse({ success: true });
        }
        if (url.includes('/api/auth/profile')) {
            const profile = JSON.parse(localStorage.getItem('userProfile') || '{"name":"Rep"}');
            return createResponse(profile);
        }
        if (url.includes('/api/history')) {
            const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
            return createResponse(history);
        }
        if (url.includes('/api/feedback')) {
            if (method === 'POST') {
                const feedback = JSON.parse(localStorage.getItem('appFeedback') || '[]');
                feedback.push(body);
                localStorage.setItem('appFeedback', JSON.stringify(feedback));
                return createResponse({ success: true });
            } else {
                return createResponse(JSON.parse(localStorage.getItem('appFeedback') || '[]'));
            }
        }

        // Fallback for unknown /api/
        console.warn(`[MobileEngine] Unhandled mock route: ${url}`);
        return createResponse({ fallback: true, message: 'Mock engine handled request' });

    } catch (err) {
        console.error(`[MobileEngine] Error processing ${url}:`, err);
        return createResponse({ error: 'Internal Mock Error' }, 500);
    }
};

// Dispatch ready event
document.dispatchEvent(new CustomEvent('prospectpulse:native-ready'));
console.log('ProspectPulse Mobile Standalone Engine initialized.');
