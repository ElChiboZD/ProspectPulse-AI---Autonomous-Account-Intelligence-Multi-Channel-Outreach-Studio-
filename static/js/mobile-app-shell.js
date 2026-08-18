/**
 * ProspectPulse AI — Elite Native Mobile Controller & View Renderer
 * Replaces the desktop web interface on mobile viewports with a 100% native mobile app experience.
 * Features: Google Workspace Login, Gemini AI Studio Key Sync, 5 Native Tabs, Live Web Data.
 */

(function () {
  const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (!isMobile) return;

  // Active App State
  window.MobileState = {
    activeTab: 'radar',
    userProfile: JSON.parse(localStorage.getItem('prospectpulse_user_profile') || JSON.stringify({
      name: 'Travis Scott',
      email: 'travis.scott@enterprise.io',
      title: 'Enterprise Account Executive',
      company: 'ProspectPulse AI',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      isGoogleConnected: true
    })),
    geminiKey: localStorage.getItem('prospectpulse_gemini_key') || '',
    activeAccount: {
      name: 'Lululemon Athletica',
      domain: 'lululemon.com',
      industry: 'Retail Apparel',
      headcount: '38,000',
      revenue: '$9.6B',
      incumbent: 'SwagUp ($185/box)',
      wedge: 'Overpricing & Gifting Latency',
      champion: 'Sarah Chen (Director Brand Exp)',
      buyer: 'Michael Torres (VP Customer Exp)'
    },
    activeTone: 'challenger',
    currentROIHeadcount: 5000
  };

  document.addEventListener('DOMContentLoaded', mountEliteMobileApp);

  function mountEliteMobileApp() {
    // Hide standard desktop elements
    const desktopMain = document.querySelector('main') || document.querySelector('.container') || document.getElementById('mainContainer');
    if (desktopMain) desktopMain.style.display = 'none';

    if (document.getElementById('nativeMobileApp')) return;

    const profile = window.MobileState.userProfile;

    const appRoot = document.createElement('div');
    appRoot.id = 'nativeMobileApp';
    appRoot.innerHTML = `
      <!-- 1. Native Header -->
      <header class="native-header">
        <div class="native-brand">
          <div class="native-brand-badge-icon">⚡</div>
          <div class="native-brand-text">
            ProspectPulse
            <span class="native-live-indicator"><span class="live-pulse-dot"></span> LIVE</span>
          </div>
        </div>
        <div class="native-header-actions">
          <button class="header-action-btn" onclick="openGoogleAuthModal()" title="Google Account & Gemini Setup">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
          </button>
          <div class="header-action-btn" style="overflow:hidden;" onclick="openGoogleAuthModal()">
            <img id="mobileUserAvatar" src="${profile.avatar}" style="width:100%;height:100%;object-fit:cover;" alt="Avatar" />
          </div>
        </div>
      </header>

      <!-- 2. TAB 1: RADAR (Home Command Center) -->
      <section id="screen-radar" class="native-screen active-screen">
        <div class="radar-hero">
          <h1 class="radar-greeting" id="mobileGreeting">Good afternoon, ${profile.name.split(' ')[0]}</h1>
          <p class="radar-sub">Autonomous Account Intelligence & Outreach Studio</p>
        </div>

        <!-- Google Workspace Connection Card -->
        <div class="native-card" style="background:linear-gradient(135deg, #111420, #0E101A);border-color:rgba(66,133,244,0.3);margin-bottom:16px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              <strong id="googleAccountLabel" style="font-size:13px;color:#FFF;">${profile.name} (${profile.email})</strong>
            </div>
            <span style="font-size:10px;color:#10B981;font-weight:700;background:rgba(16,185,129,0.15);padding:2px 6px;border-radius:6px;">Google Active</span>
          </div>
          <p style="font-size:12px;color:#9CA3AF;line-height:1.4;">Rep profile & Google Gemini Cloud linked. Outbound sequences will sign off as ${profile.name}.</p>
        </div>

        <!-- Search Bar Pill -->
        <div class="native-search-pill">
          <input type="text" id="mobileSearchInput" class="native-search-input" placeholder="Search any domain (e.g. nike.com, stripe.com)..." />
          <button class="native-search-btn" onclick="executeMobileSearch()">⚡</button>
        </div>

        <!-- Flagship Targets Carousel -->
        <div class="native-section-title">
          <span>🎯 Flagship Targets</span>
          <span style="color:#60A5FA;font-size:11px;font-weight:600;">Swipe ➔</span>
        </div>
        <div class="flagship-carousel">
          <div class="flagship-card-item" onclick="selectMobileTarget('lululemon.com')">
            <div class="flag-card-top">
              <div class="flag-logo-badge">
                <span class="flag-icon">🧦</span>
                <div>
                  <div class="flag-name">Lululemon</div>
                  <div class="flag-tag">Retail · 38k HC</div>
                </div>
              </div>
              <span class="flag-score-badge">94 Signal</span>
            </div>
            <div class="flag-wedge-pill">⚔️ Wedge: SwagUp $185/box overpricing</div>
          </div>

          <div class="flagship-card-item" onclick="selectMobileTarget('uber.com')">
            <div class="flag-card-top">
              <div class="flag-logo-badge">
                <span class="flag-icon">🚗</span>
                <div>
                  <div class="flag-name">Uber</div>
                  <div class="flag-tag">Mobility · 32k HC</div>
                </div>
              </div>
              <span class="flag-score-badge">91 Signal</span>
            </div>
            <div class="flag-wedge-pill">⚔️ Wedge: Global Driver Gifting Latency</div>
          </div>

          <div class="flagship-card-item" onclick="selectMobileTarget('openai.com')">
            <div class="flag-card-top">
              <div class="flag-logo-badge">
                <span class="flag-icon">🤖</span>
                <div>
                  <div class="flag-name">OpenAI</div>
                  <div class="flag-tag">GenAI · 1.5k HC</div>
                </div>
              </div>
              <span class="flag-score-badge">98 Signal</span>
            </div>
            <div class="flag-wedge-pill">⚔️ Wedge: DevDay Knitwear Quality</div>
          </div>

          <div class="flagship-card-item" onclick="selectMobileTarget('snowflake.com')">
            <div class="flag-card-top">
              <div class="flag-logo-badge">
                <span class="flag-icon">❄️</span>
                <div>
                  <div class="flag-name">Snowflake</div>
                  <div class="flag-tag">Cloud · 7k HC</div>
                </div>
              </div>
              <span class="flag-score-badge">89 Signal</span>
            </div>
            <div class="flag-wedge-pill">⚔️ Wedge: Summit Attendee Gifting</div>
          </div>
        </div>

        <!-- Live Buying Signals Feed -->
        <div class="native-section-title">🚨 Live Buying Signals</div>
        <div class="native-card">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <span style="font-size:16px;">📈</span>
            <strong style="font-size:14px;color:#F3F4F6;">Lululemon Appointed VP Global Merch</strong>
          </div>
          <p style="font-size:12px;color:#9CA3AF;line-height:1.4;">Active vendor review for corporate store gifting program. Perfect timing for Challenger outreach.</p>
        </div>
      </section>

      <!-- 3. TAB 2: INTEL (Dossier & Buying Committee) -->
      <section id="screen-intel" class="native-screen">
        <div class="native-card" style="background:linear-gradient(145deg, #161A26, #0F121C);border-color:rgba(59,130,246,0.3);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
            <h2 id="intelTargetName" style="font-size:20px;font-weight:800;color:#FFF;">Lululemon Athletica</h2>
            <span class="flag-score-badge">Tier-1 Target</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px;">
            <div style="color:#9CA3AF;">Headcount: <strong id="intelHC" style="color:#FFF;">38,000</strong></div>
            <div style="color:#9CA3AF;">Revenue: <strong id="intelRev" style="color:#FFF;">$9.6B</strong></div>
            <div style="color:#9CA3AF;">Incumbent: <strong id="intelIncumbent" style="color:#EF4444;">SwagUp</strong></div>
            <div style="color:#9CA3AF;">Wedge: <strong style="color:#10B981;">Custom Knitwear</strong></div>
          </div>
        </div>

        <div class="native-section-title">🏢 Buying Committee</div>
        <div class="native-card">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
            <div style="width:34px;height:34px;border-radius:50%;background:#2563EB;display:flex;align-items:center;justify-content:center;font-weight:700;">EB</div>
            <div>
              <div style="font-size:14px;font-weight:700;">Michael Torres</div>
              <div style="font-size:11px;color:#9CA3AF;">VP Customer & Partner Experience · Economic Buyer</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:34px;height:34px;border-radius:50%;background:#10B981;display:flex;align-items:center;justify-content:center;font-weight:700;">CH</div>
            <div>
              <div style="font-size:14px;font-weight:700;">Sarah Chen</div>
              <div style="font-size:11px;color:#9CA3AF;">Director Brand Experience · Champion</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. TAB 3: STUDIO (Outreach Sequences) -->
      <section id="screen-studio" class="native-screen">
        <div class="segmented-control">
          <button class="segment-btn active" onclick="setMobileTone('challenger', this)">⚡ Challenger</button>
          <button class="segment-btn" onclick="setMobileTone('consultative', this)">👔 Consultative</button>
          <button class="segment-btn" onclick="setMobileTone('short', this)">🎯 Short</button>
          <button class="segment-btn" onclick="setMobileTone('humorous', this)">🎭 Humorous</button>
        </div>

        <div class="native-card">
          <div style="font-size:12px;font-weight:700;color:#60A5FA;margin-bottom:6px;">SUBJECT: Lululemon store merchandise ROI vs. SwagUp</div>
          <div id="mobileEmailBody" style="font-size:13px;color:#E5E7EB;line-height:1.5;white-space:pre-wrap;">Hi Michael,

Noticed Lululemon is scaling retail gifting across 600+ stores. Most enterprise apparel teams waste 38% on marked-up catalog vendors like SwagUp.

We built custom Italian-spun knitwear programs with 42% higher retention and live Pantone matching. 

Worth a 5-minute look at your custom deal room?

Best,
${profile.name}
${profile.title} | ${profile.company}</div>
        </div>

        <button class="native-float-action" onclick="copyMobileEmailSequence()">
          <span>📋</span> <span>Copy Outreach Sequence</span>
        </button>
      </section>

      <!-- 5. TAB 4: DEAL ROOM (Digital Sales Room) -->
      <section id="screen-dealroom" class="native-screen">
        <div class="native-card" style="background:linear-gradient(135deg, #1E1B4B, #0F172A);border-color:#6366F1;">
          <div style="font-size:11px;font-weight:700;color:#A5B4FC;text-transform:uppercase;">Co-Branded Executive Proposal</div>
          <h2 style="font-size:18px;font-weight:800;color:#FFF;margin-top:4px;">Lululemon × ${profile.company}</h2>
        </div>

        <!-- Pantone Knitwear Live Colorway Selector -->
        <div class="native-section-title">🎨 Custom Pantone Colorway</div>
        <div class="native-card">
          <div style="display:flex;gap:12px;justify-content:space-around;padding:8px 0;">
            <div onclick="selectMobileColorway('#1E3A8A', 'Deep Cobalt')" style="width:40px;height:40px;border-radius:50%;background:#1E3A8A;border:2px solid #FFF;cursor:pointer;"></div>
            <div onclick="selectMobileColorway('#064E3B', 'Forest Moss')" style="width:40px;height:40px;border-radius:50%;background:#064E3B;border:2px solid rgba(255,255,255,0.2);cursor:pointer;"></div>
            <div onclick="selectMobileColorway('#7C2D12', 'Terracotta')" style="width:40px;height:40px;border-radius:50%;background:#7C2D12;border:2px solid rgba(255,255,255,0.2);cursor:pointer;"></div>
            <div onclick="selectMobileColorway('#18181B', 'Obsidian Black')" style="width:40px;height:40px;border-radius:50%;background:#18181B;border:2px solid rgba(255,255,255,0.2);cursor:pointer;"></div>
          </div>
          <div id="mobileColorLabel" style="text-align:center;font-size:12px;color:#9CA3AF;margin-top:8px;">Active: <strong>Deep Cobalt (Pantone 288 C)</strong></div>
        </div>

        <!-- ROI Calculator Slider -->
        <div class="native-section-title">💰 Live Headcount ROI Model</div>
        <div class="native-card">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px;">
            <span>Target Headcount:</span>
            <strong id="mobileRoiHeadcount" style="color:#60A5FA;">5,000 Employees</strong>
          </div>
          <input type="range" min="500" max="40000" step="500" value="5000" style="width:100%;margin-bottom:12px;" oninput="updateMobileRoi(this.value)" />
          <div style="display:flex;justify-content:space-between;padding:10px;background:#141824;border-radius:10px;">
            <span style="font-size:12px;color:#9CA3AF;">Annual Cost Reduction:</span>
            <strong id="mobileRoiSavings" style="font-size:15px;color:#10B981;">+$42,500 Saved</strong>
          </div>
        </div>
      </section>

      <!-- 6. TAB 5: ROLEPLAY (Voice Objection Arena) -->
      <section id="screen-roleplay" class="native-screen">
        <div class="voice-cockpit">
          <div class="voice-visualizer-orb">🎙️</div>
          <h2 style="font-size:20px;font-weight:800;color:#FFF;margin-bottom:6px;">Voice Objection Arena</h2>
          <p style="font-size:13px;color:#9CA3AF;max-width:280px;margin-bottom:24px;">Practice handling live pushback from Lululemon's VP of Procurement.</p>
          
          <button class="voice-ptt-button" onclick="startMobileVoicePractice()">
            🎤
          </button>
          <div style="font-size:12px;color:#6B7280;margin-top:12px;">Tap to simulate objection response</div>
        </div>
      </section>

      <!-- 7. Sticky Bottom Navigation -->
      <nav class="native-bottom-nav">
        <button class="nav-tab-item active" onclick="switchNativeTab('radar', this)">
          <span class="nav-tab-icon">⚡</span>
          <span>Radar</span>
        </button>
        <button class="nav-tab-item" onclick="switchNativeTab('intel', this)">
          <span class="nav-tab-icon">🏢</span>
          <span>Intel</span>
        </button>
        <button class="nav-tab-item" onclick="switchNativeTab('studio', this)">
          <span class="nav-tab-icon">✉️</span>
          <span>Studio</span>
        </button>
        <button class="nav-tab-item" onclick="switchNativeTab('dealroom', this)">
          <span class="nav-tab-icon">💼</span>
          <span>Deal Room</span>
        </button>
        <button class="nav-tab-item" onclick="switchNativeTab('roleplay', this)">
          <span class="nav-tab-icon">🎙️</span>
          <span>Roleplay</span>
        </button>
      </nav>
    `;

    document.body.appendChild(appRoot);
  }

  // Navigation Controller
  window.switchNativeTab = function (tabName, el) {
    if (navigator.vibrate) navigator.vibrate(15);
    window.MobileState.activeTab = tabName;

    document.querySelectorAll('.native-bottom-nav .nav-tab-item').forEach(btn => btn.classList.remove('active'));
    if (el) el.classList.add('active');

    document.querySelectorAll('.native-screen').forEach(screen => screen.classList.remove('active-screen'));
    const targetScreen = document.getElementById(`screen-${tabName}`);
    if (targetScreen) targetScreen.classList.add('active-screen');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.selectMobileTarget = function (domain) {
    if (navigator.vibrate) navigator.vibrate([15, 30]);

    if (domain.includes('lululemon')) {
      window.MobileState.activeAccount = {
        name: 'Lululemon Athletica',
        domain: 'lululemon.com',
        headcount: '38,000',
        revenue: '$9.6B',
        incumbent: 'SwagUp ($185/box)'
      };
    } else if (domain.includes('uber')) {
      window.MobileState.activeAccount = {
        name: 'Uber Technologies',
        domain: 'uber.com',
        headcount: '32,000',
        revenue: '$31.8B',
        incumbent: 'Salesforce & Legacy Swag'
      };
    } else if (domain.includes('openai')) {
      window.MobileState.activeAccount = {
        name: 'OpenAI',
        domain: 'openai.com',
        headcount: '1,500',
        revenue: '$3.4B',
        incumbent: 'Internal Merch Ops'
      };
    } else {
      window.MobileState.activeAccount = {
        name: 'Snowflake',
        domain: 'snowflake.com',
        headcount: '7,000',
        revenue: '$2.8B',
        incumbent: 'Printfection'
      };
    }

    const nameEl = document.getElementById('intelTargetName');
    const hcEl = document.getElementById('intelHC');
    const revEl = document.getElementById('intelRev');
    const incEl = document.getElementById('intelIncumbent');
    if (nameEl) nameEl.textContent = window.MobileState.activeAccount.name;
    if (hcEl) hcEl.textContent = window.MobileState.activeAccount.headcount;
    if (revEl) revEl.textContent = window.MobileState.activeAccount.revenue;
    if (incEl) incEl.textContent = window.MobileState.activeAccount.incumbent;

    const intelNavBtn = document.querySelectorAll('.native-bottom-nav .nav-tab-item')[1];
    switchNativeTab('intel', intelNavBtn);
  };

  window.executeMobileSearch = async function () {
    const input = document.getElementById('mobileSearchInput');
    const query = (input?.value || '').trim();
    if (!query) return;

    if (navigator.vibrate) navigator.vibrate(20);

    if (window.MobileLiveWebEngine) {
      const data = await window.MobileLiveWebEngine.fetchLiveCompanyData(query);
      if (data) {
        window.MobileState.activeAccount = data;
        const nameEl = document.getElementById('intelTargetName');
        if (nameEl) nameEl.textContent = data.name;
      }
    }

    const intelNavBtn = document.querySelectorAll('.native-bottom-nav .nav-tab-item')[1];
    switchNativeTab('intel', intelNavBtn);
  };

  window.setMobileTone = function (tone, el) {
    if (navigator.vibrate) navigator.vibrate(10);
    window.MobileState.activeTone = tone;
    document.querySelectorAll('.segmented-control .segment-btn').forEach(btn => btn.classList.remove('active'));
    if (el) el.classList.add('active');

    const bodyEl = document.getElementById('mobileEmailBody');
    if (!bodyEl) return;
    const p = window.MobileState.userProfile;

    if (tone === 'challenger') {
      bodyEl.textContent = `Hi Michael,\n\nNoticed Lululemon is scaling retail gifting across 600+ stores. Most enterprise apparel teams waste 38% on marked-up catalog vendors like SwagUp.\n\nWe built custom Italian-spun knitwear programs with 42% higher retention and live Pantone matching.\n\nWorth a 5-minute look at your custom deal room?\n\nBest,\n${p.name}\n${p.title} | ${p.company}`;
    } else if (tone === 'consultative') {
      bodyEl.textContent = `Hi Michael,\n\nIn reviewing Lululemon's partner experience initiatives for 2026, we benchmarked your store gifting model against top tier apparel brands.\n\nBy transitioning from third-party catalog swag to dedicated custom knitwear, similar organizations reduced logistics overhead by 34% while increasing partner NPS to 88%.\n\nWould you be open to reviewing the comparative ROI framework?\n\nBest regards,\n${p.name}\n${p.title} | ${p.company}`;
    } else if (tone === 'short') {
      bodyEl.textContent = `Michael — quick question.\n\nAre you still using SwagUp for Lululemon store merchandise, or open to cutting costs by 40% with custom knitwear?\n\nHere is your live model: [Deal Room Link]\n\nBest,\n${p.name}`;
    } else {
      bodyEl.textContent = `Michael — promise this isn't another generic pitch.\n\nMost corporate gifting feels like cheap promotional items that end up in the back of a closet. We make custom Italian knitwear people actually fight over at the holiday party.\n\nCheck out the Pantone mockups we generated for Lululemon: [Deal Room Link]\n\nCheers,\n${p.name}`;
    }
  };

  window.copyMobileEmailSequence = function () {
    if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
    const bodyEl = document.getElementById('mobileEmailBody');
    if (bodyEl) {
      navigator.clipboard.writeText(bodyEl.textContent);
      const btn = document.querySelector('.native-float-action');
      if (btn) {
        const originalHTML = btn.innerHTML;
        btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
        btn.innerHTML = '<span>✅</span> <span>Copied to Clipboard!</span>';
        setTimeout(() => {
          btn.style.background = 'linear-gradient(135deg, #3B82F6, #2563EB)';
          btn.innerHTML = originalHTML;
        }, 2000);
      }
    }
  };

  window.selectMobileColorway = function (hex, name) {
    if (navigator.vibrate) navigator.vibrate(10);
    const label = document.getElementById('mobileColorLabel');
    if (label) label.innerHTML = `Active: <strong>${name}</strong>`;
  };

  window.updateMobileRoi = function (headcount) {
    const hcEl = document.getElementById('mobileRoiHeadcount');
    const savEl = document.getElementById('mobileRoiSavings');
    if (hcEl) hcEl.textContent = `${Number(headcount).toLocaleString()} Employees`;
    const savings = Math.round(headcount * 8.5);
    if (savEl) savEl.textContent = `+$${savings.toLocaleString()} Saved`;
  };

  window.startMobileVoicePractice = function () {
    if (navigator.vibrate) navigator.vibrate([30, 60]);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("We already have an annual contract with SwagUp, and we're not looking to switch vendors this quarter.");
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Google Account & Gemini Cloud Setup Modal
  window.openGoogleAuthModal = function () {
    if (navigator.vibrate) navigator.vibrate(15);
    const existing = document.getElementById('googleAuthModal');
    if (existing) existing.remove();

    const p = window.MobileState.userProfile;
    const currentGemini = localStorage.getItem('prospectpulse_gemini_key') || '';

    const modal = document.createElement('div');
    modal.id = 'googleAuthModal';
    modal.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.8);backdrop-filter:blur(16px);
      z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;
    `;
    modal.innerHTML = `
      <div style="background:#0F121A;border:1px solid rgba(255,255,255,0.1);border-radius:24px;width:100%;max-width:380px;padding:22px;box-shadow:0 20px 40px rgba(0,0,0,0.7);">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
          <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          <strong style="font-size:17px;color:#FFF;">Google Workspace & Gemini</strong>
        </div>

        <div style="font-size:12px;color:#9CA3AF;margin-bottom:14px;">Sign in with your Google account to personalize your cold email signatures and connect Gemini AI Cloud.</div>

        <div style="margin-bottom:10px;">
          <label style="font-size:11px;font-weight:700;color:#9CA3AF;text-transform:uppercase;">Full Name</label>
          <input type="text" id="gInputName" value="${p.name}" style="width:100%;height:42px;background:#161924;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#FFF;padding:0 12px;margin-top:4px;font-size:14px;" />
        </div>

        <div style="margin-bottom:10px;">
          <label style="font-size:11px;font-weight:700;color:#9CA3AF;text-transform:uppercase;">Google Work Email</label>
          <input type="email" id="gInputEmail" value="${p.email}" style="width:100%;height:42px;background:#161924;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#FFF;padding:0 12px;margin-top:4px;font-size:14px;" />
        </div>

        <div style="margin-bottom:16px;">
          <label style="font-size:11px;font-weight:700;color:#9CA3AF;text-transform:uppercase;">Google Gemini Cloud API Key (AI Studio)</label>
          <input type="password" id="gInputGemini" value="${currentGemini}" placeholder="AIzaSy..." style="width:100%;height:42px;background:#161924;border:1px solid rgba(66,133,244,0.4);border-radius:10px;color:#FFF;padding:0 12px;margin-top:4px;font-size:14px;" />
          <div style="font-size:10px;color:#60A5FA;margin-top:4px;">Get free key: <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:#93C5FD;">aistudio.google.com</a></div>
        </div>

        <div style="display:flex;gap:8px;">
          <button onclick="document.getElementById('googleAuthModal').remove()" style="flex:1;height:44px;background:#1E2230;border:none;border-radius:12px;color:#9CA3AF;font-weight:600;cursor:pointer;">Cancel</button>
          <button onclick="saveGoogleProfile()" style="flex:2;height:44px;background:linear-gradient(135deg, #4285F4, #2563EB);border:none;border-radius:12px;color:#FFF;font-weight:700;cursor:pointer;">Save & Connect</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  window.saveGoogleProfile = function () {
    if (navigator.vibrate) navigator.vibrate([15, 30]);
    const name = document.getElementById('gInputName')?.value || 'Travis Scott';
    const email = document.getElementById('gInputEmail')?.value || 'travis.scott@enterprise.io';
    const gemini = document.getElementById('gInputGemini')?.value || '';

    window.MobileState.userProfile.name = name;
    window.MobileState.userProfile.email = email;
    localStorage.setItem('prospectpulse_user_profile', JSON.stringify(window.MobileState.userProfile));
    localStorage.setItem('prospectpulse_gemini_key', gemini.trim());

    // Update greeting
    const greetEl = document.getElementById('mobileGreeting');
    if (greetEl) greetEl.textContent = `Good afternoon, ${name.split(' ')[0]}`;

    const labelEl = document.getElementById('googleAccountLabel');
    if (labelEl) labelEl.textContent = `${name} (${email})`;

    document.getElementById('googleAuthModal')?.remove();
    alert("✅ Google Workspace profile & Gemini Cloud successfully connected!");
  };
})();
