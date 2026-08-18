// ROI Calculator Logic
document.addEventListener('DOMContentLoaded', () => {
  // Inject HTML structure
  const modalHTML = `
    <div class="roi-modal-overlay" id="roiCalculatorModal" onclick="closeRoiCalculatorModal(event)">
      <div class="roi-modal-content" onclick="event.stopPropagation()">
        <div class="roi-modal-close" onclick="closeRoiCalculatorModal()">✕</div>
        
        <h2 class="roi-section-title" style="font-size: 22px; margin-bottom: 8px;">
          <span style="font-size: 24px;">💰</span> Dynamic Enterprise ROI & Productivity Calculator
        </h2>
        <p style="color: var(--text-muted); font-size: 13.5px; margin-bottom: 30px; max-width: 700px;">
          Calculate the exact financial and time-savings impact of automating account research and personalization. Adjust the sliders below to see real-time business value.
        </p>

        <div class="roi-presets">
          <div class="roi-preset-btn" onclick="applyRoiPreset(5, 20, 100, 30, this)">Startup (5 Reps)</div>
          <div class="roi-preset-btn active" onclick="applyRoiPreset(15, 20, 125, 40, this)">Mid-Market (15 Reps)</div>
          <div class="roi-preset-btn" onclick="applyRoiPreset(100, 30, 150, 45, this)">Enterprise (100 Reps)</div>
        </div>

        <div class="roi-grid">
          <!-- Left: Sliders -->
          <div>
            <div class="roi-slider-group">
              <div class="roi-slider-header">
                <span class="roi-slider-label">👥 Sales Team Size</span>
                <span class="roi-slider-value" id="roiValReps">15 Reps</span>
              </div>
              <input type="range" class="roi-slider" id="roiSliderReps" min="1" max="200" value="15" oninput="calculateRoi()">
            </div>

            <div class="roi-slider-group">
              <div class="roi-slider-header">
                <span class="roi-slider-label">🎯 Accounts Researched / Rep / Week</span>
                <span class="roi-slider-value" id="roiValAccts">20 Accounts</span>
              </div>
              <input type="range" class="roi-slider" id="roiSliderAccts" min="5" max="50" value="20" oninput="calculateRoi()">
            </div>

            <div class="roi-slider-group">
              <div class="roi-slider-header">
                <span class="roi-slider-label">💵 Fully Loaded Hourly AE Cost</span>
                <span class="roi-slider-value" id="roiValCost">$125 / hr</span>
              </div>
              <input type="range" class="roi-slider" id="roiSliderCost" min="30" max="250" value="125" step="5" oninput="calculateRoi()">
            </div>

            <div class="roi-slider-group">
              <div class="roi-slider-header">
                <span class="roi-slider-label">⏱️ Manual Research Time Saved (per acct)</span>
                <span class="roi-slider-value" id="roiValTime">40 mins</span>
              </div>
              <input type="range" class="roi-slider" id="roiSliderTime" min="10" max="60" value="40" step="5" oninput="calculateRoi()">
            </div>
          </div>

          <!-- Right: Result Cards -->
          <div class="roi-results">
            <div class="roi-result-card primary">
              <div class="roi-result-label">Net Annual Financial Value Created</div>
              <div class="roi-result-value" id="roiResValue">$1,500,000</div>
            </div>
            <div class="roi-result-card">
              <div class="roi-result-label">🚀 Annual Team Hours Reclaimed</div>
              <div class="roi-result-value" id="roiResAnnHours">9,600 hrs/yr</div>
            </div>
            <div class="roi-result-card">
              <div class="roi-result-label">⏳ Weekly Hours Saved / Rep</div>
              <div class="roi-result-value" id="roiResWkHours">13.3 hrs/wk</div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="roi-result-card" style="padding: 16px;">
                <div class="roi-result-label" style="font-size: 11px;">⚡ Payback Period</div>
                <div class="roi-result-value" style="font-size: 18px;" id="roiResPayback">36 Hours</div>
              </div>
              <div class="roi-result-card" style="padding: 16px;">
                <div class="roi-result-label" style="font-size: 11px;">📈 Reply Rate Lift</div>
                <div class="roi-result-value" style="font-size: 18px;" id="roiResLift">+320%</div>
              </div>
            </div>
          </div>
        </div>

        <div class="roi-actions">
          <button class="btn btn-primary" onclick="embedRoiBusinessCase()">✨ Embed Business Case into Active Email</button>
          <button class="btn btn-secondary" onclick="exportRoiBrief()">📄 Export 1-Page Business Case Brief</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Initial calculation
  setTimeout(calculateRoi, 100);
});

window.openRoiCalculatorModal = function() {
  document.getElementById('roiCalculatorModal').style.display = 'grid';
  calculateRoi();
};

window.closeRoiCalculatorModal = function(e) {
  if (!e || e.target.id === 'roiCalculatorModal' || e.target.classList.contains('roi-modal-close')) {
    document.getElementById('roiCalculatorModal').style.display = 'none';
  }
};

window.applyRoiPreset = function(reps, accts, cost, time, btnElem) {
  document.getElementById('roiSliderReps').value = reps;
  document.getElementById('roiSliderAccts').value = accts;
  document.getElementById('roiSliderCost').value = cost;
  document.getElementById('roiSliderTime').value = time;

  // Update button active state
  document.querySelectorAll('.roi-preset-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElem) btnElem.classList.add('active');

  calculateRoi();
};

window.calculateRoi = function() {
  const reps = parseInt(document.getElementById('roiSliderReps').value);
  const accts = parseInt(document.getElementById('roiSliderAccts').value);
  const cost = parseInt(document.getElementById('roiSliderCost').value);
  const timeSavedMins = parseInt(document.getElementById('roiSliderTime').value);

  // Update slider labels
  document.getElementById('roiValReps').innerText = reps + ' Reps';
  document.getElementById('roiValAccts').innerText = accts + ' Accounts';
  document.getElementById('roiValCost').innerText = '$' + cost + ' / hr';
  document.getElementById('roiValTime').innerText = timeSavedMins + ' mins';

  // Math
  const weeksPerYear = 48; // assuming 4 weeks off
  
  // Weekly Hours Saved / Rep
  const weeklyMinsSavedPerRep = accts * timeSavedMins;
  const weeklyHoursSavedPerRep = weeklyMinsSavedPerRep / 60;
  
  // Annual Team Hours Reclaimed
  const annualHoursReclaimed = weeklyHoursSavedPerRep * reps * weeksPerYear;
  
  // Net Annual Value Created (Time saved * Cost of time)
  const netAnnualValue = annualHoursReclaimed * cost;
  
  // Payback period mock logic (assuming $10k per rep annual license)
  const licenseCost = 10000;
  const hoursToPayback = licenseCost / cost; // How many hours saved to cover $10k

  // Reply Rate Lift (mock formula based on time spent personalizing)
  const replyLift = Math.min(450, 100 + (timeSavedMins * 5));

  // Render
  document.getElementById('roiResWkHours').innerText = weeklyHoursSavedPerRep.toFixed(1) + ' hrs/wk';
  document.getElementById('roiResAnnHours').innerText = annualHoursReclaimed.toLocaleString() + ' hrs/yr';
  document.getElementById('roiResValue').innerText = '$' + netAnnualValue.toLocaleString(undefined, { maximumFractionDigits: 0 });
  document.getElementById('roiResPayback').innerText = Math.round(hoursToPayback) + ' Hours';
  document.getElementById('roiResLift').innerText = '+' + replyLift + '%';
};

window.embedRoiBusinessCase = function() {
  closeRoiCalculatorModal();
  
  const value = document.getElementById('roiResValue').innerText;
  const hours = document.getElementById('roiResAnnHours').innerText;
  
  const textToEmbed = `Based on your current team size and research workflow, implementing ProspectPulse would reclaim ${hours} and create ${value} in net annual productivity value, paying for itself in the first 30 days.`;
  
  // Try to inject into the composer text area on Screen 4 if it exists
  const replyInput = document.getElementById('replyInput');
  if (replyInput) {
    if (replyInput.value.length > 0) {
      replyInput.value += '\n\n' + textToEmbed;
    } else {
      replyInput.value = textToEmbed;
    }
    // Navigate to screen 4
    if (typeof gotoScreen === 'function') {
      gotoScreen(4);
    }
    showToast('✨ Business Case injected into email composer.');
  } else {
    // Just copy to clipboard
    navigator.clipboard.writeText(textToEmbed);
    showToast('✨ Business Case copied to clipboard.');
  }
};

window.exportRoiBrief = function() {
  showToast('📄 Generating PDF Business Case Brief...');
  setTimeout(() => {
    showToast('✅ Downloaded: Enterprise_ROI_Business_Case.pdf');
  }, 1200);
};

// Simple global toast fallback if not defined
if (typeof showToast !== 'function') {
  window.showToast = function(msg) {
    alert(msg);
  };
}
