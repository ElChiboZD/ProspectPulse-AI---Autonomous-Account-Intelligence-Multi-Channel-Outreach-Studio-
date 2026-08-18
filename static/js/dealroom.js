/* dealroom.js */

function openDealRoomBuilderModal() {
  let modal = document.getElementById('dealRoomBuilderModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'dealRoomBuilderModal';
    modal.onclick = (e) => { if(e.target === modal) closeDealRoomBuilderModal(); };
    modal.innerHTML = `
      <div class="modal-content dealroom-builder-modal-content">
        <h2 style="font-size: 22px; margin-bottom: 8px;">🌐 Live Interactive Buyer Deal Room</h2>
        <p style="color: var(--text-muted); font-size: 13.5px; margin-bottom: 20px;">Your executive portal is generating. Syncing ROI models and milestones...</p>
        
        <div id="dealroomLoadingState">
          <div class="pulse-dot" style="width: 24px; height: 24px; margin: 20px auto;"></div>
          <p style="color: var(--emerald); font-weight: 600;">Calling /api/dealroom/generate ...</p>
        </div>

        <div id="dealroomReadyState" style="display: none;">
          <div class="qr-code-box">
            <!-- Simulated QR code -->
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://dealroom.prospectpulse.ai/portal" alt="QR Code" />
          </div>
          <div class="link-box" id="generatedDealRoomLink">https://dealroom.prospectpulse.ai/executive-portal-88x9</div>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="btn btn-secondary" onclick="navigator.clipboard.writeText('https://dealroom.prospectpulse.ai/executive-portal-88x9'); showToast('Link copied!')">📋 Copy Link</button>
            <button class="btn btn-primary" onclick="window.open('dealroom.html', '_blank')">🚀 Open Live Buyer Portal</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  modal.style.display = 'grid';
  document.getElementById('dealroomLoadingState').style.display = 'block';
  document.getElementById('dealroomReadyState').style.display = 'none';

  // Simulate API Call
  setTimeout(() => {
    document.getElementById('dealroomLoadingState').style.display = 'none';
    document.getElementById('dealroomReadyState').style.display = 'block';
  }, 1500);
}

function closeDealRoomBuilderModal() {
  const modal = document.getElementById('dealRoomBuilderModal');
  if (modal) modal.style.display = 'none';
}

// Hook it into Screen 5 if needed, and Tools dropdown
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    // Add to tools dropdown
    const dropdown = document.getElementById('toolsDropdownMenu');
    if (dropdown) {
      const btn = document.createElement('button');
      btn.className = 'tools-dropdown-item';
      btn.innerHTML = '🌐 Generate Interactive Buyer Deal Room';
      btn.onclick = () => { openDealRoomBuilderModal(); closeToolsDropdown(); };
      dropdown.insertBefore(btn, dropdown.querySelector('.tools-dropdown-category'));
    }

    // Add to Screen 5
    const screen5HeaderRight = document.querySelector('#screen5 > div:first-child > div:nth-child(2)');
    if (screen5HeaderRight) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary btn-sm';
      btn.innerHTML = '🌐 Generate Interactive Buyer Deal Room';
      btn.onclick = openDealRoomBuilderModal;
      screen5HeaderRight.insertBefore(btn, screen5HeaderRight.firstChild);
    }
  }, 1000);
});
