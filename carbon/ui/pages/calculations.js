/**
 * ENERIX Carbon - Calculation Models View
 */
import { dataProvider } from '../../app/data-provider.js';

export function renderCalculationsPage() {
  const models = dataProvider.getCalculationModels();

  return `
    <div class="page-title-bar">
      <h1 class="page-title">Deterministic Calculation Model Classes</h1>
      <p class="page-subtitle">Standard Engine Contracts (MODEL-01 to MODEL-07)</p>
    </div>

    <div class="enerix-table-wrapper">
      <table class="enerix-table">
        <thead>
          <tr>
            <th>Model ID</th>
            <th>Code</th>
            <th>Formula & Mathematical Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${models.map(m => `
            <tr>
              <td class="mono-text">${m.model_id}</td>
              <td style="font-weight:700;">${m.code}</td>
              <td>${m.description}</td>
              <td><span class="status-badge active">${m.status}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
