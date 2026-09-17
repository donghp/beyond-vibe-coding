/**
 * ENERIX Carbon - Regulatory Reports Workspace
 * Consumes governed InventoryReport contracts.
 */
import { dataProvider } from '../../app/data-provider.js';
import { REPORT_LIFECYCLE } from '../../engine/reporting-blueprint.js';
import { ICONS } from '../components/icons.js';

export function renderReportsPage() {
  const reports = dataProvider.getReports();

  return `
    <div class="page-title-bar">
      <h1 class="page-title">Enterprise GHG Inventory Reports</h1>
      <p class="page-subtitle">Governed Reporting Workspace & Statutory Audit Trail Access</p>
    </div>

    <div class="enerix-table-wrapper" style="box-shadow:none;border:1px solid var(--carbon-navy-200);">
      <table class="enerix-table" id="reports-table">
        <thead>
          <tr style="background:var(--carbon-navy-50);">
            <th>Report ID</th>
            <th>Reporting Period</th>
            <th>Report Type</th>
            <th>Statutory Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${reports.map(r => `
            <tr>
              <td class="mono-text" style="font-weight:600;">${r.report_number}</td>
              <td>${r.reporting_period}</td>
              <td>${r.report_type}</td>
              <td><span class="status-badge status-${r.status.toLowerCase()}">${r.status}</span></td>
              <td>
                <button class="enerix-button enerix-button-secondary" data-report-id="${r.report_id}" style="font-size:11px;padding:4px 10px;">
                  Review Report
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div id="report-detail-view" style="margin-top:24px;display:none;">
      <!-- Detail view injected here -->
    </div>
  `;
}

renderReportsPage.attachEvents = (container) => {
  container.querySelectorAll('button[data-report-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const reportId = e.target.getAttribute('data-report-id');
      const report = dataProvider.getReport(reportId);
      if (report) {
        const detailView = container.querySelector('#report-detail-view');
        detailView.innerHTML = `
          <div class="enerix-card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
              <h2 class="enerix-card-title" style="margin-bottom:0;">Report Specification: ${report.report_number}</h2>
              <span class="status-badge status-${report.status.toLowerCase()}">${report.status}</span>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;background:var(--carbon-navy-50);border:1px solid var(--carbon-navy-200);border-radius:6px;padding:16px;margin-bottom:16px;">
              <div>
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--carbon-navy-500);margin-bottom:4px;">Period</div>
                <div style="font-weight:600;color:var(--carbon-navy-900);">${report.reporting_period}</div>
              </div>
              <div>
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--carbon-navy-500);margin-bottom:4px;">Governing Framework</div>
                <div style="font-weight:600;color:var(--carbon-navy-900);">${report.report_framework} v${report.report_framework_version}</div>
              </div>
              <div>
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--carbon-navy-500);margin-bottom:4px;">Report Version</div>
                <div class="mono-text" style="font-weight:600;color:var(--carbon-navy-900);">${report.report_version}</div>
              </div>
              <div>
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--carbon-navy-500);margin-bottom:4px;">Created Date</div>
                <div style="font-size:13px;color:var(--carbon-navy-700);">${new Date(report.created_at).toLocaleDateString()}</div>
              </div>
            </div>

            <div style="margin-bottom:16px;">
              <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:var(--carbon-navy-500);margin-bottom:6px;">Readiness State</div>
              <div>
                ${report.status === 'READY'
                  ? `<span style="display:inline-flex;align-items:center;gap:6px;color:var(--carbon-green-600);font-weight:600;font-size:13px;">${ICONS.checkCircle(16)} Report Ready for Submission</span>`
                  : `<span style="display:inline-flex;align-items:center;gap:6px;color:var(--carbon-amber-600);font-weight:600;font-size:13px;">${ICONS.warning(16)} In Progress / Blocked by Validation Gates</span>`
                }
              </div>
            </div>
            
            <button class="enerix-button enerix-button-secondary" id="close-detail" style="font-size:12px;">
              Close Review
            </button>
          </div>
        `;
        detailView.style.display = 'block';
        
        container.querySelector('#close-detail').addEventListener('click', () => {
          detailView.style.display = 'none';
        });
      }
    });
  });
};
