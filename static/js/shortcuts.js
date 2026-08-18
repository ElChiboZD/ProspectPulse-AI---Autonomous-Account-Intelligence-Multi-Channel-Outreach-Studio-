document.addEventListener('DOMContentLoaded', () => {
  // Create Shortcuts Help Modal
  const shortcutsModal = document.createElement('div');
  shortcutsModal.id = 'shortcutsModal';
  shortcutsModal.style.cssText = `
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.8);
    z-index: 1000;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
  `;
  shortcutsModal.innerHTML = `
    <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border); width: 400px; color: var(--text-main);">
      <h3 style="margin-bottom: 16px; font-size: 18px;">⌨️ Keyboard Shortcuts</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px;">
        <div><strong>Ctrl+K / Cmd+K</strong></div><div>Focus Domain Search</div>
        <div><strong>Ctrl+Enter</strong></div><div>Run Search</div>
        <div><strong>Ctrl+E</strong></div><div>Focus Email Body</div>
        <div><strong>Ctrl+Shift+C</strong></div><div>Copy Email Draft</div>
        <div><strong>1-6</strong></div><div>Switch Workflow Tab</div>
        <div><strong>Escape</strong></div><div>Close Modals</div>
        <div><strong>?</strong></div><div>Toggle Shortcuts Help</div>
      </div>
      <button class="btn btn-secondary" style="margin-top: 20px; width: 100%;" onclick="document.getElementById('shortcutsModal').style.display='none'">Close</button>
    </div>
  `;
  document.body.appendChild(shortcutsModal);

  document.addEventListener('keydown', (e) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
    const inInput = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable;

    // Ctrl+K / Cmd+K -> focus domain search
    if (cmdOrCtrl && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const input = document.getElementById('omniInput');
      if (input) input.focus();
    }
    
    // Ctrl+Enter -> Run search
    else if (cmdOrCtrl && e.key === 'Enter') {
      e.preventDefault();
      const btn = document.getElementById('searchBtn');
      if (btn) btn.click();
    }
    
    // Ctrl+E -> Focus email body
    else if (cmdOrCtrl && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      const bodyInput = document.getElementById('emailBodyInput');
      if (bodyInput) bodyInput.focus();
    }
    
    // Ctrl+Shift+C -> Copy email draft
    else if (cmdOrCtrl && e.shiftKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      if (typeof window.copyEmail === 'function') {
        window.copyEmail();
      }
    }
    
    // Escape -> Close any open modal
    else if (e.key === 'Escape') {
      document.querySelectorAll('[id$="Modal"], .modal-overlay, #shortcutsModal').forEach(el => {
        if (el.style.display !== 'none' && el.style.display !== '') {
          el.style.display = 'none';
        }
      });
    }

    // Numbers 1-6 -> gotoScreen
    else if (!inInput && e.key >= '1' && e.key <= '6') {
      e.preventDefault();
      const num = parseInt(e.key);
      if (typeof window.gotoScreen === 'function') {
        window.gotoScreen(num);
      }
    }

    // ? -> toggle shortcuts help
    else if (!inInput && e.key === '?') {
      e.preventDefault();
      const modal = document.getElementById('shortcutsModal');
      if (modal) {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
      }
    }
  });
});
