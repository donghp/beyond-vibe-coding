/**
 * ENERIX Carbon - GHG Emissions Inventory & Scope Mapping
 * Part of Measurement Workspace (Phase C)
 *
 * Conforms to MDS ENERIX Carbon V1.0 (Expanded)
 * - Scope 1: Direct emissions (Stationary combustion, mobile combustion, process emissions, fugitive emissions)
 * - Scope 2: Energy indirect emissions (Location-based grid electricity, market-based instruments)
 * - Scope 3: Value chain emissions (15 categories mapped according to GHG Protocol Corporate Value Chain Standard)
 * - Interactive category drill-down and emission source mapping
 */

import { stateStore } from '../../app/state-store.js';
import { formatBadge, formatCO2e, formatNumber } from '../../app/formatters.js';
import { ICONS } from '../components/icons.js';

export function renderInventoryPage() {
  const vm = stateStore.getInventoryViewModel();
  const facility = stateStore.getFacilityContext();
  const overviewVm = stateStore.getOverviewViewModel();
  const calc = overviewVm.calculation || {};

  const totalEmissions = calc.total_co2e_tons || 0;
  const s1Tons = calc.scope_1?.tons || 0;
  const s2Tons = calc.scope_2?.tons || 0;
  const s3Tons = calc.scope_3?.tons || 0;

  const s1Pct = totalEmissions > 0 ? ((s1Tons / totalEmissions) * 100).toFixed(1) : '0.0';
  const s2Pct = totalEmissions > 0 ? ((s2Tons / totalEmissions) * 100).toFixed(1) : '0.0';

  // 15 GHG Protocol Scope 3 Categories
  const scope3Categories = [
    { cat: 'Cat 1', name: 'Purchased Goods and Services', status: 'NOT_IN_BOUNDARY', desc: 'Extraction, production of purchased raw materials.' },
    { cat: 'Cat 2', name: 'Capital Goods', status: 'NOT_IN_BOUNDARY', desc: 'Manufacturing of buildings, machinery, vehicles.' },
    { cat: 'Cat 3', name: 'Fuel and Energy-Related Activities', status: 'NOT_IN_BOUNDARY', desc: 'Upstream emissions of purchased fuels and electricity.' },
    { cat: 'Cat 4', name: 'Upstream Transportation and Distribution', status: 'NOT_IN_BOUNDARY', desc: 'Freight, third-party logistics inbound.' },
    { cat: 'Cat 5', name: 'Waste Generated in Operations', status: 'NOT_IN_BOUNDARY', desc: 'Disposal and treatment of waste.' },
    { cat: 'Cat 6', name: 'Business Travel', status: 'NOT_IN_BOUNDARY', desc: 'Employee air, rail, road travel.' },
    { cat: 'Cat 7', name: 'Employee Commuting', status: 'NOT_IN_BOUNDARY', desc: 'Transportation between home and worksite.' },
    { cat: 'Cat 8', name: 'Upstream Leased Assets', status: 'NOT_IN_BOUNDARY', desc: 'Operation of assets leased by reporting entity.' },
    { cat: 'Cat 9', name: 'Downstream Transportation and Distribution', status: 'NOT_IN_BOUNDARY', desc: 'Outbound logistics, distribution, storage.' },
    { cat: 'Cat 10', name: 'Processing of Sold Products', status: 'NOT_IN_BOUNDARY', desc: 'Third-party processing of intermediate products.' },
    { cat: 'Cat 11', name: 'Use of Sold Products', status: 'NOT_IN_BOUNDARY', desc: 'Direct / indirect use-phase emissions.' },
    { cat: 'Cat 12', name: 'End-of-Life Treatment of Sold Products', status: 'NOT_IN_BOUNDARY', desc: 'Waste disposal and treatment of products.' },
    { cat: 'Cat 13', name: 'Downstream Leased Assets', status: 'NOT_IN_BOUNDARY', desc: 'Operation of assets owned and leased out.' },
    { cat: 'Cat 14', name: 'Franchises', status: 'NOT_IN_BOUNDARY', desc: 'Operation of franchises not included in Scopes 1/2.' },
    { cat: 'Cat 15', name: 'Investments', status: 'NOT_IN_BOUNDARY', desc: 'Scope 1 and 2 emissions of investees.' }
  ];

  return `
    <div class="page-title-bar" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;margin-bottom:20px;">
      <div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
          <span style="font-family:var(--carbon-font-mono);font-size:11px;font-weight:700;color:var(--carbon-blue-600);background:var(--carbon-blue-100);padding:2px 8px;border-radius:4px;">
            01 MEASURE · SCOPES 1, 2, 3
          </span>
          <span style="font-size:12px;color:var(--carbon-navy-500);">
            GHG Protocol Corporate Standard & TCVN ISO 14064-1
          </span>
        </div>
        <h1 class="page-title">Emissions Inventory & Scope Mapping</h1>
        <p class="page-subtitle">
          Facility: <strong>${facility?.facility_name || vm.facility_id}</strong> (${vm.facility_id}) | Reporting Period: <strong>${vm.reporting_year}</strong>
        </p>
      </div>

      <div style="display:flex;gap:10px;">
        <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="overview" style="font-size:12px;padding:6px 12px;">
          ← Return to Overview
        </button>
        <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="calculations" style="font-size:12px;padding:6px 12px;">
          Inspect Calculation Runs →
        </button>
      </div>
    </div>

    <!-- 3-PILLAR SCOPE CARDS -->
    <div class="card-grid" style="gap:16px;margin-bottom:24px;">

      <!-- Scope 1 Card -->
      <div class="enerix-card" style="border-top:3px solid var(--carbon-navy-800);background:#fff;">
        <div class="enerix-card-title">
          <span style="font-weight:700;color:var(--carbon-navy-900);">Scope 1 · Direct GHG</span>
          <span style="font-size:11px;font-weight:700;color:var(--carbon-navy-600);">${s1Pct}% of Total</span>
        </div>
        <div style="font-size:28px;font-weight:800;color:var(--carbon-navy-950);margin:8px 0 4px 0;letter-spacing:-0.5px;">
          ${vm.scope_1.formatted}
        </div>
        <div style="font-size:12px;color:var(--carbon-navy-600);margin-bottom:12px;">
          Stationary fuel combustion (Diesel generator & boilers)
        </div>
        <div style="border-top:1px solid var(--carbon-navy-200);padding-top:10px;font-size:11px;display:flex;justify-content:space-between;align-items:center;">
          <span style="color:var(--carbon-green-700);font-weight:600;">Statutory Mandatory</span>
          <button class="btn-drilldown" data-nav="activity-data" style="background:none;border:none;color:var(--carbon-blue-600);font-weight:600;cursor:pointer;padding:0;">
            1 Activity Record →
          </button>
        </div>
      </div>

      <!-- Scope 2 Card -->
      <div class="enerix-card" style="border-top:3px solid var(--carbon-blue-500);background:#fff;">
        <div class="enerix-card-title">
          <span style="font-weight:700;color:var(--carbon-navy-900);">Scope 2 · Energy Indirect</span>
          <span style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);">${s2Pct}% of Total</span>
        </div>
        <div style="font-size:28px;font-weight:800;color:var(--carbon-navy-950);margin:8px 0 4px 0;letter-spacing:-0.5px;">
          ${vm.scope_2.formatted}
        </div>
        <div style="font-size:12px;color:var(--carbon-navy-600);margin-bottom:12px;">
          National grid electricity (Location-based accounting)
        </div>
        <div style="border-top:1px solid var(--carbon-navy-200);padding-top:10px;font-size:11px;display:flex;justify-content:space-between;align-items:center;">
          <span style="color:var(--carbon-green-700);font-weight:600;">Statutory Mandatory</span>
          <button class="btn-drilldown" data-nav="activity-data" style="background:none;border:none;color:var(--carbon-blue-600);font-weight:600;cursor:pointer;padding:0;">
            1 Activity Record →
          </button>
        </div>
      </div>

      <!-- Scope 3 Card -->
      <div class="enerix-card" style="border-top:3px solid var(--carbon-navy-400);background:#fff;">
        <div class="enerix-card-title">
          <span style="font-weight:700;color:var(--carbon-navy-900);">Scope 3 · Value Chain</span>
          <span style="font-size:10px;background:var(--carbon-navy-100);color:var(--carbon-navy-700);padding:2px 6px;border-radius:4px;font-weight:600;">OPTIONAL</span>
        </div>
        <div style="font-size:28px;font-weight:700;color:var(--carbon-navy-600);margin:8px 0 4px 0;">
          ${vm.scope_3.formatted}
        </div>
        <div style="font-size:12px;color:var(--carbon-navy-500);margin-bottom:12px;">
          15 Upstream and downstream categories
        </div>
        <div style="border-top:1px solid var(--carbon-navy-200);padding-top:10px;font-size:11px;display:flex;justify-content:space-between;align-items:center;">
          <span style="color:var(--carbon-navy-500);">Voluntary Reporting</span>
          <span style="color:var(--carbon-navy-600);font-weight:600;">0 of 15 Scoped</span>
        </div>
      </div>

    </div>

    <!-- SCOPE 1 & 2 DIRECT EMISSION SOURCE INVENTORY -->
    <div class="enerix-card" style="margin-bottom:24px;">
      <div style="margin-bottom:14px;">
        <h2 style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);margin:0;">
          Operational Scope 1 & 2 Source Inventory
        </h2>
        <p style="font-size:12px;color:var(--carbon-navy-600);margin:2px 0 0 0;">
          Mandatory operational boundary accounting under Decision 42/2026/QĐ-TTg and Circular 17/2022/TT-BTNMT.
        </p>
      </div>

      <div class="enerix-table-wrapper">
        <table class="enerix-table">
          <thead>
            <tr>
              <th>Scope</th>
              <th>Source / Activity</th>
              <th>Activity Category</th>
              <th>Quantity & Unit</th>
              <th>Emission Factor</th>
              <th style="text-align:right;">Emissions (tCO2e)</th>
              <th>Legal Baseline</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span style="font-weight:700;color:var(--carbon-navy-900);">Scope 1</span></td>
              <td>
                <div style="font-weight:600;color:var(--carbon-navy-900);">Diesel Fuel (Stationary Combustion)</div>
                <div class="mono-text" style="font-size:11px;color:var(--carbon-navy-500);">ACT-REC-002</div>
              </td>
              <td>Stationary Combustion (Lò hơi)</td>
              <td class="mono-text" style="font-weight:600;">25,000 liter</td>
              <td class="mono-text" style="font-size:12px;">0.00084 t/L × 3.10 tCO2/t</td>
              <td style="text-align:right;font-weight:800;color:var(--carbon-navy-900);font-family:var(--carbon-font-mono);">
                ${calc.scope_1?.formatted || '65.10 tCO2e'}
              </td>
              <td style="font-size:12px;color:var(--carbon-navy-600);">TT 17/2022/TT-BTNMT</td>
            </tr>
            <tr>
              <td><span style="font-weight:700;color:var(--carbon-blue-600);">Scope 2</span></td>
              <td>
                <div style="font-weight:600;color:var(--carbon-navy-900);">National Grid Purchased Electricity</div>
                <div class="mono-text" style="font-size:11px;color:var(--carbon-navy-500);">ACT-REC-001</div>
              </td>
              <td>Purchased Electricity (EVN Grid)</td>
              <td class="mono-text" style="font-weight:600;">1,500,000 kWh</td>
              <td class="mono-text" style="font-size:12px;">0.7221 tCO2/MWh</td>
              <td style="text-align:right;font-weight:800;color:var(--carbon-navy-900);font-family:var(--carbon-font-mono);">
                ${calc.scope_2?.formatted || '1083.15 tCO2e'}
              </td>
              <td style="font-size:12px;color:var(--carbon-navy-600);">QĐ 42/2026/QĐ-TTg (Grid EF)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SCOPE 3 VALUE CHAIN 15-CATEGORY ARCHITECTURE MATRIX -->
    <div class="enerix-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);margin:0;">
            Scope 3 Value Chain (15 Standard Categories)
          </h2>
          <p style="font-size:12px;color:var(--carbon-navy-600);margin:2px 0 0 0;">
            Standardized mapping according to the GHG Protocol Corporate Value Chain (Scope 3) Standard.
          </p>
        </div>
        <span style="font-size:11px;font-weight:600;background:var(--carbon-navy-100);color:var(--carbon-navy-700);padding:4px 8px;border-radius:4px;">
          Statutory Status: Excluded from statutory decree quota
        </span>
      </div>

      <div class="enerix-table-wrapper">
        <table class="enerix-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Category Name</th>
              <th>Boundary Description</th>
              <th>Status</th>
              <th>Measured (tCO2e)</th>
            </tr>
          </thead>
          <tbody>
            ${scope3Categories.map(c => `
              <tr>
                <td class="mono-text" style="font-weight:700;color:var(--carbon-navy-800);">${c.cat}</td>
                <td style="font-weight:600;color:var(--carbon-navy-900);">${c.name}</td>
                <td style="font-size:12px;color:var(--carbon-navy-600);">${c.desc}</td>
                <td>
                  <span style="font-size:10px;font-weight:600;background:var(--carbon-navy-100);color:var(--carbon-navy-600);padding:2px 6px;border-radius:4px;">
                    ${c.status}
                  </span>
                </td>
                <td class="mono-text" style="color:var(--carbon-navy-400);font-size:12px;">0.00</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

renderInventoryPage.attachEvents = function(container) {
  if (!container) return;
  const drillDownButtons = container.querySelectorAll('.btn-drilldown');
  drillDownButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetNav = e.currentTarget.getAttribute('data-nav');
      if (targetNav) {
        stateStore.setRoute(targetNav);
      }
    });
  });
};
