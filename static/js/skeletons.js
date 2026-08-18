window.showSkeletons = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  // Replace content with dummy skeletons
  container.innerHTML = `
    <div class="skeleton skeleton-card" style="margin-bottom:12px;"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text" style="width: 60%"></div>
    <div style="display:flex; gap: 8px; margin-top: 12px;">
      <div class="skeleton skeleton-avatar"></div>
      <div class="skeleton skeleton-text" style="width: 40%; margin-top: 10px;"></div>
    </div>
  `;
};

window.hideSkeletons = function(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '';
  }
};
