/**
 * Mobile Native App UI & Experience Layer
 */

class MobileNativeApp {
  constructor() {
    this.currentStep = 1;
    this.maxSteps = 6;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.isServerMode = false;
    this.serverUrl = 'http://192.168.1.100:8765';
    
    this.init();
  }

  init() {
    this.injectUI();
    this.bindEvents();
    this.setupSwipeGestures();
  }

  injectUI() {
    // Check if we're on mobile
    if (window.innerWidth > 768) return;

    // Inject Bottom Nav
    const navHTML = `
      <div class="mobile-native-nav" id="nativeBottomNav">
        <div class="nav-item active" data-tab="1">
          <span class="nav-icon">⚡</span>
          <span>Radar</span>
        </div>
        <div class="nav-item" data-tab="2">
          <span class="nav-icon">🏢</span>
          <span>Intel</span>
        </div>
        <div class="nav-item" data-tab="3">
          <span class="nav-icon">✉️</span>
          <span>Studio</span>
        </div>
        <div class="nav-item" data-tab="4">
          <span class="nav-icon">💼</span>
          <span>Deal</span>
        </div>
        <div class="nav-item" id="navSettingsBtn">
          <span class="nav-icon">⚙️</span>
          <span>Config</span>
        </div>
      </div>
    `;

    // Inject Voice Arena Mobile
    const voiceHTML = `
      <div class="voice-arena-mobile" id="voiceArenaMobile">
        <h2 style="color:white; margin-bottom: 10px;">Voice Objection Arena</h2>
        <div class="pulsing-waveform">
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
        </div>
        <button class="ptt-button" id="pttButton">🎙️</button>
        <p style="color:var(--text-muted); margin-top:20px;">Hold to Speak</p>
        <button id="closeVoiceArena" class="btn btn-secondary" style="margin-top: 30px; border-radius: 24px;">Close Arena</button>
      </div>
    `;

    // Inject Settings Drawer
    const settingsHTML = `
      <div class="settings-drawer" id="settingsDrawer">
        <div class="drawer-handle" id="closeSettingsDrawer"></div>
        <h3 style="margin-bottom: 20px;">Engine Mode</h3>
        
        <div class="mode-switch-card active" id="modeStandalone">
          <div>
            <div style="font-weight: 700; color: var(--text-main);">🟢 100% On-Device</div>
            <div style="font-size: 12px; color: var(--text-muted);">Lightning fast, zero server needed</div>
          </div>
          <input type="radio" name="engineMode" checked style="width: 20px; height: 20px;">
        </div>

        <div class="mode-switch-card" id="modeServer">
          <div>
            <div style="font-weight: 700; color: var(--text-main);">🌐 Connected Server</div>
            <div style="font-size: 12px; color: var(--text-muted);">Remote backend connection</div>
          </div>
          <input type="radio" name="engineMode" style="width: 20px; height: 20px;">
        </div>
        
        <div id="serverUrlInputBox" style="display:none; margin-top: 12px;">
          <input type="text" id="serverUrlInput" value="${this.serverUrl}" placeholder="http://192.168.x.x:8765" style="border-radius: 12px;">
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', navHTML + voiceHTML + settingsHTML);
  }

  bindEvents() {
    const navItems = document.querySelectorAll('.nav-item[data-tab]');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        this.hapticFeedback();
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        this.currentStep = parseInt(item.getAttribute('data-tab'));
        this.navigateToStep(this.currentStep);
      });
    });

    const settingsBtn = document.getElementById('navSettingsBtn');
    const settingsDrawer = document.getElementById('settingsDrawer');
    const closeDrawer = document.getElementById('closeSettingsDrawer');
    
    if(settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        this.hapticFeedback();
        settingsDrawer.classList.add('open');
      });
    }

    if(closeDrawer) {
      closeDrawer.addEventListener('click', () => {
        settingsDrawer.classList.remove('open');
      });
    }

    // Engine Mode Toggle
    const modeStandalone = document.getElementById('modeStandalone');
    const modeServer = document.getElementById('modeServer');
    const urlBox = document.getElementById('serverUrlInputBox');

    if(modeStandalone && modeServer) {
      modeStandalone.addEventListener('click', () => {
        this.hapticFeedback();
        modeStandalone.classList.add('active');
        modeServer.classList.remove('active');
        modeStandalone.querySelector('input').checked = true;
        urlBox.style.display = 'none';
        this.isServerMode = false;
      });

      modeServer.addEventListener('click', () => {
        this.hapticFeedback();
        modeServer.classList.add('active');
        modeStandalone.classList.remove('active');
        modeServer.querySelector('input').checked = true;
        urlBox.style.display = 'block';
        this.isServerMode = true;
      });
    }

    // Voice Arena PTT
    const pttButton = document.getElementById('pttButton');
    if(pttButton) {
      pttButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.hapticFeedback();
        pttButton.style.transform = 'scale(0.9)';
      });
      pttButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        pttButton.style.transform = 'scale(1)';
        this.speakText("Voice processed on-device. Objection handled.");
      });
    }

    const closeArena = document.getElementById('closeVoiceArena');
    if(closeArena) {
      closeArena.addEventListener('click', () => {
        document.getElementById('voiceArenaMobile').classList.remove('active');
      });
    }
  }

  setupSwipeGestures() {
    document.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    document.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, {passive: true});
  }

  handleSwipe() {
    const threshold = 50;
    if (this.touchEndX < this.touchStartX - threshold) {
      // Swipe Left - Next
      if (this.currentStep < this.maxSteps) {
        this.currentStep++;
        this.updateNavUI();
        this.navigateToStep(this.currentStep);
      }
    }
    if (this.touchEndX > this.touchStartX + threshold) {
      // Swipe Right - Prev
      if (this.currentStep > 1) {
        this.currentStep--;
        this.updateNavUI();
        this.navigateToStep(this.currentStep);
      }
    }
  }

  updateNavUI() {
    const navItems = document.querySelectorAll('.nav-item[data-tab]');
    navItems.forEach(item => {
      if(parseInt(item.getAttribute('data-tab')) === this.currentStep) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  navigateToStep(stepNum) {
    this.hapticFeedback();
    
    // Simulate updating the UI for the given step
    // Interop with existing app
    const event = new CustomEvent('MobileNavStep', { detail: { step: stepNum } });
    window.dispatchEvent(event);
    
    if(typeof window.goToStep === 'function') {
      window.goToStep(stepNum);
    } else {
      // Fallback: simple toggle of section elements if standard setup
      for(let i=1; i<=6; i++) {
        let el = document.getElementById('step' + i);
        if(el) {
          el.style.display = (i === stepNum) ? 'block' : 'none';
        }
      }
    }
  }

  hapticFeedback() {
    if (navigator.vibrate) {
      navigator.vibrate([15]); // Micro-haptic
    }
  }

  speakText(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }

  openVoiceArena() {
    document.getElementById('voiceArenaMobile').classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.mobileNativeApp = new MobileNativeApp();
});
