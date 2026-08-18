/* reply-copilot.js */

function openReplyCopilotModal() {
  let modal = document.getElementById('replyCopilotModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'replyCopilotModal';
    modal.onclick = (e) => { if(e.target === modal) closeReplyCopilotModal(); };
    modal.innerHTML = `
      <div class="modal-content reply-copilot-modal-content">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h2 style="font-size: 22px;">📬 Autonomous Inbound Reply Copilot</h2>
          <button class="btn btn-secondary btn-sm" onclick="closeReplyCopilotModal()">✕</button>
        </div>
        
        <textarea id="rcInput" rows="4" style="width:100%; padding:12px; border-radius:8px; background:rgba(0,0,0,0.5); border:1px solid var(--border); color:#fff; font-family:inherit; margin-bottom:12px;" placeholder="Paste prospect's email or LinkedIn reply..."></textarea>
        
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <div class="rc-preset-chip" onclick="document.getElementById('rcInput').value=this.innerText">"We're locked with SwagUp through Q4"</div>
          <div class="rc-preset-chip" onclick="document.getElementById('rcInput').value=this.innerText">"No budget right now"</div>
          <div class="rc-preset-chip" onclick="document.getElementById('rcInput').value=this.innerText">"Just send an email"</div>
          <div class="rc-preset-chip" onclick="document.getElementById('rcInput').value=this.innerText">"Not interested"</div>
        </div>

        <button class="btn btn-primary" style="width:100%; margin-bottom:20px;" onclick="smashPushback()">⚡ Smash Pushback & Generate Counter-Moves</button>

        <div id="rcResults" style="display:none;">
          <div class="rc-hud">
            <div class="rc-hud-item">
              <div style="font-size:11px; color:var(--text-faint); text-transform:uppercase;">Intent Badge</div>
              <div id="rcIntentBadge" style="font-size:14px; font-weight:700; color:var(--amber); margin-top:4px;">🔒 Competitor Lock-in</div>
            </div>
            <div class="rc-hud-item">
              <div style="font-size:11px; color:var(--text-faint); text-transform:uppercase;">Sentiment Score</div>
              <div id="rcSentiment" style="font-size:14px; font-weight:700; color:var(--rose); margin-top:4px;">Negative (24/100)</div>
            </div>
            <div class="rc-hud-item">
              <div style="font-size:11px; color:var(--text-faint); text-transform:uppercase;">Subtext Radar</div>
              <div id="rcSubtext" style="font-size:13px; color:var(--text-main); margin-top:4px;">Deflecting via timing.</div>
            </div>
          </div>

          <div class="rc-tabs">
            <div class="rc-tab active" onclick="switchRcTab('wedge')" id="rcTabWedge">⚔️ Competitor Wedge</div>
            <div class="rc-tab" onclick="switchRcTab('roi')" id="rcTabRoi">📊 Consultative ROI</div>
            <div class="rc-tab" onclick="switchRcTab('pattern')" id="rcTabPattern">⚡ Pattern-Interrupt</div>
          </div>

          <div class="rc-card-content" id="rcCardWedge">
            "Totally understand. Most teams we speak with are using SwagUp. Usually, they reach out to us when they get tired of high overseas shipping costs and 3-week delays. If you're open to seeing a 100% US-made option for Q1 planning, I can send over a quick digital proof."
            <div class="rc-card-actions">
              <button class="btn btn-secondary btn-sm" onclick="copyRcText('rcCardWedge')">📋 Copy to Clipboard</button>
              <button class="btn btn-primary btn-sm" onclick="loadRcToEmail('rcCardWedge')">✉️ Load into Email Composer</button>
            </div>
          </div>

          <div class="rc-card-content" id="rcCardRoi" style="display:none;">
            "Makes sense to hold off. Just curious - have you quantified the waste from your current un-used catalog swag? We typically help teams cut their promotional budget by 30% while actually increasing employee retention. Happy to run a zero-risk ROI model for your specific headcount whenever you're ready."
            <div class="rc-card-actions">
              <button class="btn btn-secondary btn-sm" onclick="copyRcText('rcCardRoi')">📋 Copy to Clipboard</button>
              <button class="btn btn-primary btn-sm" onclick="loadRcToEmail('rcCardRoi')">✉️ Load into Email Composer</button>
            </div>
          </div>

          <div class="rc-card-content" id="rcCardPattern" style="display:none;">
            "Fair enough! If I promise not to pitch you, what's the #1 reason you stick with your current process? (Usually it's just 'we haven't had time to look elsewhere')."
            <div class="rc-card-actions">
              <button class="btn btn-secondary btn-sm" onclick="copyRcText('rcCardPattern')">📋 Copy to Clipboard</button>
              <button class="btn btn-primary btn-sm" onclick="loadRcToEmail('rcCardPattern')">✉️ Load into Email Composer</button>
            </div>
          </div>
        </div>

      </div>
    `;
    document.body.appendChild(modal);
  }
  
  modal.style.display = 'grid';
  document.getElementById('rcResults').style.display = 'none';
}

