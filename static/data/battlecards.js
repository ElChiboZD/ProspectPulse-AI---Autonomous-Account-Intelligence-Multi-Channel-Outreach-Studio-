const BATTLECARDS_BY_PRESET = {
  sockclub: [
    {
      name: 'SwagUp / Swag Brokers & Distributors',
      tag: 'Merchandise · Swag Distributor / Broker',
      pitch: 'Pitches bundled swag boxes and warehousing catalogs, acting as a middleman broker between buyers and overseas factories.',
      them: [
        "Broker markup adds 30–50% extra cost to every item in the catalog.",
        "3 to 6-week turnaround times; rush production is heavily penalized.",
        "Generic disposable items (cheap pens, tote bags) with <10% retention.",
        "Design mockups take 2–4 business days with upfront commitment."
      ],
      us: [
        "Direct USA manufacturer (Austin HQ & North Carolina mill) — zero broker markup.",
        "Free 1-hour digital design proofs delivered in pixel-perfect vector format.",
        "5-day rapid turnaround with guaranteed event delivery dates.",
        "Custom-knit combed cotton with 95%+ wearable retention — worn for years.",
        "Low 30-pair minimum order quantity (MOQ)."
      ],
      trap: "What percentage of the swag items you sent last quarter are still being used today, and how much are you paying in broker markups for items that end up in landfills?",
      land: "SwagUp is convenient for bundling 10 different generic trinkets into one box. For high-impact standalone hero gifts that people genuinely wear and love, Sock Club wins on quality, speed, and direct mill pricing."
    },
    {
      name: '4imprint / Mass Promo Catalogs',
      tag: 'Merchandise · Generic Catalog Reseller',
      pitch: 'Massive 10,000+ item catalog reseller pitching high-volume cheap promotional items.',
      them: [
        "Overseas mass catalog reselling with zero proprietary knitting machines.",
        "Printed / sublimated socks that stretch, crack, and fade after 2 washes.",
        "Cheap disposable feel that dilutes premium brand equity at executive events.",
        "Complex setup fees, screen charges, and surprise freight costs."
      ],
      us: [
        "True Jacquard knit-in designs: pattern is woven directly into combed cotton threads.",
        "High-grade US-grown cotton spun in North Carolina with 50+ wash durability.",
        "Transparent all-inclusive pricing with free design iterations and no setup fees.",
        "Dedicated account team and in-house apparel designers."
      ],
      trap: "When you hand out printed promotional items at trade shows, does it represent your brand as a premium leader, or does it look like disposable giveaway clutter?",
      land: "4imprint is great when you need 5,000 $0.50 plastic pens for a festival. For corporate client gifting and VIP onboarding, premium custom-knit socks deliver 10x higher brand impressions."
    },
    {
      name: 'Custom Ink / Online Screenprinters',
      tag: 'Merchandise · Online Apparel & Screenprinting',
      pitch: 'Pitches online self-service design tools for custom t-shirts, hoodies, and basic apparel.',
      them: [
        "T-shirt and screenprinting focus; socks are outsourced third-party catalog addons.",
        "Limited custom knit capabilities (mostly printed blanks or basic stock colors).",
        "Slow design turnaround for complex corporate brand guidelines.",
        "High per-unit costs on non-apparel items."
      ],
      us: [
        "Specialized custom knitwear manufacturer with proprietary knitting machines.",
        "In-house design team creates pantone-matched proofs in under 60 minutes.",
        "Seamless turn-key delivery directly to event venues or employee homes."
      ],
      trap: "Is your team spending hours fiddling with online canvas tools, or would you rather have professional designers deliver ready-to-order custom knit concepts in under an hour?",
      land: "Custom Ink is king of screenprinted t-shirts. For specialized, high-retention corporate gifts, Sock Club's custom knit engineering is unmatched."
    },
    {
      name: 'Printful / Print-on-Demand (POD)',
      tag: 'Merchandise · Print on Demand Dropshipper',
      pitch: 'Pitches on-demand fulfillment for e-commerce stores with zero upfront inventory.',
      them: [
        "Heavy synthetic polyester sublimation: white lines appear when stretched.",
        "Expensive $16–$22+ single pair baseline costs.",
        "Slow individual production with unpredictable international shipping."
      ],
      us: [
        "Breathable 75% US-grown combed cotton with nylon and spandex blend.",
        "Volume tiering from $6.50–$12/pair with custom retail packaging included.",
        "Guaranteed 5-day rush production from North Carolina mill."
      ],
      trap: "Are your recipients experiencing stretched, faded polyester prints, or breathable combed cotton they actually wear every week?",
      land: "Printful is useful for zero-inventory single-item dropshipping. For corporate batches of 30–5,000+ pairs, Sock Club provides far superior retail quality and direct pricing."
    }
  ],
  zendesk: [
    {
      name: 'Salesforce Service Cloud',
      tag: 'Enterprise CRM / Platform Suite',
      pitch: 'Pitches Salesforce Customer 360 data unification as the all-in-one suite for sales, marketing, and customer support.',
      them: [
        "Total cost of ownership often reaches $300–$600/agent/mo once Digital Engagement, Voice, and Data Cloud licenses are added.",
        "Rollout takes 6–9+ months requiring expensive third-party implementation consultants ($50k–$150k+).",
        "Requires 2+ dedicated Salesforce administrators for ongoing workflow changes."
      ],
      us: [
        "Days-to-weeks rapid time-to-value with intuitive modern agent workspace.",
        "Transparent, predictable pricing with native omnichannel (Voice, WhatsApp, Chat, Email) included.",
        "Pre-trained autonomous AI agents that deflect 45%+ of volume on day one."
      ],
      trap: "Walk me through your full per-agent cost once Digital Engagement, Voice, Data Cloud, and dedicated admin headcount are factored in — and how many months until agents are fully ramped?",
      land: "If an enterprise is already 100% standardized on Sales Cloud and needs deep custom object customization, Salesforce is legitimate. For high-volume agile support teams, Zendesk delivers 3x faster time-to-value at half the TCO."
    },
    {
      name: 'Intercom (Fin AI)',
      tag: 'Conversational Support & Outcome AI',
      pitch: 'Pitches Fin AI agent charging $0.99 per resolution as the modern pay-per-outcome conversational support bot.',
      them: [
        "Cost scales WITH success: more deflection means an exponentially higher monthly invoice (~$5,000+ extra at 5k resolutions).",
        "Hybrid seat pricing + $0.99 resolution meter creates unpredictable billing volatility.",
        "Weaker high-volume complex multi-touch ticketing and SLA routing."
      ],
      us: [
        "Predictable, transparent platform licensing so your cost does not balloon as automation improves.",
        "Mature enterprise routing, SLA management, and multi-brand support for complex operations.",
        "Full AI agent suite included without punitive per-outcome meter spikes."
      ],
      trap: "At your monthly ticket volume, what does $0.99 per resolution total as deflection climbs from 30% to 60%, and how are you budgeting for that billing unpredictability?",
      land: "Fin is strong for low-volume, high-margin SaaS looking for instant turnkey chat bots. For high-volume omnichannel teams, Zendesk provides enterprise governance and cost predictability."
    }
  ],
  stripe: [
    {
      name: 'Adyen',
      tag: 'Global Enterprise Merchant Acquirer',
      pitch: 'Pitches single unified global acquiring platform for omnichannel point-of-sale and online payments for massive enterprises.',
      them: [
        "Strict merchant underwriting with high volume minimums ($500k+/mo); excludes fast-growing innovators.",
        "Complex legacy developer integration requiring bespoke implementation engineers.",
        "Limited built-in billing, subscription logic, and automated revenue recovery compared to Stripe Billing."
      ],
      us: [
        "Unmatched developer velocity with pre-built UI components (Stripe Elements & Link 1-click checkout).",
        "Adaptive Acceptance & AI Fraud Prevention (Radar) boosting card authorization rates by 3.8%+.",
        "Unified billing, invoicing, tax, and payouts in a single frictionless dashboard."
      ],
      trap: "How many developer hours are spent maintaining custom payment integrations and managing recurring billing logic vs leveraging automated AI authorization optimizations?",
      land: "Adyen is strong for massive global retailers with heavy physical in-store POS footprint. For modern online-first and platform businesses, Stripe delivers significantly higher conversion."
    }
  ],
  saas: [
    {
      name: 'Legacy Sales Databases (Apollo / ZoomInfo Alone)',
      tag: 'Static Sales Contact Repositories',
      pitch: 'Pitches access to massive databases of 200M+ contacts with email search and basic sequencing.',
      them: [
        "High data decay: 30%+ of static database records are outdated or departed employees within 6 months.",
        "Lacks real-time web intelligence, hiring surges, and recent event sponsorship radar.",
        "Encourages generic spray-and-pray outbound blasts with low 1-2% reply rates."
      ],
      us: [
        "Live real-time MCP pipeline: Gemini Search Grounding + Tavily live LinkedIn X-Ray queries active current employees right now.",
        "Dynamic multi-channel synthesis: generates role-tailored emails, LinkedIn InMail, and cold call phone scripts in < 5 seconds.",
        "Direct ROI value calculators embedded into every draft to prove economic urgency."
      ],
      trap: "How many hours per week do your reps waste verifying bounced emails from static databases and writing one-off personalized hooks from scratch?",
      land: "ZoomInfo and Apollo have great foundational data tables. ProspectPulse acts as the intelligent orchestration layer that verifies live current roles and writes tailored multi-channel sequences."
    }
  ]
};

