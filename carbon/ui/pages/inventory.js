/**
 * ENERIX Carbon - GHG Inventory (Scopes 1, 2, 3) View
 */
import { stateStore } from '../../app/state-store.js';

export function renderInventoryPage() {
  const vm = stateStore.getInventoryViewModel();

  return `
    <div class="page-title-bar">
      <h1 class="page-title">GHG Emissions Inventory (Scopes 1, 2, 3)</h1>
      <p class="page-subtitle">Standardized GHG Protocol & TCVN ISO 14064-1 Accounting (${vm.facility_id} | ${vm.reporting_year})</p>
    </div>

    <div class="card-grid">
      <div class="enerix-card">
        <div class="enerix-card-title">Scope 1 (Direct Emissions) <span>🔥</span></div>
        <div style="font-size:24px;font-weight:700;color:var(--color-navy-900);">${vm.scope_1.formatted}</div>
        <div style="font-size:12px;color:#64748b;margin-top:4px;">Stationary Combustion (Diesel Fuel)</div>
      </div>

      <div class="enerix-card">
        <div class="enerix-card-title">Scope 2 (Energy Indirect) <span>⚡</span></div>
        <div style="font-size:24px;font-weight:700;color:var(--color-sky-600);">${vm.scope_2.formatted}</div>
        <div style="font-size:12px;color:#64748b;margin-top:4px;">Grid Electricity Consumption</div>
      </div>

      <div class="enerix-card">
        <div class="enerix-card-title">Scope 3 (Value Chain) <span>🚚</span></div>
        <div style="font-size:24px;font-weight:700;color:var(--color-navy-900);">${vm.scope_3.formatted}</div>
        <div style="font-size:12px;color:#64748b;margin-top:4px;">Upstream Supply Chain & Logistics</div>
      </div>
    </div>
  `;
}
