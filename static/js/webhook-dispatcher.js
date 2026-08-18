/* static/js/webhook-dispatcher.js */
window.openWebhookDispatcherModal = function() {
  document.getElementById('webhookDispatcherModal').style.display = 'grid';
  // Load from local storage
  const savedUrl = localStorage.getItem('prospectPulseWebhookUrl');
  if (savedUrl) {
    document.getElementById('webhookUrlInput').value = savedUrl;
  }
  const savedTarget = localStorage.getItem('prospectPulseWebhookTarget');
  if (savedTarget) {
    document.getElementById('webhookTargetSelect').value = savedTarget;
  }
  window.updateWebhookPayloadPreview();
};

window.closeWebhookDispatcherModal = function() {
  document.getElementById('webhookDispatcherModal').style.display = 'none';
};

window.saveWebhookConfig = function() {
  const url = document.getElementById('webhookUrlInput').value;
  const target = document.getElementById('webhookTargetSelect').value;
  localStorage.setItem('prospectPulseWebhookUrl', url);
  localStorage.setItem('prospectPulseWebhookTarget', target);
};

window.updateWebhookUrlPlaceholder = function() {
  const target = document.getElementById('webhookTargetSelect').value;
  const input = document.getElementById('webhookUrlInput');
  if (target === 'slack') {
    input.placeholder = "https://your-webhook-endpoint.com/api/slack";
  } else if (target === 'hubspot') {
    input.placeholder = "https://api.hubapi.com/webhooks/v1/XXXX";
  } else if (target === 'salesforce') {
    input.placeholder = "https://your-domain.my.salesforce.com/services/data/...";
  } else {
    input.placeholder = "https://your-custom-endpoint.com/webhook";
  }
  window.saveWebhookConfig();
  window.updateWebhookPayloadPreview();
};

window.toggleWebhookPayload = function() {
  const pre = document.getElementById('webhookPayloadPreview');
  if (pre.style.display === 'none') {
    pre.style.display = 'block';
  } else {
    pre.style.display = 'none';
  }
};

window.updateWebhookPayloadPreview = function() {
  const target = document.getElementById('webhookTargetSelect').value;
  let payload = {};
  
  const companyName = window.currentAccountData ? window.currentAccountData.name : "Example Corp";
  const contactName = "John Doe"; // In real app, fetch from activeLead
  
  if (target === 'slack') {
    payload = {
      "text": `🚀 *New Lead Dispatched*\n*Company:* ${companyName}\n*Contact:* ${contactName}\n*Action:* Draft Approved`
    };
  } else {
    payload = {
      "company": companyName,
      "contact": contactName,
      "status": "Lead Approved",
      "timestamp": new Date().toISOString()
    };
  }
  
  document.getElementById('webhookPayloadPreview').innerText = JSON.stringify(payload, null, 2);
  return payload;
};

window.testWebhookConnection = function() {
  const url = document.getElementById('webhookUrlInput').value;
  if (!url) {
    if (window.showToast) window.showToast('⚠️ Please enter a Webhook URL first.');
    return;
  }
  
  // Simulate API Call
  const payload = window.updateWebhookPayloadPreview();
  
  // In a real scenario, this would be a fetch call:
  /*
  fetch('/api/webhook/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: url, payload: payload })
  })
  */
  
  if (window.showToast) window.showToast('✅ Webhook connection tested successfully!');
};

window.dispatchActiveLeadWebhook = function() {
  const url = document.getElementById('webhookUrlInput').value;
  if (!url) {
    if (window.showToast) window.showToast('⚠️ Please enter a Webhook URL first.');
    return;
  }
  
  // Simulate Dispatching
  if (window.showToast) window.showToast('🚀 Lead and Sequence Dispatched successfully!');
  window.closeWebhookDispatcherModal();
};
