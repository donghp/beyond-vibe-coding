/**
 * ENERIX Carbon - Emission Factors Registry View
 */
import { dataProvider } from '../../app/data-provider.js';

export function renderEmissionFactorsPage() {
  const factors = dataProvider.getEmissionFactors();

  return `
    <div class="page-title-bar">
      <h1 class="page-title">Emission Factors Registry</h1>
      <p class="page-subtitle">Versioned Emission Factors with Legal Source & Methodological Provenance</p>
    </div>

    <div class="enerix-table-wrapper">
      <table class="enerix-table">
        <thead>
          <tr>
            <th>Factor ID</th>
            <th>Factor Name</th>
            <th>Target Gas</th>
            <th>Value</th>
            <th>Unit</th>
            <th>Tier</th>
            <th>Source Document</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${factors.map(ef => `
            <tr>
              <td class="mono-text">${ef.factor_id}</td>
              <td style="font-weight:600;">${ef.factor_name}</td>
              <td>${ef.gas}</td>
              <td class="mono-text" style="font-weight:700;">${ef.value}</td>
              <td>${ef.unit}</td>
              <td>${ef.tier}</td>
              <td style="font-size:12px;color:#64748b;">${ef.source_document_id}</td>
              <td><span class="status-badge active">${ef.status}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
