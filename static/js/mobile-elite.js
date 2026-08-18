/**
 * ProspectPulse AI — Pulse Mobile OS (Bespoke Executive Mobile Interface)
 * Implements the distinct mobile-first UI: Dynamic Island, Story Flashcards,
 * Tactile Swatches, Live Web Data, and Google OAuth 2.0.
 */

(function () {
  const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (!isMobile) return;

  // Active Mobile OS State
  window.PulseMobile = {
    activeScreen: 'radar',
    target: {
      name: 'Lululemon Athletica',
      domain: 'lululemon.com',
      industry: 'Retail Apparel',
      headcount: '38,000',
      revenue: '$9.6B',
      incumbent: 'SwagUp ($185/box)',
      wedge: '38% Catalog Markup & 6-Wk Latency',
      champion: 'Sarah Chen (Director Brand Exp)',
      buyer: 'Michael Torres (VP Customer Exp)'
    },
    activeTone: 'challenger',
    selectedColorway: '#1E3A8A',
    selectedColorName: 'Deep Cobalt (Pantone 288 C)',
    roiEmployees: 5000
  };

  document.addEventListener('DOMContentLoaded', initPulseMobileOS);

  function initPulseMobileOS() {
    document.body.classList.add('pulse-mobile-os');

    // Hide any residual desktop web elements
    const desktopMain = document.querySelector('main') || document.querySelector('.container') || document.getElementById('mainContainer');
    if (desktopMain) desktopMain.style.display = 'none';

    // Remove legacy mobile elements if present
    const legacyApp = document.getElementById('nativeMobileApp');
    if (legacyApp) legacyApp.remove();

    renderPulseMobileApp();
  }

  function renderPulseMobileApp() {
    if (document.getElementById('pulseMobileRoot')) return;

    const userProfile = window.MobileState?.userProfile || {
      name: 'Travis Scott',
      email: 'travis.scott@enterprise.io',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    };

    const root = document.createElement('div');
    root.id = 'pulseMobileRoot';
    root.innerHTML = `
      <!-- 1. Floating Dynamic Island Header -->
      <header class="dynamic-island-header">
        <div class="dynamic-island-pill" onclick="openPulseGoogleModal()">
          <div class="island-brand">
            <div class="island-logo-dot">⚡</div>
            <div class="island-title-wrap">
              <div class="island-main-title">ProspectPulse <span style="font-size:9px;color:#60A5FA;background:rgba(59,130,246,0.18);padding:1px 5px;border-radius:4px;">OS</span></div>
              <div class="island-sub-domain" id="islandActiveDomain">lululemon.com</div>
            </div>
          </div>
          <div class="island-user-badge">
            <img id="pulseHeaderAvatar" src="${userProfile.avatar}" class="island-avatar-img" alt="Avatar" />
            <span class="island-user-name" id="pulseHeaderName">${userProfile.name.split(' ')[0]}</span>
          </div>
        </div>
      </header>

      <!-- 2. SCREEN 1: RADAR (Target Cockpit) -->
      <div id="view-radar" class="mobile-view-container">
        <div class="hero-search-capsule">
          <input type="text" id="pulseSearchInput" class="hero-search-field" placeholder="Analyze company (e.g. nike.com, stripe.com)..." />
          <button class="hero-search-action-btn" onclick="executePulseSearch()">⚡</button>
        </div>

        <div class="deck-section-header">
          <span class="deck-section-title">⚡ Flagship Targets</span>
          <span class="deck-section-badge">Live Signals</span>
        </div>

        <div class="story-targets-grid">
          <div class="story-target-card" onclick="selectPulseTarget('lululemon.com')">
            <div class="story-card-top">
              <span class="story-brand-icon">🧦</span>
              <span class="story-signal-pill">94 Signal</span>
            </div>
            <div class="story-card-bottom">
              <div class="story-company-name">Lululemon</div>
              <div class="story-industry-tag">Retail · 38k HC</div>
              <div class="story-wedge-badge">SwagUp Overpricing</div>
            </div>
          </div>

          <div class="story-target-card" onclick="selectPulseTarget('uber.com')">
            <div class="story-card-top">
              <span class="story-brand-icon">🚗</span>
              <span class="story-signal-pill">91 Signal</span>
            </div>
            <div class="story-card-bottom">
              <div class="story-company-name">Uber</div>
              <div class="story-industry-tag">Mobility · 32k HC</div>
              <div class="story-wedge-badge">Driver Gifting</div>
            </div>
          </div>

          <div class="story-target-card" onclick="selectPulseTarget('openai.com')">
            <div class="story-card-top">
              <span class="story-brand-icon">🤖</span>
              <span class="story-signal-pill">98 Signal</span>
            </div>
            <div class="story-card-bottom">
              <div class="story-company-name">OpenAI</div>
              <div class="story-industry-tag">AI · 1.5k HC</div>
              <div class="story-wedge-badge">DevDay Knitwear</div>
            </div>
          </div>

          <div class="story-target-card" onclick="selectPulseTarget('snowflake.com')">
            <div class="story-card-top">
              <span class="story-brand-icon">❄️</span>
              <span class="story-signal-pill">89 Signal</span>
            </div>
            <div class="story-card-bottom">
              <div class="story-company-name">Snowflake</div>
              <div class="story-industry-tag">Cloud · 7k HC</div>
              <div class="story-wedge-badge">Summit Swag</div>
            </div>
          </div>
        </div>

        <div class="deck-section-header">
          <span class="deck-section-title">🚨 Real-Time Buying Pulse</span>
        </div>
        <div style="background:#0B0E16;border:1px solid rgba(255,255,255,0.06);border-radius:18px;padding:14px;margin-bottom:14px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <span style="font-size:16px;">📈</span>
            <strong style="font-size:13px;color:#F3F4F6;">Lululemon Appointed VP Global Merchandising</strong>
          </div>
          <p style="font-size:12px;color:#94A3B8;line-height:1.4;">Vendor review underway for 600+ store employee gifting. Optimal Challenger entry point.</p>
        </div>
      </div>

      <!-- 3. SCREEN 2: INTEL (Executive Flashcards) -->
      <div id="view-intel" class="mobile-view-container" style="display:none;">
        <div class="intel-hero-banner">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:11px;font-weight:700;color:#60A5FA;text-transform:uppercase;">Account Intelligence</div>
              <h2 id="pulseTargetName" style="font-size:22px;font-weight:800;color:#FFF;letter-spacing:-0.4px;margin-top:2px;">Lululemon Athletica</h2>
            </div>
            <span class="story-signal-pill">Tier-1</span>
          </div>

          <div class="intel-stat-row">
            <div class="intel-stat-box">
              <div class="intel-stat-label">Headcount</div>
              <div class="intel-stat-value" id="pulseTargetHC">38,000</div>
            </div>
            <div class="intel-stat-box">
              <div class="intel-stat-label">Revenue</div>
              <div class="intel-stat-value" id="pulseTargetRev">$9.6B</div>
            </div>
            <div class="intel-stat-box">
              <div class="intel-stat-label">Incumbent</div>
              <div class="intel-stat-value" id="pulseTargetIncumbent" style="color:#EF4444;">SwagUp</div>
            </div>
          </div>
        </div>

        <div class="deck-section-header">
          <span class="deck-section-title">🏢 Buying Committee</span>
        </div>
        <div style="background:#0D101A;border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:14px;margin-bottom:12px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <div style="width:36px;height:36px;border-radius:12px;background:#2563EB;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;">EB</div>
            <div>
              <div style="font-size:14px;font-weight:800;color:#FFF;">Michael Torres</div>
              <div style="font-size:11px;color:#94A3B8;">VP Customer & Partner Exp · Economic Buyer</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;border-radius:12px;background:#10B981;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;">CH</div>
            <div>
              <div style="font-size:14px;font-weight:800;color:#FFF;">Sarah Chen</div>
              <div style="font-size:11px;color:#94A3B8;">Director Brand Exp · Champion</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. SCREEN 3: STUDIO (4-Tone Pitch Studio) -->
      <div id="view-studio" class="mobile-view-container" style="display:none;">
        <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:12px;scrollbar-width:none;">
          <button onclick="setPulseTone('challenger', this)" style="padding:8px 14px;border-radius:9999px;background:#3B82F6;border:none;color:#FFF;font-size:12px;font-weight:700;white-space:nowrap;flex-shrink:0;">⚡ Challenger</button>
          <button onclick="setPulseTone('consultative', this)" style="padding:8px 14px;border-radius:9999px;background:#141824;border:1px solid rgba(255,255,255,0.08);color:#94A3B8;font-size:12px;font-weight:700;white-space:nowrap;flex-shrink:0;">👔 Consultative</button>
          <button onclick="setPulseTone('short', this)" style="padding:8px 14px;border-radius:9999px;background:#141824;border:1px solid rgba(255,255,255,0.08);color:#94A3B8;font-size:12px;font-weight:700;white-space:nowrap;flex-shrink:0;">🎯 Short</button>
          <button onclick="setPulseTone('humorous', this)" style="padding:8px 14px;border-radius:9999px;background:#141824;border:1px solid rgba(255,255,255,0.08);color:#94A3B8;font-size:12px;font-weight:700;white-space:nowrap;flex-shrink:0;">🎭 Humorous</button>
        </div>

        <div style="background:#0D1019;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:16px;margin-bottom:16px;">
          <div style="font-size:12px;font-weight:800;color:#60A5FA;margin-bottom:6px;">SUBJECT: Lululemon retail gifting vs. SwagUp</div>
          <div id="pulseEmailText" style="font-size:13px;color:#E2E8F0;line-height:1.5;white-space:pre-wrap;">Hi Michael,

Noticed Lululemon is expanding partner store gifting. Most apparel teams waste 38% on catalog vendors like SwagUp.

We engineered custom Italian knitwear programs with 42% higher retention and live Pantone color matching.

Worth a 5-minute look at your custom deal room?

Best,
Travis Scott
Enterprise Account Executive | ProspectPulse AI</div>
        </div>

        <button onclick="copyPulseSequence()" style="width:100%;height:52px;border-radius:16px;background:linear-gradient(135deg, #3B82F6, #2563EB);border:none;color:#FFF;font-size:15px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 8px 24px rgba(37,99,235,0.4);">
          <span>📋</span> <span id="pulseCopyBtnLabel">1-Tap Copy Sequence</span>
        </button>
      </div>

      <!-- 5. SCREEN 4: DEAL ROOM (Pocket Sales Room) -->
      <div id="view-dealroom" class="mobile-view-container" style="display:none;">
        <div class="dealroom-knitwear-showcase">
          <div style="font-size:11px;font-weight:700;color:#A5B4FC;text-transform:uppercase;">Co-Branded Merchandise Preview</div>
          <h3 style="font-size:18px;font-weight:800;color:#FFF;margin-top:2px;">Lululemon Custom Knitwear</h3>

          <svg id="pulseSweaterSvg" class="knitwear-vector-svg" viewBox="0 0 100 100">
            <path id="pulseSweaterPath" d="M30,20 L40,15 L60,15 L70,20 L85,35 L75,45 L68,38 L68,85 L32,85 L32,38 L25,45 L15,35 Z" fill="#1E3A8A" stroke="#FFF" stroke-width="1.5"/>
            <text x="50" y="55" font-size="10" font-weight="bold" fill="#FFF" text-anchor="middle">lululemon</text>
          </svg>

          <div class="swatch-picker-row">
            <div class="swatch-circle active-swatch" style="background:#1E3A8A;" onclick="changePulseSwatch('#1E3A8A', 'Deep Cobalt (Pantone 288 C)', this)"></div>
            <div class="swatch-circle" style="background:#064E3B;" onclick="changePulseSwatch('#064E3B', 'Forest Moss (Pantone 343 C)', this)"></div>
            <div class="swatch-circle" style="background:#7C2D12;" onclick="changePulseSwatch('#7C2D12', 'Terracotta (Pantone 7586 C)', this)"></div>
            <div class="swatch-circle" style="background:#18181B;" onclick="changePulseSwatch('#18181B', 'Obsidian Black (Pantone Black 6 C)', this)"></div>
          </div>
          <div id="pulseSwatchNameLabel" style="font-size:12px;color:#94A3B8;margin-top:10px;">Active: <strong>Deep Cobalt (Pantone 288 C)</strong></div>
        </div>

        <div class="deck-section-header">
          <span class="deck-section-title">💰 Live Headcount ROI Model</span>
        </div>
        <div style="background:#0D101A;border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:16px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px;">
            <span>Target Headcount:</span>
            <strong id="pulseRoiHcLabel" style="color:#60A5FA;">5,000 Employees</strong>
          </div>
          <input type="range" min="500" max="40000" step="500" value="5000" style="width:100%;margin-bottom:12px;" oninput="updatePulseRoi(this.value)" />
          <div style="display:flex;justify-content:space-between;padding:10px;background:#141824;border-radius:12px;">
            <span style="font-size:12px;color:#94A3B8;">Projected Annual Savings:</span>
            <strong id="pulseRoiSavingsLabel" style="font-size:15px;color:#10B981;">+$42,500 Saved</strong>
          </div>
        </div>
      </div>

      <!-- 6. SCREEN 5: ROLEPLAY (Voice Objection Arena) -->
      <div id="view-roleplay" class="mobile-view-container" style="display:none;">
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 10px;text-align:center;">
          <div style="width:140px;height:140px;border-radius:50%;background:radial-gradient(circle, #3B82F6 0%, rgba(59, 130, 246, 0.1) 70%);display:flex;align-items:center;justify-content:center;font-size:54px;margin-bottom:24px;box-shadow:0 0 50px rgba(59,130,246,0.45);">🎙️</div>
          <h2 style="font-size:22px;font-weight:800;color:#FFF;margin-bottom:6px;">Voice Objection Arena</h2>
          <p style="font-size:13px;color:#94A3B8;max-width:280px;margin-bottom:24px;">Simulate live procurement pushback from Lululemon with instant speech playback.</p>
          <button onclick="playPulseVoiceSimulation()" style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg, #EF4444, #DC2626);border:3px solid rgba(255,255,255,0.2);color:#FFF;font-size:32px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 28px rgba(239,68,68,0.45);cursor:pointer;">
            🎤
          </button>
          <div style="font-size:12px;color:#64748B;margin-top:12px;">Tap to practice objection</div>
        </div>
      </div>

      <!-- 7. Haptic Floating Action Capsule Navigation -->
      <nav class="floating-nav-capsule">
        <button class="capsule-tab-item active-capsule-tab" onclick="switchPulseTab('radar', this)">
          <span class="capsule-tab-icon">⚡</span>
          <span>Radar</span>
        </button>
        <button class="capsule-tab-item" onclick="switchPulseTab('intel', this)">
          <span class="capsule-tab-icon">🏢</span>
          <span>Intel</span>
        </button>
        <button class="capsule-tab-item" onclick="switchPulseTab('studio', this)">
          <span class="capsule-tab-icon">✉️</span>
          <span>Studio</span>
        </button>
        <button class="capsule-tab-item" onclick="switchPulseTab('dealroom', this)">
          <span class="capsule-tab-icon">💼</span>
          <span>Deal Room</span>
        </button>
        <button class="capsule-tab-item" onclick="switchPulseTab('roleplay', this)">
          <span class="capsule-tab-icon">🎙️</span>
          <span>Roleplay</span>
        </button>
      </nav>
    `;

    document.body.appendChild(root);
  }

  // Navigation Switcher
  window.switchPulseTab = function (tabName, el) {
    if (navigator.vibrate) navigator.vibrate(15);
    window.PulseMobile.activeScreen = tabName;

    document.querySelectorAll('.floating-nav-capsule .capsule-tab-item').forEach(btn => btn.classList.remove('active-capsule-tab'));
    if (el) el.classList.add('active-capsule-tab');

    ['radar', 'intel', 'studio', 'dealroom', 'roleplay'].forEach(view => {
      const viewEl = document.getElementById(`view-${view}`);
      if (viewEl) viewEl.style.display = view === tabName ? 'block' : 'none';
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.selectPulseTarget = function (domain) {
    if (navigator.vibrate) navigator.vibrate([15, 30]);

    if (domain.includes('lululemon')) {
      window.PulseMobile.target = {
        name: 'Lululemon Athletica',
        domain: 'lululemon.com',
        headcount: '38,000',
        revenue: '$9.6B',
        incumbent: 'SwagUp ($185/box)'
      };
    } else if (domain.includes('uber')) {
      window.PulseMobile.target = {
        name: 'Uber Technologies',
        domain: 'uber.com',
        headcount: '32,000',
        revenue: '$31.8B',
        incumbent: 'Salesforce & Legacy Swag'
      };
    } else if (domain.includes('openai')) {
      window.PulseMobile.target = {
        name: 'OpenAI',
        domain: 'openai.com',
        headcount: '1,500',
        revenue: '$3.4B',
        incumbent: 'Internal Merch Ops'
      };
    } else {
      window.PulseMobile.target = {
        name: 'Snowflake',
        domain: 'snowflake.com',
        headcount: '7,000',
        revenue: '$2.8B',
        incumbent: 'Printfection'
      };
    }

    // Update Views
    const nameEl = document.getElementById('pulseTargetName');
    const hcEl = document.getElementById('pulseTargetHC');
    const revEl = document.getElementById('pulseTargetRev');
    const incEl = document.getElementById('pulseTargetIncumbent');
    const domainEl = document.getElementById('islandActiveDomain');
    if (nameEl) nameEl.textContent = window.PulseMobile.target.name;
    if (hcEl) hcEl.textContent = window.PulseMobile.target.headcount;
    if (revEl) revEl.textContent = window.PulseMobile.target.revenue;
    if (incEl) incEl.textContent = window.PulseMobile.target.incumbent;
    if (domainEl) domainEl.textContent = window.PulseMobile.target.domain;

    const intelNavBtn = document.querySelectorAll('.floating-nav-capsule .capsule-tab-item')[1];
    switchPulseTab('intel', intelNavBtn);
  };

  window.executePulseSearch = async function () {
    const input = document.getElementById('pulseSearchInput');
    const query = (input?.value || '').trim();
    if (!query) return;

    if (navigator.vibrate) navigator.vibrate(20);

    if (window.MobileLiveWebEngine) {
      const data = await window.MobileLiveWebEngine.fetchLiveCompanyData(query);
      if (data) {
        window.PulseMobile.target = data;
        const nameEl = document.getElementById('pulseTargetName');
        const domainEl = document.getElementById('islandActiveDomain');
        if (nameEl) nameEl.textContent = data.name;
        if (domainEl) domainEl.textContent = data.domain;
      }
    }

    const intelNavBtn = document.querySelectorAll('.floating-nav-capsule .capsule-tab-item')[1];
    switchPulseTab('intel', intelNavBtn);
  };

  window.setPulseTone = function (tone, el) {
    if (navigator.vibrate) navigator.vibrate(10);
    const btns = el.parentElement.querySelectorAll('button');
    btns.forEach(b => {
      b.style.background = '#141824';
      b.style.color = '#94A3B8';
      b.style.border = '1px solid rgba(255,255,255,0.08)';
    });
    el.style.background = '#3B82F6';
    el.style.color = '#FFF';
    el.style.border = 'none';

    const textEl = document.getElementById('pulseEmailText');
    if (!textEl) return;

    if (tone === 'challenger') {
      textEl.textContent = `Hi Michael,\n\nNoticed Lululemon is expanding partner store gifting. Most apparel teams waste 38% on catalog vendors like SwagUp.\n\nWe engineered custom Italian knitwear programs with 42% higher retention and live Pantone color matching.\n\nWorth a 5-minute look at your custom deal room?\n\nBest,\nTravis Scott\nEnterprise Account Executive | ProspectPulse AI`;
    } else if (tone === 'consultative') {
      textEl.textContent = `Hi Michael,\n\nIn benchmarking Lululemon's 2026 store partner experience model, we identified a 34% cost reduction opportunity by transitioning from third-party catalogs to bespoke Italian-spun knitwear.\n\nSimilar retail enterprises saw partner NPS increase from 62% to 89%.\n\nWould you be open to reviewing the comparative model?\n\nBest regards,\nTravis Scott\nEnterprise Account Executive | ProspectPulse AI`;
    } else if (tone === 'short') {
      textEl.textContent = `Michael — quick question.\n\nAre you still using SwagUp for Lululemon store merchandise, or open to cutting costs by 40% with custom knitwear?\n\nHere is your live model: [Deal Room Link]\n\nBest,\nTravis Scott`;
    } else {
      textEl.textContent = `Michael — promise this isn't another generic pitch.\n\nMost corporate swag ends up in a closet. We make custom Italian knitwear people actually fight over at the company holiday party.\n\nCheck out the Pantone mockups we generated for Lululemon: [Deal Room Link]\n\nCheers,\nTravis Scott`;
    }
  };

  window.copyPulseSequence = function () {
    if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
    const textEl = document.getElementById('pulseEmailText');
    if (textEl) {
      navigator.clipboard.writeText(textEl.textContent);
      const label = document.getElementById('pulseCopyBtnLabel');
      if (label) {
        label.textContent = '✅ Copied to Clipboard!';
        setTimeout(() => { label.textContent = '1-Tap Copy Sequence'; }, 2000);
      }
    }
  };

  window.changePulseSwatch = function (hex, name, el) {
    if (navigator.vibrate) navigator.vibrate(10);
    document.querySelectorAll('.swatch-circle').forEach(c => c.classList.remove('active-swatch'));
    if (el) el.classList.add('active-swatch');

    const path = document.getElementById('pulseSweaterPath');
    const label = document.getElementById('pulseSwatchNameLabel');
    if (path) path.setAttribute('fill', hex);
    if (label) label.innerHTML = `Active: <strong>${name}</strong>`;
  };

  window.updatePulseRoi = function (headcount) {
    const hcEl = document.getElementById('pulseRoiHcLabel');
    const savEl = document.getElementById('pulseRoiSavingsLabel');
    if (hcEl) hcEl.textContent = `${Number(headcount).toLocaleString()} Employees`;
    const savings = Math.round(headcount * 8.5);
    if (savEl) savEl.textContent = `+$${savings.toLocaleString()} Saved`;
  };

  window.playPulseVoiceSimulation = function () {
    if (navigator.vibrate) navigator.vibrate([30, 60]);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("We already have an annual contract with SwagUp, and we're not looking to switch vendors this quarter.");
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  window.openPulseGoogleModal = function () {
    if (typeof window.openGoogleAuthModal === 'function') {
      window.openGoogleAuthModal();
    }
  };
})();
