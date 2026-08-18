document.addEventListener('DOMContentLoaded', () => {
  // Check if onboarded
  if (localStorage.getItem('pp-onboarded')) {
    return;
  }

  const tourSteps = [
    { target: '#omniInput', text: 'Enter any company domain to begin' },
    { target: '.profile-badge', text: 'Switch between different product profiles' },
    { target: '.flow-tabs', text: 'Follow the 6-step workflow from research to outreach' },
    { target: 'button[onclick="openDeckModal()"]', text: 'View the executive pitch deck' }
  ];

  let currentStep = 0;
  
  const tooltip = document.createElement('div');
  tooltip.id = 'tourTooltip';
  tooltip.style.cssText = `
    display: none;
    position: absolute;
    background: var(--indigo);
    color: #fff;
    padding: 12px 16px;
    border-radius: var(--radius-md);
    font-size: 13px;
    font-weight: 500;
    z-index: 9999;
    box-shadow: var(--shadow-glow);
    max-width: 250px;
    transition: top 0.3s, left 0.3s;
  `;
  document.body.appendChild(tooltip);

  function showStep(index) {
    if (index >= tourSteps.length) {
      endTour();
      return;
    }
    const step = tourSteps[index];
    const el = document.querySelector(step.target);
    if (!el) {
      // Element not found, just skip
      showStep(index + 1);
      return;
    }

    const rect = el.getBoundingClientRect();
    tooltip.innerHTML = `
      <div style="margin-bottom: 8px;">${step.text}</div>
      <div style="display: flex; gap: 8px; justify-content: flex-end;">
        <button onclick="window.skipTour()" style="background:none; border:none; color: rgba(255,255,255,0.7); cursor:pointer; font-size:11px;">Skip</button>
        <button onclick="window.nextTourStep()" style="background:#fff; color:var(--indigo); border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">Next &rarr;</button>
      </div>
    `;
    tooltip.style.display = 'block';
    
    // Position tooltip below element
    tooltip.style.top = (rect.bottom + window.scrollY + 10) + 'px';
    tooltip.style.left = Math.max(10, rect.left + window.scrollX - 20) + 'px';
    
    // Highlight element
    el.style.outline = '3px solid var(--emerald)';
    el.style.outlineOffset = '2px';
    el.dataset.tourHighlight = 'true';
  }

  window.nextTourStep = function() {
    clearHighlight();
    currentStep++;
    showStep(currentStep);
  };

  window.skipTour = function() {
    clearHighlight();
    endTour();
  };

  window.startTour = function() {
    currentStep = 0;
    showStep(currentStep);
  };

  function clearHighlight() {
    const highlighted = document.querySelectorAll('[data-tour-highlight="true"]');
    highlighted.forEach(el => {
      el.style.outline = '';
      el.style.outlineOffset = '';
      delete el.dataset.tourHighlight;
    });
  }

  function endTour() {
    tooltip.style.display = 'none';
    localStorage.setItem('pp-onboarded', 'true');
  }

  // Auto-start on load if not onboarded
  setTimeout(() => showStep(currentStep), 1000);
});
