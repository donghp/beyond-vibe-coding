/**
 * ENERIX Carbon - Ministry MRV Circulars View
 */
import { dataProvider } from '../../app/data-provider.js';

export function renderMethodologiesPage() {
  const methodologies = dataProvider.getMethodologies();

  return `
    <div class="page-title-bar">
      <h1 class="page-title">Ministry MRV Methodologies</h1>
      <p class="page-subtitle">Sectoral MRV Methodology Circulars (MOIT, MOC, MARD, MONRE)</p>
    </div>

    <div class="enerix-table-wrapper">
      <table class="enerix-table">
        <thead>
          <tr>
            <th>Methodology ID</th>
            <th>Title & Circular</th>
            <th>Competent Authority</th>
            <th>Sector ID</th>
            <th>Calculation Model Class</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${methodologies.map(m => `
            <tr>
              <td class="mono-text">${m.methodology_id}</td>
              <td style="font-weight:600;">${m.title}</td>
              <td>${m.authority}</td>
              <td>${m.sector_id}</td>
              <td><span class="mono-text">${m.calculation_model_class}</span></td>
              <td><span class="status-badge active">${m.status}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
