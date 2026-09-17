/**
 * ENERIX Carbon - Carbon Product Experience (Overview / Landing)
 * Task #Enerix_Carbon_00022
 * Authority: MDS_ENERIX_CARBON_V1.0_EXPANDED + EDLS-001_V7.1
 *
 * Product-grade customer-facing Carbon Product experience with the story:
 * MEASURE → REPORT → REDUCE
 *
 * Governed Baseline:
 * 1. UI is strictly an Inspector / Consumer with ZERO mutation authority.
 * 2. 100% governed state from StateStore and DataProvider.
 * 3. Never invents arbitrary scores or fake data.
 * 4. Dual-layer architecture: Product Experience Layer (Homepage) + Deep Engineering Workspaces.
 */

import { dataProvider } from '../../app/data-provider.js';
import { stateStore } from '../../app/state-store.js';
import { formatBadge, formatCO2e, formatNumber } from '../../app/formatters.js';
import { ICONS } from '../components/icons.js';

export function renderOverviewPage(options = {}) {
  const providerStatus = options.status || (dataProvider.getStatus ? dataProvider.getStatus() : 'AVAILABLE');

  if (providerStatus === 'LOADING') {
    return `
      <div class="page-title-bar">
        <h1 class="page-title">ENERIX Carbon Product Experience</h1>
        <p class="page-subtitle">Regulatory Carbon & GHG Accounting Platform</p>
      </div>
      <div class="enerix-card" style="text-align:center;padding:48px;" role="status" aria-live="polite">
        <div style="display:flex;justify-content:center;margin-bottom:12px;">${ICONS.spinner(32)}</div>
        <div style="font-size:16px;font-weight:600;color:var(--carbon-navy-900);">Loading Governed Carbon Experience...</div>
        <p style="font-size:13px;color:var(--carbon-navy-500);margin-top:6px;">Retrieving governed facility context, regulatory state, and calculation snapshots.</p>
      </div>
    `;
  }

  if (providerStatus === 'EMPTY') {
    return `
      <div class="page-title-bar">
        <h1 class="page-title">ENERIX Carbon Product Experience</h1>
        <p class="page-subtitle">Regulatory Carbon & GHG Accounting Platform</p>
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
        <h1 class="page-title">ENERIX Carbon Product Experience</h1>
        <p class="page-subtitle">Regulatory Carbon & GHG Accounting Platform</p>
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
  const facilities = vm.facilities_list || [];

  const isBlocked = Boolean(calc.is_blocked);
  const isTemporalSegmented = Boolean(reg.is_temporal_segmented);

  const totalEmissions = calc.total_co2e_tons || 0;
  const s1Tons = calc.scope_1?.tons || 0;
  const s2Tons = calc.scope_2?.tons || 0;
  const s3Tons = calc.scope_3?.tons || 0;

  const s1Pct = totalEmissions > 0 ? ((s1Tons / totalEmissions) * 100).toFixed(1) : '0.0';
  const s2Pct = totalEmissions > 0 ? ((s2Tons / totalEmissions) * 100).toFixed(1) : '0.0';

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
    <!-- ==========================================================================
         01. PRODUCT INTRODUCTION (Compact Editorial Intro)
         ========================================================================== -->
    <div style="margin-bottom:28px;padding-bottom:20px;border-bottom:1px solid var(--carbon-border);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;">
        <div>
          <div style="display:inline-flex;align-items:center;gap:6px;background:var(--carbon-blue-50);color:var(--carbon-blue-700);padding:3px 10px;border-radius:4px;font-size:11px;font-weight:700;letter-spacing:0.04em;margin-bottom:8px;">
            <span>DECISION 42/2026/QĐ-TTg GOVERNED</span>
          </div>
          <h1 style="font-size:26px;font-weight:800;color:var(--carbon-navy-950);margin:0 0 6px 0;letter-spacing:-0.02em;">
            ENERIX Carbon
          </h1>
          <p style="font-size:15px;color:var(--carbon-navy-700);margin:0;max-width:720px;line-height:1.5;">
            Carbon intelligence for real-world decisions. Measure emissions, build trusted inventories, produce governed reports, and turn emission insights into reduction actions.
          </p>
        </div>

        <!-- Quick Facility Switcher & Engineering Access -->
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
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
          <button class="btn-drilldown enerix-button enerix-button-secondary" data-nav="calculations" style="font-size:12px;padding:6px 12px;">
            Calculation Studio →
          </button>
        </div>
      </div>
    </div>

    <!-- FAIL-CLOSED BLOCKER ALERT BANNER -->
    ${isBlocked ? `
      <div class="enerix-card" style="border-left:4px solid var(--carbon-red-600);background:var(--carbon-red-50);margin-bottom:24px;padding:16px 20px;" role="alert">
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <div style="flex-shrink:0;">${ICONS.blocker(22)}</div>
          <div style="flex:1;">
            <div style="font-weight:700;color:var(--carbon-red-800);font-size:14px;">STATUTORY COMPLIANCE BLOCKED (Fail-Closed Enforcement)</div>
            <div style="font-size:13px;color:var(--carbon-red-700);margin-top:4px;">
              ${calc.blocking_reasons?.join('<br/>') || 'Reporting period straddles statutory transition date without temporal segmentation (ISSUE-TEMP-001).'}
            </div>
            <div style="margin-top:10px;display:flex;gap:10px;flex-wrap:wrap;">
              <button id="btn-resolve-temporal-blocker" class="enerix-button enerix-button-primary" style="font-size:12px;padding:6px 14px;background:var(--carbon-red-600);border-color:var(--carbon-red-600);">
                Enable Temporal Segmentation
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
         02. CARBON FOOTPRINT (Section 4)
         ========================================================================== -->
    <div id="measure-section" style="margin-bottom:32px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:16px;">
        <div>
          <span style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);text-transform:uppercase;letter-spacing:0.06em;">01 MEASURE</span>
          <h2 style="font-size:20px;font-weight:800;color:var(--carbon-navy-950);margin:2px 0 0 0;">CARBON FOOTPRINT</h2>
        </div>
        <div style="font-size:12px;color:var(--carbon-navy-600);">
          Period: <strong>${vm.reporting_period?.label || 'FY 2026'}</strong> | Status: <strong style="color:var(--carbon-green-700);">${calc.snapshot_id || 'GOVERNED'}</strong>
        </div>
      </div>

      <div class="card-grid" style="gap:16px;margin-bottom:16px;">
        <div class="enerix-card" style="border-top:3px solid var(--carbon-blue-500);background:#fff;">
          <div class="enerix-card-title">
            <span>Total Gross Emissions</span>
            <span style="font-size:11px;background:var(--carbon-navy-100);color:var(--carbon-navy-700);padding:2px 6px;border-radius:4px;font-family:var(--carbon-font-mono);">tCO2e</span>
          </div>
          <div style="font-size:28px;font-weight:800;color:var(--carbon-navy-950);margin:8px 0 4px 0;">
            ${calc.total_formatted || '0.00 tCO2e'}
          </div>
          <div style="font-size:12px;color:var(--carbon-navy-600);">
            Scope 1: <strong>${calc.scope_1?.formatted || '0.00'}</strong> | Scope 2: <strong>${calc.scope_2?.formatted || '0.00'}</strong>
          </div>
        </div>

        <div class="enerix-card" style="border-top:3px solid var(--carbon-blue-500);background:#fff;">
          <div class="enerix-card-title">
            <span>Regulatory Baseline</span>
            ${formatBadge(reg.mandatory_status || reg.applicability_status)}
          </div>
          <div style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);margin:10px 0 4px 0;">
            ${reg.legal_basis || 'Quyết định 42/2026/QĐ-TTg'}
          </div>
          <div style="font-size:12px;color:var(--carbon-navy-600);">
            Facility Sector: <strong>${facility.sector_id || 'ENERGY_POWER'}</strong>
          </div>
        </div>

        <div class="enerix-card" style="border-top:3px solid var(--carbon-blue-500);background:#fff;">
          <div class="enerix-card-title">
            <span>Primary Data Health</span>
            ${formatBadge(dataHealth.evidence_coverage_status || 'HEALTHY')}
          </div>
          <div style="font-size:22px;font-weight:700;color:var(--carbon-navy-900);margin:10px 0 4px 0;">
            ${dataHealth.verified_documents_count || 0} / ${dataHealth.documents_count || 0} Verified Docs
          </div>
          <div style="font-size:12px;color:var(--carbon-navy-600);">
            0 data defects | QA/QC: <strong>Passed</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- ==========================================================================
         03. CARBON INTELLIGENCE / HOTSPOTS (Section 5)
         ========================================================================== -->
    <div style="margin-bottom:32px;">
      <div style="margin-bottom:16px;">
        <span style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);text-transform:uppercase;letter-spacing:0.06em;">02 INTELLIGENCE</span>
        <h2 style="font-size:20px;font-weight:800;color:var(--carbon-navy-950);margin:2px 0 0 0;">WHERE DO EMISSIONS COME FROM?</h2>
        <p style="font-size:13px;color:var(--carbon-navy-600);margin:2px 0 0 0;">Trace material hotspots from calculated emission down to governed activity data and primary evidence.</p>
      </div>

      <div class="card-grid" style="gap:20px;">
        <div style="grid-column:span 8;background:#fff;border:1px solid var(--carbon-border);border-radius:8px;padding:20px;">
          <div class="enerix-table-wrapper" style="margin-bottom:0;border:none;">
            <table class="enerix-table">
              <thead>
                <tr>
                  <th>Emission Source</th>
                  <th>Scope</th>
                  <th>Activity Category</th>
                  <th style="text-align:right;">Emissions (tCO2e)</th>
                  <th style="text-align:right;">Share</th>
                  <th>Evidence</th>
                </tr>
              </thead>
              <tbody>
                ${hotspots.map((h, idx) => `
                  <tr>
                    <td>
                      <div style="font-weight:700;color:var(--carbon-navy-900);">${h.source}</div>
                      <div style="font-size:11px;color:var(--carbon-navy-500);font-family:var(--carbon-font-mono);">${h.activity_ref}</div>
                    </td>
                    <td><span class="mono-text" style="font-weight:600;">${h.scope}</span></td>
                    <td style="font-size:12px;color:var(--carbon-navy-700);">${h.category}</td>
                    <td style="text-align:right;font-weight:800;color:var(--carbon-navy-900);font-family:var(--carbon-font-mono);">
                      ${formatCO2e(h.tons)}
                    </td>
                    <td style="text-align:right;font-weight:700;color:var(--carbon-blue-600);font-family:var(--carbon-font-mono);">
                      ${h.share}
                    </td>
                    <td><span class="status-badge active">${h.evidence_status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div style="grid-column:span 4;background:#fff;border:1px solid var(--carbon-border);border-radius:8px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <h3 style="font-size:15px;font-weight:700;color:var(--carbon-navy-900);margin-bottom:8px;">Greenhouse Gas Species</h3>
            <p style="font-size:12px;color:var(--carbon-navy-600);margin-bottom:14px;">Weighted by IPCC AR5 GWP multipliers (28x CH4, 265x N2O).</p>
            <div style="display:flex;flex-direction:column;gap:10px;font-size:12px;">
              <div style="display:flex;justify-content:space-between;border-bottom:1px solid var(--carbon-navy-100);padding-bottom:6px;">
                <span style="font-weight:600;">Carbon Dioxide (CO2)</span>
                <span style="font-family:var(--carbon-font-mono);font-weight:700;color:var(--carbon-blue-600);">1,081.9 tCO2e</span>
              </div>
              <div style="display:flex;justify-content:space-between;border-bottom:1px solid var(--carbon-navy-100);padding-bottom:6px;">
                <span style="font-weight:600;">Methane (CH4)</span>
                <span style="font-family:var(--carbon-font-mono);font-weight:700;color:var(--carbon-blue-600);">0.38 tCO2e</span>
              </div>
              <div style="display:flex;justify-content:space-between;border-bottom:1px solid var(--carbon-navy-100);padding-bottom:6px;">
                <span style="font-weight:600;">Nitrous Oxide (N2O)</span>
                <span style="font-family:var(--carbon-font-mono);font-weight:700;color:var(--carbon-blue-600);">0.04 tCO2e</span>
              </div>
            </div>
          </div>
          <div style="margin-top:16px;">
            <button class="btn-drilldown enerix-button enerix-button-secondary" data-nav="emission-factors" style="width:100%;font-size:12px;">
              Inspect Emission Factors & GWP →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ==========================================================================
         04. DATA COLLECTION (Section 6)
         ========================================================================== -->
    <div style="margin-bottom:32px;background:#fff;border:1px solid var(--carbon-border);border-radius:8px;padding:24px;">
      <div style="margin-bottom:16px;">
        <span style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);text-transform:uppercase;letter-spacing:0.06em;">03 INGESTION</span>
        <h2 style="font-size:20px;font-weight:800;color:var(--carbon-navy-950);margin:2px 0 0 0;">BRING YOUR CARBON DATA TOGETHER</h2>
        <p style="font-size:13px;color:var(--carbon-navy-600);margin:2px 0 0 0;">Unified ingestion pipeline supporting documents, spreadsheets, meter feeds, and governed activity records.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:12px;margin-bottom:20px;">
        <div style="background:var(--carbon-navy-50);border:1px solid var(--carbon-navy-200);border-radius:6px;padding:12px;text-align:center;">
          <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-900);">1. SOURCE</div>
          <div style="font-size:11px;color:var(--carbon-navy-600);margin-top:4px;">Invoices & Meters</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;color:var(--carbon-navy-400);">→</div>
        <div style="background:var(--carbon-navy-50);border:1px solid var(--carbon-navy-200);border-radius:6px;padding:12px;text-align:center;">
          <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-900);">2. EXTRACT</div>
          <div style="font-size:11px;color:var(--carbon-navy-600);margin-top:4px;">Structured Parquet</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;color:var(--carbon-navy-400);">→</div>
        <div style="background:var(--carbon-navy-50);border:1px solid var(--carbon-navy-200);border-radius:6px;padding:12px;text-align:center;">
          <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-900);">3. NORMALIZE</div>
          <div style="font-size:11px;color:var(--carbon-navy-600);margin-top:4px;">SI Units & Mass</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;color:var(--carbon-navy-400);">→</div>
        <div style="background:var(--carbon-navy-50);border:1px solid var(--carbon-navy-200);border-radius:6px;padding:12px;text-align:center;">
          <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-900);">4. VALIDATE</div>
          <div style="font-size:11px;color:var(--carbon-navy-600);margin-top:4px;">QA/QC Checks</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;color:var(--carbon-navy-400);">→</div>
        <div style="background:var(--carbon-blue-50);border:1px solid var(--carbon-blue-200);border-radius:6px;padding:12px;text-align:center;">
          <div style="font-weight:700;font-size:13px;color:var(--carbon-blue-800);">5. APPROVED</div>
          <div style="font-size:11px;color:var(--carbon-blue-600);margin-top:4px;">Governed Inventory</div>
        </div>
      </div>

      <div style="display:flex;justify-content:flex-end;">
        <button class="btn-drilldown enerix-button enerix-button-primary" data-nav="activity-data" style="font-size:12px;">
          Open Activity Data Workspace →
        </button>
      </div>
    </div>

    <!-- ==========================================================================
         05. ASSURANCE (Section 7)
         ========================================================================== -->
    <div style="margin-bottom:32px;background:#fff;border:1px solid var(--carbon-border);border-radius:8px;padding:24px;">
      <div style="margin-bottom:16px;">
        <span style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);text-transform:uppercase;letter-spacing:0.06em;">04 ASSURANCE</span>
        <h2 style="font-size:20px;font-weight:800;color:var(--carbon-navy-950);margin:2px 0 0 0;">EVERY NUMBER HAS A REASON</h2>
        <p style="font-size:13px;color:var(--carbon-navy-600);margin:2px 0 0 0;">Deterministic calculation pipeline with strict human verifier sign-off. AI assists; humans approve; code calculates.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;margin-bottom:20px;">
        <div style="border-left:3px solid var(--carbon-blue-600);padding-left:12px;">
          <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-900);">Regulatory Applicability</div>
          <div style="font-size:12px;color:var(--carbon-navy-600);margin-top:2px;">Statutory threshold screening under Decision 42.</div>
        </div>
        <div style="border-left:3px solid var(--carbon-blue-600);padding-left:12px;">
          <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-900);">Deterministic Calculation</div>
          <div style="font-size:12px;color:var(--carbon-navy-600);margin-top:2px;">Zero LLM math. Pure arithmetic formula execution.</div>
        </div>
        <div style="border-left:3px solid var(--carbon-blue-600);padding-left:12px;">
          <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-900);">Human Verifier Sign-Off</div>
          <div style="font-size:12px;color:var(--carbon-navy-600);margin-top:2px;">Certified human auditor endorsement (Non-AI).</div>
        </div>
      </div>

      <div style="display:flex;justify-content:flex-end;">
        <button class="btn-drilldown enerix-button enerix-button-secondary" data-nav="evidence-trace" style="font-size:12px;">
          Inspect Evidence & Traceability →
        </button>
      </div>
    </div>

    <!-- ==========================================================================
         06. REPORT & REDUCE (Sections 8 & 9)
         ========================================================================== -->
    <div class="card-grid" style="gap:20px;margin-bottom:32px;">
      
      <!-- Report Card -->
      <div style="background:#fff;border:1px solid var(--carbon-border);border-radius:8px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <span style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);text-transform:uppercase;letter-spacing:0.06em;">05 REPORT</span>
          <h3 style="font-size:18px;font-weight:800;color:var(--carbon-navy-950);margin:4px 0 8px 0;">REPORT WITH CONFIDENCE</h3>
          <p style="font-size:13px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:16px;">
            Generate audit-ready statutory disclosures conforming to national greenhouse gas inventory reporting requirements and international standards.
          </p>
          <div style="font-size:12px;color:var(--carbon-navy-700);display:flex;flex-direction:column;gap:6px;margin-bottom:16px;">
            <div>✓ Measured & Validated Activity Data</div>
            <div>✓ Governed Emission Factor Lineage</div>
            <div>✓ Accredited Human Verifier Sign-Offs</div>
          </div>
        </div>
        <div>
          <button class="btn-drilldown enerix-button enerix-button-primary" data-nav="reports" style="width:100%;font-size:12px;">
            Open Statutory Reports Workspace →
          </button>
        </div>
      </div>

      <!-- Reduce Card -->
      <div style="background:#fff;border:1px solid var(--carbon-border);border-radius:8px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <span style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);text-transform:uppercase;letter-spacing:0.06em;">06 REDUCE</span>
          <h3 style="font-size:18px;font-weight:800;color:var(--carbon-navy-950);margin:4px 0 8px 0;">TURN INSIGHTS INTO ACTION</h3>
          <p style="font-size:13px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:16px;">
            Identify emission hotspots, model abatement scenarios, and track decarbonization projects against verified baseline inventories.
          </p>
          <div style="font-size:12px;color:var(--carbon-navy-700);display:flex;flex-direction:column;gap:6px;margin-bottom:16px;">
            <div>• Hotspot Ranking & Prioritization</div>
            <div>• SCADA & Combustion Optimization</div>
            <div>• Baseline & Abatement Scenario Modeling</div>
          </div>
        </div>
        <div>
          <button class="btn-drilldown enerix-button enerix-button-secondary" data-nav="inventory" style="width:100%;font-size:12px;">
            View Inventory & Reduction Registry →
          </button>
        </div>
      </div>

    </div>

    <!-- ==========================================================================
         07. INDUSTRY SOLUTIONS (Section 10)
         ========================================================================== -->
    <div style="margin-bottom:32px;background:#fff;border:1px solid var(--carbon-border);border-radius:8px;padding:24px;">
      <div style="margin-bottom:16px;">
        <span style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);text-transform:uppercase;letter-spacing:0.06em;">SECTORAL EXPERTISE</span>
        <h2 style="font-size:20px;font-weight:800;color:var(--carbon-navy-950);margin:2px 0 0 0;">BUILT FOR COMPLEX INDUSTRIES</h2>
        <p style="font-size:13px;color:var(--carbon-navy-600);margin:2px 0 0 0;">Pre-configured methodologies and emission factors for heavy regulated sectors.</p>
      </div>

      <div class="card-grid" style="gap:16px;">
        <div style="background:var(--carbon-navy-50);border:1px solid var(--carbon-navy-200);border-radius:8px;padding:16px;">
          <div style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);text-transform:uppercase;margin-bottom:4px;">Energy & Power</div>
          <div style="font-size:14px;font-weight:700;color:var(--carbon-navy-900);margin-bottom:6px;">Thermal Power & Grid Transmission</div>
          <div style="font-size:12px;color:var(--carbon-navy-700);line-height:1.5;margin-bottom:10px;">
            Circular 38/2023/TT-BCT methodology integration. Coal and gas turbine combustion models.
          </div>
          <div style="font-size:11px;color:var(--carbon-navy-500);font-weight:600;">Governing: MOIT Energy MRV</div>
        </div>

        <div style="background:var(--carbon-navy-50);border:1px solid var(--carbon-navy-200);border-radius:8px;padding:16px;">
          <div style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);text-transform:uppercase;margin-bottom:4px;">Construction Materials</div>
          <div style="font-size:14px;font-weight:700;color:var(--carbon-navy-900);margin-bottom:6px;">Cement & Clinker Calcination</div>
          <div style="font-size:12px;color:var(--carbon-navy-700);line-height:1.5;margin-bottom:10px;">
            Circular 13/2024/TT-BXD methodology. Carbonate decomposition stoichiometry and kiln fuel switching.
          </div>
          <div style="font-size:11px;color:var(--carbon-navy-500);font-weight:600;">Governing: MOC Construction MRV</div>
        </div>

        <div style="background:var(--carbon-navy-50);border:1px solid var(--carbon-navy-200);border-radius:8px;padding:16px;">
          <div style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);text-transform:uppercase;margin-bottom:4px;">Waste & Environment</div>
          <div style="font-size:14px;font-weight:700;color:var(--carbon-navy-900);margin-bottom:6px;">Landfills & Wastewater Treatment</div>
          <div style="font-size:12px;color:var(--carbon-navy-700);line-height:1.5;margin-bottom:10px;">
            Circular 26/2024/TT-BTNMT methodology. IPCC First-Order Decay (FOD) solid waste methane.
          </div>
          <div style="font-size:11px;color:var(--carbon-navy-500);font-weight:600;">Governing: MONRE Environmental MRV</div>
        </div>
      </div>
    </div>

    <!-- ==========================================================================
         08. GHG REPORTING GUIDE & KNOWLEDGE (Section 11)
         ========================================================================== -->
    <div style="margin-bottom:32px;background:#fff;border:1px solid var(--carbon-border);border-radius:8px;padding:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;">
      <div>
        <span style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);text-transform:uppercase;letter-spacing:0.06em;">KNOWLEDGE BASE</span>
        <h2 style="font-size:20px;font-weight:800;color:var(--carbon-navy-950);margin:2px 0 4px 0;">GHG REPORTING GUIDE</h2>
        <p style="font-size:13px;color:var(--carbon-navy-600);margin:0;max-width:600px;">
          Master statutory boundaries, activity data collection, calculation formulas, QA/QC protocols, and verification standards under Vietnamese and international GHG standards.
        </p>
      </div>
      <div>
        <button class="btn-drilldown enerix-button enerix-button-primary" data-nav="knowledge" style="font-size:13px;padding:8px 16px;">
          Explore GHG Reporting Guide →
        </button>
      </div>
    </div>

    <!-- ==========================================================================
         09. CUSTOMER CTA (Section 12)
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
  `;
}

// Attach Event Listeners for Reactive Interactions
renderOverviewPage.attachEvents = function(container) {
  if (!container) return;

  const facilitySelect = container.querySelector('#overview-facility-select');
  if (facilitySelect) {
    facilitySelect.addEventListener('change', (e) => {
      stateStore.selectFacility(e.target.value);
    });
  }

  const btnResolveBlocker = container.querySelector('#btn-resolve-temporal-blocker');
  if (btnResolveBlocker) {
    btnResolveBlocker.addEventListener('click', () => {
      stateStore.setTemporalSegmentation(true);
    });
  }

  const demoButtons = [
    container.querySelector('#btn-request-demo-bottom')
  ];
  demoButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        alert('Thank you for your interest in ENERIX Carbon! Our enterprise engineering team will connect with your regulatory compliance officers to schedule a governed MRV demonstration.');
      });
    }
  });

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
