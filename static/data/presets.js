const PROFILE_PRESETS = {
  sockclub: {
    type: 'swag',
    companyName: "Sock Club",
    productName: "Custom-Knit Branded Socks & Corporate Gifting",
    valueProp: "USA-knitted socks with free 1-hour digital proofs, 5-day turnaround, and 95%+ wearable retention",
    differentiator: "Direct USA manufacturer, knit-in woven designs (no fading print), free mockups in 1 hour",
    senderName: "Travis · Enterprise Account Executive at Sock Club",
    badge: "🧦 Sock Club (Direct USA Mill)"
  },
  zendesk: {
    type: 'cx',
    companyName: "Zendesk",
    productName: "Zendesk Premier CX & Autonomous AI Agents",
    valueProp: "Unified omnichannel support platform with pre-trained AI agents deflecting 45%+ of volume",
    differentiator: "Days-to-weeks rollout vs Salesforce 9-month consultant overhead; native voice & WhatsApp included",
    senderName: "Travis · Enterprise Account Executive at Zendesk",
    badge: "🎧 Zendesk (Enterprise CX & AI)"
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
    badge: "🤖 Enterprise AI Cloud"
  }
};

const PROFILE_TARGETS = {
  sockclub: [
    { label: "🧦 Sock Club", domain: "sockclub.com" },
    { label: "🥥 Vita Coco", domain: "vitacoco.com" },
    { label: "🧘 Lululemon", domain: "lululemon.com" },
    { label: "💄 Glossier", domain: "glossier.com" },
    { label: "👓 Warby Parker", domain: "warbyparker.com" },
    { label: "🚗 CarGurus", domain: "cargurus.com" }
  ],
  zendesk: [
    { label: "🚗 Uber", domain: "uber.com" },
    { label: "🏡 Airbnb", domain: "airbnb.com" },
    { label: "🛒 Instacart", domain: "instacart.com" },
    { label: "🍔 DoorDash", domain: "doordash.com" },
    { label: "🛍️ Shopify", domain: "shopify.com" }
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
  ]
};
