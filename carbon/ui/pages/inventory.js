/**
 * ENERIX Carbon - GHG Inventory (Scopes 1, 2, 3) View
 */
import { formatCO2e } from '../../app/formatters.js';

export function renderInventoryPage() {
  return `
    <div class="page-title-bar">
      <h1 class="page-title">GHG Emissions Inventory (Scopes 1, 2, 3)</h1>
      <p class="page-subtitle">Standardized GHG Protocol & TCVN ISO 14064-1 Accounting</p>
    </div>

    <div class="card-grid">
      <div class="enerix-card">
        <div class="enerix-card-title">Scope 1 (Direct Emissions) <span>🔥</span></div>
        <div style="font-size:24px;font-weight:700;color:var(--color-navy-900);">${formatCO2e(67.00)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:4px;">Stationary Combustion (Diesel Generators)</div>
      </div>

      <div class="enerix-card">
        <div class="enerix-card-title">Scope 2 (Energy Indirect) <span>⚡</span></div>
        <div style="font-size:24px;font-weight:700;color:var(--color-sky-600);">${formatCO2e(1014.90)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:4px;">National Grid Consumption (1,500,000 kWh)</div>
      </div>

      <div class="enerix-card">
        <div class="enerix-card-title">Scope 3 (Value Chain) <span>🚚</span></div>
        <div style="font-size:24px;font-weight:700;color:var(--color-navy-900);">Pending Input</div>
        <div style="font-size:12px;color:#64748b;margin-top:4px;">Upstream Supply Chain & Logistics</div>
      </div>
    </div>
  `;
}
