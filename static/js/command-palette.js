document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const overlay = document.createElement("div");
  overlay.className = "cmd-palette-overlay";
  overlay.innerHTML = `
    <div class="cmd-palette-modal" id="cmdPaletteModal">
      <div class="cmd-palette-header">
        <span style="color: var(--text-faint);">🔍</span>
        <input type="text" class="cmd-palette-input" id="cmdPaletteInput" placeholder="Search accounts, tools, profiles and pages..." autocomplete="off">
        <span class="cmd-item-shortcut" style="opacity: 0.6;">ESC</span>
      </div>
      <div class="cmd-palette-body" id="cmdPaletteBody">
        <div class="cmd-group-label">🏢 Quick Accounts</div>
        <div class="cmd-item" data-action="search" data-target="lululemon.com">
          <span class="cmd-item-icon">🧦</span>
          <span class="cmd-item-text">Research Lululemon</span>
        </div>
        <div class="cmd-item" data-action="search" data-target="uber.com">
          <span class="cmd-item-icon">🚗</span>
          <span class="cmd-item-text">Research Uber</span>
        </div>
        <div class="cmd-item" data-action="search" data-target="openai.com">
          <span class="cmd-item-icon">🤖</span>
          <span class="cmd-item-text">Research OpenAI</span>
        </div>
        <div class="cmd-item" data-action="search" data-target="snowflake.com">
          <span class="cmd-item-icon">❄️</span>
          <span class="cmd-item-text">Research Snowflake</span>
        </div>
        
        <div class="cmd-group-label">🛠️ Tools</div>
        <div class="cmd-item" data-action="tool" data-target="dealroom">
          <span class="cmd-item-icon">💼</span>
          <span class="cmd-item-text">Open Interactive Deal Room</span>
        </div>
        <div class="cmd-item" data-action="tool" data-target="voice">
          <span class="cmd-item-icon">🎙️</span>
          <span class="cmd-item-text">Launch Voice Objection Arena</span>
        </div>
        <div class="cmd-item" data-action="tool" data-target="roi">
          <span class="cmd-item-icon">📈</span>
          <span class="cmd-item-text">Open ROI Calculator</span>
        </div>
        <div class="cmd-item" data-action="tool" data-target="bulk">
          <span class="cmd-item-icon">📂</span>
          <span class="cmd-item-text">Bulk CSV Territory Radar</span>
        </div>
        <div class="cmd-item" data-action="tool" data-target="copilot">
          <span class="cmd-item-icon">✍️</span>
          <span class="cmd-item-text">Inbound Reply Copilot</span>
        </div>
        <div class="cmd-item" data-action="tool" data-target="dispatch">
          <span class="cmd-item-icon">🚀</span>
          <span class="cmd-item-text">Dispatch Hub</span>
        </div>

        <div class="cmd-group-label">🎭 Profiles</div>
        <div class="cmd-item" data-action="profile" data-target="sockclub">
          <span class="cmd-item-icon">🧦</span>
          <span class="cmd-item-text">Switch to Sock Club (USA Mill)</span>
        </div>
        <div class="cmd-item" data-action="profile" data-target="zendesk">
          <span class="cmd-item-icon">🎧</span>
          <span class="cmd-item-text">Switch to Zendesk (CX)</span>
        </div>
        <div class="cmd-item" data-action="profile" data-target="stripe">
          <span class="cmd-item-icon">💳</span>
          <span class="cmd-item-text">Switch to Stripe (Fintech)</span>
        </div>
        <div class="cmd-item" data-action="profile" data-target="openai-profile">
          <span class="cmd-item-icon">🤖</span>
          <span class="cmd-item-text">Switch to Enterprise AI</span>
        </div>

        <div class="cmd-group-label">📜 Navigation</div>
        <div class="cmd-item" data-action="nav" data-target="1">
          <span class="cmd-item-icon">1️⃣</span>
          <span class="cmd-item-text">Go to Screen 1 (Radar)</span>
        </div>
        <div class="cmd-item" data-action="nav" data-target="2">
          <span class="cmd-item-icon">2️⃣</span>
          <span class="cmd-item-text">Go to Screen 2 (Intel)</span>
        </div>
        <div class="cmd-item" data-action="nav" data-target="3">
          <span class="cmd-item-icon">3️⃣</span>
          <span class="cmd-item-text">Go to Screen 3 (Deal Autopsy)</span>
        </div>
        <div class="cmd-item" data-action="nav" data-target="4">
          <span class="cmd-item-icon">4️⃣</span>
          <span class="cmd-item-text">Go to Screen 4 (Outreach Studio)</span>
        </div>
        <div class="cmd-item" data-action="nav" data-target="5">
          <span class="cmd-item-icon">5️⃣</span>
          <span class="cmd-item-text">Go to Screen 5 (MAP)</span>
        </div>
        <div class="cmd-item" data-action="nav" data-target="6">
          <span class="cmd-item-icon">6️⃣</span>
          <span class="cmd-item-text">Go to Screen 6 (Roleplay)</span>
        </div>
      </div>
    </div>
  `;
  body.appendChild(overlay);

  const input = document.getElementById("cmdPaletteInput");
  const items = Array.from(document.querySelectorAll(".cmd-item"));
  let selectedIndex = 0;

  window.toggleCommandPalette = function() {
    if (overlay.classList.contains("active")) {
      overlay.classList.remove("active");
      input.blur();
    } else {
      overlay.classList.add("active");
      input.value = "";
      filterItems("");
      input.focus();
    }
  };

  function filterItems(query) {
    query = query.toLowerCase();
    let visibleItems = [];
    items.forEach(item => {
      const text = item.querySelector(".cmd-item-text").innerText.toLowerCase();
      if (text.includes(query)) {
        item.style.display = "flex";
        visibleItems.push(item);
      } else {
        item.style.display = "none";
      }
      item.classList.remove("selected");
    });
    
    if (visibleItems.length > 0) {
      selectedIndex = 0;
      visibleItems[0].classList.add("selected");
    }
  }

  function handleKeydown(e) {
    if (!overlay.classList.contains("active")) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        window.toggleCommandPalette();
      }
      return;
    }

    const visibleItems = items.filter(item => item.style.display !== "none");
    if (visibleItems.length === 0) {
      if (e.key === "Escape") {
        e.preventDefault();
        window.toggleCommandPalette();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      visibleItems[selectedIndex].classList.remove("selected");
      selectedIndex = (selectedIndex + 1) % visibleItems.length;
      visibleItems[selectedIndex].classList.add("selected");
      visibleItems[selectedIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      visibleItems[selectedIndex].classList.remove("selected");
      selectedIndex = (selectedIndex - 1 + visibleItems.length) % visibleItems.length;
      visibleItems[selectedIndex].classList.add("selected");
      visibleItems[selectedIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      e.preventDefault();
      executeAction(visibleItems[selectedIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      window.toggleCommandPalette();
    }
  }

  function executeAction(item) {
    const action = item.getAttribute("data-action");
    const target = item.getAttribute("data-target");
    window.toggleCommandPalette();

    if (action === "search") {
      if (window.quickSelect) {
        window.quickSelect(target);
      } else {
        const omni = document.getElementById('omniInput');
        if (omni) omni.value = target;
        if (window.runProspectSearch) window.runProspectSearch();
      }
    } else if (action === "nav") {
      if (window.gotoScreen) window.gotoScreen(parseInt(target));
    } else if (action === "tool") {
      if (target === "dealroom" && window.openDealroomModal) window.openDealroomModal();
      if (target === "voice" && window.openVoiceArenaModal) window.openVoiceArenaModal();
      if (target === "roi" && window.openRoiCalculatorModal) window.openRoiCalculatorModal();
      if (target === "bulk" && window.openBulkImporterModal) window.openBulkImporterModal();
      if (target === "copilot" && window.openReplyCopilotModal) window.openReplyCopilotModal();
      if (target === "dispatch" && window.openWebhookDispatcherModal) window.openWebhookDispatcherModal();
    } else if (action === "profile") {
      if (window.switchProfile) window.switchProfile(target);
    }
  }

  input.addEventListener("input", (e) => filterItems(e.target.value));
  document.addEventListener("keydown", handleKeydown);

  items.forEach((item) => {
    item.addEventListener("click", () => {
      executeAction(item);
    });
    item.addEventListener("mouseenter", () => {
      const visibleItems = items.filter(it => it.style.display !== "none");
      visibleItems.forEach(it => it.classList.remove("selected"));
      item.classList.add("selected");
      selectedIndex = visibleItems.indexOf(item);
    });
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) window.toggleCommandPalette();
  });
});
