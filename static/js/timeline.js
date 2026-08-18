window.timelineEvents = [];

window.addTimelineEvent = function(type, description, data) {
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  timelineEvents.push({ type, description, timestamp, data });
  if (document.getElementById('timelinePanel') && document.getElementById('timelinePanel').style.display !== 'none') {
    renderTimeline();
  }
};

window.toggleTimeline = function() {
  let panel = document.getElementById('timelinePanel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'timelinePanel';
    panel.style.cssText = `
      display: none;
      position: fixed;
      top: 0; right: 0; bottom: 0;
      width: 320px;
      background: var(--bg-surface);
      border-left: 1px solid var(--border);
      z-index: 1000;
      padding: 24px;
      overflow-y: auto;
      box-shadow: var(--shadow-soft);
      transform: translateX(100%);
      transition: transform 0.3s;
    `;
    document.body.appendChild(panel);
  }
  
  if (panel.style.display === 'none' || !panel.style.display) {
    panel.style.display = 'block';
    setTimeout(() => panel.style.transform = 'translateX(0)', 10);
    renderTimeline();
  } else {
    panel.style.transform = 'translateX(100%)';
    setTimeout(() => panel.style.display = 'none', 300);
  }
};

window.renderTimeline = function() {
  const panel = document.getElementById('timelinePanel');
  if (!panel) return;
  
  const colors = {
    'research': 'var(--indigo)',
    'email_drafted': 'var(--emerald)',
    'email_sent': 'var(--emerald)',
    'linkedin_sent': 'var(--sky)',
    'call_made': 'var(--amber)',
    'follow_up': 'var(--violet)'
  };

  const icons = {
    'research': '🔍',
    'email_drafted': '✍️',
    'email_sent': '📧',
    'linkedin_sent': '🔗',
    'call_made': '📞',
    'follow_up': '📅'
  };

  let html = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h3 style="font-size: 16px; margin: 0;">Activity Timeline</h3>
      <button onclick="toggleTimeline()" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:18px;">&times;</button>
    </div>
    <div style="position: relative; padding-left: 12px; border-left: 2px solid var(--border);">
  `;

  if (timelineEvents.length === 0) {
    html += `<div style="color: var(--text-muted); font-size: 13px;">No activity yet.</div>`;
  } else {
    html += timelineEvents.slice().reverse().map(e => `
      <div style="position: relative; margin-bottom: 20px;">
        <div style="position: absolute; left: -20px; top: 0; width: 14px; height: 14px; border-radius: 50%; background: ${colors[e.type] || 'var(--text-muted)'}; border: 3px solid var(--bg-surface);"></div>
        <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">${e.timestamp}</div>
        <div style="font-size: 13px; font-weight: 500; color: var(--text-main);"><span style="margin-right:4px;">${icons[e.type] || '📌'}</span> ${e.description}</div>
      </div>
    `).join('');
  }

  html += `</div>`;
  panel.innerHTML = html;
};

// Hook into existing functions
document.addEventListener('DOMContentLoaded', () => {
  const originalSearch = window.runProspectSearch;
  if (originalSearch) {
    window.runProspectSearch = function(...args) {
      addTimelineEvent('research', 'Initiated deep research scan', null);
      return originalSearch.apply(this, args);
    };
  }

  const originalCopyEmail = window.copyEmail;
  if (originalCopyEmail) {
    window.copyEmail = function(...args) {
      addTimelineEvent('email_drafted', 'Copied email draft to clipboard', null);
      return originalCopyEmail.apply(this, args);
    };
  }
});
