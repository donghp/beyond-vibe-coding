/**
 * ENERIX Carbon - Executive Dashboard View
 */
import { dataProvider } from '../../app/data-provider.js';
import { formatCO2e, formatBadge } from '../../app/formatters.js';

export function renderOverviewPage() {
  const facilities = dataProvider.getFacilities();
  const mandatoryCount = facilities.filter(f => f.regulatory_status === 'MANDATORY').length;

  return `
    <div class="page-title-bar">
      <h1 class="page-title">Executive Carbon & GHG Dashboard</h1>
      <p class="page-subtitle">Platform Status as of 16 September 2026 | Governing Decision 42/2026/QĐ-TTg Baseline</p>
    </div>

    <div class="card-grid">
      <div class="enerix-card">
        <div class="enerix-card-title">Regulated Facilities <span>🏭</span></div>
        <div style="font-size:28px;font-weight:700;color:var(--color-navy-900);">${facilities.length}</div>
        <div style="font-size:12px;color:#64748b;margin-top:4px;">${mandatoryCount} Mandatory under QĐ 42/2026</div>
      </div>

      <div class="enerix-card">
        <div class="enerix-card-title">Scope 1 & 2 Emissions <span>🌱</span></div>
        <div style="font-size:28px;font-weight:700;color:var(--color-sky-600);">${formatCO2e(1031.35)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:4px;">2026 Q1 Verified Runs</div>
      </div>

      <div class="enerix-card">
        <div class="enerix-card-title">Regulatory Framework <span>⚖️</span></div>
        <div style="font-size:18px;font-weight:700;color:var(--color-navy-900);">QĐ 42/2026/QĐ-TTg</div>
        <div style="font-size:12px;color:#16a34a;margin-top:4px;">Effective: 25 September 2026</div>
      </div>
    </div>

    <div class="enerix-card" style="margin-bottom:24px;">
      <div class="enerix-card-title">Enterprise Compliance Timeline</div>
      <p style="font-size:13px;color:#475569;margin-bottom:12px;">
        Pursuant to <strong>Nghị định 06/2022/NĐ-CP</strong> as amended by <strong>Nghị định 83/2026/NĐ-CP</strong> and <strong>Quyết định 42/2026/QĐ-TTg</strong>, regulated facilities must submit greenhouse gas inventories for the 2026 reporting period according to ministry MRV Circulars.
      </p>
      <div style="display:flex;gap:12px;">
        <span class="status-badge mandatory">QĐ 42/2026 Listed</span>
        <span class="status-badge active">MRV Verified</span>
        <span class="status-badge pending">Audit Trace Ready</span>
      </div>
    </div>

    <div class="enerix-table-wrapper">
      <table class="enerix-table">
        <thead>
          <tr>
            <th>Facility ID</th>
            <th>Facility Name</th>
            <th>Province</th>
            <th>Sector</th>
            <th>Status</th>
            <th>Legal Basis</th>
          </tr>
        </thead>
        <tbody>
          ${facilities.map(f => `
            <tr>
              <td class="mono-text">${f.facility_id}</td>
              <td style="font-weight:600;">${f.facility_name}</td>
              <td>${f.province}</td>
              <td>${f.sector_id}</td>
              <td>${formatBadge(f.regulatory_status)}</td>
              <td style="font-size:12px;color:#64748b;">${f.legal_basis}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
