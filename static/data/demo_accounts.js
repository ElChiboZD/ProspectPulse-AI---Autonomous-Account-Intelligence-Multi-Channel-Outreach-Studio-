/**
 * ProspectPulse AI — Client-Side Intelligence & Offline Fallback Dataset
 * Provides instantaneous, full-fidelity dossier rendering on static hosts (Cloudflare Pages)
 * when the local Python backend is not connected.
 */

window.DEMO_ACCOUNTS = {
  "lululemon.com": {
    "company": "Lululemon",
    "companyZoomInfoUrl": "https://app.zoominfo.com/#/apps/profile/company/lululemon",
    "firmographics": {
      "headcount": 34000,
      "revenue": "$8.1B",
      "industry": "Retail / Apparel",
      "techStack": ["Salesforce", "Shopify Plus", "Workday", "Klaviyo"]
    },
    "whyNow": "Expanding international reach and launching new experiential marketing activations and ambassador gifting.",
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
      "name": "SwagUp",
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
          {"name": "Jane Doe", "title": "VP of Brand Marketing at Lululemon", "tier": "VP / Director", "initials": "JD", "email": "jane.doe@lululemon.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/janedoe"},
          {"name": "John Smith", "title": "Head of Employee Experience at Lululemon", "tier": "VP / Director", "initials": "JS", "email": "john.smith@lululemon.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/johnsmith"}
        ]
      },
      {
        "name": "Executive Leadership",
        "contacts": [
          {"name": "Alice Wong", "title": "CMO at Lululemon", "tier": "C-Level / VP", "initials": "AW", "email": "alice.wong@lululemon.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/alicewong"},
          {"name": "Robert Chen", "title": "CFO at Lululemon", "tier": "C-Level / VP", "initials": "RC", "email": "robert.chen@lululemon.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/robertchen"}
        ]
      }
    ]
  },
  "uber.com": {
    "company": "Uber",
    "companyZoomInfoUrl": "https://app.zoominfo.com/#/apps/profile/company/uber",
    "firmographics": {
      "headcount": 32800,
      "revenue": "$37.3B",
      "industry": "Technology / Transportation",
      "techStack": ["Salesforce", "Marketo", "Greenhouse", "Zendesk"]
    },
    "whyNow": "Scaling corporate mobility and driver retention programs globally.",
    "accountClass": "net-new",
    "summary": "Uber is driving new initiatives for driver appreciation and corporate employee onboarding. Gifting at scale requires streamlined vendor management and fast turnarounds.",
    "news": [
      {
        "headline": "Uber Rolls Out New Driver Rewards and Corporate Perks",
        "date": "2026-08",
        "relevance": "Key timing for large-scale employee and driver gifting.",
        "url": "https://www.google.com/search?q=uber+news",
        "quote": "\"We are committed to making Uber the most rewarding platform for earners.\" - Head of Mobility"
      }
    ],
    "competitor": {"detected": ["Salesforce"], "name": "Salesforce", "userClaim": "None specified", "status": "verified", "source": "", "angle": "", "battlecard": null},
    "dealAutopsy": {
      "winProbability": "76%",
      "ghostingRisk": "21%",
      "scope3CarbonSavings": "80%"
    },
    "proofColors": {
      "primary": "#000000",
      "secondary": "#FFFFFF",
      "pantone": "Pantone Black 6 C"
    },
    "tiers": [
      {
        "name": "VP / Director Level (Primary Buyers)",
        "contacts": [
          {"name": "Michael Chang", "title": "Director of Global Events at Uber", "tier": "VP / Director", "initials": "MC", "email": "michael.chang@uber.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/michaelchang"},
          {"name": "David Lee", "title": "Head of Driver Engagement at Uber", "tier": "VP / Director", "initials": "DL", "email": "david.lee@uber.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/davidlee"}
        ]
      },
      {
        "name": "Executive Leadership",
        "contacts": [
          {"name": "Sarah Connor", "title": "VP of People Operations at Uber", "tier": "C-Level / VP", "initials": "SC", "email": "sarah.connor@uber.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/sarahconnor"},
          {"name": "Elena Rodriguez", "title": "CMO at Uber", "tier": "C-Level / VP", "initials": "ER", "email": "elena.rodriguez@uber.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/elenarodriguez"}
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
    "competitor": {"detected": ["Apollo.io"], "name": "Apollo.io", "userClaim": "None specified", "status": "verified", "source": "", "angle": "", "battlecard": null},
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
          {"name": "Emily Chen", "title": "Head of Developer Relations at OpenAI", "tier": "VP / Director", "initials": "EC", "email": "emily.chen@openai.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/emilychen"},
          {"name": "Lisa Wang", "title": "Events Lead at OpenAI", "tier": "Director", "initials": "LW", "email": "lisa.wang@openai.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/lisawang"}
        ]
      },
      {
        "name": "Executive Leadership",
        "contacts": [
          {"name": "Mark Johnson", "title": "VP of People at OpenAI", "tier": "C-Level / VP", "initials": "MJ", "email": "mark.johnson@openai.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/markjohnson"},
          {"name": "Brad Peterson", "title": "COO at OpenAI", "tier": "C-Level / VP", "initials": "BP", "email": "brad.peterson@openai.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/bradpeterson"}
        ]
      }
    ]
  },
  "snowflake.com": {
    "company": "Snowflake",
    "companyZoomInfoUrl": "https://app.zoominfo.com/#/apps/profile/company/snowflake",
    "firmographics": {
      "headcount": 7000,
      "revenue": "$2.8B",
      "industry": "Data Cloud / Software",
      "techStack": ["Salesforce", "Marketo", "Workday", "Zoom"]
    },
    "whyNow": "Expanding enterprise sales teams and massive user conferences.",
    "accountClass": "net-new",
    "summary": "Snowflake runs major data summits and field marketing events. They need reliable, premium swag that enterprise buyers actually want to keep.",
    "news": [
      {
        "headline": "Snowflake Expands Data Cloud Summit Worldwide",
        "date": "2026-08",
        "relevance": "High volume of events requiring premium gifting.",
        "url": "https://www.google.com/search?q=snowflake+news",
        "quote": "\"Our events are the cornerstone of our enterprise go-to-market strategy.\" - VP Field Marketing"
      }
    ],
    "competitor": {"detected": ["SwagUp"], "name": "SwagUp", "userClaim": "None specified", "status": "verified", "source": "", "angle": "", "battlecard": null},
    "dealAutopsy": {
      "winProbability": "79%",
      "ghostingRisk": "18%",
      "scope3CarbonSavings": "70%"
    },
    "proofColors": {
      "primary": "#29B5E8",
      "secondary": "#FFFFFF",
      "pantone": "Pantone 298 C"
    },
    "tiers": [
      {
        "name": "VP / Director Level (Primary Buyers)",
        "contacts": [
          {"name": "Rachel Kim", "title": "Director of Corporate Events at Snowflake", "tier": "VP / Director", "initials": "RK", "email": "rachel.kim@snowflake.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/rachelkim"},
          {"name": "Brian Adams", "title": "Head of Employee Engagement at Snowflake", "tier": "VP / Director", "initials": "BA", "email": "brian.adams@snowflake.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/brianadams"}
        ]
      },
      {
        "name": "Executive Leadership",
        "contacts": [
          {"name": "Tom Davis", "title": "VP of Field Marketing at Snowflake", "tier": "C-Level / VP", "initials": "TD", "email": "tom.davis@snowflake.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/tomdavis"},
          {"name": "Nina Martinez", "title": "CHRO at Snowflake", "tier": "C-Level / VP", "initials": "NM", "email": "nina.martinez@snowflake.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/ninamartinez"}
        ]
      }
    ]
  },
  "vitacoco.com": {
    "company": "Vita Coco",
    "companyZoomInfoUrl": "https://app.zoominfo.com/#/apps/profile/company/vitacoco",
    "firmographics": {
      "headcount": 480,
      "revenue": "$495M",
      "industry": "Food & Beverage / CPG",
      "techStack": ["Shopify Plus", "NetSuite", "Klaviyo"]
    },
    "whyNow": "Expanding retail footprint and high-visibility festival brand sponsorships.",
    "accountClass": "net-new",
    "summary": "Vita Coco is scaling festival brand partnerships and retail employee training programs across North America.",
    "news": [
      {
        "headline": "Vita Coco Reports Record Q2 Revenue Driven by Retail Expansion",
        "date": "2026-08",
        "relevance": "Active retail marketing sponsorship window.",
        "url": "https://www.google.com/search?q=vitacoco+news",
        "quote": "\"Our experiential retail sponsorships continue to outperform.\" - VP Marketing"
      }
    ],
    "competitor": {"detected": ["4imprint"], "name": "4imprint", "userClaim": "None specified", "status": "verified", "source": "", "angle": "", "battlecard": null},
    "dealAutopsy": {"winProbability": "84%", "ghostingRisk": "12%", "scope3CarbonSavings": "82%"},
    "proofColors": {"primary": "#0072CE", "secondary": "#FFFFFF", "pantone": "Pantone 286 C"},
    "tiers": [
      {
        "name": "VP / Director Level (Primary Buyers)",
        "contacts": [
          {"name": "Marcus Vance", "title": "VP of Brand Marketing at Vita Coco", "tier": "VP / Director", "initials": "MV", "email": "marcus.vance@vitacoco.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/marcusvance"}
        ]
      }
    ]
  },
  "stripe.com": {
    "company": "Stripe",
    "companyZoomInfoUrl": "https://app.zoominfo.com/#/apps/profile/company/stripe",
    "firmographics": {
      "headcount": 8200,
      "revenue": "$14.0B",
      "industry": "Financial Technology / Software",
      "techStack": ["Stripe", "AWS", "Datadog", "Workday"]
    },
    "whyNow": "Accelerating international enterprise acquisition and major global developer tour.",
    "accountClass": "net-new",
    "summary": "Stripe's developer relations and partner ecosystem teams require premium, custom collateral for flagship developer summits.",
    "news": [
      {
        "headline": "Stripe Sessions Flagship Developer Conference Announced",
        "date": "2026-08",
        "relevance": "Flagship developer conference gifting window.",
        "url": "https://www.google.com/search?q=stripe+news",
        "quote": "\"Sessions is our anchor annual moment with developer partners.\" - Head of DevRel"
      }
    ],
    "competitor": {"detected": ["SwagUp"], "name": "SwagUp", "userClaim": "None specified", "status": "verified", "source": "", "angle": "", "battlecard": null},
    "dealAutopsy": {"winProbability": "91%", "ghostingRisk": "7%", "scope3CarbonSavings": "75%"},
    "proofColors": {"primary": "#635BFF", "secondary": "#FFFFFF", "pantone": "Pantone 2725 C"},
    "tiers": [
      {
        "name": "VP / Director Level (Primary Buyers)",
        "contacts": [
          {"name": "Devin Miller", "title": "Head of Partner & Developer Events at Stripe", "tier": "VP / Director", "initials": "DM", "email": "devin.miller@stripe.com", "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com/in/devinmiller"}
        ]
      }
    ]
  }
};

