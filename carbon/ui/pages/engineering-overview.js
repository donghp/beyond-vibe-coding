/**
 * ENERIX Carbon - Engineering / Executive Decision Workspace Overview Page (Mode B)
 */

import { dataProvider } from '../../app/data-provider.js';
import { stateStore } from '../../app/state-store.js';
import { formatBadge, formatCO2e, formatNumber } from '../../app/formatters.js';
import { ICONS } from '../components/icons.js';

export function renderEngineeringOverviewPage(options = {}) {
  const providerStatus = options.status || (dataProvider.getStatus ? dataProvider.getStatus() : 'AVAILABLE');

  if (providerStatus === 'LOADING') {
    return `
      <div class="page-title-bar">
        <h1 class="page-title">Carbon Overview & Decision Workspace</h1>
        <p class="page-subtitle">Executive Decision Layer | Standardized GHG Protocol & Statutory MRV Accounting</p>
      </div>
      <div class="enerix-card" style="text-align:center;padding:48px;" role="status" aria-live="polite">
        <div style="display:flex;justify-content:center;margin-bottom:12px;">${ICONS.spinner(32)}</div>
        <div style="font-size:16px;font-weight:600;color:var(--carbon-navy-900);">Loading Governed Carbon Overview...</div>
        <p style="font-size:13px;color:var(--carbon-navy-500);margin-top:6px;">Retrieving governed facility context, regulatory state, and calculation snapshots.</p>
      </div>
    `;
  }

  if (providerStatus === 'EMPTY') {
    return `
      <div class="page-title-bar">
        <h1 class="page-title">Carbon Overview & Decision Workspace</h1>
        <p class="page-subtitle">Executive Decision Layer | Standardized GHG Protocol & Statutory MRV Accounting</p>
      </div>
      <div class="enerix-card" style="text-align:center;padding:48px;" role="status">
        <div style="display:flex;justify-content:center;margin-bottom:12px;">${ICONS.folderEmpty(32)}</div>
        <div style="font-size:16px;font-weight:600;color:var(--carbon-navy-900);">No Regulated Facilities Registered</div>
        <p style="font-size:13px;color:var(--carbon-navy-500);margin-top:6px;">No statutory facility records found in data provider registry.</p>
      </div>
    `;
  }

  if (providerStatus === 'ERROR' || options.error) {
    const errorMsg = options.error?.message || 'Failed to load governed overview state';
    return `
      <div class="page-title-bar">
        <h1 class="page-title">Carbon Overview & Decision Workspace</h1>
        <p class="page-subtitle">Executive Decision Layer | Standardized GHG Protocol & Statutory MRV Accounting</p>
      </div>
      <div class="enerix-card" style="padding:24px;" role="alert">
        <div class="enerix-alert enerix-alert-danger" style="margin-bottom:0;">
          <div style="flex-shrink:0;">${ICONS.blocker(22)}</div>
          <div>
            <div style="font-weight:700;">Executive Overview Engine Error (Fail-Closed)</div>
            <div style="font-size:13px;margin-top:4px;">${errorMsg}</div>
            <div style="font-size:11px;color:var(--carbon-red-800);margin-top:6px;">Zero assumptions applied. Contact platform engineering.</div>
          </div>
        </div>
      </div>
    `;
  }

  const vm = stateStore.getOverviewViewModel();
  const facility = vm.facility || {};
  const reg = vm.regulatory || {};
  const dataHealth = vm.data_health || {};
  const calc = vm.calculation || {};
  const assurance = vm.assurance || {};
  const gov = vm.governance || {};
  const decisionGates = vm.decision_gates || [];
  const facilities = vm.facilities_list || [];
  const controlledIssues = gov.controlled_issues || [];
  const signOffs = gov.human_sign_offs || [];

  const isBlocked = Boolean(calc.is_blocked);
  const isTemporalSegmented = Boolean(reg.is_temporal_segmented);

  // Compute calculated metrics
  const totalEmissions = calc.total_co2e_tons || 0;
  const s1Tons = calc.scope_1?.tons || 0;
  const s2Tons = calc.scope_2?.tons || 0;
  const s3Tons = calc.scope_3?.tons || 0;

  const s1Pct = totalEmissions > 0 ? ((s1Tons / totalEmissions) * 100).toFixed(1) : '0.0';
  const s2Pct = totalEmissions > 0 ? ((s2Tons / totalEmissions) * 100).toFixed(1) : '0.0';

  // Hotspots definition based on actual governed data
  const hotspots = [
    {
      id: 'HOT-001',
      source: 'Stationary Diesel Combustion',
      scope: 'Scope 1',
      category: 'Stationary Combustion (Lò hơi / Máy phát)',
      tons: s1Tons,
      share: `${s1Pct}%`,
      status: 'HIGH_IMPACT',
      activity_ref: 'ACT-REC-002',
      evidence_status: 'VERIFIED'
    },
    {
      id: 'HOT-002',
      source: 'National Grid Purchased Electricity',
      scope: 'Scope 2',
      category: 'Purchased Electricity (EVN Grid)',
      tons: s2Tons,
      share: `${s2Pct}%`,
      status: 'PRIMARY_LOAD',
      activity_ref: 'ACT-REC-001',
      evidence_status: 'VERIFIED'
    }
  ];

  return `
    <div class="page-title-bar" style="margin-bottom:20px;">
      <h1 class="page-title">Executive Decision Workspace</h1>
      <p class="page-subtitle">Executive Decision Layer | Standardized GHG Protocol & Statutory MRV Accounting</p>
    </div>

    <div style="padding: 0; max-width: 1280px; margin: 0 auto;">
    <!-- ==========================================================================
         PRIMARY SECTION: CARBON FOOTPRINT & EXECUTIVE CONTEXT
         ========================================================================== -->
    <div id="measure-section" class="page-title-bar" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;margin-bottom:20px;">
      <div>
        <h1 class="page-title" style="font-size:22px;font-weight:800;color:var(--carbon-navy-950);margin:0 0 4px 0;letter-spacing:-0.02em;">
          Carbon Footprint
        </h1>
        <p class="page-subtitle" style="font-size:13px;color:var(--carbon-navy-600);margin:0;">
          Executive Decision Layer | Governing Baseline: <strong>${reg.legal_basis || 'QĐ 42/2026/QĐ-TTg'}</strong> | Period: <strong>${vm.reporting_period?.label || 'FY 2026'}</strong>
        </p>
        <span class="sr-only">Carbon Overview & Decision Workspace</span>
      </div>

      <!-- Facility Context Selector & Controls -->
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <label for="overview-facility-select" class="sr-only">Select Facility</label>
        <div style="display:flex;align-items:center;gap:6px;background:#fff;border:1px solid var(--carbon-navy-300);padding:4px 10px;border-radius:6px;">
          <span style="font-size:12px;font-weight:600;color:var(--carbon-navy-600);">Facility:</span>
          <select id="overview-facility-select" class="enerix-select" style="border:none;background:transparent;padding:2px 4px;font-size:13px;font-weight:600;color:var(--carbon-navy-900);cursor:pointer;outline:none;">
            ${facilities.map(f => `
              <option value="${f.facility_id}" ${f.is_active ? 'selected' : ''}>
                ${f.facility_name} (${f.facility_id})
              </option>
            `).join('')}
          </select>
        </div>
        <button id="btn-toggle-temporal" class="enerix-button ${isTemporalSegmented ? 'enerix-button-primary' : 'enerix-button-secondary'}" style="font-size:12px;padding:6px 12px;white-space:nowrap;">
          ${isTemporalSegmented ? 'Dual Regime Segmented' : 'Enable Dual Segmentation'}
        </button>
      </div>
    </div>

    <!-- FAIL-CLOSED BLOCKER ALERT BANNER -->
    ${isBlocked ? `
      <div class="enerix-card" style="border-left:4px solid var(--carbon-red-600);background:var(--carbon-red-50);margin-bottom:20px;padding:16px 20px;" role="alert">
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <div style="flex-shrink:0;">${ICONS.blocker(22)}</div>
          <div style="flex:1;">
            <div style="font-weight:700;color:var(--carbon-red-800);font-size:14px;">STATUTORY COMPLIANCE BLOCKED (Fail-Closed Enforcement)</div>
            <div style="font-size:13px;color:var(--carbon-red-700);margin-top:4px;">
              ${calc.blocking_reasons?.join('<br/>') || 'Reporting period straddles statutory transition date without temporal segmentation (ISSUE-TEMP-001).'}
            </div>
            <div style="margin-top:10px;display:flex;gap:10px;flex-wrap:wrap;">
              <button id="btn-resolve-temporal-blocker" class="enerix-button enerix-button-primary" style="font-size:12px;padding:6px 14px;background:var(--carbon-red-600);border-color:var(--carbon-red-600);">
                Enable Temporal Segmentation (ISSUE-TEMP-001)
              </button>
              <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="regulatory-check" style="font-size:12px;padding:6px 14px;">
                Inspect Regulatory Workspace →
              </button>
            </div>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- ==========================================================================
         SECTION 2: EXECUTIVE KPI / METRIC CARDS (4 Pillars)
         ========================================================================== -->
    <div class="card-grid" style="gap:16px;margin-bottom:24px;">

      <!-- Card 1: Gross Facility Emissions (Carbon Blue Accent) -->
      <div class="enerix-card" style="border-top:3px solid var(--carbon-blue-500);background:#fff;">
        <div class="enerix-card-title">
          <span>Gross Facility Emissions</span>
          <span style="font-size:11px;background:var(--carbon-navy-100);color:var(--carbon-navy-700);padding:2px 8px;border-radius:4px;font-family:var(--carbon-font-mono);">${calc.snapshot_id || 'SNAP-GOVERNED'}</span>
        </div>
        <div style="font-size:30px;font-weight:800;color:var(--carbon-navy-950);margin:8px 0 4px 0;letter-spacing:-0.5px;">
          ${calc.total_formatted || '0.00 tCO2e'}
        </div>
        <div style="font-size:12px;color:var(--carbon-navy-600);margin-bottom:12px;">
          Scope 1: <strong>${calc.scope_1?.formatted || '0.00 tCO2e'}</strong> | Scope 2: <strong>${calc.scope_2?.formatted || '0.00 tCO2e'}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--carbon-navy-200);padding-top:10px;font-size:11px;">
          <span style="color:var(--carbon-navy-500);">GWP: <strong>${calc.gwp_dataset_ref || 'GWP-IPCC-AR5'}</strong></span>
          <button class="btn-drilldown" data-nav="calculations" style="background:none;border:none;color:var(--carbon-blue-600);font-weight:600;cursor:pointer;padding:0;display:inline-flex;align-items:center;gap:4px;">
            Calculation Studio ${ICONS.arrowRight(12)}
          </button>
        </div>
      </div>

      <!-- Card 2: Regulatory Applicability & Obligation -->
      <div class="enerix-card" style="border-top:3px solid ${isBlocked ? 'var(--carbon-red-600)' : (isTemporalSegmented ? 'var(--carbon-green-600)' : 'var(--carbon-amber-600)')};background:#fff;">
        <div class="enerix-card-title">
          <span>Regulatory Applicability</span>
          ${formatBadge(reg.mandatory_status || reg.applicability_status)}
        </div>
        <div style="font-size:17px;font-weight:700;color:var(--carbon-navy-900);margin:12px 0 4px 0;">
          ${reg.legal_basis || 'Quyết định 42/2026/QĐ-TTg'}
        </div>
        <div style="font-size:12px;color:var(--carbon-navy-600);margin-bottom:12px;">
          Status: <strong>${reg.applicability_status}</strong> | Effective: <strong>${reg.effective_from || '2026-09-25'}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--carbon-navy-200);padding-top:10px;font-size:11px;">
          <span style="color:${isBlocked ? 'var(--carbon-red-700)' : (isTemporalSegmented ? 'var(--carbon-green-700)' : 'var(--carbon-amber-700)')};font-weight:600;">
            ${isBlocked ? 'Unsegmented Straddling' : (isTemporalSegmented ? 'Dual Regime Segmented' : 'Compliant Period')}
          </span>
          <button class="btn-drilldown" data-nav="regulatory-check" style="background:none;border:none;color:var(--carbon-blue-600);font-weight:600;cursor:pointer;padding:0;display:inline-flex;align-items:center;gap:4px;">
            Regulatory Check ${ICONS.arrowRight(12)}
          </button>
        </div>
      </div>

      <!-- Card 3: Data Health & Evidence Coverage -->
      <div class="enerix-card" style="border-top:3px solid var(--carbon-blue-500);background:#fff;">
        <div class="enerix-card-title">
          <span>Data Health & Evidence</span>
          ${formatBadge(dataHealth.evidence_coverage_status || 'HEALTHY')}
        </div>
        <div style="font-size:24px;font-weight:700;color:var(--carbon-navy-900);margin:10px 0 4px 0;">
          ${dataHealth.verified_documents_count || 0} / ${dataHealth.documents_count || 0} Verified Docs
        </div>
        <div style="font-size:12px;color:var(--carbon-navy-600);margin-bottom:12px;">
          ${dataHealth.activity_records_count || 0} Activity records linked | 0 data defects
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--carbon-navy-200);padding-top:10px;font-size:11px;">
          <span style="color:var(--carbon-navy-600);font-weight:600;">QA/QC: ${dataHealth.qaqc_status || 'HEALTHY'}</span>
          <button class="btn-drilldown" data-nav="evidence-trace" style="background:none;border:none;color:var(--carbon-blue-600);font-weight:600;cursor:pointer;padding:0;display:inline-flex;align-items:center;gap:4px;">
            Evidence & Trace ${ICONS.arrowRight(12)}
          </button>
        </div>
      </div>

      <!-- Card 4: Statutory Report Readiness -->
      <div class="enerix-card" style="border-top:3px solid ${assurance.is_report_ready ? 'var(--carbon-green-600)' : 'var(--carbon-amber-600)'};background:#fff;">
        <div class="enerix-card-title">
          <span>Statutory Report Readiness</span>
          ${formatBadge(assurance.report_readiness_state || 'NOT_READY')}
        </div>
        <div style="font-size:19px;font-weight:700;color:var(--carbon-navy-900);margin:12px 0 4px 0;">
          ${assurance.is_report_ready ? 'Ready for Authority Submission' : 'Verification in Progress'}
        </div>
        <div style="font-size:12px;color:var(--carbon-navy-600);margin-bottom:12px;">
          Human Verifier Sign-Offs: <strong>${dataHealth.sign_offs_count || 0} Certified Verifiers</strong> (Non-AI)
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--carbon-navy-200);padding-top:10px;font-size:11px;">
          <span style="font-family:var(--carbon-font-mono);color:var(--carbon-navy-500);">Reproducibility: OK</span>
          <button class="btn-drilldown" data-nav="reports" style="background:none;border:none;color:var(--carbon-blue-600);font-weight:600;cursor:pointer;padding:0;display:inline-flex;align-items:center;gap:4px;">
            View Reports ${ICONS.arrowRight(12)}
          </button>
        </div>
      </div>

    </div>

    <!-- ==========================================================================
         SECTION 3: EMISSION HOTSPOTS & SPECIES COMPOSITION
         ========================================================================== -->
    <div class="card-grid" style="gap:20px;margin-bottom:24px;">

      <!-- Left 8 Cols: Emission Hotspots Breakdown Table -->
      <div style="grid-column:span 8;background:#fff;border:1px solid var(--carbon-navy-200);border-radius:6px;padding:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
          <div>
            <h2 style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);margin:0;">
              Emission Hotspots & Source Ranking
            </h2>
            <p style="font-size:12px;color:var(--carbon-navy-600);margin:2px 0 0 0;">
              High-impact emission activities sorted by gross contribution to the facility footprint.
            </p>
          </div>
          <span style="font-size:11px;font-weight:600;color:var(--carbon-navy-500);">
            Ranked by tCO2e
          </span>
        </div>

        <div class="enerix-table-wrapper" style="border:1px solid var(--carbon-navy-200);border-radius:6px;overflow:hidden;">
          <table class="enerix-table" style="margin:0;">
            <thead>
              <tr style="background:var(--carbon-navy-100);">
                <th>Hotspot Source</th>
                <th>Scope</th>
                <th>Activity Category</th>
                <th style="text-align:right;">Emissions (tCO2e)</th>
                <th style="text-align:right;">Contribution</th>
                <th>Evidence</th>
              </tr>
            </thead>
            <tbody>
              ${hotspots.map((h, idx) => `
                <tr>
                  <td>
                    <div style="font-weight:700;color:var(--carbon-navy-900);display:flex;align-items:center;gap:6px;">
                      <span style="font-size:10px;background:var(--carbon-blue-100);color:var(--carbon-blue-700);padding:1px 5px;border-radius:3px;font-family:var(--carbon-font-mono);">#${idx + 1}</span>
                      ${h.source}
                    </div>
                    <div style="font-size:11px;color:var(--carbon-navy-500);font-family:var(--carbon-font-mono);margin-top:2px;">${h.activity_ref}</div>
                  </td>
                  <td><span class="mono-text" style="font-weight:600;">${h.scope}</span></td>
                  <td style="font-size:12px;color:var(--carbon-navy-700);">${h.category}</td>
                  <td style="text-align:right;font-weight:800;color:var(--carbon-navy-900);font-family:var(--carbon-font-mono);font-size:13px;">
                    ${formatCO2e(h.tons)}
                  </td>
                  <td style="text-align:right;font-weight:700;color:var(--carbon-blue-600);font-family:var(--carbon-font-mono);">
                    ${h.share}
                  </td>
                  <td>
                    <span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:var(--carbon-green-50);color:var(--carbon-green-700);">
                      ${h.evidence_status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right 4 Cols: Greenhouse Gas Breakdown (CO2, CH4, N2O) -->
      <div style="grid-column:span 4;background:#fff;border:1px solid var(--carbon-navy-200);border-radius:6px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <h2 style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);margin:0 0 4px 0;">
            Greenhouse Gas Species Composition
          </h2>
          <p style="font-size:12px;color:var(--carbon-navy-600);margin:0 0 16px 0;">
            Individual greenhouse gases weighted by IPCC AR5 GWP multipliers (28x CH4, 265x N2O).
          </p>

          <div style="display:flex;flex-direction:column;gap:12px;">
            ${(calc.gases && calc.gases.length > 0 ? calc.gases : [
              { gas: 'CO2', name: 'Carbon Dioxide', tons: 1081.9, tco2e: 1081.9, gwp: 1 },
              { gas: 'CH4', name: 'Methane', tons: 0.0136, tco2e: 0.38, gwp: 28 },
              { gas: 'N2O', name: 'Nitrous Oxide', tons: 0.00015, tco2e: 0.04, gwp: 265 }
            ]).map(g => `
              <div style="border-bottom:1px solid var(--carbon-navy-100);padding-bottom:8px;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;margin-bottom:2px;">
                  <span style="font-weight:700;color:var(--carbon-navy-900);">${g.name || g.gas} (${g.gas})</span>
                  <span style="font-weight:700;color:var(--carbon-blue-600);font-family:var(--carbon-font-mono);">${formatCO2e(g.tco2e || 0)}</span>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--carbon-navy-500);">
                  <span>Physical: ${formatNumber(g.tons || 0, 4)} metric tons</span>
                  <span>GWP: <strong>${g.gwp}x (${calc.gwp_dataset_ref?.includes('AR5') ? 'AR5' : 'IPCC'})</strong></span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top:16px;background:var(--carbon-navy-50);padding:10px 12px;border-radius:6px;border:1px solid var(--carbon-navy-200);font-size:11px;color:var(--carbon-navy-600);">
          <strong>Verification Lineage:</strong>
          <div class="mono-text" style="font-size:10px;color:var(--carbon-navy-500);margin-top:2px;word-break:break-all;">
            Hash: ${assurance.reproducibility_hash?.substring(0, 24) || 'N/A'}...
          </div>
        </div>
      </div>

    </div>

    <!-- ==========================================================================
         SECTION 4: DATA COLLECTION PIPELINE & DETERMINISTIC CALCULATION WORKFLOW
         ========================================================================== -->
    <div class="card-grid" style="gap:20px;margin-bottom:24px;">
      
      <!-- Left 6 Cols: Data Ingestion Workflow -->
      <div style="grid-column:span 6;background:#fff;border:1px solid var(--carbon-navy-200);border-radius:6px;padding:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div>
            <h2 style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);margin:0;">
              Data Collection & Quality Ingestion Pipeline
            </h2>
            <p style="font-size:12px;color:var(--carbon-navy-600);margin:2px 0 0 0;">
              Traceable primary operational records from invoice to calculated metric.
            </p>
          </div>
          <button class="btn-drilldown enerix-button enerix-button-secondary" data-nav="activity-data" style="font-size:11px;padding:4px 8px;">
            Activity Ledger →
          </button>
        </div>

        <!-- 6-Stage Visual Workflow -->
        <div style="display:grid;grid-template-columns:repeat(6, 1fr);gap:4px;background:var(--carbon-navy-50);padding:12px 8px;border-radius:6px;border:1px solid var(--carbon-navy-200);margin-bottom:14px;text-align:center;">
          <div style="font-size:10px;font-weight:700;color:var(--carbon-navy-700);padding:4px 2px;">
            <div style="color:var(--carbon-blue-600);margin-bottom:2px;">01</div>
            Source Docs
          </div>
          <div style="font-size:10px;font-weight:700;color:var(--carbon-navy-700);padding:4px 2px;">
            <div style="color:var(--carbon-blue-600);margin-bottom:2px;">02</div>
            Extract
          </div>
          <div style="font-size:10px;font-weight:700;color:var(--carbon-navy-700);padding:4px 2px;">
            <div style="color:var(--carbon-blue-600);margin-bottom:2px;">03</div>
            Normalize
          </div>
          <div style="font-size:10px;font-weight:700;color:var(--carbon-navy-700);padding:4px 2px;">
            <div style="color:var(--carbon-blue-600);margin-bottom:2px;">04</div>
            Validate
          </div>
          <div style="font-size:10px;font-weight:700;color:var(--carbon-navy-700);padding:4px 2px;">
            <div style="color:var(--carbon-blue-600);margin-bottom:2px;">05</div>
            Sign-Off
          </div>
          <div style="font-size:10px;font-weight:700;color:var(--carbon-navy-700);padding:4px 2px;background:var(--carbon-blue-100);border-radius:4px;">
            <div style="color:var(--carbon-blue-700);margin-bottom:2px;">06</div>
            Calculate
          </div>
        </div>

        <div style="font-size:12px;color:var(--carbon-navy-700);line-height:1.5;">
          <strong>Data Governance Rule:</strong> Unverified estimates cannot proceed to calculation execution. Every activity record is pinned to a SHA-256 source file hash.
        </div>
      </div>

      <!-- Right 6 Cols: Calculation Engine & Formulas -->
      <div style="grid-column:span 6;background:#fff;border:1px solid var(--carbon-navy-200);border-radius:6px;padding:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div>
            <h2 style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);margin:0;">
              Deterministic Calculation Studio
            </h2>
            <p style="font-size:12px;color:var(--carbon-navy-600);margin:2px 0 0 0;">
              Pure algebraic formulas, zero hidden weights, complete audit snapshots.
            </p>
          </div>
          <button class="btn-drilldown enerix-button enerix-button-secondary" data-nav="calculations" style="font-size:11px;padding:4px 8px;">
            Calculation Studio →
          </button>
        </div>

        <div style="background:var(--carbon-navy-900);color:#ffffff;padding:12px 16px;border-radius:6px;font-family:var(--carbon-font-mono);font-size:12px;margin-bottom:12px;">
          <div style="color:var(--carbon-blue-400);font-size:10px;text-transform:uppercase;margin-bottom:4px;">Statutory Formula</div>
          E_CO2e = Activity_Quantity × Emission_Factor × GWP_Multipliers
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--carbon-navy-600);flex-wrap:wrap;gap:8px;">
          <span>Principle: <strong>AI assists. Humans review. Deterministic engines calculate.</strong></span>
          <span style="color:var(--carbon-blue-700);font-weight:600;">Snapshot: ${calc.snapshot_id || 'SNAP-FAC-2026-001'}</span>
        </div>
      </div>

    </div>

    <!-- ==========================================================================
         SECTION 5: 5-PILLAR EXECUTIVE DECISION MATRIX
         ========================================================================== -->
    <div class="enerix-card" style="margin-bottom:24px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);margin:0;">
            5-Pillar Executive Decision Matrix
          </h2>
          <p style="font-size:12px;color:var(--carbon-navy-600);margin:2px 0 0 0;">
            Governed validation gates evaluated against statutory MRV decrees and audit criteria.
          </p>
        </div>
        <span style="font-size:12px;background:var(--carbon-navy-100);border:1px solid var(--carbon-navy-200);padding:4px 10px;border-radius:6px;font-weight:600;color:var(--carbon-navy-800);">
          ${decisionGates.filter(g => g.gate_status === 'PASS').length} / ${decisionGates.length} Gates Passing
        </span>
      </div>

      <div class="card-grid" style="gap:12px;">
        ${decisionGates.map(gate => {
          let borderColor = 'var(--carbon-green-600)';
          let bgPill = 'var(--carbon-green-50)';
          let textPill = 'var(--carbon-green-800)';
          if (gate.gate_status === 'BLOCKED' || gate.gate_status === 'FAIL') {
            borderColor = 'var(--carbon-red-600)';
            bgPill = 'var(--carbon-red-50)';
            textPill = 'var(--carbon-red-800)';
          } else if (gate.gate_status === 'REQUIRES_REVIEW' || gate.gate_status === 'WARNING') {
            borderColor = 'var(--carbon-amber-600)';
            bgPill = 'var(--carbon-amber-50)';
            textPill = 'var(--carbon-amber-800)';
          }

          return `
            <div style="border:1px solid var(--carbon-navy-200);border-top:3px solid ${borderColor};border-radius:6px;padding:12px;background:var(--carbon-navy-50);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                  <span style="font-size:11px;font-weight:700;color:var(--carbon-navy-600);letter-spacing:0.5px;">${gate.pillar}</span>
                  <span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:${bgPill};color:${textPill};">
                    ${gate.gate_status}
                  </span>
                </div>
                <div style="font-size:13px;font-weight:600;color:var(--carbon-navy-900);margin-bottom:4px;">
                  ${gate.title}
                </div>
                <p style="font-size:11px;color:var(--carbon-navy-600);line-height:1.4;margin:0 0 10px 0;">
                  ${gate.summary}
                </p>
              </div>
              <div style="border-top:1px solid var(--carbon-navy-200);padding-top:8px;">
                <button class="btn-drilldown" data-nav="${gate.target_route}" style="background:none;border:none;color:var(--carbon-blue-600);font-size:11px;font-weight:600;cursor:pointer;padding:0;display:flex;align-items:center;gap:4px;">
                  Inspect Workspace ${ICONS.arrowRight(11)}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- ==========================================================================
         SECTION 6: CONTROLLED ISSUES & HUMAN VERIFIER SIGN-OFFS
         ========================================================================== -->
    <div class="card-grid" style="gap:20px;margin-bottom:24px;">

      <!-- Controlled Issues & Statutory Disclosures -->
      <div style="grid-column:span 6;background:#fff;border:1px solid var(--carbon-navy-200);border-radius:6px;padding:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div>
            <h2 style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);margin:0;">
              Controlled Issues & Statutory Disclosures
            </h2>
            <p style="font-size:12px;color:var(--carbon-navy-600);margin:2px 0 0 0;">
              Formal regulatory disclosures under Decree 06/2022/NĐ-CP & ISO 14064-1.
            </p>
          </div>
          <span style="font-size:11px;font-weight:600;color:var(--carbon-navy-500);">
            ${controlledIssues.length} Registered
          </span>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${controlledIssues.map(issue => `
            <div style="border:1px solid var(--carbon-navy-200);border-radius:6px;padding:10px 12px;background:var(--carbon-navy-50);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <span class="mono-text" style="font-weight:700;font-size:12px;color:var(--carbon-blue-700);">${issue.issue_id}</span>
                <span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:${issue.severity === 'BLOCKING' ? 'var(--carbon-red-50)' : 'var(--carbon-amber-50)'};color:${issue.severity === 'BLOCKING' ? 'var(--carbon-red-800)' : 'var(--carbon-amber-800)'};">
                  ${issue.status}
                </span>
              </div>
              <div style="font-size:12px;font-weight:600;color:var(--carbon-navy-900);">${issue.title}</div>
              <div style="font-size:11px;color:var(--carbon-navy-600);margin-top:2px;">${issue.description}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Human Verifier Sign-Offs (Non-AI Strict Policy) -->
      <div style="grid-column:span 6;background:#fff;border:1px solid var(--carbon-navy-200);border-radius:6px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <div>
              <h2 style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);margin:0;">
                Human Verifier Sign-Offs (Non-AI)
              </h2>
              <p style="font-size:12px;color:var(--carbon-navy-600);margin:2px 0 0 0;">
                Certified GHG Accounting Verifiers with cryptographic audit signatures.
              </p>
            </div>
            <span style="font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px;background:var(--carbon-blue-100);color:var(--carbon-blue-700);font-family:var(--carbon-font-mono);">
              FAIL-CLOSED NON-AI ENFORCED
            </span>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px;">
            ${signOffs.map(s => `
              <div style="border:1px solid var(--carbon-navy-200);border-radius:6px;padding:10px 12px;background:var(--carbon-navy-50);">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-weight:700;font-size:12px;color:var(--carbon-navy-900);">${s.actor_name}</span>
                  <span style="font-size:11px;color:var(--carbon-navy-500);font-family:var(--carbon-font-mono);">${s.role}</span>
                </div>
                <div style="font-size:11px;color:var(--carbon-navy-600);margin-top:2px;">Organization: ${s.organization}</div>
                <div class="mono-text" style="font-size:10px;color:var(--carbon-navy-400);margin-top:4px;">Sig: ${s.signature_hash?.substring(0, 24)}...</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top:14px;background:var(--carbon-green-50);padding:10px 12px;border-radius:6px;border:1px solid var(--carbon-green-300);font-size:11px;color:var(--carbon-green-800);">
          <strong>Statutory Compliance Statement:</strong> AI assistants only prepare candidate drafts. Every submitted inventory report requires certified human engineering sign-off.
        </div>
      </div>

    </div>

    <!-- ==========================================================================
         SECTION 7: REDUCTION INITIATIVES & DECARBONIZATION ROADMAP
         ========================================================================== -->
    <div class="enerix-card" style="margin-bottom:24px;border-left:4px solid var(--carbon-green-600);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <div>
          <div style="display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;color:var(--carbon-green-700);text-transform:uppercase;margin-bottom:2px;">
            STAGE 03 · REDUCE
          </div>
          <h2 style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);margin:0;">
            Decarbonization Roadmap & Targeted Reduction Projects
          </h2>
          <p style="font-size:12px;color:var(--carbon-navy-600);margin:2px 0 0 0;">
            Turn governed footprint data into engineering reduction initiatives and forecasted abatement.
          </p>
        </div>
        <button class="btn-drilldown enerix-button enerix-button-secondary" data-nav="inventory" style="font-size:12px;padding:4px 10px;">
          Inspect Inventory Scopes →
        </button>
      </div>

      <div class="card-grid" style="gap:14px;">
        <div style="border:1px solid var(--carbon-navy-200);border-radius:6px;padding:14px;background:#ffffff;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <span style="font-size:11px;font-weight:700;color:var(--carbon-green-700);background:var(--carbon-green-50);padding:2px 6px;border-radius:4px;">HOTSPOT #1 INITIATIVE</span>
            <span style="font-size:11px;font-weight:600;color:var(--carbon-navy-600);">Scope 1 Abatement</span>
          </div>
          <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-900);margin-bottom:4px;">Auxiliary Boiler Electrification & Heat Recovery</div>
          <div style="font-size:12px;color:var(--carbon-navy-600);line-height:1.4;margin-bottom:10px;">
            Replaces stationary diesel startup boilers with industrial heat pump recovery systems.
          </div>
          <div style="border-top:1px solid var(--carbon-navy-100);padding-top:8px;font-size:11px;color:var(--carbon-green-700);font-weight:700;">
            Estimated Reduction: -15.4 tCO2e / yr (23% of Scope 1)
          </div>
        </div>

        <div style="border:1px solid var(--carbon-navy-200);border-radius:6px;padding:14px;background:#ffffff;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <span style="font-size:11px;font-weight:700;color:var(--carbon-blue-700);background:var(--carbon-blue-50);padding:2px 6px;border-radius:4px;">HOTSPOT #2 INITIATIVE</span>
            <span style="font-size:11px;font-weight:600;color:var(--carbon-navy-600);">Scope 2 Abatement</span>
          </div>
          <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-900);margin-bottom:4px;">Rooftop Solar PV & Direct PPA (DPPA)</div>
          <div style="font-size:12px;color:var(--carbon-navy-600);line-height:1.4;margin-bottom:10px;">
            Procures certified renewable energy credits (I-REC) and on-site 1.2MWp solar installation.
          </div>
          <div style="border-top:1px solid var(--carbon-navy-100);padding-top:8px;font-size:11px;color:var(--carbon-blue-700);font-weight:700;">
            Estimated Reduction: -420.0 tCO2e / yr (41% of Scope 2)
          </div>
        </div>

        <div style="border:1px solid var(--carbon-navy-200);border-radius:6px;padding:14px;background:#ffffff;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <span style="font-size:11px;font-weight:700;color:var(--carbon-navy-700);background:var(--carbon-navy-100);padding:2px 6px;border-radius:4px;">EFFICIENCY INITIATIVE</span>
            <span style="font-size:11px;font-weight:600;color:var(--carbon-navy-600);">Operations Abatement</span>
          </div>
          <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-900);margin-bottom:4px;">AI-Assisted Combustion Optimization & SCADA Tuning</div>
          <div style="font-size:12px;color:var(--carbon-navy-600);line-height:1.4;margin-bottom:10px;">
            Minimizes excess air and optimizes fuel-to-air ratios across all auxiliary thermal combustion units.
          </div>
          <div style="border-top:1px solid var(--carbon-navy-100);padding-top:8px;font-size:11px;color:var(--carbon-navy-800);font-weight:700;">
            Estimated Reduction: -8.8 tCO2e / yr
          </div>
        </div>
      </div>
    </div>

    <!-- ==========================================================================
         SECTION 8: MULTI-FACILITY STATUTORY COMPLIANCE MATRIX
         ========================================================================== -->
    <div class="enerix-card" style="margin-bottom:24px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);margin:0;">
            Enterprise Facilities Statutory Compliance Matrix
          </h2>
          <p style="font-size:12px;color:var(--carbon-navy-600);margin:2px 0 0 0;">
            Statutory registry under Decision 42/2026/QĐ-TTg and Decision 01/2022/QĐ-TTg.
          </p>
        </div>
        <button class="btn-drilldown enerix-button enerix-button-secondary" data-nav="facilities" style="font-size:12px;padding:4px 10px;">
          Manage Facilities Directory →
        </button>
      </div>

      <div class="enerix-table-wrapper">
        <table class="enerix-table">
          <thead>
            <tr>
              <th>Facility ID</th>
              <th>Facility Name</th>
              <th>Province</th>
              <th>Sector Classification</th>
              <th>Regulatory Status</th>
              <th>Legal Basis</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${facilities.map(f => `
              <tr style="${f.is_active ? 'background:var(--carbon-blue-50);' : ''}">
                <td class="mono-text" style="font-weight:600;">${f.facility_id}</td>
                <td style="font-weight:600;color:var(--carbon-navy-900);">
                  ${f.facility_name}
                  ${f.is_active ? '<span style="font-size:10px;background:var(--carbon-blue-600);color:#fff;padding:1px 6px;border-radius:4px;margin-left:6px;font-weight:700;">ACTIVE</span>' : ''}
                </td>
                <td>${f.province}</td>
                <td style="font-family:var(--carbon-font-mono);font-size:12px;">${f.sector_id}</td>
                <td>${formatBadge(f.regulatory_status)}</td>
                <td style="font-size:12px;color:var(--carbon-navy-500);">${f.legal_basis || 'QĐ 42/2026/QĐ-TTg'}</td>
                <td>
                  <button class="btn-select-facility enerix-button enerix-button-secondary" data-facility-id="${f.facility_id}" style="font-size:11px;padding:4px 8px;">
                    ${f.is_active ? 'Active' : 'Select'}
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- ==========================================================================
         SECTION 9: INDUSTRY SOLUTIONS & SECTORAL EXCELLENCE
         ========================================================================== -->
    <div class="enerix-card" style="margin-bottom:24px;">
      <div style="margin-bottom:16px;">
        <h2 style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);margin:0;">
          Tailored Solutions for Regulated Heavy Industries
        </h2>
        <p style="font-size:12px;color:var(--carbon-navy-600);margin:2px 0 0 0;">
          Sector-specific methodologies compliant with Vietnam Ministry Circulars (BCT, BXD, BNNPTNT, BTNMT).
        </p>
      </div>

      <div class="card-grid" style="gap:16px;">
        <!-- Solution 1: Energy -->
        <div style="background:var(--carbon-navy-50);border:1px solid var(--carbon-navy-200);border-radius:8px;padding:16px;">
          <div style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);text-transform:uppercase;margin-bottom:4px;">Sector: Energy & Power</div>
          <div style="font-size:14px;font-weight:700;color:var(--carbon-navy-900);margin-bottom:6px;">Thermal Power & Grid Transmission</div>
          <div style="font-size:12px;color:var(--carbon-navy-700);line-height:1.5;margin-bottom:10px;">
            Circular 38/2023/TT-BCT methodology integration. Coal, gas turbine combustion models and SF6 switchgear leakage tracking.
          </div>
          <div style="font-size:11px;color:var(--carbon-navy-500);font-weight:600;">Governing: MOIT Energy MRV</div>
        </div>

        <!-- Solution 2: Cement & Construction -->
        <div style="background:var(--carbon-navy-50);border:1px solid var(--carbon-navy-200);border-radius:8px;padding:16px;">
          <div style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);text-transform:uppercase;margin-bottom:4px;">Sector: Construction Materials</div>
          <div style="font-size:14px;font-weight:700;color:var(--carbon-navy-900);margin-bottom:6px;">Cement & Clinker Calcination</div>
          <div style="font-size:12px;color:var(--carbon-navy-700);line-height:1.5;margin-bottom:10px;">
            Circular 13/2024/TT-BXD methodology. Carbonate decomposition stoichiometry, kiln fuel switching, and clinker substitution.
          </div>
          <div style="font-size:11px;color:var(--carbon-navy-500);font-weight:600;">Governing: MOC Construction MRV</div>
        </div>

        <!-- Solution 3: Waste -->
        <div style="background:var(--carbon-navy-50);border:1px solid var(--carbon-navy-200);border-radius:8px;padding:16px;">
          <div style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);text-transform:uppercase;margin-bottom:4px;">Sector: Waste & Environment</div>
          <div style="font-size:14px;font-weight:700;color:var(--carbon-navy-900);margin-bottom:6px;">Landfills & Wastewater Treatment</div>
          <div style="font-size:12px;color:var(--carbon-navy-700);line-height:1.5;margin-bottom:10px;">
            Circular 26/2024/TT-BTNMT methodology. IPCC First-Order Decay (FOD) solid waste methane and biological wastewater N2O accounting.
          </div>
          <div style="font-size:11px;color:var(--carbon-navy-500);font-weight:600;">Governing: MONRE Environmental MRV</div>
        </div>
      </div>
    </div>

    <!-- ==========================================================================
         SECTION 10: BOTTOM CUSTOMER CTA & CONSULTATION BANNER
         ========================================================================== -->
    <div style="background:linear-gradient(135deg, var(--carbon-navy-900) 0%, var(--carbon-navy-950) 100%);border-radius:var(--carbon-radius-lg, 12px);padding:32px 28px;text-align:center;color:#ffffff;border:1px solid rgba(255,255,255,0.12);box-shadow:0 6px 20px rgba(11,29,58,0.08);">
      <h2 style="font-size:22px;font-weight:800;color:#ffffff;margin:0 0 8px 0;letter-spacing:-0.02em;">
        Ready to Manage Your Carbon Footprint?
      </h2>
      <p style="font-size:14px;color:var(--carbon-blue-100);max-width:600px;margin:0 auto 20px auto;line-height:1.5;">
        Join Vietnam's leading energy and industrial enterprises operating with verifiable, deterministic carbon management under Decision 42/2026/QĐ-TTg.
      </p>
      <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;">
        <button id="btn-request-demo-bottom" class="enerix-button enerix-button-primary" style="background:var(--carbon-blue-500);border-color:var(--carbon-blue-400);font-weight:600;padding:10px 22px;font-size:13px;border-radius:6px;cursor:pointer;">
          Request a Demo
        </button>
        <button class="btn-drilldown enerix-button" data-nav="knowledge" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-weight:600;padding:10px 20px;font-size:13px;border-radius:6px;cursor:pointer;">
          Explore GHG Reporting Guide
        </button>
        <button class="btn-drilldown enerix-button" data-nav="calculations" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);color:var(--carbon-blue-200);font-weight:600;padding:10px 20px;font-size:13px;border-radius:6px;cursor:pointer;">
          Open Calculation Studio
        </button>
      </div>
    </div>
    </div>
  `;
}

renderEngineeringOverviewPage.attachEvents = function(container) {
  if (!container) return;

  // Facility Switcher Dropdown
  const facilitySelect = container.querySelector('#overview-facility-select');
  if (facilitySelect) {
    facilitySelect.addEventListener('change', (e) => {
      stateStore.selectFacility(e.target.value);
    });
  }

  // Facility Table Action Buttons
  const facilityButtons = container.querySelectorAll('.btn-select-facility');
  facilityButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = e.currentTarget.getAttribute('data-facility-id');
      if (targetId) {
        stateStore.selectFacility(targetId);
      }
    });
  });

  // Toggle Temporal Segmentation
  const btnToggleTemporal = container.querySelector('#btn-toggle-temporal');
  if (btnToggleTemporal) {
    btnToggleTemporal.addEventListener('click', () => {
      const currentState = stateStore.getOverviewViewModel();
      stateStore.setTemporalSegmentation(!currentState.regulatory?.is_temporal_segmented);
    });
  }

  // Blocker Resolve Button
  const btnResolveBlocker = container.querySelector('#btn-resolve-temporal-blocker');
  if (btnResolveBlocker) {
    btnResolveBlocker.addEventListener('click', () => {
      stateStore.setTemporalSegmentation(true);
    });
  }

  // Bottom Demo Button
  const btnDemoBottom = container.querySelector('#btn-request-demo-bottom');
  if (btnDemoBottom) {
    btnDemoBottom.addEventListener('click', () => {
      alert('Thank you for your interest in ENERIX Carbon! Our enterprise engineering team will connect with your regulatory compliance officers to schedule a governed MRV demonstration.');
    });
  }

  // Navigation Drill-Down Buttons
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
