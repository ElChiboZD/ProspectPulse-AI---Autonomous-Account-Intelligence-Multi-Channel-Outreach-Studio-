function startTestDrive(accountKey) {
  const accountMap = {
    'lululemon': 'lululemon.com',
    'uber': 'uber.com',
    'openai': 'openai.com',
    'snowflake': 'snowflake.com'
  };
  
  const domain = accountMap[accountKey];
  if (!domain) return;
  
  // Set the input field just in case
  const input = document.getElementById('omniInput');
  if(input) input.value = domain;
  
  // Create loading overlay
  const overlay = document.createElement('div');
  overlay.className = 'td-loading-overlay';
  overlay.innerHTML = `
    <div class="td-spinner"></div>
    <div class="td-progress-text" id="tdPct">0%</div>
    <div class="td-progress-bar-container">
      <div class="td-progress-bar" id="tdBar"></div>
    </div>
    <div class="td-telemetry-log" id="tdLog">Initializing multi-agent research...</div>
  `;
  document.body.appendChild(overlay);
  
  const steps = [
    "Scraping 10-K & Annual Reports...",
    "Extracting buying committee via LinkedIn...",
    "Analyzing incumbent vendor displacement...",
    "Drafting multi-channel cadence...",
    "Finalizing Deal Room..."
  ];
  
  let stepIdx = 0;
  let pct = 0;
  const pctEl = document.getElementById('tdPct');
  const barEl = document.getElementById('tdBar');
  const logEl = document.getElementById('tdLog');
  
  const interval = setInterval(() => {
    pct += Math.floor(Math.random() * 5) + 2;
    if (pct >= 100) pct = 100;
    
    pctEl.innerText = pct + '%';
    barEl.style.width = pct + '%';
    
    if (pct % 20 === 0 && stepIdx < steps.length) {
      logEl.innerText = steps[stepIdx];
      stepIdx++;
    }
    
    if (pct >= 100) {
      clearInterval(interval);
      logEl.innerText = "Research complete. Launching workspace...";
      
      setTimeout(() => {
        document.body.removeChild(overlay);
        
        // Advance to Screen 2 automatically
        if(window.quickSelect) {
          window.quickSelect(domain);
        } else if(window.runProspectSearch) {
          window.runProspectSearch();
        }
        
        // Auto-tour to Screen 4 and Screen 5
        setTimeout(() => {
          if (window.gotoScreen) {
            window.gotoScreen(4);
            // Show a toast or notification?
            setTimeout(() => {
              window.gotoScreen(5);
            }, 3000);
          }
        }, 3000);
        
      }, 800);
    }
  }, 100);
}
