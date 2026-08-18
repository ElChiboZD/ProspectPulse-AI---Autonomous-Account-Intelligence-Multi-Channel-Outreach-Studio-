/**
 * ProspectPulse AI — Mobile-Native UI Controller
 * Renders native top/bottom bars, cards, and smooth touch interactions on mobile viewports.
 */

(function () {
  const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  if (!isMobile) return;

  document.addEventListener('DOMContentLoaded', initMobileNativeUI);

  function initMobileNativeUI() {
    document.body.classList.add('is-mobile-native');

    // 1. Create and inject Native Mobile Top Header
    createMobileHeader();

    // 2. Create and inject Native Bottom Navigation Bar
    createMobileBottomNav();

    // 3. Enhance Screen 1 Flagship Launch Cards for Touch
    enhanceMobileScreen1();

    // 4. Setup Touch Gestures (Swipe between screens)
    setupMobileSwipes();
  }

  function createMobileHeader() {
    if (document.getElementById('mobileNativeHeader')) return;

    const header = document.createElement('div');
    header.id = 'mobileNativeHeader';
    header.innerHTML = `
      <div class="mobile-brand" onclick="window.gotoScreen && window.gotoScreen(1)">
        <div class="mobile-logo-icon">⚡</div>
        <div class="mobile-brand-title">
          ProspectPulse
          <span class="mobile-brand-badge">AI</span>
        </div>
      </div>
      <div class="mobile-header-actions">
        <button id="mobileToolsBtn" class="mob-tab-btn" style="padding:4px 8px;font-size:16px;" onclick="window.toggleToolsDropdown && window.toggleToolsDropdown(event)">🛠️</button>
        <div class="mobile-avatar-btn" onclick="window.openAuthWizard && window.openAuthWizard()">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
        </div>
      </div>
    `;
    document.body.insertBefore(header, document.body.firstChild);
  }

  function createMobileBottomNav() {
    if (document.getElementById('mobileNativeBottomBar')) return;

    const nav = document.createElement('div');
    nav.id = 'mobileNativeBottomBar';
    nav.innerHTML = `
      <button class="mob-tab-btn active" data-screen="1" onclick="switchMobileScreen(1)">
        <span class="mob-tab-icon">⚡</span>
        <span>Radar</span>
      </button>
      <button class="mob-tab-btn" data-screen="2" onclick="switchMobileScreen(2)">
        <span class="mob-tab-icon">🏢</span>
        <span>Intel</span>
      </button>
      <button class="mob-tab-btn" data-screen="4" onclick="switchMobileScreen(4)">
        <span class="mob-tab-icon">✉️</span>
        <span>Studio</span>
      </button>
      <button class="mob-tab-btn" data-screen="5" onclick="switchMobileScreen(5)">
        <span class="mob-tab-icon">💼</span>
        <span>Deal Room</span>
      </button>
      <button class="mob-tab-btn" data-screen="6" onclick="switchMobileScreen(6)">
        <span class="mob-tab-icon">🎙️</span>
        <span>Roleplay</span>
      </button>
    `;
    document.body.appendChild(nav);
  }

  window.switchMobileScreen = function (screenNum) {
    if (navigator.vibrate) navigator.vibrate(15);

    // Update bottom bar active tab
    const tabs = document.querySelectorAll('#mobileNativeBottomBar .mob-tab-btn');
    tabs.forEach(tab => {
      const target = parseInt(tab.getAttribute('data-screen'), 10);
      tab.classList.toggle('active', target === screenNum);
    });

    // Call app's gotoScreen
    if (typeof window.gotoScreen === 'function') {
      window.gotoScreen(screenNum);
    } else {
      // Fallback: Toggle screens manually
      for (let i = 1; i <= 6; i++) {
        const el = document.getElementById(`screen${i}`) || document.getElementById(`step${i}`);
        if (el) el.style.display = i === screenNum ? 'block' : 'none';
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function enhanceMobileScreen1() {
    const screen1 = document.getElementById('screen1') || document.getElementById('step1') || document.querySelector('.screen:first-child');
    if (!screen1) return;

    // Check if mobile flagship container exists
    let flagshipContainer = screen1.querySelector('.mobile-flagship-grid');
    if (!flagshipContainer) {
      const grid = document.createElement('div');
      grid.className = 'mobile-flagship-grid';
      grid.innerHTML = `
        <div class="mobile-flagship-card" onclick="window.runTestDriveAccount && window.runTestDriveAccount('lululemon.com')">
          <div class="mob-flag-header">
            <span class="mob-flag-icon">🧦</span>
            <div>
              <div class="mob-flag-name">Lululemon</div>
              <div class="mob-flag-tag">Apparel · 38k HC</div>
            </div>
          </div>
          <div class="mob-flag-wedge">Wedge: SwagUp Overpricing</div>
        </div>

        <div class="mobile-flagship-card" onclick="window.runTestDriveAccount && window.runTestDriveAccount('uber.com')">
          <div class="mob-flag-header">
            <span class="mob-flag-icon">🚗</span>
            <div>
              <div class="mob-flag-name">Uber</div>
              <div class="mob-flag-tag">Mobility · 32k HC</div>
            </div>
          </div>
          <div class="mob-flag-wedge">Wedge: Driver Gifting Latency</div>
        </div>

        <div class="mobile-flagship-card" onclick="window.runTestDriveAccount && window.runTestDriveAccount('openai.com')">
          <div class="mob-flag-header">
            <span class="mob-flag-icon">🤖</span>
            <div>
              <div class="mob-flag-name">OpenAI</div>
              <div class="mob-flag-tag">AI · 1.5k HC</div>
            </div>
          </div>
          <div class="mob-flag-wedge">Wedge: DevDay Merch Quality</div>
        </div>

        <div class="mobile-flagship-card" onclick="window.runTestDriveAccount && window.runTestDriveAccount('snowflake.com')">
          <div class="mob-flag-header">
            <span class="mob-flag-icon">❄️</span>
            <div>
              <div class="mob-flag-name">Snowflake</div>
              <div class="mob-flag-tag">Cloud · 7k HC</div>
            </div>
          </div>
          <div class="mob-flag-wedge">Wedge: Data Cloud Summit</div>
        </div>
      `;

      // Insert at the top of Screen 1
      screen1.insertBefore(grid, screen1.firstChild);
    }
  }

  function setupMobileSwipes() {
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Ensure horizontal swipe
      if (Math.abs(diffX) > 80 && Math.abs(diffY) < 50) {
        const activeTab = document.querySelector('#mobileNativeBottomBar .mob-tab-btn.active');
        const currentScreen = activeTab ? parseInt(activeTab.getAttribute('data-screen'), 10) : 1;

        if (diffX < 0 && currentScreen < 6) {
          // Swipe Left -> Next Screen
          const nextScreen = currentScreen === 2 ? 4 : (currentScreen === 5 ? 6 : currentScreen + 1);
          switchMobileScreen(nextScreen);
        } else if (diffX > 0 && currentScreen > 1) {
          // Swipe Right -> Prev Screen
          const prevScreen = currentScreen === 4 ? 2 : (currentScreen === 6 ? 5 : currentScreen - 1);
          switchMobileScreen(prevScreen);
        }
      }
    }, { passive: true });
  }
})();
