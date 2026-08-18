/**
 * ProspectPulse AI — Material 3 (Material You) Google-Style Mobile App Controller
 * Delivers an uncluttered, streamlined mobile experience following Google Workspace design guidelines.
 */

(function () {
  const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (!isMobile) return;

  window.M3App = {
    activeTab: 'home',
    filter: 'all',
    account: {
      name: 'Lululemon Athletica',
      domain: 'lululemon.com',
      industry: 'Retail & Apparel',
      headcount: '38,000',
      revenue: '$9.6B',
      incumbent: 'SwagUp',
      wedge: 'Overpricing & Catalog Markup',
      buyer: 'Michael Torres',
      buyerTitle: 'VP Customer Experience',
      champion: 'Sarah Chen',
      championTitle: 'Director Brand Experience'
    },
    tone: 'challenger',
    roiHc: 5000,
    swatchColor: '#1E3A8A',
    swatchName: 'Deep Cobalt (Pantone 288 C)'
  };

  document.addEventListener('DOMContentLoaded', initMaterial3App);

  function initMaterial3App() {
    document.body.classList.add('material-you-app');

    // Hide desktop layout
    const desktopMain = document.querySelector('main') || document.querySelector('.container') || document.getElementById('mainContainer');
    if (desktopMain) desktopMain.style.display = 'none';

    // Remove legacy mobile shells
    ['nativeMobileApp', 'pulseMobileRoot'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });

    renderM3Layout();
  }

  function renderM3Layout() {
    if (document.getElementById('m3AppRoot')) return;

    const userProfile = window.MobileState?.userProfile || {
      name: 'Travis Scott',
      email: 'travis.scott@enterprise.io',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    };

    const root = document.createElement('div');
    root.id = 'm3AppRoot';
    root.innerHTML = `
      <!-- 1. Material 3 Search Header (Google Drive / Gmail Style) -->
      <header class="m3-search-header-wrap">
        <div class="m3-search-bar">
          <span class="m3-search-icon">🔍</span>
          <input type="text" id="m3SearchField" class="m3-search-input" placeholder="Search accounts (e.g. nike.com)..." onkeydown="if(event.key==='Enter') executeM3Search()" />
          <button class="m3-avatar-btn" onclick="openM3AuthDialog()" title="Google Account">
            <img id="m3HeaderAvatar" src="${userProfile.avatar}" class="m3-avatar-img" alt="Google Profile" />
          </button>
        </div>
      </header>

      <!-- 2. Material 3 Filter Chips -->
      <div class="m3-chips-scroll" id="m3ChipsBar">
        <button class="m3-chip active" onclick="setM3Filter('all', this)">✨ All Signals</button>
        <button class="m3-chip" onclick="setM3Filter('retail', this)">Retail</button>
        <button class="m3-chip" onclick="setM3Filter('tech', this)">Enterprise Tech</button>
        <button class="m3-chip" onclick="setM3Filter('cloud', this)">Cloud & AI</button>
      </div>

      <!-- 3. TAB 1: HOME (Streamlined Accounts Feed) -->
      <div id="m3-view-home" class="m3-content-view">
        <div class="m3-section-headline">
          <span>Priority Accounts</span>
          <span style="font-size:12px;color:var(--md-outline);">4 Signals Ready</span>
        </div>

        <div class="m3-card" onclick="selectM3Account('lululemon.com')">
          <div class="m3-account-row">
            <div class="m3-account-avatar" style="background:#004A77;color:#D3E3FD;">LL</div>
            <div class="m3-account-info">
              <div class="m3-account-title">Lululemon Athletica</div>
              <div class="m3-account-subtitle">Retail · 38k Employees · $9.6B</div>
            </div>
            <span class="m3-badge-pill">94 Signal</span>
          </div>
        </div>

        <div class="m3-card" onclick="selectM3Account('uber.com')">
          <div class="m3-account-row">
            <div class="m3-account-avatar" style="background:#0F5223;color:#C4EED0;">UB</div>
            <div class="m3-account-info">
              <div class="m3-account-title">Uber Technologies</div>
              <div class="m3-account-subtitle">Mobility · 32k Employees · $31.8B</div>
            </div>
            <span class="m3-badge-pill">91 Signal</span>
          </div>
        </div>

        <div class="m3-card" onclick="selectM3Account('openai.com')">
          <div class="m3-account-row">
            <div class="m3-account-avatar" style="background:#4A2800;color:#FFDCC1;">OA</div>
            <div class="m3-account-info">
              <div class="m3-account-title">OpenAI</div>
              <div class="m3-account-subtitle">GenAI · 1.5k Employees · $3.4B</div>
            </div>
            <span class="m3-badge-pill">98 Signal</span>
          </div>
        </div>

        <div class="m3-card" onclick="selectM3Account('snowflake.com')">
          <div class="m3-account-row">
            <div class="m3-account-avatar" style="background:#3C1E63;color:#E8DDFF;">SN</div>
            <div class="m3-account-info">
              <div class="m3-account-title">Snowflake</div>
              <div class="m3-account-subtitle">Cloud · 7k Employees · $2.8B</div>
            </div>
            <span class="m3-badge-pill">89 Signal</span>
          </div>
        </div>
      </div>

      <!-- 4. TAB 2: INTEL (Clean Account Dossier) -->
      <div id="m3-view-intel" class="m3-content-view" style="display:none;">
        <div class="m3-card" style="background:var(--md-surface-container-high);">
          <div style="font-size:12px;font-weight:600;color:var(--md-primary);text-transform:uppercase;">Account Intel</div>
          <h2 id="m3TargetName" style="font-size:22px;font-weight:600;color:var(--md-on-surface);margin:4px 0 10px 0;">Lululemon Athletica</h2>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:13px;">
            <div><span style="color:var(--md-outline);">Headcount:</span> <strong id="m3TargetHC" style="color:var(--md-on-surface);">38,000</strong></div>
            <div><span style="color:var(--md-outline);">Revenue:</span> <strong id="m3TargetRev" style="color:var(--md-on-surface);">$9.6B</strong></div>
            <div><span style="color:var(--md-outline);">Incumbent:</span> <strong id="m3TargetIncumbent" style="color:#F2B8B5;">SwagUp</strong></div>
            <div><span style="color:var(--md-outline);">Wedge:</span> <strong style="color:#C4EED0;">Custom Knitwear</strong></div>
          </div>
        </div>

        <div class="m3-section-headline"><span>Buying Committee</span></div>
        <div class="m3-card">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
            <div style="width:36px;height:36px;border-radius:50%;background:var(--md-primary-container);color:var(--md-on-primary-container);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;">EB</div>
            <div>
              <div style="font-size:14px;font-weight:600;color:var(--md-on-surface);">Michael Torres</div>
              <div style="font-size:12px;color:var(--md-on-surface-variant);">VP Customer & Partner Exp · Economic Buyer</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:50%;background:var(--md-tertiary-container);color:var(--md-on-tertiary-container);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;">CH</div>
            <div>
              <div style="font-size:14px;font-weight:600;color:var(--md-on-surface);">Sarah Chen</div>
              <div style="font-size:12px;color:var(--md-on-surface-variant);">Director Brand Exp · Champion</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. TAB 3: STUDIO (Streamlined Email Sequences) -->
      <div id="m3-view-studio" class="m3-content-view" style="display:none;">
        <div class="m3-segmented-row">
          <button class="m3-segment-item active" onclick="setM3Tone('challenger', this)">Challenger</button>
          <button class="m3-segment-item" onclick="setM3Tone('consultative', this)">Consultative</button>
          <button class="m3-segment-item" onclick="setM3Tone('short', this)">Short</button>
        </div>

        <div class="m3-card" style="background:var(--md-surface-container-high);">
          <div style="font-size:12px;font-weight:600;color:var(--md-primary);margin-bottom:6px;">SUBJECT: Lululemon retail gifting vs. SwagUp</div>
          <div id="m3EmailBody" style="font-size:14px;color:var(--md-on-surface);line-height:1.5;white-space:pre-wrap;">Hi Michael,

Noticed Lululemon is scaling retail partner gifting across 600+ stores. Most enterprise apparel teams lose 38% on marked-up catalog vendors like SwagUp.

We built custom Italian-spun knitwear programs with 42% higher retention and live Pantone color matching.

Worth a 5-minute look at your custom deal room?

Best,
Travis Scott
Enterprise Account Executive | ProspectPulse AI</div>
        </div>

        <button class="m3-btn-filled" onclick="copyM3Sequence()">
          <span>📋</span> <span id="m3CopyBtnLabel">Copy Sequence</span>
        </button>
      </div>

      <!-- 6. TAB 4: DEAL ROOM (Material ROI & Swatches) -->
      <div id="m3-view-dealroom" class="m3-content-view" style="display:none;">
        <div class="m3-card" style="text-align:center;">
          <div style="font-size:12px;font-weight:600;color:var(--md-primary);text-transform:uppercase;">Custom Knitwear Preview</div>
          <h3 style="font-size:17px;font-weight:600;color:var(--md-on-surface);margin-top:2px;">Lululemon Merchandise Studio</h3>

          <svg id="m3SweaterSvg" style="width:110px;height:110px;margin:12px auto;" viewBox="0 0 100 100">
            <path id="m3SweaterPath" d="M30,20 L40,15 L60,15 L70,20 L85,35 L75,45 L68,38 L68,85 L32,85 L32,38 L25,45 L15,35 Z" fill="#1E3A8A" stroke="#FFF" stroke-width="1.5"/>
            <text x="50" y="55" font-size="10" font-weight="bold" fill="#FFF" text-anchor="middle">lululemon</text>
          </svg>

          <div style="display:flex;gap:12px;justify-content:center;margin-top:8px;">
            <div style="width:36px;height:36px;border-radius:50%;background:#1E3A8A;border:2px solid #FFF;cursor:pointer;" onclick="changeM3Swatch('#1E3A8A', 'Deep Cobalt (Pantone 288 C)')"></div>
            <div style="width:36px;height:36px;border-radius:50%;background:#064E3B;border:2px solid transparent;cursor:pointer;" onclick="changeM3Swatch('#064E3B', 'Forest Moss (Pantone 343 C)')"></div>
            <div style="width:36px;height:36px;border-radius:50%;background:#7C2D12;border:2px solid transparent;cursor:pointer;" onclick="changeM3Swatch('#7C2D12', 'Terracotta (Pantone 7586 C)')"></div>
            <div style="width:36px;height:36px;border-radius:50%;background:#18181B;border:2px solid transparent;cursor:pointer;" onclick="changeM3Swatch('#18181B', 'Obsidian Black (Pantone Black 6 C)')"></div>
          </div>
          <div id="m3SwatchLabel" style="font-size:12px;color:var(--md-outline);margin-top:8px;">Active: Deep Cobalt (Pantone 288 C)</div>
        </div>

        <div class="m3-section-headline"><span>Headcount ROI Model</span></div>
        <div class="m3-card">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px;">
            <span style="color:var(--md-on-surface-variant);">Headcount:</span>
            <strong id="m3RoiHc" style="color:var(--md-primary);">5,000 Employees</strong>
          </div>
          <input type="range" min="500" max="40000" step="500" value="5000" style="width:100%;margin-bottom:12px;" oninput="updateM3Roi(this.value)" />
          <div style="display:flex;justify-content:space-between;padding:10px;background:var(--md-surface-container-high);border-radius:8px;">
            <span style="font-size:12px;color:var(--md-on-surface-variant);">Annual Projected Savings:</span>
            <strong id="m3RoiSavings" style="font-size:14px;color:#C4EED0;">+$42,500 Saved</strong>
          </div>
        </div>
      </div>

      <!-- 7. TAB 5: ROLEPLAY (Google Assistant Voice Cockpit) -->
      <div id="m3-view-roleplay" class="m3-content-view" style="display:none;text-align:center;padding-top:30px;">
        <div style="width:120px;height:120px;border-radius:50%;background:var(--md-primary-container);color:var(--md-on-primary-container);display:flex;align-items:center;justify-content:center;font-size:48px;margin:0 auto 20px auto;box-shadow:0 0 40px rgba(168,199,250,0.3);">🎙️</div>
        <h2 style="font-size:20px;font-weight:600;color:var(--md-on-surface);margin-bottom:4px;">Voice Objection Arena</h2>
        <p style="font-size:13px;color:var(--md-outline);max-width:280px;margin:0 auto 24px auto;">Simulate live procurement objection audio from Lululemon's VP.</p>
        <button onclick="playM3VoiceSimulation()" style="width:72px;height:72px;border-radius:50%;background:#F2B8B5;color:#601410;border:none;font-size:28px;display:flex;align-items:center;justify-content:center;margin:0 auto;box-shadow:0 4px 16px rgba(242,184,181,0.3);cursor:pointer;">
          🎤
        </button>
      </div>

      <!-- 8. Material 3 Bottom Navigation Bar (Google App Standard) -->
      <nav class="m3-bottom-nav-bar">
        <button class="m3-nav-item active" onclick="switchM3Tab('home', this)">
          <div class="m3-nav-icon-pill">🏠</div>
          <span class="m3-nav-label">Home</span>
        </button>
        <button class="m3-nav-item" onclick="switchM3Tab('intel', this)">
          <div class="m3-nav-icon-pill">🏢</div>
          <span class="m3-nav-label">Intel</span>
        </button>
        <button class="m3-nav-item" onclick="switchM3Tab('studio', this)">
          <div class="m3-nav-icon-pill">✉️</div>
          <span class="m3-nav-label">Studio</span>
        </button>
        <button class="m3-nav-item" onclick="switchM3Tab('dealroom', this)">
          <div class="m3-nav-icon-pill">💼</div>
          <span class="m3-nav-label">Deal Room</span>
        </button>
        <button class="m3-nav-item" onclick="switchM3Tab('roleplay', this)">
          <div class="m3-nav-icon-pill">🎙️</div>
          <span class="m3-nav-label">Roleplay</span>
        </button>
      </nav>
    `;

    document.body.appendChild(root);
  }

  window.switchM3Tab = function (tab, el) {
    if (navigator.vibrate) navigator.vibrate(10);
    window.M3App.activeTab = tab;

    document.querySelectorAll('.m3-bottom-nav-bar .m3-nav-item').forEach(b => b.classList.remove('active'));
    if (el) el.classList.add('active');

    ['home', 'intel', 'studio', 'dealroom', 'roleplay'].forEach(view => {
      const viewEl = document.getElementById(`m3-view-${view}`);
      if (viewEl) viewEl.style.display = view === tab ? 'block' : 'none';
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.setM3Filter = function (filter, el) {
    if (navigator.vibrate) navigator.vibrate(8);
    document.querySelectorAll('#m3ChipsBar .m3-chip').forEach(c => c.classList.remove('active'));
    if (el) el.classList.add('active');
  };

  window.selectM3Account = function (domain) {
    if (navigator.vibrate) navigator.vibrate(15);
    if (domain.includes('lululemon')) {
      window.M3App.account = {
        name: 'Lululemon Athletica',
        headcount: '38,000',
        revenue: '$9.6B',
        incumbent: 'SwagUp'
      };
    } else if (domain.includes('uber')) {
      window.M3App.account = {
        name: 'Uber Technologies',
        headcount: '32,000',
        revenue: '$31.8B',
        incumbent: 'Salesforce & Legacy Swag'
      };
    } else if (domain.includes('openai')) {
      window.M3App.account = {
        name: 'OpenAI',
        headcount: '1,500',
        revenue: '$3.4B',
        incumbent: 'Internal Merch Ops'
      };
    } else {
      window.M3App.account = {
        name: 'Snowflake',
        headcount: '7,000',
        revenue: '$2.8B',
        incumbent: 'Printfection'
      };
    }

    const nameEl = document.getElementById('m3TargetName');
    const hcEl = document.getElementById('m3TargetHC');
    const revEl = document.getElementById('m3TargetRev');
    const incEl = document.getElementById('m3TargetIncumbent');
    if (nameEl) nameEl.textContent = window.M3App.account.name;
    if (hcEl) hcEl.textContent = window.M3App.account.headcount;
    if (revEl) revEl.textContent = window.M3App.account.revenue;
    if (incEl) incEl.textContent = window.M3App.account.incumbent;

    const intelTab = document.querySelectorAll('.m3-bottom-nav-bar .m3-nav-item')[1];
    switchM3Tab('intel', intelTab);
  };

  window.executeM3Search = async function () {
    const input = document.getElementById('m3SearchField');
    const query = (input?.value || '').trim();
    if (!query) return;

    if (navigator.vibrate) navigator.vibrate(15);

    if (window.MobileLiveWebEngine) {
      const data = await window.MobileLiveWebEngine.fetchLiveCompanyData(query);
      if (data) {
        window.M3App.account = data;
        const nameEl = document.getElementById('m3TargetName');
        if (nameEl) nameEl.textContent = data.name;
      }
    }

    const intelTab = document.querySelectorAll('.m3-bottom-nav-bar .m3-nav-item')[1];
    switchM3Tab('intel', intelTab);
  };

  window.setM3Tone = function (tone, el) {
    if (navigator.vibrate) navigator.vibrate(8);
    document.querySelectorAll('.m3-segmented-row .m3-segment-item').forEach(b => b.classList.remove('active'));
    if (el) el.classList.add('active');

    const bodyEl = document.getElementById('m3EmailBody');
    if (!bodyEl) return;

    if (tone === 'challenger') {
      bodyEl.textContent = `Hi Michael,\n\nNoticed Lululemon is scaling retail partner gifting across 600+ stores. Most enterprise apparel teams lose 38% on marked-up catalog vendors like SwagUp.\n\nWe built custom Italian-spun knitwear programs with 42% higher retention and live Pantone color matching.\n\nWorth a 5-minute look at your custom deal room?\n\nBest,\nTravis Scott\nEnterprise Account Executive | ProspectPulse AI`;
    } else if (tone === 'consultative') {
      bodyEl.textContent = `Hi Michael,\n\nIn reviewing Lululemon's 2026 partner experience benchmarks, we analyzed the cost structure of third-party catalog swag against bespoke knitwear programs.\n\nSimilar retail enterprises saw partner NPS increase from 62% to 89% while reducing logistics overhead by 34%.\n\nWould you be open to reviewing the comparative ROI model?\n\nBest regards,\nTravis Scott\nEnterprise Account Executive | ProspectPulse AI`;
    } else {
      bodyEl.textContent = `Michael — quick question.\n\nAre you still using SwagUp for Lululemon store merchandise, or open to cutting costs by 40% with custom knitwear?\n\nHere is your live model: [Deal Room Link]\n\nBest,\nTravis Scott`;
    }
  };

  window.copyM3Sequence = function () {
    if (navigator.vibrate) navigator.vibrate([15, 30]);
    const bodyEl = document.getElementById('m3EmailBody');
    if (bodyEl) {
      navigator.clipboard.writeText(bodyEl.textContent);
      const label = document.getElementById('m3CopyBtnLabel');
      if (label) {
        label.textContent = '✅ Copied to Clipboard!';
        setTimeout(() => { label.textContent = 'Copy Sequence'; }, 2000);
      }
    }
  };

  window.changeM3Swatch = function (hex, name) {
    if (navigator.vibrate) navigator.vibrate(8);
    const path = document.getElementById('m3SweaterPath');
    const label = document.getElementById('m3SwatchLabel');
    if (path) path.setAttribute('fill', hex);
    if (label) label.textContent = `Active: ${name}`;
  };

  window.updateM3Roi = function (headcount) {
    const hcEl = document.getElementById('m3RoiHc');
    const savEl = document.getElementById('m3RoiSavings');
    if (hcEl) hcEl.textContent = `${Number(headcount).toLocaleString()} Employees`;
    const savings = Math.round(headcount * 8.5);
    if (savEl) savEl.textContent = `+$${savings.toLocaleString()} Saved`;
  };

  window.playM3VoiceSimulation = function () {
    if (navigator.vibrate) navigator.vibrate(20);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("We already have an annual contract with SwagUp, and we're not looking to switch vendors this quarter.");
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  window.openM3AuthDialog = function () {
    if (typeof window.openGoogleAuthModal === 'function') {
      window.openGoogleAuthModal();
    }
  };
})();
