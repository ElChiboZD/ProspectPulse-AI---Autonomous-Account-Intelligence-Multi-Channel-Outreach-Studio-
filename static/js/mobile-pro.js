document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth > 768) return; // Only apply on mobile

  // 1. Offline Indicator
  const offlineBanner = document.createElement('div');
  offlineBanner.className = 'offline-status-banner';
  offlineBanner.innerHTML = '🟢 Standalone Offline Engine Ready';
  document.body.prepend(offlineBanner);

  // 2. Mobile FAB
  const fabContainer = document.createElement('div');
  fabContainer.className = 'mobile-fab-container';
  
  const fabMenu = document.createElement('div');
  fabMenu.className = 'mobile-fab-menu';
  
  const items = [
    { icon: '🎙️', label: 'Voice Practice', action: openMobileVoiceArena },
    { icon: '📬', label: 'Reply Copilot', action: () => { if(window.gotoScreen) window.gotoScreen(6); } },
    { icon: '🌐', label: 'Deal Room', action: () => { if(window.gotoScreen) window.gotoScreen(5); } },
    { icon: '📊', label: 'Switch Account', action: () => { if(window.gotoScreen) window.gotoScreen(1); } }
  ];

  items.forEach(it => {
    const el = document.createElement('div');
    el.className = 'mobile-fab-item';
    el.innerHTML = `<span>${it.icon}</span> <span>${it.label}</span>`;
    el.onclick = () => {
      it.action();
      fabMenu.classList.remove('active');
    };
    fabMenu.appendChild(el);
  });

  const fabMain = document.createElement('div');
  fabMain.className = 'mobile-fab-main';
  fabMain.innerHTML = '⚡';
  fabMain.onclick = () => {
    fabMenu.classList.toggle('active');
  };

  fabContainer.appendChild(fabMenu);
  fabContainer.appendChild(fabMain);
  document.body.appendChild(fabContainer);

  // 3. Pull to Refresh Simulator
  const ptrContainer = document.createElement('div');
  ptrContainer.className = 'ptr-container';
  ptrContainer.innerHTML = '<div class="ptr-spinner"></div> Refreshing Intel...';
  document.body.appendChild(ptrContainer);

  let touchStartY = 0;
  document.addEventListener('touchstart', e => {
    if (window.scrollY === 0) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  document.addEventListener('touchend', e => {
    if (touchStartY > 0 && window.scrollY === 0) {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchEndY - touchStartY > 100) {
        ptrContainer.classList.add('refreshing');
        setTimeout(() => {
          ptrContainer.classList.remove('refreshing');
          // Optionally trigger some data reload here
        }, 1500);
      }
    }
    touchStartY = 0;
  });

  // 4. Full-screen One-Handed Voice Objection Arena
  const voiceArena = document.createElement('div');
  voiceArena.className = 'mobile-voice-arena';
  voiceArena.innerHTML = `
    <div class="mva-header">
      <strong style="color: #fff; font-size: 16px;">🎙️ Voice Arena</strong>
      <button class="mva-close" id="mvaClose">&times;</button>
    </div>
    <div class="mva-content">
      <h3 style="color: var(--text-main); margin-bottom: 8px;">Push to Talk</h3>
      <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px;">"We already use SwagUp."</p>
      
      <div class="mva-wave" id="mvaWave">
        <div class="mva-bar"></div><div class="mva-bar"></div><div class="mva-bar"></div><div class="mva-bar"></div><div class="mva-bar"></div>
      </div>
      
      <button class="mva-mic-btn" id="mvaMicBtn">🎤</button>
      
      <div class="mva-thumb-actions">
        <button class="mva-action-btn">Next Objection</button>
        <button class="mva-action-btn">AI Feedback</button>
      </div>
    </div>
  `;
  document.body.appendChild(voiceArena);

  document.getElementById('mvaClose').onclick = () => {
    voiceArena.classList.remove('active');
  };

  const micBtn = document.getElementById('mvaMicBtn');
  const wave = document.getElementById('mvaWave');
  
  micBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    micBtn.classList.add('recording');
    wave.classList.add('active');
  });

  micBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    micBtn.classList.remove('recording');
    wave.classList.remove('active');
  });

  function openMobileVoiceArena() {
    voiceArena.classList.add('active');
  }
});
