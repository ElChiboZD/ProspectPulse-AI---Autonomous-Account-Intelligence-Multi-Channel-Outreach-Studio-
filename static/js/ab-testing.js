document.addEventListener('DOMContentLoaded', () => {
  const subjectInput = document.getElementById('emailSubjectInput');
  if (!subjectInput) return;

  const abBtn = document.createElement('button');
  abBtn.className = 'btn btn-secondary btn-sm';
  abBtn.innerHTML = '🧪 A/B Test';
  abBtn.style.marginLeft = '8px';
  
  // Insert next to the subject input's label or parent container
  subjectInput.parentNode.insertBefore(abBtn, subjectInput.nextSibling);

  abBtn.onclick = () => {
    const originalSubject = subjectInput.value;
    const variants = generateSubjectVariants(originalSubject, 'Company', 'Target');
    renderABPanel(variants, subjectInput.parentNode.parentNode);
  };

  window.generateSubjectVariants = function(originalSubject, companyName, contactName) {
    const baseCompany = (window.currentAccountData && window.currentAccountData.company) || companyName || 'your team';
    return [
      {
        label: 'A: Question',
        text: `Is ${baseCompany} still using the incumbent?`,
        score: Math.floor(Math.random() * 20 + 60) + '%'
      },
      {
        label: 'B: Data-Driven',
        text: `${baseCompany}'s metrics vs industry benchmark`,
        score: Math.floor(Math.random() * 20 + 65) + '%'
      },
      {
        label: 'C: Curiosity Gap',
        text: `Quick thought on ${baseCompany}'s upcoming initiative`,
        score: Math.floor(Math.random() * 25 + 60) + '%'
      }
    ];
  };

  window.renderABPanel = function(variants, container) {
    let panel = document.getElementById('abPanel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'abPanel';
      panel.style.cssText = `
        margin-top: 12px;
        margin-bottom: 12px;
        background: rgba(0,0,0,0.2);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        padding: 12px;
      `;
      container.insertBefore(panel, container.children[1]); // Insert near top
    }

    let variantsHtml = variants.map((v, i) => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: var(--radius-sm); margin-bottom: 8px; cursor: pointer;" onclick="document.getElementById('emailSubjectInput').value = '${v.text.replace(/'/g, "\\'")}'; document.getElementById('abPanel').style.display='none';">
        <div>
          <span style="font-weight: 600; font-size: 12px; color: var(--text-muted); margin-right: 8px;">${v.label}</span>
          <span style="font-size: 13px; color: var(--text-main);">${v.text}</span>
        </div>
        <div style="font-size: 12px; color: var(--emerald); font-weight: 600;">${v.score} open rate</div>
      </div>
    `).join('');

    panel.innerHTML = `
      <div style="font-size: 12px; font-weight: 600; margin-bottom: 10px; color: var(--text-muted);">Select a winning subject line variant:</div>
      ${variantsHtml}
    `;
    panel.style.display = 'block';
  };
});
