"""
Pre-cached high-fidelity intelligence dossiers for instant offline demoing,
rapid interview presentations, and zero-latency account analysis.
"""

DEMO_DATA = {
    "uber.com": {
        "company": "Uber",
        "companyZoomInfoUrl": "https://app.zoominfo.com/#/apps/profile/company/uber",
        "firmographics": {
            "headcount": 32800,
            "revenue": "$37.3B",
            "industry": "Technology / Transportation & Mobility",
            "techStack": ["Salesforce Service Cloud", "Zendesk", "Twilio", "AWS", "Jira"]
        },
        "whyNow": "Consolidating global earner and rider support operations to reduce cost-per-contact while deploying autonomous AI agents for sub-second trip resolution.",
        "accountClass": "expansion",
        "summary": "Uber handles tens of millions of support interactions monthly across rides and delivery. They are actively optimizing support TCO by deploying autonomous AI agents to deflect routine fare reviews and lost item inquiries.",
        "news": [
            {
                "headline": "Uber Accelerates AI-Powered Customer Experience and Earner Support",
                "date": "2026-08",
                "relevance": "Direct catalyst for scaling autonomous deflection and unified CX routing.",
                "url": "https://www.google.com/search?q=uber+customer+support+ai",
                "quote": "\"Automating routine resolution allows our operations teams to deliver premium white-glove care during critical safety moments.\" - Head of Global Support"
            }
        ],
        "competitor": {
            "detected": ["Salesforce Service Cloud", "Intercom"],
            "userClaim": "None specified",
            "status": "verified",
            "source": "Sumble Tech Footprint & Live Web Scrape",
            "angle": "Displace costly Salesforce consultant overhead and Intercom per-resolution meter spikes with unified Zendesk Suite + Forethought AI Agents.",
            "battlecard": {
                "vsTool": "Salesforce Service Cloud",
                "summary": "Zendesk delivers 3x faster time-to-value at half the total cost of ownership without bloated consultant fees.",
                "points": [
                    {"them": "Requires $50k-$150k in SI consultants and 2+ dedicated Salesforce admins for basic queue changes", "us": "Turnkey Agent Workspace with agile omnichannel routing and native WFM in days"},
                    {"them": "Per-seat license bloat ($300-$600/agent/mo once Digital Engagement & Data Cloud are added)", "us": "Transparent, predictable enterprise platform licensing with native voice, messaging, and AI"}
                ],
                "trapQuestion": "What is your total fully-loaded per-agent cost once Salesforce Data Cloud credits, Voice add-ons, and external consultant retainers are factored in?",
                "landmine": "Acknowledge Salesforce is strong for custom back-office ERP records, but highlight Zendesk's superior agent speed and CX deflection."
            }
        },
        "dealAutopsy": {
            "winProbability": "84%",
            "ghostingRisk": "12%",
            "scope3CarbonSavings": "90%"
        },
        "proofColors": {
            "primary": "#000000",
            "secondary": "#276EF1",
            "pantone": "Pantone Black 6 C"
        },
        "tiers": [
            {
                "name": "VP / Director Level (Primary CX Decision Makers)",
                "contacts": [
                    {"name": "Marcus Vance", "title": "VP of Global Customer Operations at Uber", "tier": "VP / Director", "initials": "MV", "email": "marcus.vance@uber.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": ["Decision Maker", "Budget Owner"], "notes": "Owns global support headcount and CX technology spend.", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/marcusvance"},
                    {"name": "Elena Rostova", "title": "Head of CX Technology & Automation at Uber", "tier": "VP / Director", "initials": "ER", "email": "elena.rostova@uber.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": ["Technical Evaluator"], "notes": "Evaluating AI agent deflection and helpdesk integration.", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/elenarostova"}
                ]
            },
            {
                "name": "Executive Leadership",
                "contacts": [
                    {"name": "Sarah Jenkins", "title": "Chief Customer Officer at Uber", "tier": "C-Level / VP", "initials": "SJ", "email": "sarah.jenkins@uber.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": ["Executive Sponsor"], "notes": "Driving company-wide efficiency and CSAT improvement initiatives.", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/sarahjenkins"},
                    {"name": "David Thorne", "title": "SVP of Global Operations at Uber", "tier": "C-Level / VP", "initials": "DT", "email": "david.thorne@uber.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": ["Executive Sponsor"], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/davidthorne"}
                ]
            }
        ]
    },
    "airbnb.com": {
        "company": "Airbnb",
        "companyZoomInfoUrl": "https://app.zoominfo.com/#/apps/profile/company/airbnb",
        "firmographics": {
            "headcount": 6800,
            "revenue": "$9.9B",
            "industry": "Travel & Hospitality / Marketplace",
            "techStack": ["Zendesk", "Twilio", "Amazon Connect", "GraphQL"]
        },
        "whyNow": "Expanding 24/7 global guest support with AI agents across 62 languages ahead of peak summer travel surge.",
        "accountClass": "expansion",
        "summary": "Airbnb prioritizes ultra-high CSAT for both Hosts and Guests. They are looking to streamline multilingual triage and deploy real-time Agent Copilot to accelerate resolution on complex booking modifications.",
        "news": [
            {
                "headline": "Airbnb Unveils Major Platform Upgrades and Multilingual Support Expansion",
                "date": "2026-08",
                "relevance": "Key expansion window for Forethought AI Agents and Zendesk WFM.",
                "url": "https://www.google.com/search?q=airbnb+customer+experience",
                "quote": "\"Our goal is to make every Host and Guest feel like they have a personal concierge.\" - CEO"
            }
        ],
        "competitor": {
            "detected": ["Salesforce Service Cloud"],
            "userClaim": "None specified",
            "status": "verified",
            "source": "Sumble Tech Footprint",
            "angle": "Position Zendesk AI Copilot and Forethought Solve Agent for instant multilingual resolution.",
            "battlecard": {
                "vsTool": "Salesforce Service Cloud",
                "summary": "Zendesk provides unmatched consumer messaging (WhatsApp, in-app chat) and agile agent workflows.",
                "points": [
                    {"them": "Complex, rigid data structures that slow down frontline agents during peak travel surges", "us": "Single omnichannel Agent Workspace with live guest booking context and 1-click macro suggestions"}
                ],
                "trapQuestion": "How many seconds of agent handle time are lost switching between chat, email, and phone during urgent rebooking incidents?",
                "landmine": "Recognize Salesforce's enterprise footprint; focus on agent ease-of-use and sub-30 day AI deployment."
            }
        },
        "dealAutopsy": {
            "winProbability": "88%",
            "ghostingRisk": "9%",
            "scope3CarbonSavings": "85%"
        },
        "proofColors": {
            "primary": "#FF5A5F",
            "secondary": "#00A699",
            "pantone": "Pantone 1788 C"
        },
        "tiers": [
            {
                "name": "VP / Director Level (Primary CX Buyers)",
                "contacts": [
                    {"name": "Chloe Dupont", "title": "VP of Community Support Operations at Airbnb", "tier": "VP / Director", "initials": "CD", "email": "chloe.dupont@airbnb.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": ["Decision Maker"], "notes": "Leads 2,000+ support specialists globally.", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/chloedupont"},
                    {"name": "Liam Gallagher", "title": "Director of CX Systems & Technology at Airbnb", "tier": "VP / Director", "initials": "LG", "email": "liam.gallagher@airbnb.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": ["Technical Lead"], "notes": "Oversees ticketing and contact center integrations.", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/liamgallagher"}
                ]
            },
            {
                "name": "Executive Leadership",
                "contacts": [
                    {"name": "Tara Woods", "title": "Head of Global Guest Operations at Airbnb", "tier": "C-Level / VP", "initials": "TW", "email": "tara.woods@airbnb.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": ["Executive Sponsor"], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/tarawoods"}
                ]
            }
        ]
    },
    "cotopaxi.com": {
        "company": "Cotopaxi",
        "companyZoomInfoUrl": "https://app.zoominfo.com/#/apps/profile/company/cotopaxi",
        "firmographics": {
            "headcount": 350,
            "revenue": "$120M",
            "industry": "Retail / Outdoor Gear & Apparel",
            "techStack": ["Zendesk", "Shopify Plus", "Klaviyo", "Gorgias"]
        },
        "whyNow": "Scaling peak-season e-commerce support (BFCM & holidays) without adding temporary seasonal agents.",
        "accountClass": "net-new",
        "summary": "Cotopaxi has rapid brand growth with passionate outdoor consumers. They require high-empathy autonomous deflection for warranty claims, order status (WISMO), and returns while upholding their B-Corp ethical standards.",
        "news": [
            {
                "headline": "Cotopaxi Expands Sustainable Retail Footprint and Digital Sales Channels",
                "date": "2026-08",
                "relevance": "High growth driving 40% increase in inbound digital support volume.",
                "url": "https://www.google.com/search?q=cotopaxi+news",
                "quote": "\"We want our customer service experience to be as sustainable and impactful as our products.\" - VP CX"
            }
        ],
        "competitor": {
            "detected": ["Gorgias", "Intercom"],
            "userClaim": "None specified",
            "status": "verified",
            "source": "Sumble Tech Footprint",
            "angle": "Upgrade from basic Gorgias FAQ macros to Forethought Autonomous AI Agents (168% ROI, 90%+ deflection).",
            "battlecard": {
                "vsTool": "Gorgias",
                "summary": "Forethought provides true generative multi-agent resolution and live API actions vs Gorgias basic rules.",
                "points": [
                    {"them": "Basic macro auto-responders that frustrate customers with repetitive loop answers", "us": "Autonomous Solve Agent that executes returns, warranty replacements, and refunds directly via Shopify API"},
                    {"them": "Lacks native Assist copilot for complex human agent warranty inquiries", "us": "Assist Agent surfaces warranty policies and drafts 1-click empathetic replies in seconds"}
                ],
                "trapQuestion": "What percentage of your Gorgias auto-replies still require human escalation because the bot couldn't actually process the exchange in Shopify?",
                "landmine": "Gorgias is easy for 2-person Shopify stores. For scaling brands with warranty workflows, Forethought delivers 15x higher ROI."
            }
        },
        "dealAutopsy": {
            "winProbability": "92%",
            "ghostingRisk": "8%",
            "scope3CarbonSavings": "95%"
        },
        "proofColors": {
            "primary": "#00A896",
            "secondary": "#F05A28",
            "pantone": "Pantone 3272 C"
        },
        "tiers": [
            {
                "name": "VP / Director Level (Primary CX Decision Makers)",
                "contacts": [
                    {"name": "Hannah Reed", "title": "Director of Customer Experience & Guarantees at Cotopaxi", "tier": "VP / Director", "initials": "HR", "email": "hannah.reed@cotopaxi.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": ["Decision Maker"], "notes": "Champion for customer happiness and warranty efficiency.", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/hannahreed"}
                ]
            },
            {
                "name": "Executive Leadership",
                "contacts": [
                    {"name": "Stephan Miller", "title": "VP of Operations & Logistics at Cotopaxi", "tier": "C-Level / VP", "initials": "SM", "email": "stephan.miller@cotopaxi.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": ["Budget Approver"], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/stephanmiller"}
                ]
            }
        ]
    },
    "fetchrewards.com": {
        "company": "Fetch Rewards",
        "companyZoomInfoUrl": "https://app.zoominfo.com/#/apps/profile/company/fetchrewards",
        "firmographics": {
            "headcount": 1100,
            "revenue": "$350M",
            "industry": "Mobile Apps / Consumer Technology",
            "techStack": ["Zendesk", "Salesforce", "Braze", "Snowflake"]
        },
        "whyNow": "Managing millions of monthly receipt scans and reward redemptions with heavy mobile ticket volume.",
        "accountClass": "expansion",
        "summary": "Fetch Rewards experiences massive user engagement spikes during grocery holiday seasons. Forethought AI Agents deliver 90% autonomous deflection and 3.9x ROI on point inquiries.",
        "news": [
            {
                "headline": "Fetch Surpasses 18 Million Active Shoppers with Record Receipt Submissions",
                "date": "2026-08",
                "relevance": "Massive volume driver requiring sub-second autonomous receipt review.",
                "url": "https://www.google.com/search?q=fetch+rewards+news",
                "quote": "\"Automated support allows us to reward our shoppers instantly without ticket queues.\" - VP Operations"
            }
        ],
        "competitor": {
            "detected": ["Salesforce Service Cloud", "Ada"],
            "userClaim": "None specified",
            "status": "verified",
            "source": "Sumble Tech Footprint",
            "angle": "Deploy Forethought Solve & Triage on top of Zendesk for 90% deflection and sub-30 day deployment.",
            "battlecard": {
                "vsTool": "Ada Support",
                "summary": "Forethought natural language Autoflows outperform Ada rigid decision trees with zero code maintenance.",
                "points": [
                    {"them": "Rigid decision trees break on complex receipt dispute phrasing", "us": "Generative AI multi-agent architecture resolving up to 98% of tier-1 support across mobile chat and email"}
                ],
                "trapQuestion": "How many engineering hours per quarter are spent updating branching decision trees in Ada when new receipt promo types are added?",
                "landmine": "Highlight that Forethought integrates directly without migrating their underlying ticketing data."
            }
        },
        "dealAutopsy": {
            "winProbability": "94%",
            "ghostingRisk": "6%",
            "scope3CarbonSavings": "92%"
        },
        "proofColors": {
            "primary": "#FFA800",
            "secondary": "#5C2D91",
            "pantone": "Pantone 1235 C"
        },
        "tiers": [
            {
                "name": "VP / Director Level (Primary CX Decision Makers)",
                "contacts": [
                    {"name": "Austin Cooper", "title": "VP of Member Operations & Support at Fetch", "tier": "VP / Director", "initials": "AC", "email": "austin.cooper@fetchrewards.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": ["Decision Maker"], "notes": "Focused on sub-second mobile user dispute resolution.", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/austincooper"}
                ]
            },
            {
                "name": "Executive Leadership",
                "contacts": [
                    {"name": "Rachel Sterling", "title": "Chief Product & Member Experience Officer at Fetch", "tier": "C-Level / VP", "initials": "RS", "email": "rachel.sterling@fetchrewards.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": ["Executive Sponsor"], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/rachelsterling"}
                ]
            }
        ]
    },
    "lululemon.com": {
        "company": "Lululemon",
        "companyZoomInfoUrl": "https://app.zoominfo.com/#/apps/profile/company/lululemon",
        "firmographics": {
            "headcount": 34000,
            "revenue": "$8.1B",
            "industry": "Retail / Apparel",
            "techStack": ["Salesforce", "Shopify Plus", "Workday", "Klaviyo"]
        },
        "whyNow": "Expanding international reach and launching new product lines, focusing on VIP experiential marketing.",
        "accountClass": "net-new",
        "summary": "Lululemon is investing heavily in community events and brand ambassador programs. Their marketing and HR orgs prioritize high-end onboarding kits and influencer appreciation gifts.",
        "news": [
            {
                "headline": "Lululemon Expands Global Store Footprint and Experiential Events",
                "date": "2026-08",
                "relevance": "Key event and VIP gifting timing window.",
                "url": "https://www.google.com/search?q=lululemon+news",
                "quote": "\"Our community activations are our strongest growth lever this quarter.\" - CEO"
            }
        ],
        "competitor": {
            "detected": ["SwagUp"],
            "userClaim": "None specified",
            "status": "verified",
            "source": "Historical vendor data",
            "angle": "Position on 95%+ keep rate and direct USA manufacturing.",
            "battlecard": {
                "vsTool": "SwagUp",
                "summary": "Direct manufacturing beats broker markup.",
                "points": [{"them": "Generic swag is thrown away", "us": "Custom knit socks are kept"}],
                "trapQuestion": "How much of your event swag actually gets used?",
                "landmine": "Acknowledge swag brokers are easy to use, but highlight lack of custom premium options."
            }
        },
        "dealAutopsy": {
            "winProbability": "82%",
            "ghostingRisk": "14%",
            "scope3CarbonSavings": "75%"
        },
        "proofColors": {
            "primary": "#D22630",
            "secondary": "#FFFFFF",
            "pantone": "Pantone 186 C"
        },
        "tiers": [
            {
                "name": "VP / Director Level (Primary Buyers)",
                "contacts": [
                    {"name": "Jane Doe", "title": "VP of Brand Marketing at Lululemon", "tier": "VP / Director", "initials": "JD", "email": "jane.doe@lululemon.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/janedoe"},
                    {"name": "John Smith", "title": "Head of Employee Experience at Lululemon", "tier": "VP / Director", "initials": "JS", "email": "john.smith@lululemon.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/johnsmith"}
                ]
            },
            {
                "name": "Executive Leadership",
                "contacts": [
                    {"name": "Alice Wong", "title": "CMO at Lululemon", "tier": "C-Level / VP", "initials": "AW", "email": "alice.wong@lululemon.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/alicewong"},
                    {"name": "Robert Chen", "title": "CFO at Lululemon", "tier": "C-Level / VP", "initials": "RC", "email": "robert.chen@lululemon.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/robertchen"}
                ]
            }
        ]
    },
    "openai.com": {
        "company": "OpenAI",
        "companyZoomInfoUrl": "https://app.zoominfo.com/#/apps/profile/company/openai",
        "firmographics": {
            "headcount": 1200,
            "revenue": "$2.0B",
            "industry": "Artificial Intelligence / Software",
            "techStack": ["Stripe", "Slack", "Notion", "HubSpot"]
        },
        "whyNow": "Rapid headcount growth and high-profile developer conferences.",
        "accountClass": "net-new",
        "summary": "OpenAI is hiring aggressively and hosting premier developer events. High-quality, unique swag is critical for their developer relations and new hire onboarding.",
        "news": [
            {
                "headline": "OpenAI Announces Next DevDay and Massive Hiring Push",
                "date": "2026-08",
                "relevance": "Perfect time for DevDay swag and onboarding kits.",
                "url": "https://www.google.com/search?q=openai+news",
                "quote": "\"We want DevDay to be the most memorable event for the AI community.\" - DevRel Lead"
            }
        ],
        "competitor": {"detected": [], "userClaim": "None specified", "status": "verified", "source": "", "angle": "", "battlecard": None},
        "dealAutopsy": {
            "winProbability": "88%",
            "ghostingRisk": "10%",
            "scope3CarbonSavings": "60%"
        },
        "proofColors": {
            "primary": "#10A37F",
            "secondary": "#FFFFFF",
            "pantone": "Pantone 340 C"
        },
        "tiers": [
            {
                "name": "VP / Director Level (Primary Buyers)",
                "contacts": [
                    {"name": "Emily Chen", "title": "Head of Developer Relations at OpenAI", "tier": "VP / Director", "initials": "EC", "email": "emily.chen@openai.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/emilychen"},
                    {"name": "Lisa Wang", "title": "Events Lead at OpenAI", "tier": "Director", "initials": "LW", "email": "lisa.wang@openai.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/lisawang"}
                ]
            },
            {
                "name": "Executive Leadership",
                "contacts": [
                    {"name": "Mark Johnson", "title": "VP of People at OpenAI", "tier": "C-Level / VP", "initials": "MJ", "email": "mark.johnson@openai.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/markjohnson"},
                    {"name": "Brad Peterson", "title": "COO at OpenAI", "tier": "C-Level / VP", "initials": "BP", "email": "brad.peterson@openai.com", "emailVerified": True, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/bradpeterson"}
                ]
            }
        ]
    }
}
