/**
 * Real-Time Site Analytics & Telemetry Dashboard
 * Provides comprehensive usage tracking, visitor account roster, and live activity stream.
 */

function trackSiteEvent(action, targetDomain, details) {
  try {
    const session = window.UserSession ? window.UserSession.getSession() : {};
    const payload = {
      name: session.name || (window.currentAuthData ? window.currentAuthData.name : 'Anonymous'),
      title: session.title || (window.currentAuthData ? window.currentAuthData.title : 'Account Executive'),
      company: session.company || (window.currentAuthData ? window.currentAuthData.company : 'Zendesk'),
      email: session.email || (window.currentAuthData ? window.currentAuthData.email : ''),
      action: action || 'page_view',
      target_domain: targetDomain || '',
      details: typeof details === 'object' ? JSON.stringify(details) : (details || '')
    };
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(function(e) {});
  } catch(e) {}
}

function openAnalyticsDashboardModal() {
  let modal = document.getElementById('analyticsDashboardModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'analyticsDashboardModal';
    modal.onclick = function(e) { if (e.target === modal) closeAnalyticsDashboardModal(); };
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content" style="max-width: 900px; width: 95%; max-height: 90vh; overflow-y: auto; padding: 28px; border-radius: 16px; background: #0d111a; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 25px 60px -15px rgba(0,0,0,0.85); color: #fff;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); display: flex; align-items: center; justify-content: center; font-size: 20px;">
            📊
          </div>
          <div>
            <div style="font-weight: 800; font-size: 18px; color: #fff; display: flex; align-items: center; gap: 8px;">
              Executive Telemetry &amp; Site Usage Analytics
              <span style="font-size: 11px; background: rgba(16, 185, 129, 0.2); color: #10B981; padding: 2px 8px; border-radius: 12px; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.4);">LIVE</span>
            </div>
            <div style="font-size: 12px; color: var(--text-muted);">Real-time audit log of searches, visitor accounts, and outreach generation.</div>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" onclick="exportAnalyticsCsv()" style="font-size: 11px; border-color: rgba(255,255,255,0.2);">📥 Export CSV</button>
          <button class="btn btn-secondary btn-sm" onclick="refreshAnalyticsData()" style="font-size: 11px;">🔄 Refresh</button>
          <button class="btn btn-secondary btn-sm" onclick="closeAnalyticsDashboardModal()">✕</button>
        </div>
      </div>

      <div id="analyticsLoadingState" style="text-align: center; padding: 40px;">
        <div style="font-size: 24px; animation: spin 1s linear infinite; display: inline-block;">⏳</div>
        <div style="margin-top: 10px; color: var(--text-muted); font-size: 13px;">Loading telemetry from database...</div>
      </div>

      <div id="analyticsContentState" style="display: none;">
        <!-- KPI CARDS -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 24px;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px;">
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Total Searches</div>
            <div style="font-size: 24px; font-weight: 800; color: #38bdf8; margin-top: 4px;" id="kpiTotalSearches">0</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px;">
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Unique Accounts</div>
            <div style="font-size: 24px; font-weight: 800; color: #a78bfa; margin-top: 4px;" id="kpiTotalUsers">0</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px;">
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Unique Domains</div>
            <div style="font-size: 24px; font-weight: 800; color: #34d399; margin-top: 4px;" id="kpiUniqueDomains">0</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px;">
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Outreach Drafts</div>
            <div style="font-size: 24px; font-weight: 800; color: #fbbf24; margin-top: 4px;" id="kpiTotalOutreach">0</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px;">
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Total Events</div>
            <div style="font-size: 24px; font-weight: 800; color: #f472b6; margin-top: 4px;" id="kpiTotalEvents">0</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 24px;">
          <!-- REGISTERED USER ROSTER -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px;">
            <div style="font-weight: 700; font-size: 14px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
              <span>👥 Active User Profiles Roster</span>
              <span id="userRosterCount" style="font-size: 11px; color: var(--text-muted);">0 profiles</span>
            </div>
            <div id="analyticsUserRosterList" style="max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
              <!-- Users will be populated here -->
            </div>
          </div>

          <!-- TOP SEARCHED DOMAINS -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px;">
            <div style="font-weight: 700; font-size: 14px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
              <span>🌐 Top Searched Companies</span>
              <span id="topDomainsCount" style="font-size: 11px; color: var(--text-muted);">Leaderboard</span>
            </div>
            <div id="analyticsTopDomainsList" style="max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
              <!-- Domains will be populated here -->
            </div>
          </div>
        </div>

        <!-- RECENT ACTIVITY FEED -->
        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px;">
          <div style="font-weight: 700; font-size: 14px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
            <span>⚡ Live Telemetry Stream (Recent 50 Actions)</span>
            <span style="font-size: 11px; color: #10B981;">Auto-synced</span>
          </div>
          <div id="analyticsActivityFeed" style="max-height: 280px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;">
            <!-- Events will be populated here -->
          </div>
        </div>
      </div>
    </div>
  `;

  modal.style.display = 'grid';
  refreshAnalyticsData();
}

function closeAnalyticsDashboardModal() {
  const modal = document.getElementById('analyticsDashboardModal');
  if (modal) modal.style.display = 'none';
}

let latestAnalyticsOverview = null;

function refreshAnalyticsData() {
  const loading = document.getElementById('analyticsLoadingState');
  const content = document.getElementById('analyticsContentState');
  if (loading) loading.style.display = 'block';
  if (content) content.style.display = 'none';

  fetch('/api/analytics/overview')
    .then(r => r.json())
    .then(data => {
      latestAnalyticsOverview = data;
      if (loading) loading.style.display = 'none';
      if (content) content.style.display = 'block';

      // Set KPIs
      document.getElementById('kpiTotalSearches').innerText = data.total_searches || 0;
      document.getElementById('kpiTotalUsers').innerText = data.total_users || (data.user_roster ? data.user_roster.length : 0);
      document.getElementById('kpiUniqueDomains').innerText = data.unique_domains || 0;
      document.getElementById('kpiTotalOutreach').innerText = data.total_outreach || 0;
      document.getElementById('kpiTotalEvents').innerText = data.total_events || (data.recent_events ? data.recent_events.length : 0);

      // Render Users
      const rosterList = document.getElementById('analyticsUserRosterList');
      const rosterCount = document.getElementById('userRosterCount');
      if (rosterList) {
        const users = data.user_roster || [];
        if (rosterCount) rosterCount.innerText = `${users.length} accounts`;
        if (users.length === 0) {
          rosterList.innerHTML = `<div style="font-size: 12px; color: var(--text-faint); padding: 10px; text-align: center;">No registered profiles yet.</div>`;
        } else {
          rosterList.innerHTML = users.map(u => {
            const initials = (u.name || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
            const dateStr = u.updated_at ? new Date(u.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'recently';
            return `
              <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="width: 30px; height: 30px; border-radius: 50%; background: #6366F1; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">
                    ${initials}
                  </div>
                  <div>
                    <div style="font-size: 13px; font-weight: 700; color: #fff;">${u.name || 'Anonymous User'}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${u.title || 'Account Executive'} · <span style="color: #38bdf8;">${u.company || 'Zendesk'}</span></div>
                  </div>
                </div>
                <div style="text-align: right;">
                  <span class="badge badge-indigo" style="font-size: 10px;">${u.preset || 'zendesk'}</span>
                  <div style="font-size: 10px; color: var(--text-faint); margin-top: 2px;">${dateStr}</div>
                </div>
              </div>
            `;
          }).join('');
        }
      }

      // Render Top Domains
      const topList = document.getElementById('analyticsTopDomainsList');
      if (topList) {
        const domains = data.top_domains || [];
        if (domains.length === 0) {
          topList.innerHTML = `<div style="font-size: 12px; color: var(--text-faint); padding: 10px; text-align: center;">No searches logged yet.</div>`;
        } else {
          topList.innerHTML = domains.map((d, idx) => `
            <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 11px; font-weight: 800; color: var(--text-faint); width: 16px;">#${idx+1}</span>
                <span style="font-size: 13px; font-weight: 700; color: #fff;">${d.domain}</span>
                <span style="font-size: 11px; color: var(--text-muted);">(${d.company_name || 'Target'})</span>
              </div>
              <span class="badge badge-sky" style="font-size: 11px; font-weight: 700;">${d.count} searches</span>
            </div>
          `).join('');
        }
      }

      // Render Live Events Stream
      const feed = document.getElementById('analyticsActivityFeed');
      if (feed) {
        const events = data.recent_events || [];
        if (events.length === 0) {
          feed.innerHTML = `<div style="font-size: 12px; color: var(--text-faint); padding: 10px; text-align: center;">No activity recorded yet.</div>`;
        } else {
          feed.innerHTML = events.map(ev => {
            const timeStr = ev.timestamp ? new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '';
            let actionBadge = `<span class="badge badge-sky" style="font-size: 10px;">${ev.action}</span>`;
            if (ev.action.includes('search')) actionBadge = `<span class="badge badge-emerald" style="font-size: 10px;">🔍 Search</span>`;
            else if (ev.action.includes('outreach')) actionBadge = `<span class="badge badge-amber" style="font-size: 10px;">✉️ Outreach</span>`;
            else if (ev.action.includes('account')) actionBadge = `<span class="badge badge-indigo" style="font-size: 10px;">👤 Profile</span>`;
            else if (ev.action.includes('roleplay')) actionBadge = `<span class="badge badge-sky" style="font-size: 10px;">🎭 Roleplay</span>`;

            return `
              <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.02); padding: 6px 10px; border-radius: 6px; font-size: 12px; border-left: 3px solid #6366F1;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-weight: 700; color: #fff;">${ev.user_name || 'Anonymous'}</span>
                  <span style="color: var(--text-faint); font-size: 11px;">(${ev.user_title || 'AE'} · ${ev.user_company || 'Zendesk'})</span>
                  ${actionBadge}
                  <span style="color: #38bdf8; font-weight: 600;">${ev.target_domain || ''}</span>
                  <span style="color: var(--text-muted); font-size: 11px;">${ev.details ? '· ' + ev.details : ''}</span>
                </div>
                <div style="font-size: 10.5px; color: var(--text-faint); font-family: monospace;">${timeStr}</div>
              </div>
            `;
          }).join('');
        }
      }
    })
    .catch(err => {
      if (loading) loading.innerHTML = `<div style="color: #ef4444; font-size: 13px;">Error loading analytics: ${err.message}</div>`;
    });
}

function exportAnalyticsCsv() {
  if (!latestAnalyticsOverview) return;
  const events = latestAnalyticsOverview.recent_events || [];
  let csv = "Timestamp,User Name,User Title,User Company,User Email,Action,Target Domain,Details\n";
  events.forEach(ev => {
    csv += `"${ev.timestamp}","${ev.user_name || ''}","${ev.user_title || ''}","${ev.user_company || ''}","${ev.user_email || ''}","${ev.action || ''}","${ev.target_domain || ''}","${(ev.details || '').replace(/"/g, '""')}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `prospectpulse-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function refreshInPageAnalytics() {
  fetch('/api/analytics/overview')
    .then(r => r.json())
    .then(data => {
      latestAnalyticsOverview = data;
      const kSearches = document.getElementById('inpageKpiSearches');
      const kUsers = document.getElementById('inpageKpiUsers');
      const kDomains = document.getElementById('inpageKpiDomains');
      const kOutreach = document.getElementById('inpageKpiOutreach');
      const kEvents = document.getElementById('inpageKpiEvents');

      if (kSearches) kSearches.innerText = data.total_searches || 0;
      if (kUsers) kUsers.innerText = data.total_users || (data.user_roster ? data.user_roster.length : 0);
      if (kDomains) kDomains.innerText = data.unique_domains || 0;
      if (kOutreach) kOutreach.innerText = data.total_outreach || 0;
      if (kEvents) kEvents.innerText = data.total_events || (data.recent_events ? data.recent_events.length : 0);

      // Inpage Users Roster
      const rosterList = document.getElementById('inpageAnalyticsUserRoster');
      const rosterCount = document.getElementById('inpageUserRosterCount');
      if (rosterList) {
        const users = data.user_roster || [];
        if (rosterCount) rosterCount.innerText = `${users.length} accounts`;
        if (users.length === 0) {
          rosterList.innerHTML = `<div style="font-size: 12px; color: var(--text-faint); padding: 10px; text-align: center;">No registered profiles yet.</div>`;
        } else {
          rosterList.innerHTML = users.map(u => {
            const initials = (u.name || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
            const dateStr = u.updated_at ? new Date(u.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'recently';
            return `
              <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="width: 30px; height: 30px; border-radius: 50%; background: #6366F1; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">
                    ${initials}
                  </div>
                  <div>
                    <div style="font-size: 13px; font-weight: 700; color: #fff;">${u.name || 'Anonymous User'}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${u.title || 'Account Executive'} · <span style="color: #38bdf8;">${u.company || 'Zendesk'}</span></div>
                  </div>
                </div>
                <div style="text-align: right;">
                  <span class="badge badge-indigo" style="font-size: 10px;">${u.preset || 'zendesk'}</span>
                  <div style="font-size: 10px; color: var(--text-faint); margin-top: 2px;">${dateStr}</div>
                </div>
              </div>
            `;
          }).join('');
        }
      }

      // Inpage Top Domains
      const topList = document.getElementById('inpageAnalyticsTopDomains');
      if (topList) {
        const domains = data.top_domains || [];
        if (domains.length === 0) {
          topList.innerHTML = `<div style="font-size: 12px; color: var(--text-faint); padding: 10px; text-align: center;">No searches logged yet.</div>`;
        } else {
          topList.innerHTML = domains.map((d, idx) => `
            <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 11px; font-weight: 800; color: var(--text-faint); width: 16px;">#${idx+1}</span>
                <span style="font-size: 13px; font-weight: 700; color: #fff;">${d.domain}</span>
                <span style="font-size: 11px; color: var(--text-muted);">(${d.company_name || 'Target'})</span>
              </div>
              <span class="badge badge-sky" style="font-size: 11px; font-weight: 700;">${d.count} searches</span>
            </div>
          `).join('');
        }
      }

      // Inpage Activity Feed
      const feed = document.getElementById('inpageAnalyticsActivityFeed');
      if (feed) {
        const events = data.recent_events || [];
        if (events.length === 0) {
          feed.innerHTML = `<div style="font-size: 12px; color: var(--text-faint); padding: 10px; text-align: center;">No activity recorded yet.</div>`;
        } else {
          feed.innerHTML = events.map(ev => {
            const timeStr = ev.timestamp ? new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '';
            let actionBadge = `<span class="badge badge-sky" style="font-size: 10px;">${ev.action}</span>`;
            if (ev.action.includes('search')) actionBadge = `<span class="badge badge-emerald" style="font-size: 10px;">🔍 Search</span>`;
            else if (ev.action.includes('outreach')) actionBadge = `<span class="badge badge-amber" style="font-size: 10px;">✉️ Outreach</span>`;
            else if (ev.action.includes('account')) actionBadge = `<span class="badge badge-indigo" style="font-size: 10px;">👤 Profile</span>`;
            else if (ev.action.includes('roleplay')) actionBadge = `<span class="badge badge-sky" style="font-size: 10px;">🎭 Roleplay</span>`;

            return `
              <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.02); padding: 6px 10px; border-radius: 6px; font-size: 12px; border-left: 3px solid #6366F1;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-weight: 700; color: #fff;">${ev.user_name || 'Anonymous'}</span>
                  <span style="color: var(--text-faint); font-size: 11px;">(${ev.user_title || 'AE'} · ${ev.user_company || 'Zendesk'})</span>
                  ${actionBadge}
                  <span style="color: #38bdf8; font-weight: 600;">${ev.target_domain || ''}</span>
                  <span style="color: var(--text-muted); font-size: 11px;">${ev.details ? '· ' + ev.details : ''}</span>
                </div>
                <div style="font-size: 10.5px; color: var(--text-faint); font-family: monospace;">${timeStr}</div>
              </div>
            `;
          }).join('');
        }
      }
    })
    .catch(err => console.warn('Error loading in-page analytics:', err));
}

function updateHeroUserIdentityDisplay() {
  const session = window.UserSession ? window.UserSession.getSession() : (window.currentAuthData || {});
  const heroDisplay = document.getElementById('heroUserIdentityDisplay');
  const heroAvatar = document.getElementById('heroUserAvatar');
  if (heroDisplay && session.name) {
    heroDisplay.innerText = `${session.name} · ${session.title || 'Account Executive'} (${session.company || 'Zendesk'})`;
  }
  if (heroAvatar && session.name) {
    const initials = session.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AR';
    heroAvatar.innerText = initials;
  }
}

// Track initial page view event on startup
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    trackSiteEvent('page_view', window.location.hostname, 'Console loaded');
    updateHeroUserIdentityDisplay();
  }, 500);
});
