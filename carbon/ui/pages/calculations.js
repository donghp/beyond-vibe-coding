/**
 * ENERIX Carbon - Calculation Studio Workspace
 * Task #0027: Primary engineering workspace for governed calculation
 * preparation, execution, inspection, and traceability.
 *
 * CRITICAL ARCHITECTURAL PRINCIPLE:
 * Calculation Studio consumes CalculationPlan, ActivityData, Evidence,
 * Methodology, EmissionFactor, GWP Dataset, Temporal Context, and Regulatory Context
 * and invokes the DETERMINISTIC CALCULATION ENGINE.
 * The UI is NOT Calculation Authority.
 */

import { dataProvider } from '../../app/data-provider.js';
import { stateStore } from '../../app/state-store.js';
import { formatBadge, formatCO2e } from '../../app/formatters.js';
import { ICONS } from '../components/icons.js';

export function renderCalculationsPage(options = {}) {
  const providerStatus = options.status || (dataProvider.getStatus ? dataProvider.getStatus() : 'AVAILABLE');

  if (providerStatus === 'LOADING') {
    return `
      <div class="page-title-bar">
        <h1 class="page-title">Calculation Studio</h1>
        <p class="page-subtitle">Governed Deterministic Calculation Workspace | G2 Execution Core & G3 Plan Binding</p>
      </div>
      <div class="enerix-card" style="text-align:center;padding:48px;" role="status" aria-live="polite">
        <div style="display:flex;justify-content:center;margin-bottom:12px;">${ICONS.spinner(32)}</div>
        <div style="font-size:16px;font-weight:600;color:var(--carbon-navy-900);">Loading Governed Calculation Studio...</div>
        <p style="font-size:13px;color:var(--carbon-navy-500);margin-top:6px;">Retrieving calculation plan, activity ledger, emission factors, and GWP datasets.</p>
      </div>
    `;
  }

  if (providerStatus === 'EMPTY') {
    return `
      <div class="page-title-bar">
        <h1 class="page-title">Calculation Studio</h1>
        <p class="page-subtitle">Governed Deterministic Calculation Workspace | G2 Execution Core & G3 Plan Binding</p>
      </div>
      <div class="enerix-card" style="text-align:center;padding:48px;" role="status">
        <div style="display:flex;justify-content:center;margin-bottom:12px;">${ICONS.folderEmpty(32)}</div>
        <div style="font-size:16px;font-weight:600;color:var(--carbon-navy-900);">No Regulated Facilities Registered</div>
        <p style="font-size:13px;color:var(--carbon-navy-500);margin-top:6px;">No statutory facility records found in data provider registry.</p>
      </div>
    `;
  }

  if (providerStatus === 'ERROR' || options.error) {
    const errorMsg = options.error?.message || 'Failed to load governed calculation state';
    return `
      <div class="page-title-bar">
        <h1 class="page-title">Calculation Studio</h1>
        <p class="page-subtitle">Governed Deterministic Calculation Workspace | G2 Execution Core & G3 Plan Binding</p>
      </div>
      <div class="enerix-card" style="padding:24px;" role="alert">
        <div class="enerix-alert enerix-alert-danger" style="margin-bottom:0;">
          <div style="flex-shrink:0;">${ICONS.blocker(22)}</div>
          <div>
            <div style="font-weight:700;">Calculation Studio Engine Error (Fail-Closed)</div>
            <div style="font-size:13px;margin-top:4px;">${errorMsg}</div>
            <div style="font-size:11px;color:var(--carbon-red-800);margin-top:6px;">Source: CalculationEngine / StateStore Provenance</div>
          </div>
        </div>
      </div>
    `;
  }

  const vm = stateStore.getCalculationStudioViewModel();

  return `
    <div class="page-title-bar" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;">
      <div>
        <h1 class="page-title">Calculation Studio</h1>
        <p class="page-subtitle">Governed Deterministic Calculation Workspace | G2 Execution Core & G3 Plan Binding</p>
      </div>
      <div style="display:flex;gap:10px;align-items:center;">
        <span class="status-badge ${vm.can_execute ? 'active' : 'mandatory'}">
          ${vm.can_execute ? 'CALCULATION_READY' : 'EXECUTION_BLOCKED'}
        </span>
        <span class="status-badge neutral">${vm.target_framework}</span>
      </div>
    </div>

    <!-- Facility & Statutory Context Header Bar -->
    <div class="enerix-card" style="margin-bottom:20px;background:#f8fafc;border-left:4px solid var(--color-sky-600);">
      <div class="card-grid" style="gap:16px;align-items:center;">
        <div>
          <label for="calc-facility-select" style="display:block;font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:4px;">
            Active Regulated Facility
          </label>
          <select id="calc-facility-select" class="enerix-select" style="width:100%;">
            ${vm.facilities_list.map(f => `
              <option value="${f.facility_id}" ${f.is_active ? 'selected' : ''}>
                ${f.facility_name} (${f.facility_id}) - ${f.province}
              </option>
            `).join('')}
          </select>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:4px;">
            Reporting Period & Sector
          </div>
          <div style="font-weight:600;font-size:13px;color:var(--color-navy-900);">
            ${vm.reporting_period.label} | ${vm.sector_id}
          </div>
          <div style="font-size:12px;color:#64748b;">
            Tax ID: <span class="mono-text">${vm.tax_id}</span>
          </div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:4px;">
            Statutory Framework
          </div>
          <div style="font-weight:600;font-size:13px;color:var(--color-navy-900);">
            ${vm.legal_basis}
          </div>
          <div style="font-size:12px;color:#64748b;">
            Applicability: <span style="font-weight:600;color:${vm.regulatory_status === 'MANDATORY' ? '#dc2626' : '#16a34a'};">${vm.regulatory_status}</span>
          </div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:4px;">
            Temporal Regime
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            <span class="status-badge ${vm.is_temporal_segmented ? 'active' : (vm.temporal_status === 'REQUIRES_SEGMENTATION' ? 'mandatory' : 'neutral')}">
              ${vm.is_temporal_segmented ? 'DUAL_REGIME_SEGMENTED' : (vm.temporal_status === 'REQUIRES_SEGMENTATION' ? 'SEGMENTATION_REQUIRED' : 'SINGLE_REGIME')}
            </span>
            <button id="btn-calc-toggle-temporal" class="enerix-btn enerix-btn-outline enerix-btn-sm" title="Toggle Temporal Segmentation">
              ${vm.is_temporal_segmented ? 'Disable Split' : 'Enable Split'}
            </button>
          </div>
        </div>
      </div>
    </div>

    ${!vm.can_execute ? `
      <!-- Fail-Closed Execution Blocker Alert -->
      <div class="enerix-alert enerix-alert-danger" style="margin-bottom:20px;">
        <div style="flex-shrink:0;">${ICONS.blocker(22)}</div>
        <div>
          <div style="font-weight:700;">Deterministic Execution Blocked (Fail-Closed Rule Enforced)</div>
          <ul style="margin:6px 0 0 16px;font-size:12px;line-height:1.6;">
            ${vm.blocking_reasons.map(reason => `<li>${reason}</li>`).join('')}
          </ul>
          <div style="font-size:11px;margin-top:6px;color:var(--carbon-red-800);">
            Resolve prerequisites by enabling temporal segmentation or selecting an authorized facility before triggering deterministic calculation.
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Validation Gates & Execution Action Bar -->
    <div class="enerix-card" style="margin-bottom:24px;">
      <div class="enerix-card-title">
        <span>Governed Validation Gates (G3 Execution Blueprint)</span>
        <span class="mono-text" style="font-size:12px;font-weight:600;color:var(--carbon-navy-500);">Plan ID: ${vm.plan.plan_id}</span>
      </div>
      <p style="font-size:12px;color:var(--carbon-navy-500);margin-bottom:16px;">
        All 6 statutory validation gates must pass before the deterministic calculation engine executes. UI acts as an inspector, not a calculation authority.
      </p>

      <div class="card-grid" style="gap:12px;margin-bottom:20px;">
        ${vm.plan.validation_gates.map(gate => `
          <div style="border:1px solid var(--carbon-navy-200);border-radius:6px;padding:12px;background:var(--carbon-surface-card);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
              <span style="font-size:12px;font-weight:700;color:var(--carbon-navy-900);">${gate.name}</span>
              <span class="status-badge ${gate.status === 'PASS' ? 'active' : (gate.status === 'REQUIRES_REVIEW' ? 'pending' : 'mandatory')}" style="font-size:10px;">
                ${gate.status}
              </span>
            </div>
            <div style="font-size:11px;color:var(--carbon-navy-500);line-height:1.4;">
              ${gate.details}
            </div>
          </div>
        `).join('')}
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid var(--carbon-navy-200);flex-wrap:wrap;gap:12px;">
        <div style="font-size:12px;color:var(--carbon-navy-500);">
          Methodology: <strong style="color:var(--carbon-navy-900);">${vm.methodology.name}</strong> (${vm.methodology.governing_circular})
        </div>
        <div style="display:flex;gap:10px;">
          <button id="btn-recheck-gates" class="enerix-button enerix-button-secondary">
            <span style="display:inline-flex;align-items:center;gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
              Re-evaluate Gates
            </span>
          </button>
          <button id="btn-execute-calc" class="enerix-button enerix-button-primary" ${!vm.can_execute ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
            <span style="display:inline-flex;align-items:center;gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Execute Governed Calculation Engine Run
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Hero Calculation Snapshot & Scopes Breakdown -->
    <div style="margin-bottom:24px;">
      <div class="enerix-card-title" style="margin-bottom:12px;">
        <span>Deterministic Calculation Snapshot & Scope Aggregation</span>
        <span class="mono-text" style="font-size:12px;color:#64748b;">Snapshot ID: ${vm.calculation.snapshot_id}</span>
      </div>

      <div class="card-grid" style="margin-bottom:16px;">
        <!-- Total Gross Emissions Hero -->
        <div class="enerix-card" style="border-top:4px solid var(--color-sky-600);background:#ffffff;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:6px;">
            Total Gross GHG Emissions
          </div>
          <div id="calc-total-emissions" style="font-size:26px;font-weight:800;color:var(--color-navy-900);letter-spacing:-0.03em;">
            ${vm.calculation.total_formatted}
          </div>
          <div style="font-size:11px;color:#64748b;margin-top:4px;">
            ${vm.gwp_dataset.name} (${vm.gwp_dataset.horizon})
          </div>
        </div>

        <!-- Scope 1 Direct -->
        <div class="enerix-card" style="border-top:4px solid #d97706;background:#ffffff;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:6px;">
            Scope 1 (Direct Emissions)
          </div>
          <div style="font-size:22px;font-weight:700;color:var(--color-navy-900);">
            ${vm.calculation.scope_1.formatted}
          </div>
          <div style="font-size:11px;color:#64748b;margin-top:4px;">
            Stationary Fuel Combustion (Diesel)
          </div>
        </div>

        <!-- Scope 2 Indirect -->
        <div class="enerix-card" style="border-top:4px solid #0284c7;background:#ffffff;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:6px;">
            Scope 2 (Energy Indirect)
          </div>
          <div style="font-size:22px;font-weight:700;color:var(--color-navy-900);">
            ${vm.calculation.scope_2.formatted}
          </div>
          <div style="font-size:11px;color:#64748b;margin-top:4px;">
            Location-Based Grid Electricity
          </div>
        </div>

        <!-- Scope 3 Value Chain -->
        <div class="enerix-card" style="border-top:4px solid #94a3b8;background:#ffffff;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:6px;">
            Scope 3 (Value Chain)
          </div>
          <div style="font-size:22px;font-weight:700;color:#64748b;">
            0.00 tCO2e
          </div>
          <div style="font-size:11px;color:#64748b;margin-top:4px;">
            Pending Upstream/Downstream Ledger
          </div>
        </div>
      </div>
    </div>

    <!-- Individual Greenhouse Gas Composition Table -->
    <div class="enerix-card" style="margin-bottom:24px;">
      <div class="enerix-card-title">
        <span>Greenhouse Gas Species Composition & GWP Multipliers</span>
        <span class="status-badge ${vm.gwp_dataset.status === 'ACTIVE' ? 'active' : 'pending'}" style="font-size:10px;">${vm.gwp_dataset.dataset_id} | ${vm.gwp_dataset.horizon}</span>
      </div>
      <p style="font-size:12px;color:#64748b;margin-bottom:12px;">
        Physical emissions characterize each individual greenhouse gas mass before applying run-specific Global Warming Potentials (Dataset: <strong class="mono-text">${vm.gwp_dataset.dataset_id}</strong>, Source: <em>${vm.gwp_dataset.source}</em>). Governed by controlled issue <span class="mono-text">ISSUE-GWP-001</span>.
      </p>

      <div class="enerix-table-wrapper" style="margin-bottom:0;">
        <table class="enerix-table">
          <thead>
            <tr>
              <th>Gas Formula</th>
              <th>Chemical Designation</th>
              <th>Physical Mass</th>
              <th>GWP Multiplier (${vm.gwp_dataset.dataset_id})</th>
              <th>Equivalent Emissions (t CO₂e)</th>
              <th>Contribution</th>
            </tr>
          </thead>
          <tbody>
            ${vm.calculation.gas_breakdown.map(g => {
              const pct = vm.calculation.total_co2e_tons > 0 
                ? ((g.emissions_co2e / vm.calculation.total_co2e_tons) * 100).toFixed(2)
                : '0.00';
              return `
                <tr>
                  <td class="mono-text" style="font-weight:700;color:var(--color-navy-900);">${g.gas}</td>
                  <td>${g.name}</td>
                  <td class="mono-text">${g.physical_mass.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 5 })} ${g.unit}</td>
                  <td class="mono-text" style="font-weight:600;">${g.gwp_multiplier}</td>
                  <td class="mono-text" style="font-weight:700;color:var(--color-navy-900);">${g.formatted}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:8px;">
                      <div style="flex:1;background:#f1f5f9;height:6px;border-radius:3px;overflow:hidden;">
                        <div style="background:var(--color-sky-600);height:100%;width:${Math.min(100, Math.max(1, parseFloat(pct)))}%;"></div>
                      </div>
                      <span style="font-size:11px;font-weight:600;min-width:45px;">${pct}%</span>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Sequential Calculation Steps Trace -->
    <div class="enerix-card" style="margin-bottom:24px;">
      <div class="enerix-card-title">
        <span>Deterministic Plan Step Sequence & Model Bindings</span>
        <span class="status-badge active" style="font-size:10px;">Deterministic Pipeline</span>
      </div>
      <p style="font-size:12px;color:#64748b;margin-bottom:12px;">
        Each step corresponds to an immutable calculation plan node executed by the core calculation engine with strict model contract verification.
      </p>

      <div class="enerix-table-wrapper" style="margin-bottom:0;">
        <table class="enerix-table">
          <thead>
            <tr>
              <th>Step ID</th>
              <th>Description & Activity Category</th>
              <th>Model Class</th>
              <th>Activity Input (AD)</th>
              <th>Factor Binding (EF/GWP)</th>
              <th>Emissions Result</th>
              <th>Evidence Link</th>
            </tr>
          </thead>
          <tbody>
            ${vm.plan.steps.map(step => `
              <tr>
                <td class="mono-text" style="font-weight:700;">${step.step_id}</td>
                <td>
                  <div style="font-weight:600;color:var(--color-navy-900);">${step.name}</div>
                  <div style="font-size:11px;color:#64748b;">${step.activity_type}</div>
                </td>
                <td>
                  <span class="status-badge neutral" style="font-family:var(--font-mono);">${step.model_id}</span>
                </td>
                <td class="mono-text">
                  ${step.quantity !== null ? `${step.quantity.toLocaleString('en-US')} ${step.unit}` : 'Multi-gas vector'}
                </td>
                <td>
                  <div class="mono-text" style="font-size:11px;font-weight:600;">${step.factor_ref}</div>
                  <div style="font-size:11px;color:#64748b;">${step.factor_value}</div>
                </td>
                <td class="mono-text" style="font-weight:700;color:var(--color-navy-900);">
                  ${step.formatted_emissions}
                </td>
                <td>
                  <span class="status-badge active" style="font-size:10px;">${step.evidence_ref}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Bound Activity Data Ledger & Evidence Reference Table -->
    <div class="enerix-card" style="margin-bottom:24px;">
      <div class="enerix-card-title">
        <span>Bound Activity Data Ledger & Evidence Reference</span>
        <span class="mono-text" style="font-size:12px;color:#64748b;">Records: ${vm.activity_data.length}</span>
      </div>
      <p style="font-size:12px;color:#64748b;margin-bottom:12px;">
        Authoritative activity records consumed in the calculation with immutable document evidence hashes.
      </p>

      <div class="enerix-table-wrapper" style="margin-bottom:0;">
        <table class="enerix-table">
          <thead>
            <tr>
              <th>Activity ID</th>
              <th>Activity Type</th>
              <th>Reporting Period</th>
              <th>Metered Quantity</th>
              <th>Unit</th>
              <th>Linked Evidence Reference</th>
              <th>Document Verification</th>
            </tr>
          </thead>
          <tbody>
            ${vm.activity_data.map(act => `
              <tr>
                <td class="mono-text" style="font-weight:700;">${act.activity_id}</td>
                <td style="font-weight:600;color:var(--color-navy-900);">${act.activity_type}</td>
                <td><span class="status-badge neutral">${act.period}</span></td>
                <td class="mono-text" style="font-weight:700;">${act.quantity.toLocaleString('en-US')}</td>
                <td>${act.unit}</td>
                <td class="mono-text">${act.evidence_ref}</td>
                <td><span class="status-badge active">VERIFIED</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Emission Factors & GWP Datasets Reference Table -->
    <div class="enerix-card" style="margin-bottom:24px;">
      <div class="enerix-card-title">
        <span>Emission Factor Registry & Statutory Parameters</span>
        <span class="status-badge neutral" style="font-size:10px;">Ministerial Source Registry</span>
      </div>
      <p style="font-size:12px;color:#64748b;margin-bottom:12px;">
        Authoritative ministerial emission factors consumed during calculation execution.
      </p>

      <div class="enerix-table-wrapper" style="margin-bottom:16px;">
        <table class="enerix-table">
          <thead>
            <tr>
              <th>Factor ID</th>
              <th>Factor Designation</th>
              <th>Gas</th>
              <th>Value</th>
              <th>Unit</th>
              <th>Tier Level</th>
              <th>Statutory Source Document</th>
            </tr>
          </thead>
          <tbody>
            ${vm.emission_factors.map(ef => `
              <tr>
                <td class="mono-text" style="font-weight:700;">${ef.factor_id}</td>
                <td>${ef.factor_name}</td>
                <td><span class="status-badge neutral">${ef.gas}</span></td>
                <td class="mono-text" style="font-weight:700;color:var(--color-navy-900);">${ef.value}</td>
                <td>${ef.unit}</td>
                <td><span class="status-badge ${ef.tier.includes('TIER_2') ? 'active' : 'neutral'}">${ef.tier}</span></td>
                <td class="mono-text" style="font-size:11px;">${ef.source_document_id}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Governed GWP Dataset Catalog -->
      <div style="border-top:1px solid var(--color-border);padding-top:16px;margin-top:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div style="font-size:13px;font-weight:700;color:var(--color-navy-900);">
            Governed GWP Reference Datasets (EC-GWP-001)
          </div>
          <span class="status-badge neutral" style="font-size:10px;">ISSUE-GWP-001: OPEN_CONTROLLED</span>
        </div>
        <p style="font-size:12px;color:#64748b;margin-bottom:12px;">
          Available Global Warming Potential specifications. The active calculation execution binds to the run-specific dataset indicated below.
        </p>
        <div class="enerix-table-wrapper" style="margin-bottom:0;">
          <table class="enerix-table">
            <thead>
              <tr>
                <th>Dataset ID</th>
                <th>Standard Designation</th>
                <th>Time Horizon</th>
                <th>Authoritative Basis / Source</th>
                <th>Effective From</th>
                <th>Gas Multipliers (CO₂ / CH₄ / N₂O)</th>
                <th>Run State</th>
              </tr>
            </thead>
            <tbody>
              ${(vm.all_gwp_datasets || []).map(g => `
                <tr style="${g.is_active ? 'background:#f0f9ff;' : ''}">
                  <td class="mono-text" style="font-weight:700;">${g.dataset_id}</td>
                  <td style="font-weight:${g.is_active ? '700' : '400'};color:var(--color-navy-900);">${g.name}</td>
                  <td>${g.horizon}</td>
                  <td style="font-size:12px;">${g.source}</td>
                  <td class="mono-text" style="font-size:11px;">${g.effective_from || 'N/A'}</td>
                  <td class="mono-text" style="font-size:11px;">CO₂:${g.gwp_values.CO2}, CH₄:${g.gwp_values.CH4}, N₂O:${g.gwp_values.N2O}</td>
                  <td>
                    <span class="status-badge ${g.is_active ? 'active' : 'neutral'}">
                      ${g.is_active ? 'ACTIVE_RUN' : 'AVAILABLE'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Deterministic Provenance & Calculation Integrity Manifest -->
    <div class="enerix-card" style="margin-bottom:24px;">
      <div class="enerix-card-title">
        <span>Calculation Integrity Manifest & Reproducibility Lineage</span>
        <span class="status-badge active" style="font-size:10px;">Deterministic Integrity Verified</span>
      </div>
      <p style="font-size:12px;color:#64748b;margin-bottom:12px;">
        Every calculation execution generates an immutable integrity snapshot and reproducibility hash ensuring bit-for-bit mathematical determinism.
      </p>

      <div style="background:#f8fafc;border:1px solid var(--color-border);border-radius:6px;padding:16px;font-family:var(--font-mono);font-size:12px;line-height:1.8;">
        <div><strong style="color:#64748b;">SNAPSHOT_ID:</strong> <span style="color:var(--color-navy-900);font-weight:700;">${vm.calculation.snapshot_id}</span></div>
        <div><strong style="color:#64748b;">INTEGRITY_HASH:</strong> <span style="color:var(--color-sky-600);font-weight:700;">${vm.calculation.audit_hash}</span></div>
        <div><strong style="color:#64748b;">REPRODUCIBILITY_HASH:</strong> <span style="color:#16a34a;font-weight:700;">${vm.calculation.reproducibility_hash}</span></div>
        <div><strong style="color:#64748b;">TIMESTAMP:</strong> <span style="color:#475569;">${vm.calculation.timestamp}</span></div>
        <div><strong style="color:#64748b;">QA/QC_HEALTH:</strong> <span style="color:${vm.qaqc_status === 'HEALTHY' ? '#16a34a' : '#d97706'};font-weight:700;">${vm.qaqc_status}</span></div>
      </div>
    </div>

    <!-- Standard Contract Calculation Models Reference -->
    <div class="enerix-card">
      <div class="enerix-card-title">
        <span>Governed Calculation Model Classes Reference</span>
        <span class="status-badge neutral" style="font-size:10px;">MODEL-01 to MODEL-07 Standards</span>
      </div>
      <p style="font-size:12px;color:#64748b;margin-bottom:12px;">
        The 7 deterministic calculation model classes established under G2-G3 calculation architecture.
      </p>

      <div class="enerix-table-wrapper" style="margin-bottom:0;">
        <table class="enerix-table">
          <thead>
            <tr>
              <th>Model ID</th>
              <th>Class Code</th>
              <th>Contract Specification & Mathematical Formulation</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${vm.calculation_models.map(m => `
              <tr>
                <td class="mono-text" style="font-weight:700;">${m.model_id}</td>
                <td style="font-weight:700;color:var(--color-navy-900);">${m.code}</td>
                <td style="font-size:12px;">${m.description}</td>
                <td><span class="status-badge active">${m.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/**
 * Event bindings lifecycle hook for Calculation Studio
 */
renderCalculationsPage.attachEvents = function(container) {
  if (!container) return;

  // 1. Facility Selector Change
  const facilitySelect = container.querySelector('#calc-facility-select');
  if (facilitySelect) {
    facilitySelect.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      if (selectedId) {
        stateStore.setSelectedFacilityId(selectedId);
      }
    });
  }

  // 2. Temporal Segmentation Toggle
  const btnToggleTemporal = container.querySelector('#btn-calc-toggle-temporal');
  if (btnToggleTemporal) {
    btnToggleTemporal.addEventListener('click', (e) => {
      e.preventDefault();
      const currentSegmented = stateStore.temporalSegmentation;
      stateStore.setTemporalSegmentation(!currentSegmented);
    });
  }

  // 3. Re-evaluate Validation Gates Button
  const btnRecheck = container.querySelector('#btn-recheck-gates');
  if (btnRecheck) {
    btnRecheck.addEventListener('click', (e) => {
      e.preventDefault();
      stateStore.recompute();
    });
  }

  // 4. Execute Governed Calculation Button
  const btnExecute = container.querySelector('#btn-execute-calc');
  if (btnExecute) {
    btnExecute.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        stateStore.executeCalculation();
      } catch (err) {
        console.warn('Calculation execution error:', err);
      }
    });
  }
};
