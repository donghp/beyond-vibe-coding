/**
 * ENERIX Carbon - Regulated Facilities Master View
 */
import { dataProvider } from '../../app/data-provider.js';
import { formatBadge } from '../../app/formatters.js';

export function renderFacilitiesPage() {
  const facilities = dataProvider.getFacilities();

  return `
    <div class="page-title-bar">
      <h1 class="page-title">Regulated Facilities Registry</h1>
      <p class="page-subtitle">Master Registry of Regulated Industrial Establishments & Plants</p>
    </div>

    <div class="enerix-table-wrapper">
      <table class="enerix-table">
        <thead>
          <tr>
            <th>Facility ID</th>
            <th>Tax ID (MST)</th>
            <th>Legal Enterprise Name</th>
            <th>Operating Facility Name</th>
            <th>Location</th>
            <th>Sector</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${facilities.map(f => `
            <tr>
              <td class="mono-text">${f.facility_id}</td>
              <td class="mono-text">${f.tax_id}</td>
              <td>${f.legal_name}</td>
              <td style="font-weight:600;">${f.facility_name}</td>
              <td>${f.address}, ${f.province}</td>
              <td>${f.sector_id}</td>
              <td>${formatBadge(f.regulatory_status)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