const DECK_SLIDES = [
  {
    title: "1. The $1.2 Trillion Problem: Outbound Sales is Broken",
    bullets: [
      "Enterprise reps waste <strong>40+ minutes per account</strong> toggling between LinkedIn, Google News, ZoomInfo, CRM tabs, and spreadsheets — before writing a single line of outreach.",
      "90% of cold emails are <strong>generic and untriggered</strong>: no mention of recent news, competitor vulnerabilities, or role-specific pain points — resulting in <2% reply rates.",
      "Static sales databases (Apollo, ZoomInfo) suffer <strong>30%+ data decay</strong> within 6 months — reps are emailing people who left the company months ago.",
      "The average sales org loses <strong>$1,800+ per rep per week</strong> in productivity waste from manual research, dead contacts, and recycled templates.",
      "Meanwhile, buyers expect <strong>hyper-personalized, insight-led outreach</strong> that demonstrates you've done your homework — the bar has never been higher."
    ]
  },
  {
    title: "2. Introducing ProspectPulse AI: The Autonomous Account Intelligence Engine",
    bullets: [
      "<strong>One domain. Five seconds. Complete account dossier.</strong> — Enter any company domain and receive verified firmographics, live stakeholder mapping, competitor battlecards, and ready-to-send multi-channel outreach instantly.",
      "Built on a <strong>Multi-Agent MCP Architecture</strong> connecting Google Gemini 3.6 Flash (live search grounding), Sumble Org API (verified headcount & firmographics), and Tavily AI (real-time LinkedIn X-Ray discovery).",
      "Not a static database — a <strong>living intelligence pipeline</strong> that queries the real-time web on every search to guarantee current data, current roles, and current triggers.",
      "Designed for <strong>enterprise AEs, SDRs, and RevOps teams</strong> who need to prospect smarter, not harder — across any industry vertical and any product line.",
      "Deployable as a <strong>self-hosted Python application</strong> with zero external SaaS dependencies — your data never leaves your infrastructure."
    ]
  },
  {
    title: "3. Live Architecture: How the Intelligence Pipeline Works",
    bullets: [
      "<strong>Layer 1 — Gemini 3.6 Flash (Google Search Grounding):</strong> Real-time news extraction, leadership changes, funding rounds, earnings calls, and executive trigger events — grounded directly from Google's live search index.",
      "<strong>Layer 2 — Sumble v9 Org API:</strong> Verified employee headcount, industry taxonomy, technology stack detection, tracked job postings, and organizational hierarchy — updated in real-time.",
      "<strong>Layer 3 — Tavily AI Engine:</strong> Strict LinkedIn X-Ray persona discovery with current-role verification, filtering out departed employees, role changes, and stale profiles.",
      "<strong>Layer 4 — Parallel Execution Engine:</strong> All three data sources execute concurrently via ThreadPoolExecutor with connection-pooled HTTP sessions — delivering complete intelligence in under 5 seconds.",
      "<strong>Layer 5 — Intelligent Caching:</strong> LRU domain cache prevents redundant API calls — repeat lookups return instantly at zero cost."
    ]
  },
  {
    title: "4. The 6-Step Workflow: From Research to Revenue",
    bullets: [
      "<strong>Step 1 — Account Radar:</strong> Enter a domain or upload a CSV territory list. ProspectPulse auto-extracts firmographics, brand palette, company logo, and propensity-to-buy intent score (0–100).",
      "<strong>Step 2 — Intel & Buying Committee:</strong> Live stakeholder tiering with verified names, titles, emails, and LinkedIn URLs. Enterprise org hierarchy tree for multi-threading. Interactive competitor pricing matrix with unit-cost slider.",
      "<strong>Step 3 — Deal Autopsy & ESG:</strong> Win probability forecast, ghosting risk index, contract displacement timing, Scope-3 carbon diversion math, and 5-Whys executive discovery diagnostics.",
      "<strong>Step 4 — Multi-Channel Studio:</strong> AI-generated Day 0 cold email, 300-char LinkedIn InMail, cold call phone script, and AI voicemail — all with real-time spam auditing and 1-click executive tone polishing.",
      "<strong>Step 5 — Mutual Action Plan:</strong> Interactive 4-milestone execution roadmap with digital spec sign-off, deal size estimator, and 1-click CRM dispatcher (Salesforce, HubSpot, Outreach.io, Salesloft).",
      "<strong>Step 6 — AI Roleplay & Live Whisperer:</strong> Full-duplex voice call simulator with Gemini AI responding in real-time. Sub-150ms coaching cues for handling price, gatekeepers, and competitive objections."
    ]
  },
  {
    title: "5. Complete Feature Arsenal: 29 Integrated Capabilities",
    bullets: [
      "<strong>Real-Time Voice Engine:</strong> Spoken cold call pitches, AI voicemails, and full-duplex live call simulation with animated waveforms and playback speed controls.",
      "<strong>Photorealistic Proof Studio:</strong> Auto-generates branded product proofs using the prospect's extracted logo and hex brand pantones — embeddable directly into outreach.",
      "<strong>1-Click Direct Dispatch:</strong> Gmail compose with pre-filled To/Subject/Body, LinkedIn profile web opener, CRM auto-pilot into Salesforce/HubSpot/Outreach.io/Salesloft with webhook inspection.",
      "<strong>Live Deliverability Auditor:</strong> Real-time spam trigger scanning, mobile read time modeling, reading grade analysis, and 1-click Auto-Clean that upgrades copy to consultative executive vocabulary (99.4% Primary Inbox placement).",
      "<strong>45-Second Video Teleprompter:</strong> Auto-scrolling pitch teleprompter with reading timer and speed controls for recording async video pitches (Loom / Vidyard). Includes webcam studio with lower-third branding overlay.",
      "<strong>Executive PDF Dossier:</strong> 1-click multi-page print-ready briefing with firmographics, verified contacts, battlecards, ROI models, and full outreach sequences — ready for pre-call prep or CRO review."
    ]
  },
  {
    title: "6. Competitive Differentiation: Why ProspectPulse Wins",
    bullets: [
      "<strong>vs. Apollo / ZoomInfo:</strong> They sell static database snapshots with 30%+ decay. We query the live web on every search — zero stale data, zero bounced emails to departed employees.",
      "<strong>vs. Outreach.io / Salesloft:</strong> They sequence generic templates. We generate role-specific, trigger-aware, competitor-informed sequences with embedded ROI calculations — not mail merge.",
      "<strong>vs. ChatGPT / Copilot for Sales:</strong> They generate generic text without live data. We orchestrate 3+ real-time APIs (Gemini, Sumble, Tavily) into verified intelligence with real contacts, real news, and real numbers.",
      "<strong>vs. Clay / Lusha / Seamless.AI:</strong> They provide enrichment layers requiring manual assembly. We deliver an end-to-end workflow from research to ready-to-send multi-channel cadences in a single interface.",
      "<strong>Moat:</strong> Multi-agent MCP orchestration with live search grounding is architecturally impossible to replicate with prompt engineering alone — this is a systems engineering advantage."
    ]
  },
  {
    title: "7. Quantified ROI: The Business Case for ProspectPulse",
    bullets: [
      "<strong>Time Saved:</strong> 40 minutes reclaimed per account × 20 accounts/week = <strong>13+ hours/rep/week</strong> returned to selling activities.",
      "<strong>Productivity Value:</strong> At a fully-loaded AE cost of $150/hr, that's <strong>$1,950+ per rep per week</strong> in recovered productivity — $101,400/year per rep.",
      "<strong>Reply Rate Lift:</strong> Trigger-aware, competitor-informed personalization drives <strong>3–5x higher reply rates</strong> vs. generic templates (from ~2% to 8–12%).",
      "<strong>Pipeline Acceleration:</strong> Verified live contacts + pre-built multi-channel sequences = <strong>40% faster time-to-first-meeting</strong> and reduced no-show rates.",
      "<strong>Data Accuracy:</strong> Real-time verification eliminates the <strong>30% bounce rate</strong> from stale database records — every email hits an active inbox.",
      "<strong>Payback Period:</strong> At $X/seat/month, ProspectPulse pays for itself in <strong>under 48 hours</strong> of recovered rep time."
    ]
  },
  {
    title: "8. Ideal Customer Profile: Who Buys ProspectPulse",
    bullets: [
      "<strong>Primary Buyer:</strong> VP of Sales / CRO at B2B companies with 10–500+ AEs running outbound prospecting motions.",
      "<strong>Secondary Buyer:</strong> Head of Sales Development / SDR Manager managing high-volume outbound teams with tight ramp KPIs.",
      "<strong>Tertiary Buyer:</strong> RevOps / Sales Enablement leaders evaluating tech stack consolidation and rep productivity tools.",
      "<strong>Industry Sweet Spots:</strong> SaaS, FinTech, Professional Services, Staffing, Managed IT, and any vertical with complex B2B buying committees.",
      "<strong>Trigger Events:</strong> New CRO hire, sales team expansion (10+ open AE reqs), missed quota for 2+ consecutive quarters, incumbent database contract renewal in 90 days.",
      "<strong>Deal Size:</strong> $15K–$250K ARR depending on team size and enterprise customization requirements."
    ]
  },
  {
    title: "9. Security, Privacy & Deployment Architecture",
    bullets: [
      "<strong>Self-Hosted Deployment:</strong> 100% on-premise or private cloud — your prospect data, API keys, and outreach history never touch third-party SaaS servers.",
      "<strong>API Key Isolation:</strong> All external API credentials (Gemini, Tavily, Sumble) are stored in local .env files with zero cloud transmission.",
      "<strong>No Training on Your Data:</strong> Unlike ChatGPT-based tools, ProspectPulse uses API-only Gemini calls with explicit data usage policies — your prospect intelligence is never used to train foundation models.",
      "<strong>SOC 2 Ready Architecture:</strong> Stateless request pipeline with LRU-bounded caching (max 500 domains), no persistent PII storage, and full audit logging.",
      "<strong>Enterprise SSO & RBAC:</strong> Roadmap includes SAML/OIDC integration, role-based access controls, and team-level API quota management.",
      "<strong>Open Source Core:</strong> MIT-licensed codebase enables full security audit, custom modification, and internal deployment review by your InfoSec team."
    ]
  },
  {
    title: "10. Next Steps: Let's Build Your Pipeline Together",
    bullets: [
      "<strong>🔥 Live Demo (Right Now):</strong> Enter any target account domain in the search bar and watch ProspectPulse generate a complete account dossier with verified contacts and ready-to-send outreach in under 5 seconds.",
      "<strong>📊 Free Pilot Program:</strong> 14-day free pilot for up to 5 reps — measure time saved, reply rate lift, and pipeline velocity against your current stack.",
      "<strong>🔧 Custom Integration:</strong> We'll configure ProspectPulse with your CRM (Salesforce, HubSpot), sequencer (Outreach.io, Salesloft), and internal battlecard library within 48 hours.",
      "<strong>📈 ROI Guarantee:</strong> If your team doesn't save 10+ hours per rep per week within the first 30 days, the pilot is on us — zero risk.",
      "<strong>📞 Contact:</strong> Schedule a technical deep-dive with our Solutions Architecture team to map ProspectPulse to your specific outbound workflow and tech stack.",
      "<strong>🚀 Built by @ElChibo</strong> — Engineered for enterprise sales teams who refuse to lose deals to bad data and generic outreach."
    ]
  }
];
