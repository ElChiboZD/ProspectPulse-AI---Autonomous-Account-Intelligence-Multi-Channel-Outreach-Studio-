window.generateShareableReport = function() {
  const account = window.currentAccountData || { company: 'Example Corp' };
  
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>ProspectPulse Report - ${account.company}</title>
      <style>
        body { font-family: -apple-system, sans-serif; padding: 40px; background: #f8fafc; color: #0f172a; max-width: 800px; margin: 0 auto; line-height: 1.6; }
        .card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 24px; }
        h1 { color: #4f46e5; margin-bottom: 8px; }
        h2 { font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 0; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>${account.company}</h1>
        <p><strong>Status:</strong> Generated via ProspectPulse AI</p>
      </div>
      <div class="card">
        <h2>Key Intelligence</h2>
        <p>Insights and synthesized data points go here.</p>
      </div>
      <div class="card">
        <h2>Outreach Strategy</h2>
        <p>Review the generated multi-channel sequence.</p>
      </div>
    </body>
    </html>
  `;
  return html;
};

window.downloadReport = function(html, filename) {
  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
};

window.copyReportLink = function() {
  const html = generateShareableReport();
  downloadReport(html, 'prospect-report.html');
  alert('Report downloaded! In a full implementation, this would copy a public URL to your clipboard.');
};