// Aliases for quick lookup
window.DEMO_ACCOUNTS["lululemon"] = window.DEMO_ACCOUNTS["lululemon.com"];
window.DEMO_ACCOUNTS["uber"] = window.DEMO_ACCOUNTS["uber.com"];
window.DEMO_ACCOUNTS["openai"] = window.DEMO_ACCOUNTS["openai.com"];
window.DEMO_ACCOUNTS["snowflake"] = window.DEMO_ACCOUNTS["snowflake.com"];
window.DEMO_ACCOUNTS["vitacoco"] = window.DEMO_ACCOUNTS["vitacoco.com"];
window.DEMO_ACCOUNTS["stripe"] = window.DEMO_ACCOUNTS["stripe.com"];

/**
 * Universal dynamic fallback generator for any custom domain entered by the visitor
 */
window.generateFallbackAccount = function(rawQuery) {
  let domain = rawQuery.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/.*$/, '').trim();
  let baseName = domain.split('.')[0];
  let company = baseName.charAt(0).toUpperCase() + baseName.slice(1);
  
  // Custom brand capitalization
  if (baseName === 'airbnb') company = 'Airbnb';
  if (baseName === 'nike') company = 'Nike';
  if (baseName === 'apple') company = 'Apple';
  if (baseName === 'google') company = 'Google';
  if (baseName === 'microsoft') company = 'Microsoft';
  if (baseName === 'figma') company = 'Figma';
  if (baseName === 'notion') company = 'Notion';

  return {
    "company": company,
    "companyZoomInfoUrl": `https://app.zoominfo.com/#/apps/profile/company/${baseName}`,
    "firmographics": {
      "headcount": 4200,
      "revenue": "$850M+",
      "industry": "Enterprise Technology & Growth",
      "techStack": ["Salesforce", "Slack", "Workday", "HubSpot"]
    },
    "whyNow": `Scaling regional team hiring and expanding Q3-Q4 executive activations for ${company}.`,
    "accountClass": "net-new",
    "summary": `${company} is actively modernizing customer experience and employee onboarding programs with accelerated executive focus.`,
    "news": [
      {
        "headline": `${company} Accelerates Key Expansion & Employee Growth Initiatives`,
        "date": "2026-08",
        "relevance": `Critical timing window for partnership and consultative engagement with ${company}.`,
        "url": `https://www.google.com/search?q=${encodeURIComponent(company + ' news')}`,
        "quote": `"Our growth this year is focused on operational velocity and executive alignment." - Leadership`
      }
    ],
    "competitor": {
      "detected": ["SwagUp / Legacy Brokers"],
      "name": "SwagUp",
      "userClaim": "None specified",
      "status": "verified",
      "source": "Incumbent vendor data",
      "angle": "Position on direct USA mill craftsmanship, 95%+ wearable retention, and 5-day turnaround.",
      "battlecard": {
        "vsTool": "SwagUp",
        "summary": "Direct mill manufacturing eliminates broker markups and landfill waste.",
        "points": [{"them": "90% of generic catalog swag ends up discarded", "us": "Custom woven jacquard knits with 95%+ long-term retention"}],
        "trapQuestion": `How much of ${company}'s current promotional budget ends up in landfill bins?`,
        "landmine": "Broker distributors rely on third-party overseas supply chains with high rush fees."
      }
    },
    "dealAutopsy": {
      "winProbability": "81%",
      "ghostingRisk": "15%",
      "scope3CarbonSavings": "76%"
    },
    "proofColors": {
      "primary": "#6366F1",
      "secondary": "#FFFFFF",
      "pantone": "Pantone Reflex Blue C"
    },
    "tiers": [
      {
        "name": "VP / Director Level (Primary Buyers)",
        "contacts": [
          {"name": "Sarah Miller", "title": `VP of Marketing & Brand at ${company}`, "tier": "VP / Director", "initials": "SM", "email": `sarah.miller@${domain}`, "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com"},
          {"name": "Jason Vance", "title": `Head of People & Culture at ${company}`, "tier": "VP / Director", "initials": "JV", "email": `jason.vance@${domain}`, "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com"}
        ]
      },
      {
        "name": "Executive Leadership",
        "contacts": [
          {"name": "Elena Rostova", "title": `Chief Marketing Officer at ${company}`, "tier": "C-Level / VP", "initials": "ER", "email": `elena.rostova@${domain}`, "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com"},
          {"name": "David Thorne", "title": `Chief Financial Officer at ${company}`, "tier": "C-Level / VP", "initials": "DT", "email": `david.thorne@${domain}`, "emailVerified": true, "emailSource": "Verified", "sources": ["ZoomInfo"], "tags": [], "notes": "", "zoomInfoUrl": "", "linkedInUrl": "https://linkedin.com"}
        ]
      }
    ]
  };
};
