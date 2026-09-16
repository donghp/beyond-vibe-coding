/**
 * ENERIX Carbon - Regulatory Reports Workspace
 * Consumes governed InventoryReport contracts.
 */
import { dataProvider } from '../../app/data-provider.js';
import { REPORT_LIFECYCLE } from '../../engine/reporting-blueprint.js';

export function renderReportsPage() {
  const reports = dataProvider.getReports();

  return `
    <div class="page-title-bar">
      <h1 class="page-title">Enterprise GHG Inventory Reports</h1>
      <p class="page-subtitle">Governed Reporting Workspace & Audit Trail Access</p>
    </div>

    <div class="enerix-table-wrapper">
      <table class="enerix-table" id="reports-table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Period</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${reports.map(r => `
            <tr>
              <td class="mono-text">${r.report_number}</td>
              <td>${r.reporting_period}</td>
              <td>${r.report_type}</td>
              <td><span class="status-badge status-${r.status.toLowerCase()}">${r.status}</span></td>
              <td>
                <button class="enerix-button-sm" data-report-id="${r.report_id}">Review Report</button>
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
            <h2 class="card-title">Report Detail: ${report.report_number}</h2>
            <div class="card-content">
              <p><strong>Status:</strong> <span class="status-badge status-${report.status.toLowerCase()}">${report.status}</span></p>
              <p><strong>Period:</strong> ${report.reporting_period}</p>
              <p><strong>Framework:</strong> ${report.report_framework} v${report.report_framework_version}</p>
              <p><strong>Version:</strong> ${report.report_version}</p>
              <p><strong>Created:</strong> ${new Date(report.created_at).toLocaleDateString()}</p>
            </div>
            <h3 style="margin-top:16px;">Readiness State</h3>
            <p>${report.status === 'READY' ? '✅ Report Ready' : '⏳ In Progress/Blocked'}</p>
            
            <button class="enerix-button" id="close-detail">Close</button>
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
