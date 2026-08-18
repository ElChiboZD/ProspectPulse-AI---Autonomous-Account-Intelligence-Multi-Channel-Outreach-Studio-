document.addEventListener('DOMContentLoaded', () => {
  const emailBodyInput = document.getElementById('emailBodyInput');
  if (!emailBodyInput) return;

  const emailActionsContainer = emailBodyInput.parentNode.nextElementSibling || emailBodyInput.parentNode;
  
  // Try to find the flex container with actions
  const composerContainer = emailBodyInput.closest('.panel-card');
  let btnContainer = null;
  if (composerContainer) {
    const btns = composerContainer.querySelectorAll('button');
    if (btns.length > 0) {
      btnContainer = btns[0].parentNode;
    }
  }

  const followUpBtn = document.createElement('button');
  followUpBtn.className = 'btn btn-secondary btn-sm';
  followUpBtn.innerHTML = '📅 Generate Follow-Ups';
  followUpBtn.style.marginLeft = '8px';
  followUpBtn.onclick = () => {
    const originalEmail = document.getElementById('emailBodyInput').value;
    const subj = document.getElementById('emailSubjectInput') ? document.getElementById('emailSubjectInput').value : '';
    // Generate mock sequence
    const sequence = generateFollowUpSequence(originalEmail, 'Target', 'Company', 'Product');
    renderFollowUpPanel(sequence, composerContainer);
  };

  if (btnContainer) {
    btnContainer.appendChild(followUpBtn);
  }

  window.generateFollowUpSequence = function(originalEmail, contactName, companyName, preset) {
    return [
      {
        day: 3,
        channel: 'Email',
        subject: 'Re: ' + (document.getElementById('emailSubjectInput') ? document.getElementById('emailSubjectInput').value : 'Following up'),
        body: `Hi ${contactName || 'there'},\n\nJust floating this to the top of your inbox. Did you have a chance to review the ideas I sent over regarding ${companyName || 'your team'}?\n\nBest,\n[Your Name]`
      },
      {
        day: 7,
        channel: 'Email',
        subject: 'Re: ' + (document.getElementById('emailSubjectInput') ? document.getElementById('emailSubjectInput').value : 'Following up'),
        body: `Hi ${contactName || 'there'},\n\nI thought you might find this interesting. We recently helped a similar company increase their ROI by 30% using our platform.\n\nWorth a quick chat later this week?\n\nCheers,\n[Your Name]`
      },
      {
        day: 14,
        channel: 'Email',
        subject: 'Closing the loop',
        body: `Hi ${contactName || 'there'},\n\nI haven't heard back, so I'll assume this isn't a priority for ${companyName || 'your team'} right now.\n\nIf things change, feel free to reach out.\n\nBest,\n[Your Name]`
      }
    ];
  };

  window.renderFollowUpPanel = function(sequence, container) {
    let panel = document.getElementById('followUpPanel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'followUpPanel';
      panel.style.cssText = `
        margin-top: 16px;
        background: rgba(0,0,0,0.2);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        padding: 16px;
      `;
      container.appendChild(panel);
    }
    
    let tabsHtml = sequence.map((s, i) => `<button class="btn btn-secondary btn-sm" onclick="showFollowUpTab(${i})" id="fuTab${i}">Day ${s.day}</button>`).join(' ');
    
    let contentHtml = sequence.map((s, i) => `
      <div id="fuContent${i}" style="display: ${i === 0 ? 'block' : 'none'}; margin-top: 12px;">
        <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">Subject: ${s.subject}</div>
        <textarea class="omni-search-input" style="width: 100%; height: 120px; background: rgba(0,0,0,0.3); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border); font-size: 13px; color: var(--text-main); resize: vertical;">${s.body}</textarea>
      </div>
    `).join('');

    panel.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <div style="font-weight: 600; font-size: 13px; display: flex; gap: 8px;">${tabsHtml}</div>
        <button class="btn btn-primary btn-sm" onclick="copyAllFollowUps()">📋 Copy All</button>
      </div>
      ${contentHtml}
    `;

    window.sequenceData = sequence;
  };

  window.showFollowUpTab = function(idx) {
    for (let i = 0; i < 3; i++) {
      const content = document.getElementById(`fuContent${i}`);
      const tab = document.getElementById(`fuTab${i}`);
      if (content) content.style.display = i === idx ? 'block' : 'none';
      if (tab) {
        if (i === idx) {
          tab.classList.add('btn-primary');
          tab.classList.remove('btn-secondary');
        } else {
          tab.classList.add('btn-secondary');
          tab.classList.remove('btn-primary');
        }
      }
    }
  };

  window.copyAllFollowUps = function() {
    if (!window.sequenceData) return;
    const text = window.sequenceData.map(s => `Day ${s.day} (${s.channel})\nSubject: ${s.subject}\n\n${s.body}`).join('\n\n---\n\n');
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied all follow-ups to clipboard');
    });
  };
});
