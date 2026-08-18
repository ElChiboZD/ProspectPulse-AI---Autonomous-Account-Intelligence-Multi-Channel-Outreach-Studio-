/* multithread-visualizer.js */

const mtState = {
  champion: { mapped: true, name: 'VP Marketing / CX' },
  evaluator: { mapped: true, name: 'Director Sourcing / IT' },
  economic: { mapped: false, name: 'Unmapped' },
  gatekeeper: { mapped: true, name: 'Procurement Director' }
};

function renderMtVisualizer() {
  const mappedCount = Object.values(mtState).filter(r => r.mapped).length;
  const riskScore = 100 - (mappedCount * 25);
  const riskColor = riskScore > 50 ? 'var(--rose)' : (riskScore > 25 ? 'var(--amber)' : 'var(--emerald)');

  let html = `
    <div class="mt-visualizer-container">
      <h3 style="margin-top:0; font-size:16px;">🌐 Visual Buying Committee Org Tree</h3>
      
      <div class="mt-risk-gauge" style="margin-top:16px;">
        <span style="font-size:12px; font-weight:700;">Deal Vulnerability Score:</span>
        <div class="mt-risk-bar-container">
          <div class="mt-risk-bar" style="width:${riskScore}%; background:${riskColor};"></div>
        </div>
        <span style="font-weight:800; color:${riskColor};">${riskScore}% Risk</span>
      </div>

      <div class="mt-warning-banner" id="mtWarningBanner" style="display: ${!mtState.economic.mapped ? 'block' : 'none'}">
        ⚠️ Warning: Economic Buyer (CFO / RevOps) is missing. Deal stall probability is high!
      </div>

      <div class="mt-tree">
        <div class="mt-node ${mtState.champion.mapped ? 'mapped' : ''}" onclick="toggleMtRole('champion')">
          <div class="mt-node-icon">🥇</div>
          <div class="mt-node-title">Champion</div>
          <div class="mt-node-name">${mtState.champion.name}</div>
        </div>
        <div class="mt-node ${mtState.economic.mapped ? 'mapped' : ''}" onclick="toggleMtRole('economic')">
          <div class="mt-node-icon">💰</div>
          <div class="mt-node-title">Economic Buyer</div>
          <div class="mt-node-name">${mtState.economic.name}</div>
        </div>
        <div class="mt-node ${mtState.evaluator.mapped ? 'mapped' : ''}" onclick="toggleMtRole('evaluator')">
          <div class="mt-node-icon">🛡️</div>
          <div class="mt-node-title">Evaluator</div>
          <div class="mt-node-name">${mtState.evaluator.name}</div>
        </div>
        <div class="mt-node ${mtState.gatekeeper.mapped ? 'mapped' : ''}" onclick="toggleMtRole('gatekeeper')">
          <div class="mt-node-icon">📋</div>
          <div class="mt-node-title">Gatekeeper</div>
          <div class="mt-node-name">${mtState.gatekeeper.name}</div>
        </div>
      </div>

      <button class="btn btn-primary" style="width:100%;" onclick="generateMtSequence()">⚡ Generate Multi-Thread 3-Way Sequence</button>

      <div class="mt-sequence-viewer" id="mtSeqViewer">
        <div class="mt-seq-tabs">
          <div class="mt-seq-tab active" onclick="switchMtTab(0)">Champion Thread</div>
          <div class="mt-seq-tab" onclick="switchMtTab(1)">Economic Thread</div>
          <div class="mt-seq-tab" onclick="switchMtTab(2)">Evaluator Thread</div>
        </div>
        <div class="mt-seq-content active" id="mtSeqContent0">
          <strong>Subject: Enhancing your upcoming activations</strong><br/><br/>
          Hi ${mtState.champion.name.split(' ')[0]},<br/>
          Loved the recent campaign launch. Wanted to see if we can help elevate the brand experience for your upcoming activations with custom knit socks...
        </div>
        <div class="mt-seq-content" id="mtSeqContent1">
          <strong>Subject: 30% reduction in promotional spend</strong><br/><br/>
          Hi CFO,<br/>
          I'm speaking with ${mtState.champion.name} about streamlining your promotional budget. Our domestic supply chain eliminates the high shipping fees and waste associated with overseas catalog swag...
        </div>
        <div class="mt-seq-content" id="mtSeqContent2">
          <strong>Subject: Seamless vendor onboarding & SOC2</strong><br/><br/>
          Hi IT/Sourcing,<br/>
          We are working with Marketing to bring our custom platform to your team. We are fully SOC2 compliant and integrate smoothly with standard procurement portals...
        </div>
      </div>
    </div>
  `;

  const targetContainer = document.getElementById('mtVisualizerInject');
  if (targetContainer) {
    targetContainer.innerHTML = html;
  }
}

function toggleMtRole(role) {
  mtState[role].mapped = !mtState[role].mapped;
  if(role === 'economic') {
    mtState[role].name = mtState[role].mapped ? 'CFO / RevOps' : 'Unmapped';
  }
  renderMtVisualizer();
}

function generateMtSequence() {
  const viewer = document.getElementById('mtSeqViewer');
  viewer.style.display = 'block';
  // Simulate API call to /api/multithread/generate
  if(window.showToast) showToast('Calling /api/multithread/generate ...');
}

function switchMtTab(idx) {
  document.querySelectorAll('.mt-seq-tab').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
  document.querySelectorAll('.mt-seq-content').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Inject into Screen 2
  setTimeout(() => {
    const screen2RightCol = document.querySelector('#screen2 > div:nth-child(2) > div:nth-child(2)');
    if (screen2RightCol) {
      const wrapper = document.createElement('div');
      wrapper.id = 'mtVisualizerInject';
      // Insert after the Buying Committee card
      screen2RightCol.insertBefore(wrapper, screen2RightCol.children[1]);
      renderMtVisualizer();
    }
  }, 1000);
});
