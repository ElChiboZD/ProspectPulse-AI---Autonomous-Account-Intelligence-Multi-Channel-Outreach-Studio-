document.addEventListener('DOMContentLoaded', () => {
  // Service Worker Registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  }

  // Native Haptic Feedback wrapper
  const triggerHaptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  // Add click listeners to mobile bottom navigation items
  const navItems = document.querySelectorAll('.mobile-nav-item');
  navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      triggerHaptic();
      
      // Update active state
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      // Trigger corresponding screen switch logic here if needed
      // Map index to workflow screens 1-6 roughly
    });
  });

  // Intercept copy events to add haptic feedback
  document.addEventListener('copy', () => {
    triggerHaptic();
  });

  // Swipe gesture listeners for workflow screens
  let touchStartX = 0;
  let touchEndX = 0;

  const handleSwipe = () => {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      // Swiped Left - Next screen
      console.log('Swiped Left');
      // Call global next screen function if available
      triggerHaptic();
    }
    if (touchEndX > touchStartX + threshold) {
      // Swiped Right - Previous screen
      console.log('Swiped Right');
      // Call global prev screen function if available
      triggerHaptic();
    }
  };

  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  // PWA Install Banner Logic
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    
    // Optionally show a custom "Install App" UI here
    console.log('Ready to install PWA');
  });
});