function closeReplyCopilotModal() {
  const modal = document.getElementById('replyCopilotModal');
  if (modal) modal.style.display = 'none';
}

function smashPushback() {
  const text = document.getElementById('rcInput').value.toLowerCase();
  const intent = document.getElementById('rcIntentBadge');
  const sentiment = document.getElementById('rcSentiment');
  const subtext = document.getElementById('rcSubtext');

  if (text.includes('swagup') || text.includes('locked')) {
    intent.innerHTML = '🔒 Competitor Lock-in';
    intent.style.color = 'var(--amber)';
    sentiment.innerHTML = 'Neutral (45/100)';
    subtext.innerHTML = 'Satisfied but potentially unaware of domestic alternatives.';
  } else if (text.includes('budget') || text.includes('expensive')) {
    intent.innerHTML = '💸 Budget Freeze';
    intent.style.color = 'var(--rose)';
    sentiment.innerHTML = 'Hesitant (30/100)';
    subtext.innerHTML = 'Needs to see hard ROI to justify spend.';
  } else {
    intent.innerHTML = '🛡️ General Brush-off';
    intent.style.color = 'var(--text-muted)';
    sentiment.innerHTML = 'Cold (15/100)';
    subtext.innerHTML = 'Low priority right now. Needs pattern interrupt.';
  }

  document.getElementById('rcResults').style.display = 'block';
}

function switchRcTab(tabId) {
  document.querySelectorAll('.rc-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.rc-card-content').forEach(c => c.style.display = 'none');

  if (tabId === 'wedge') {
    document.getElementById('rcTabWedge').classList.add('active');
    document.getElementById('rcCardWedge').style.display = 'block';
  } else if (tabId === 'roi') {
    document.getElementById('rcTabRoi').classList.add('active');
    document.getElementById('rcCardRoi').style.display = 'block';
  } else if (tabId === 'pattern') {
    document.getElementById('rcTabPattern').classList.add('active');
    document.getElementById('rcCardPattern').style.display = 'block';
  }
}

function copyRcText(id) {
  const el = document.getElementById(id);
  const text = el.childNodes[0].nodeValue.trim();
  navigator.clipboard.writeText(text);
  if(window.showToast) window.showToast('📋 Copied to clipboard!');
}

function loadRcToEmail(id) {
  const el = document.getElementById(id);
  const text = el.childNodes[0].nodeValue.trim();
  const bodyInput = document.getElementById('emailBodyInput');
  if (bodyInput) {
    bodyInput.value = text;
    if(window.showToast) window.showToast('✉️ Loaded into Email Composer!');
    closeReplyCopilotModal();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Add button to Screen 4 (Outreach Studio) header
  setTimeout(() => {
    const s4Header = document.querySelector('#screen4 > div:first-child > div:nth-child(2)');
    if (s4Header) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary btn-sm';
      btn.innerHTML = '📬 Reply Copilot';
      btn.onclick = openReplyCopilotModal;
      // Insert at the beginning of the flex container
      s4Header.insertBefore(btn, s4Header.firstChild);
    }
  }, 1000);
});
