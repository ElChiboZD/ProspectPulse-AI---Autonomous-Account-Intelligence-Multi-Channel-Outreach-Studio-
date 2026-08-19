const BATTLECARDS_BY_PRESET = {
  zendesk: [
    {
      name: 'Salesforce Service Cloud & Agentforce',
      tag: 'Enterprise CRM / Platform Suite',
      pitch: 'Pitches Salesforce Customer 360 data unification as the all-in-one suite for sales, marketing, and customer support with Agentforce add-on bots.',
      them: [
        "Total cost of ownership often reaches $300–$600/agent/mo once Digital Engagement, Voice, WFM, and Data Cloud licenses are added.",
        "Rollout takes 6–9+ months requiring expensive third-party implementation consultants ($50k–$150k+).",
        "Requires 2+ dedicated certified Salesforce administrators for basic ongoing workflow changes and queue edits.",
        "Agentforce requires expensive Data Cloud credits and extensive custom prompt engineering to function."
      ],
      us: [
        "Days-to-weeks rapid time-to-value with intuitive modern Agent Workspace purpose-built for support.",
        "Transparent, predictable pricing with native omnichannel (Voice, WhatsApp, Chat, Email) included out-of-the-box.",
        "Pre-trained autonomous CX AI agents deflecting 45%+ of volume on day one with zero prompt plumbing.",
        "Native Workforce Management (Tymeshift) and 100% Quality Assurance scoring (Klaus) in a unified suite."
      ],
      trap: "Walk me through your full per-agent cost once Digital Engagement, Voice, Data Cloud credits, and dedicated admin headcount are factored in — and how many months until agents are fully ramped?",
      land: "If an enterprise is already 100% standardized on Sales Cloud and needs deep custom schema architecture across sales pipelines, Salesforce is legitimate. For high-volume agile support teams, Zendesk delivers 3x faster time-to-value at half the TCO."
    },
    {
      name: 'Intercom (Fin AI)',
      tag: 'Conversational Support & Metered AI',
      pitch: 'Pitches Fin AI bot charging $0.99 per resolution as the modern pay-per-outcome conversational support tool.',
      them: [
        "Cost scales WITH success: more deflection means an exponentially higher monthly invoice (~$5,000–$15,000+ extra at scale).",
        "Hybrid seat pricing + $0.99 resolution meter creates severe billing unpredictability and budget anxiety.",
        "Weaker high-volume complex multi-touch ticketing, SLA governance, and enterprise audit trails.",
        "Lacks native enterprise Workforce Management (WFM) and automated 100% QA conversation scoring."
      ],
      us: [
        "Predictable, transparent platform licensing so your cost does not balloon as your automation rates improve.",
        "Mature enterprise routing, SLA management, and multi-brand support built for millions of tickets.",
        "Full AI agent suite (Zendesk AI + Forethought) included without punitive per-outcome meter spikes.",
        "True omnichannel coverage including native voice, SMS, email, and social messaging in one workspace."
      ],
      trap: "At your monthly ticket volume, what does $0.99 per resolution total as deflection climbs from 30% to 60%, and how are you budgeting for that billing unpredictability at renewal?",
      land: "Fin is strong for low-volume, high-margin SaaS looking for instant turnkey chat bots. For high-volume omnichannel teams with complex routing and SLAs, Zendesk provides enterprise governance and cost predictability."
    },
    {
      name: 'Decagon / Sierra / Ada (Point AI Bots)',
      tag: 'Point-Solution Autonomous AI Bots',
      pitch: 'Pitches standalone generative AI agent bots that sit in front of customer support to handle tier-1 chat.',
      them: [
        "Point-solution silos requiring maintenance of two separate tech stacks, two vendor contracts, and two admin portals.",
        "Complex custom integration work to pass context between the bot and the human helpdesk without dropped data.",
        "Expensive six-figure upfront annual platform fees on top of existing helpdesk seat costs.",
        "Lacks integrated agent tooling, post-resolution QA, and workforce forecasting."
      ],
      us: [
        "End-to-end unified CX ecosystem: autonomous AI deflection, agent copilot, ticketing, WFM, and QA in one platform.",
        "Seamless bot-to-human escalation with complete conversational memory and customer history preserved.",
        "Forethought by Zendesk provides helpdesk-agnostic multi-agent autonomy with Autoflows and live API actions.",
        "Single vendor relationship, lower total software spend, and continuous unified product updates."
      ],
      trap: "How are you handling bot-to-human escalation context when the customer moves from chat to email or voice, and how much are you spending maintaining two distinct CX platforms?",
      land: "Point AI vendors offer slick chat demos. But when you need enterprise omnichannel context, real-time agent handoffs, and operational visibility, Zendesk + Forethought delivers complete end-to-end resolution."
    },
    {
      name: 'Freshworks / Freshdesk',
      tag: 'Mid-Market / SMB Support Software',
      pitch: 'Pitches low-cost SMB ticketing software with bundled sales and marketing tools.',
      them: [
        "Lacks enterprise-scale omnichannel routing and real-time intraday queue management.",
        "Limited custom reporting (Explore equivalent) and rigid data export capabilities.",
        "Shallow native Workforce Management and lack of automated 100% QA scoring.",
        "High churn and performance degradation when ticket volume exceeds 50k tickets/month."
      ],
      us: [
        "Proven enterprise scalability powering global giants like Uber, Airbnb, and Shopify.",
        "Deep custom analytics in Zendesk Explore with custom calculated attributes and live dashboards.",
        "Enterprise WFM (Tymeshift) with automated AI forecasting and shift scheduling.",
        "1,500+ pre-built enterprise marketplace apps and open Sunshine API platform."
      ],
      trap: "As your support team scales past 30 agents, how are you handling complex SLA tiers, intraday workforce adherence, and custom BI reporting without hitting Freshdesk's platform limits?",
      land: "Freshdesk is a solid starter tool for 5-person teams with simple email needs. For growing organizations that require omnichannel SLAs, robust analytics, and enterprise AI, Zendesk is the gold standard."
    },
    {
      name: 'ServiceNow CSM (Customer Service Management)',
      tag: 'ITSM Platform / Enterprise Service Management',
      pitch: 'Pitches enterprise workflow engine connecting customer service to internal IT and engineering back-office teams.',
      them: [
        "Heavy legacy UI designed for IT ticket dispatchers, resulting in slow agent ramp times and high friction.",
        "Astronomical implementation costs ($150k–$300k+) and heavy ongoing ServiceNow developer overhead.",
        "Poor native modern consumer messaging (WhatsApp, Instagram, Apple Messages) experience.",
        "Clunky knowledge base and customer self-service portal compared to modern help centers."
      ],
      us: [
        "Modern, agent-friendly workspace that minimizes clicks and reduces handle time by 25–40%.",
        "Fast consumer-grade messaging and conversational channels out of the box.",
        "Deploy in weeks with no specialized ServiceNow developer certifications required.",
        "Substantially lower licensing and operational overhead."
      ],
      trap: "How much are you spending on ServiceNow specialized developers just to build new customer-facing routing flows, and what is your average agent onboarding time?",
      land: "ServiceNow is unmatched for internal ITIL service desks. But for external customer-facing CX where speed, empathy, and omnichannel delight matter, Zendesk provides a vastly superior customer experience."
    }
  ],
  forethought: [
    {
      name: 'Decagon / Sierra (Point AI Bots)',
      tag: 'Point-Solution Generative AI Agents',
      pitch: 'Pitches bespoke LLM voice/chat agent bots requiring custom engineering builds.',
      them: [
        "Requires heavy custom Python engineering and bespoke prompt maintenance for every workflow change.",
        "Expensive $80k–$150k+ upfront platform minimum commitments before seeing real deflection.",
        "Lacks pre-trained customer support data models; cold start requires months of manual data grooming.",
        "Disconnect between bot conversations and back-office human agent queue management."
      ],
      us: [
        "Autoflows: build, test, and adapt complex resolution logic in plain natural language with zero code.",
        "Helpdesk-agnostic (plugs directly into Zendesk, Salesforce, Freshdesk, ServiceNow in under 30 days).",
        "Pre-trained on millions of CX interactions with instant 90%+ accurate Triage and 98% resolution on Solve.",
        "Verified 15x ROI with proven case studies (Fetch Rewards 90% deflection, Cotopaxi 168% ROI)."
      ],
      trap: "When product policies change, does your non-technical CX ops team update workflows in natural language, or do you have to wait for an external prompt engineer to push updates?",
      land: "Decagon and Sierra are exciting startups. Forethought provides enterprise-grade stability, natural language Autoflows, and a complete multi-agent suite (Solve, Triage, Assist, Discover, QA) backed by Zendesk."
    },
    {
      name: 'Intercom (Fin AI)',
      tag: 'Conversational Support & Metered AI',
      pitch: 'Pitches Fin AI charging $0.99 per resolution for chat support deflection.',
      them: [
        "Penalizes your efficiency: as your team successfully deflects more tickets, your software invoice spikes.",
        "Limited to chat-centric workflows; weaker on complex multi-paragraph email tickets and voice triage.",
        "Lacks an Assist Agent copilot that learns from historical human resolutions inside the agent workspace."
      ],
      us: [
        "Outcome-based transparent pricing without meter shock as deflection scales past 50%.",
        "True omnichannel AI resolving both real-time chat AND complex async email / voice tickets.",
        "Multi-Agent architecture: Solve handles customers, Assist empowers human reps, Discover fixes knowledge gaps, and QA grades 100% of tickets."
      ],
      trap: "If your support team deflects 10,000 tickets during peak season, how does adding $9,900 in unbudgeted Fin meter fees impact your operational margins?",
      land: "Fin is great for instant chat-only FAQ deflection. Forethought is a comprehensive multi-agent enterprise platform that automates email, chat, routing, and quality assurance."
    },
    {
      name: 'Salesforce Agentforce',
      tag: 'Enterprise CRM Add-on Bot',
      pitch: 'Pitches autonomous AI agents built on Salesforce Data Cloud and Atlas Reasoning Engine.',
      them: [
        "Requires massive Data Cloud infrastructure prerequisites and expensive per-conversation credit meters.",
        "Locked strictly into the Salesforce ecosystem — cannot easily be deployed on heterogeneous stacks.",
        "High complexity requiring specialized Salesforce developers and systems integrators to configure."
      ],
      us: [
        "Live in under 30 days with zero database re-architecting or Data Cloud prerequisite fees.",
        "Helpdesk-agnostic: operates seamlessly across Salesforce, Zendesk, Freshdesk, or custom internal systems.",
        "Custom Actions execute real-time transactional API calls (refunds, order updates) effortlessly."
      ],
      trap: "What are your total Data Cloud and credit consumption costs projected to be once Agentforce is handling all tier-1 volume across channels?",
      land: "Agentforce is a compelling vision for organizations completely locked into Salesforce Data Cloud. Forethought provides immediate, helpdesk-agnostic generative AI with zero consultant overhead."
    },
    {
      name: 'Ada Support (Legacy Intent Trees)',
      tag: 'Rule-Based & Hybrid Chatbot',
      pitch: 'Pitches automated CX platform with conversational AI and generative routing.',
      them: [
        "Legacy architecture rooted in rigid intent decision trees that require tedious ongoing maintenance.",
        "Brittle bot flows break when customers phrase inquiries in non-standard ways.",
        "Lacks native back-office Browser Agent to automate internal legacy tools without APIs."
      ],
      us: [
        "Pure Generative AI understanding complex customer intent with dynamic Autoflow generation.",
        "Browser Agent enables automation across legacy back-office tools that lack REST APIs.",
        "Proven 55% reduction in first response time and up to 98% resolution accuracy."
      ],
      trap: "How many hours per month does your team spend building and repairing branching decision trees in Ada when new products or policies launch?",
      land: "Ada was a pioneer in rule-based chatbots. Forethought represents the next-generation autonomous multi-agent architecture with natural language logic and self-healing knowledge discovery."
    }
  ],
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
