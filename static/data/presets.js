const PROFILE_PRESETS = {
  zendesk: {
    type: 'cx',
    companyName: "Zendesk",
    productName: "Zendesk Omnichannel Suite, AI Agents, WFM & QA",
    valueProp: "Unified omnichannel CX platform (Support, Guide, Messaging, Talk, Explore) with Zendesk AI, Workforce Management (Tymeshift), Quality Assurance (Klaus), and Forethought AI Agents deflecting 45%+ volume",
    differentiator: "Days-to-weeks rapid time-to-value vs 9-month Salesforce consultant bloat; pre-trained CX AI with native WFM, QA, and 1,500+ ecosystem integrations",
    senderName: "Travis · Enterprise Account Executive at Zendesk",
    badge: "🎧 Zendesk (Suite, AI, WFM & QA)"
  },
  forethought: {
    type: 'cx',
    companyName: "Forethought by Zendesk",
    productName: "Forethought Autonomous AI Agents (Solve, Triage, Assist, Discover, QA)",
    valueProp: "Generative AI multi-agent platform resolving up to 98% of tier-1 support across chat, email, and voice without ripping out your existing helpdesk",
    differentiator: "Helpdesk-agnostic (works on Zendesk, Salesforce, Freshdesk), natural language Autoflows, real-time API Custom Actions, and verified 15x ROI",
    senderName: "Travis · Generative AI Specialist at Forethought by Zendesk",
    badge: "🤖 Forethought (AI Agents by Zendesk)"
  },
  sockclub: {
    type: 'swag',
    companyName: "Sock Club",
    productName: "Custom-Knit Branded Socks & Corporate Gifting",
    valueProp: "USA-knitted socks with free 1-hour digital proofs, 5-day turnaround, and 95%+ wearable retention",
    differentiator: "Direct USA manufacturer, knit-in woven designs (no fading print), free mockups in 1 hour",
    senderName: "Travis · Enterprise Account Executive at Sock Club",
    badge: "🧦 Sock Club (Direct USA Mill)"
  },
  stripe: {
    type: 'saas',
    companyName: "Stripe",
    productName: "Stripe Global Payments & Billing Engine",
    valueProp: "Global financial infrastructure increasing authorization rates by 3.8% with automated revenue recovery",
    differentiator: "Adaptive Acceptance AI algorithms, unified global tax compliance, 99.999% uptime",
    senderName: "Travis · Strategic Account Executive at Stripe",
    badge: "💳 Stripe (Global Fintech Platform)"
  },
  saas: {
    type: 'saas',
    companyName: "Autonomous AI Engine",
    productName: "Enterprise AI Sales & Intelligence Cloud",
    valueProp: "Reclaim 40 hours/rep/month with multi-agent research and verified live decision-maker mapping",
    differentiator: "Real-time MCP pipeline connecting Gemini Search Grounding, Sumble, and ZoomInfo",
    senderName: "Travis · Solutions Architect & Lead AE",
    badge: "⚡ Enterprise AI Cloud"
  },
  generic: {
    type: 'saas',
    companyName: "B2B Enterprise Solutions",
    productName: "Enterprise Performance & Operations Platform",
    valueProp: "Unified digital operations platform reducing operational friction by 35% and accelerating cross-team execution",
    differentiator: "Turnkey API integration, enterprise security governance, and rapid 14-day deployment",
    senderName: "Travis · Enterprise Account Executive",
    badge: "🏢 Generic B2B SaaS"
  }
};

const PROFILE_TARGETS = {
  zendesk: [
    { label: "🚗 Uber", domain: "uber.com" },
    { label: "🏡 Airbnb", domain: "airbnb.com" },
    { label: "🛒 Instacart", domain: "instacart.com" },
    { label: "🍔 DoorDash", domain: "doordash.com" },
    { label: "🛍️ Shopify", domain: "shopify.com" },
    { label: "💳 Chime", domain: "chime.com" },
    { label: "🎥 Vimeo", domain: "vimeo.com" },
    { label: "⚡ Ramp", domain: "ramp.com" }
  ],
  forethought: [
    { label: "🎁 Fetch Rewards", domain: "fetchrewards.com" },
    { label: "🎒 Cotopaxi", domain: "cotopaxi.com" },
    { label: "✍️ Grammarly", domain: "grammarly.com" },
    { label: "🥗 YAZIO", domain: "yazio.com" },
    { label: "🛋️ Wayfair", domain: "wayfair.com" },
    { label: "🚘 Carvana", domain: "carvana.com" }
  ],
  sockclub: [
    { label: "🧦 Sock Club", domain: "sockclub.com" },
    { label: "🥥 Vita Coco", domain: "vitacoco.com" },
    { label: "🧘 Lululemon", domain: "lululemon.com" },
    { label: "💄 Glossier", domain: "glossier.com" },
    { label: "👓 Warby Parker", domain: "warbyparker.com" },
    { label: "🚗 CarGurus", domain: "cargurus.com" }
  ],
  stripe: [
    { label: "🤖 OpenAI", domain: "openai.com" },
    { label: "🎨 Figma", domain: "figma.com" },
    { label: "🧠 Anthropic", domain: "anthropic.com" },
    { label: "📝 Notion", domain: "notion.so" },
    { label: "📰 Substack", domain: "substack.com" }
  ],
  saas: [
    { label: "❄️ Snowflake", domain: "snowflake.com" },
    { label: "🐶 Datadog", domain: "datadog.com" },
    { label: "🍃 MongoDB", domain: "mongodb.com" },
    { label: "🛡️ CrowdStrike", domain: "crowdstrike.com" }
  ],
  generic: [
    { label: "☁️ Salesforce", domain: "salesforce.com" },
    { label: "📦 Box", domain: "box.com" },
    { label: "📊 Snowflake", domain: "snowflake.com" },
    { label: "⚡ HubSpot", domain: "hubspot.com" },
    { label: "🎯 Zoom", domain: "zoom.us" }
  ]
};
