window.openBeforeAfterModal = function() {
  let modal = document.getElementById('beforeAfterModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'beforeAfterModal';
    modal.className = 'modal-overlay';
    modal.style.cssText = `
      display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.85); z-index: 2000; align-items: center; justify-content: center; backdrop-filter: blur(10px);
    `;
    modal.innerHTML = `
      <div style="background: var(--bg-surface); padding: 32px; border-radius: var(--radius-xl); border: 1px solid var(--border); width: 900px; max-width: 95vw; color: var(--text-main); display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2 style="font-size: 24px; margin: 0;">⚡ The ProspectPulse Difference</h2>
          <button onclick="document.getElementById('beforeAfterModal').style.display='none'" class="btn btn-secondary">Close</button>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <!-- LEFT: Without -->
          <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-lg); padding: 24px; position: relative; overflow: hidden;">
            <div style="font-weight: 700; color: #fca5a5; margin-bottom: 16px; font-size: 16px; display: flex; justify-content: space-between;">
              <span>Without ProspectPulse</span>
              <span id="baTimerLeft" style="font-family: monospace;">0:00</span>
            </div>
            <div id="baStepsLeft" style="min-height: 150px; font-size: 14px; color: var(--text-muted); display: flex; flex-direction: column; gap: 12px;">
              <!-- steps injected here -->
            </div>
          </div>

          <!-- RIGHT: With -->
          <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: var(--radius-lg); padding: 24px; position: relative; overflow: hidden;">
            <div style="font-weight: 700; color: #6ee7b7; margin-bottom: 16px; font-size: 16px; display: flex; justify-content: space-between;">
              <span>With ProspectPulse AI</span>
              <span id="baTimerRight" style="font-family: monospace;">0:00</span>
            </div>
            <div id="baStepsRight" style="min-height: 150px; font-size: 14px; color: var(--text-muted); display: flex; flex-direction: column; gap: 12px;">
              <!-- steps injected here -->
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  modal.style.display = 'flex';
  runBeforeAfterAnimation();
};

function runBeforeAfterAnimation() {
  const leftSteps = document.getElementById('baStepsLeft');
  const rightSteps = document.getElementById('baStepsRight');
  const leftTimer = document.getElementById('baTimerLeft');
  const rightTimer = document.getElementById('baTimerRight');

  leftSteps.innerHTML = '';
  rightSteps.innerHTML = '';
  leftTimer.textContent = '0:00';
  rightTimer.textContent = '0:00';

  // Right side (Fast)
  setTimeout(() => { rightTimer.textContent = '0:01'; rightSteps.innerHTML += '<div>✅ Scraping domain...</div>'; }, 500);
  setTimeout(() => { rightTimer.textContent = '0:03'; rightSteps.innerHTML += '<div>✅ Synthesizing 10-K & News...</div>'; }, 1500);
  setTimeout(() => { rightTimer.textContent = '0:04'; rightSteps.innerHTML += '<div>✅ Mapping Buying Committee...</div>'; }, 2000);
  setTimeout(() => { 
    rightTimer.textContent = '0:05'; 
    rightSteps.innerHTML += '<div style="color: var(--emerald); font-weight: 600;">🚀 Output: 5-Touch Sequence Ready!</div>'; 
  }, 2500);

  // Left side (Slow)
  const slowTasks = [
    "Opening LinkedIn Sales Navigator...",
    "Searching Google News for recent events...",
    "Cross-referencing ZoomInfo for contact details...",
    "Reading company blog posts...",
    "Drafting email in Gmail...",
    "Re-writing to sound more personalized...",
    "Looking up competitor mentions..."
  ];

  let leftSecs = 0;
  let taskIdx = 0;
  
  const interval = setInterval(() => {
    leftSecs += 15; // fast forward time (simulate 15 secs every interval)
    let m = Math.floor(leftSecs / 60);
    let s = leftSecs % 60;
    leftTimer.textContent = `${m}:${s < 10 ? '0'+s : s}`;

    if (leftSecs % 120 === 0 && taskIdx < slowTasks.length) {
      leftSteps.innerHTML += `<div>⏳ ${slowTasks[taskIdx]}</div>`;
      taskIdx++;
    }

    if (leftSecs >= 45 * 60) {
      clearInterval(interval);
      leftTimer.textContent = '45:00';
      leftSteps.innerHTML += `<div style="color: #fca5a5; font-weight: 600;">😩 Output: 1 Generic Email Drafted</div>`;
    }
  }, 50); // Fast simulation
}
