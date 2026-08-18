window.loadHistory = function() {
  const modal = document.getElementById('historyModal');
  if (!modal) return;
  
  // We will override the history content area
  let contentArea = modal.querySelector('.history-list') || modal.querySelector('div[style*="max-height"]');
  if (!contentArea) return; // fallback if structure is different
  
  // Mock data
  const historyData = [
    { id: 1, company: 'Lululemon', domain: 'lululemon.com', timestamp: '2 hours ago', preset: 'Corporate Gifting' },
    { id: 2, company: 'Stripe', domain: 'stripe.com', timestamp: 'Yesterday', preset: 'SaaS Software' },
    { id: 3, company: 'Figma', domain: 'figma.com', timestamp: '2 days ago', preset: 'Agency Services' }
  ];

  const statsHtml = `
    <div style="display: flex; gap: 16px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border);">
      <div><div style="font-size: 20px; font-weight: 700; color: var(--text-main);">12</div><div style="font-size: 11px; color: var(--text-muted);">Total Searches</div></div>
      <div><div style="font-size: 20px; font-weight: 700; color: var(--text-main);">45</div><div style="font-size: 11px; color: var(--text-muted);">Outreach Sent</div></div>
      <div><div style="font-size: 20px; font-weight: 700; color: var(--text-main);">8</div><div style="font-size: 11px; color: var(--text-muted);">Unique Domains</div></div>
      <div style="margin-left: auto;">
        <button class="btn btn-secondary btn-sm" onclick="alert('History cleared')">🗑️ Clear</button>
      </div>
    </div>
  `;

  const listHtml = historyData.map(h => `
    <div style="padding: 12px; border: 1px solid var(--border); border-radius: var(--radius-md); margin-bottom: 10px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'" onclick="loadHistoryItem(${h.id})">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <strong style="color: var(--text-main); font-size: 14px;">${h.company}</strong>
        <span style="font-size: 11px; color: var(--text-muted);">${h.timestamp}</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; color: var(--text-muted);">${h.domain}</span>
        <span class="badge badge-indigo" style="font-size: 10px; padding: 2px 6px; border-radius: 10px; background: rgba(99,102,241,0.1); color: var(--indigo); border: 1px solid rgba(99,102,241,0.2);">${h.preset}</span>
      </div>
    </div>
  `).join('');

  contentArea.innerHTML = statsHtml + listHtml;
};

window.loadHistoryItem = function(id) {
  alert('Loading full result for history item ' + id + '... (Mock)');
  // In real implementation, fetch from /api/history/id and populate window.currentAccountData
  document.getElementById('historyModal').style.display = 'none';
};

// Hook into opening history modal
document.addEventListener('DOMContentLoaded', () => {
  const originalOpen = window.openHistoryModal;
  if (originalOpen) {
    window.openHistoryModal = function(...args) {
      originalOpen.apply(this, args);
      loadHistory(); // enhance the UI
    };
  }
});
