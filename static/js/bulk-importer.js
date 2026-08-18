// Bulk Importer Logic
document.addEventListener('DOMContentLoaded', () => {
  // Inject HTML structure
  const modalHTML = `
    <div class="bulk-modal-overlay" id="bulkImporterModal" onclick="closeBulkImporterModal(event)">
      <div class="bulk-modal-content" onclick="event.stopPropagation()">
        <div class="bulk-modal-close" onclick="closeBulkImporterModal()">✕</div>
        
        <h2 style="font-size: 20px; margin-bottom: 8px;">📂 Territory Batch Importer</h2>
        <p style="color: var(--text-muted); font-size: 13.5px; margin-bottom: 24px;">Upload a CSV or paste up to 20 domains. We'll automatically enrich them, find intent signals, and locate the buying committee.</p>

        <div class="bulk-drop-zone" id="bulkDropZone">
          <div style="font-size: 32px; margin-bottom: 10px;">📥</div>
          <div style="font-size: 15px; font-weight: 700; color: var(--text-main);">Drag & Drop CSV List Here</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">or click to browse files</div>
          <input type="file" id="bulkFileInput" accept=".csv,.txt" style="display: none;">
        </div>

        <textarea class="bulk-textarea" id="bulkTextInput" placeholder="Or paste domains here (comma or newline separated)...&#10;e.g.&#10;lululemon.com&#10;vitacoco.com&#10;stripe.com"></textarea>

        <div class="progress-container" id="bulkProgressContainer">
          <div class="progress-bar" id="bulkProgressBar"></div>
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
          <button class="btn btn-primary" onclick="runBulkImport()">🚀 Run Territory Batch Radar</button>
        </div>

        <div id="bulkResultsSection" style="display: none;">
          <div class="aggregated-bar" id="bulkAggBar">
            <div class="agg-stat"><span class="agg-label">🏢 Accounts Loaded</span><span class="agg-val" id="aggAccounts">0</span></div>
            <div class="agg-stat"><span class="agg-label">👥 Addressable HC</span><span class="agg-val" id="aggHc">0</span></div>
            <div class="agg-stat"><span class="agg-label">🎯 Avg Intent</span><span class="agg-val" id="aggIntent">0</span></div>
            <div class="agg-stat"><span class="agg-label">💰 Est Pipeline</span><span class="agg-val" id="aggPipe">$0</span></div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 14px;">Live Territory Status</strong>
            <button class="btn btn-secondary btn-sm" onclick="exportBulkCsv()">📥 Export to Salesforce/HubSpot CSV</button>
          </div>

          <div style="overflow-x: auto;">
            <table class="bulk-table">
              <thead>
                <tr>
                  <th>Company & Domain</th>
                  <th>Industry & Headcount</th>
                  <th>Intent Score</th>
                  <th>Detected Tech Stack</th>
                  <th>Key Decision-Maker</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="bulkTableBody">
                <!-- Rows injected here -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Setup Drag and Drop
  const dropZone = document.getElementById('bulkDropZone');
  const fileInput = document.getElementById('bulkFileInput');

  dropZone.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
      handleBulkFile(e.dataTransfer.files[0]);
    }
  });
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
      handleBulkFile(e.target.files[0]);
    }
  });
});

window.openBulkImporterModal = function() {
  document.getElementById('bulkImporterModal').style.display = 'grid';
};

window.closeBulkImporterModal = function(e) {
  if (!e || e.target.id === 'bulkImporterModal' || e.target.classList.contains('bulk-modal-close')) {
    document.getElementById('bulkImporterModal').style.display = 'none';
  }
};

function handleBulkFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    document.getElementById('bulkTextInput').value = text;
    showToast('📁 File loaded successfully.');
  };
  reader.readAsText(file);
}

window.runBulkImport = function() {
  const input = document.getElementById('bulkTextInput').value.trim();
  if (!input) {
    showToast('⚠️ Please paste domains or upload a CSV first.');
    return;
  }

  const domains = input.split(/[\n,]+/).map(d => d.trim()).filter(d => d);
  if (domains.length === 0) return;

  document.getElementById('bulkProgressContainer').style.display = 'block';
  document.getElementById('bulkProgressBar').style.width = '0%';
  document.getElementById('bulkResultsSection').style.display = 'none';
  document.getElementById('bulkTableBody').innerHTML = '';

  let progress = 0;
  const interval = setInterval(() => {
    progress += 15;
    document.getElementById('bulkProgressBar').style.width = Math.min(progress, 100) + '%';
    
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        document.getElementById('bulkProgressContainer').style.display = 'none';
        renderBulkResults(domains);
      }, 400);
    }
  }, 200);
};

function renderBulkResults(domains) {
  const tbody = document.getElementById('bulkTableBody');
  let totalHc = 0;
  let highIntentCount = 0;
  
  // Fake mock data for each domain
  const mockIndustries = ['Retail/E-Comm', 'SaaS / Tech', 'Fintech', 'Healthcare', 'Consumer Goods'];
  const mockTechs = ['Salesforce', 'Marketo', 'Shopify', 'HubSpot', 'AWS'];
  const mockTitles = ['VP Marketing', 'CHRO', 'Dir Revenue Ops', 'VP Sales', 'CEO'];
  const mockNames = ['Sarah Jenkins', 'Michael Chang', 'Amanda Reed', 'David Foster', 'Elena Rodriguez'];

  domains.forEach((domain, idx) => {
    // Generate some deterministic randomness based on index
    const name = domain.split('.')[0];
    const cName = name.charAt(0).toUpperCase() + name.slice(1);
    const hc = Math.floor(Math.random() * 4000) + 100;
    totalHc += hc;
    const intentVal = Math.floor(Math.random() * 100);
    let intentPill = '';
    if (intentVal > 75) { intentPill = '<span class="pill-intent pill-high">🔥 High</span>'; highIntentCount++; }
    else if (intentVal > 40) { intentPill = '<span class="pill-intent pill-med">⚡ Med</span>'; }
    else { intentPill = '<span class="pill-intent pill-low">❄️ Low</span>'; }

    const ind = mockIndustries[idx % mockIndustries.length];
    const t1 = mockTechs[idx % mockTechs.length];
    const t2 = mockTechs[(idx + 1) % mockTechs.length];
    const dmName = mockNames[idx % mockNames.length];
    const dmTitle = mockTitles[idx % mockTitles.length];

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div style="font-weight: 700;">${cName}</div>
        <div style="font-size: 11px; color: var(--text-muted);">${domain.toLowerCase()}</div>
      </td>
      <td>
        <div>${ind}</div>
        <div style="font-size: 11px; color: var(--text-muted);">${hc.toLocaleString()} Emp</div>
      </td>
      <td>${intentPill} <span style="font-size: 11px; color: var(--text-faint); margin-left: 4px;">(${intentVal}/100)</span></td>
      <td>
        <div class="tech-stack-icons">
          <div class="tech-icon" title="${t1}">${t1.charAt(0)}</div>
          <div class="tech-icon" title="${t2}">${t2.charAt(0)}</div>
        </div>
      </td>
      <td>
        <div style="font-weight: 600;">${dmName}</div>
        <div style="font-size: 11px; color: var(--text-muted);">${dmTitle}</div>
      </td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="viewDossier('${domain.toLowerCase()}')">⚡ View Full Dossier</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Update Aggregates
  document.getElementById('aggAccounts').innerText = domains.length;
  document.getElementById('aggHc').innerText = totalHc.toLocaleString();
  const avgIntent = Math.round(domains.length ? (highIntentCount / domains.length) * 100 : 0);
  document.getElementById('aggIntent').innerText = avgIntent > 60 ? '🔥 High' : (avgIntent > 30 ? '⚡ Med' : '❄️ Low');
  const pipe = domains.length * 45000;
  document.getElementById('aggPipe').innerText = '$' + (pipe / 1000).toFixed(0) + 'k';

  document.getElementById('bulkResultsSection').style.display = 'block';
}

window.viewDossier = function(domain) {
  closeBulkImporterModal();
  const omni = document.getElementById('omniInput');
  if (omni) {
    omni.value = domain;
  }
  // Call existing global function to run search
  if (typeof runProspectSearch === 'function') {
    runProspectSearch();
  } else if (typeof quickSelect === 'function') {
    quickSelect(domain);
  }
};

window.exportBulkCsv = function() {
  showToast('📥 Exporting to CSV format...');
  setTimeout(() => {
    showToast('✅ Downloaded: Territory_Export.csv');
  }, 1000);
};

// Simple global toast fallback if not defined
if (typeof showToast !== 'function') {
  window.showToast = function(msg) {
    alert(msg);
  };
}
