/**
 * ENERIX Carbon - Activity Data Ledger View
 */
import { formatNumber } from '../../app/formatters.js';

export function renderActivityDataPage() {
  const records = [
    { id: 'ACT-REC-001', facility: 'FAC-2026-001', activity: 'National Grid Electricity', quantity: 1500000, unit: 'kWh', period: '2026-Q1', evidence: 'EVI-INV-2026-01' },
    { id: 'ACT-REC-002', facility: 'FAC-2026-001', activity: 'Diesel Fuel (Stationary)', quantity: 25000, unit: 'liter', period: '2026-Q1', evidence: 'EVI-INV-2026-02' }
  ];

  return `
    <div class="page-title-bar">
      <h1 class="page-title">Activity Data Ledger</h1>
      <p class="page-subtitle">Primary Fuel, Electricity, and Materials Activity Quantities</p>
    </div>

    <div class="enerix-table-wrapper">
      <table class="enerix-table">
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Facility ID</th>
            <th>Activity Category</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Period</th>
            <th>Evidence Reference</th>
          </tr>
        </thead>
        <tbody>
          ${records.map(r => `
            <tr>
              <td class="mono-text">${r.id}</td>
              <td class="mono-text">${r.facility}</td>
              <td style="font-weight:600;">${r.activity}</td>
              <td style="font-weight:700;">${formatNumber(r.quantity)}</td>
              <td>${r.unit}</td>
              <td>${r.period}</td>
              <td class="mono-text" style="color:var(--color-sky-600);">${r.evidence}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
