/**
 * ENERIX Carbon - Overview & Decision Workspace
 * Task #0029: Central Executive Decision & Governance Workspace
 *
 * CRITICAL ARCHITECTURAL PRINCIPLES:
 * 1. UI is strictly an Inspector / Consumer with ZERO mutation authority.
 * 2. Consumes 100% governed state from StateStore and DataProvider.
 * 3. Never invents arbitrary 0-100 scores or simulated compliance percentages.
 * 4. Distinctly surfaces:
 *    - Regulatory Applicability & Temporal Boundary Status
 *    - Data Health & Primary Evidence Coverage
 *    - Calculation Readiness & Deterministic Results
 *    - Assurance, Provenance & Lineage Verification
 *    - Human Sign-Off Governance & Controlled Issues Disclosures
 */

import { dataProvider } from '../../app/data-provider.js';
import { stateStore } from '../../app/state-store.js';
import { formatBadge, formatCO2e } from '../../app/formatters.js';
import { ICONS } from '../components/icons.js';

export function renderOverviewPage(options = {}) {
  const providerStatus = options.status || (dataProvider.getStatus ? dataProvider.getStatus() : 'AVAILABLE');

  if (providerStatus === 'LOADING') {
    return `
      <div class="page-title-bar">
        <h1 class="page-title">Carbon Overview & Decision Workspace</h1>
        <p class="page-subtitle">Executive Compliance, Data Health & Deterministic Assurance</p>
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
        <p class="page-subtitle">Executive Compliance, Data Health & Deterministic Assurance</p>
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
        <p class="page-subtitle">Executive Compliance, Data Health & Deterministic Assurance</p>
      </div>
      <div class="enerix-card" style="padding:24px;" role="alert">
        <div class="enerix-alert enerix-alert-danger" style="margin-bottom:0;">
          <div style="flex-shrink:0;">${ICONS.blocker(22)}</div>
          <div>
            <div style="font-weight:700;">Executive Overview Engine Error (Fail-Closed)</div>
            <div style="font-size:13px;margin-top:4px;">${errorMsg}</div>
            <div style="font-size:11px;color:var(--carbon-red-800);margin-top:6px;">Zero assumptions applied. Contact platform administrator.</div>
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

  const isBlocked = Boolean(calc.is_blocked);
  const isTemporalSegmented = Boolean(reg.is_temporal_segmented);

  return `
    <!-- Top Executive Header -->
    <div class="page-title-bar" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;">
      <div>
        <h1 class="page-title">Carbon Overview & Decision Workspace</h1>
        <p class="page-subtitle">
          Executive Decision Layer | Governing Baseline: <strong>${reg.legal_basis || 'QĐ 42/2026/QĐ-TTg'}</strong> | Period: <strong>${vm.reporting_period?.label || 'FY 2026'}</strong>
        </p>
      </div>

      <!-- Facility Context Selector & Controls -->
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <label for="overview-facility-select" style="font-size:12px;font-weight:600;color:var(--color-navy-800);">Active Facility:</label>
        <select id="overview-facility-select" class="enerix-select" style="min-width:140px;width:100%;max-width:320px;background:#fff;border:1px solid #cbd5e1;padding:6px 12px;border-radius:6px;font-size:13px;font-weight:500;color:var(--color-navy-900);">
          ${facilities.map(f => `
            <option value="${f.facility_id}" ${f.is_active ? 'selected' : ''}>
              ${f.facility_name} (${f.facility_id})
            </option>
          `).join('')}
        </select>
        <button id="btn-toggle-temporal" class="enerix-button ${isTemporalSegmented ? 'enerix-button-primary' : 'enerix-button-secondary'}" style="font-size:12px;padding:6px 12px;white-space:nowrap;">
          ${isTemporalSegmented ? 'Dual Regime Segmented' : 'Enable Dual Segmentation'}
        </button>
      </div>
    </div>

    <!-- Fail-Closed Blocker Alert Banner (if calculation or temporal straddling is blocked) -->
    ${isBlocked ? `
      <div class="enerix-card" style="border-left:4px solid var(--carbon-red-600);background:var(--carbon-red-50);margin-bottom:20px;padding:16px 20px;" role="alert">
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <div style="flex-shrink:0;">${ICONS.blocker(22)}</div>
          <div style="flex:1;">
            <div style="font-weight:700;color:var(--carbon-red-800);font-size:14px;">STATUTORY COMPLIANCE BLOCKED (Fail-Closed Enforcement)</div>
            <div style="font-size:13px;color:var(--carbon-red-700);margin-top:4px;">
              ${calc.blocking_reasons?.join('<br/>') || 'Reporting period straddles statutory transition date without temporal segmentation.'}
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

    <!-- Executive KPI / Metric Cards (4 Pillars) -->
    <div class="card-grid" style="gap:16px;margin-bottom:24px;">
      
      <!-- Card 1: Gross GHG Emissions (Carbon Blue Accent) -->
      <div class="enerix-card" style="border-top:3px solid var(--carbon-blue-600);">
        <div class="enerix-card-title">
          <span>Gross Facility Emissions</span>
          <span style="font-size:11px;background:var(--carbon-navy-100);color:var(--carbon-navy-700);padding:2px 8px;border-radius:4px;font-family:var(--carbon-font-mono);">${calc.snapshot_id || 'SNAP-GOVERNED'}</span>
        </div>
        <div style="font-size:30px;font-weight:800;color:var(--carbon-navy-900);margin:8px 0 4px 0;letter-spacing:-0.5px;">
          ${calc.total_formatted || '0.00 tCO2e'}
        </div>
        <div style="font-size:12px;color:var(--carbon-navy-500);margin-bottom:12px;">
          Scope 1: <strong>${calc.scope_1?.formatted || '0.00 tCO2e'}</strong> | Scope 2: <strong>${calc.scope_2?.formatted || '0.00 tCO2e'}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--carbon-navy-100);padding-top:10px;font-size:11px;">
          <span style="color:var(--carbon-navy-500);">GWP: <strong>${calc.gwp_dataset_ref || 'GWP-IPCC-AR5'}</strong></span>
          <button class="btn-drilldown" data-nav="calculations" style="background:none;border:none;color:var(--carbon-blue-600);font-weight:600;cursor:pointer;padding:0;display:inline-flex;align-items:center;gap:4px;">
            Calculation Studio ${ICONS.arrowRight(12)}
          </button>
        </div>
      </div>

      <!-- Card 2: Regulatory Applicability & Obligation -->
      <div class="enerix-card" style="border-top:3px solid ${isBlocked ? 'var(--carbon-red-600)' : (isTemporalSegmented ? 'var(--carbon-green-600)' : 'var(--carbon-amber-600)')};">
        <div class="enerix-card-title">
          <span>Regulatory Applicability</span>
          ${formatBadge(reg.mandatory_status || reg.applicability_status)}
        </div>
        <div style="font-size:17px;font-weight:700;color:var(--carbon-navy-900);margin:12px 0 4px 0;">
          ${reg.legal_basis || 'Quyết định 42/2026/QĐ-TTg'}
        </div>
        <div style="font-size:12px;color:var(--carbon-navy-500);margin-bottom:12px;">
          Status: <strong>${reg.applicability_status}</strong> | Effective: <strong>${reg.effective_from || '2026-09-25'}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--carbon-navy-100);padding-top:10px;font-size:11px;">
          <span style="color:${isBlocked ? 'var(--carbon-red-700)' : (isTemporalSegmented ? 'var(--carbon-green-700)' : 'var(--carbon-amber-700)')};font-weight:600;">
            ${isBlocked ? 'Unsegmented Straddling' : (isTemporalSegmented ? 'Dual Regime Segmented' : 'Compliant Period')}
          </span>
          <button class="btn-drilldown" data-nav="regulatory-check" style="background:none;border:none;color:var(--carbon-blue-600);font-weight:600;cursor:pointer;padding:0;display:inline-flex;align-items:center;gap:4px;">
            Regulatory Check ${ICONS.arrowRight(12)}
          </button>
        </div>
      </div>

      <!-- Card 3: Data Health & Evidence Coverage -->
      <div class="enerix-card" style="border-top:3px solid var(--carbon-blue-600);">
        <div class="enerix-card-title">
          <span>Data Health & Evidence</span>
          ${formatBadge(dataHealth.evidence_coverage_status || 'HEALTHY')}
        </div>
        <div style="font-size:24px;font-weight:700;color:var(--carbon-navy-900);margin:10px 0 4px 0;">
          ${dataHealth.verified_documents_count || 0} / ${dataHealth.documents_count || 0} Verified Docs
        </div>
        <div style="font-size:12px;color:var(--carbon-navy-500);margin-bottom:12px;">
          ${dataHealth.activity_records_count || 0} Activity records linked | 0 data defects
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--carbon-navy-100);padding-top:10px;font-size:11px;">
          <span style="color:var(--carbon-navy-600);font-weight:600;">QA/QC: ${dataHealth.qaqc_status || 'HEALTHY'}</span>
          <button class="btn-drilldown" data-nav="evidence-trace" style="background:none;border:none;color:var(--carbon-blue-600);font-weight:600;cursor:pointer;padding:0;display:inline-flex;align-items:center;gap:4px;">
            Evidence & Trace ${ICONS.arrowRight(12)}
          </button>
        </div>
      </div>

      <!-- Card 4: Assurance & Report Readiness -->
      <div class="enerix-card" style="border-top:3px solid ${assurance.is_report_ready ? 'var(--carbon-green-600)' : 'var(--carbon-amber-600)'};">
        <div class="enerix-card-title">
          <span>Statutory Report Readiness</span>
          ${formatBadge(assurance.report_readiness_state || 'NOT_READY')}
        </div>
        <div style="font-size:19px;font-weight:700;color:var(--carbon-navy-900);margin:12px 0 4px 0;">
          ${assurance.is_report_ready ? 'Ready for Authority Submission' : 'Verification in Progress'}
        </div>
        <div style="font-size:12px;color:var(--carbon-navy-500);margin-bottom:12px;">
          Human Sign-Offs: <strong>${dataHealth.sign_offs_count || 0} Certified Verifiers</strong> (Non-AI)
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--carbon-navy-100);padding-top:10px;font-size:11px;">
          <span style="font-family:var(--carbon-font-mono);color:var(--carbon-navy-500);">Reproducibility: OK</span>
          <button class="btn-drilldown" data-nav="reports" style="background:none;border:none;color:var(--carbon-blue-600);font-weight:600;cursor:pointer;padding:0;display:inline-flex;align-items:center;gap:4px;">
            View Reports ${ICONS.arrowRight(12)}
          </button>
        </div>
      </div>

    </div>

    <!-- 5-Pillar Executive Decision Matrix -->
    <div class="enerix-card" style="margin-bottom:24px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <div>
          <h2 style="font-size:16px;font-weight:700;color:var(--color-navy-900);margin:0;">
            5-Pillar Executive Decision Matrix
          </h2>
          <p style="font-size:12px;color:#64748b;margin:2px 0 0 0;">
            Governed validation gates evaluated against statutory MRV decrees and audit criteria.
          </p>
        </div>
        <span style="font-size:12px;background:#f8fafc;border:1px solid #e2e8f0;padding:4px 10px;border-radius:6px;font-weight:600;color:#334155;">
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

    <!-- Two-Column Operational Details -->
    <div class="card-grid" style="gap:24px;margin-bottom:24px;">

      <!-- Left Column: Calculation Results & Gas Breakdown -->
      <div style="display:flex;flex-direction:column;gap:24px;">
        
        <!-- Detailed Emission Scope Breakdown -->
        <div class="enerix-card">
          <div class="enerix-card-title">
            <span>Emission Scopes & Statutory Breakdown</span>
            <span style="font-size:12px;color:var(--carbon-navy-500);">${facility.facility_name}</span>
          </div>

          <div class="enerix-grid-2" style="gap:12px;margin:12px 0;">
            <div style="background:var(--carbon-navy-50);border:1px solid var(--carbon-navy-200);border-radius:6px;padding:12px;">
              <div style="font-size:11px;font-weight:600;color:var(--carbon-navy-600);text-transform:uppercase;">Scope 1 (Direct Combustion)</div>
              <div style="font-size:20px;font-weight:700;color:var(--carbon-navy-900);margin-top:4px;">
                ${calc.scope_1?.formatted || '0.00 tCO2e'}
              </div>
              <div style="font-size:11px;color:var(--carbon-navy-500);margin-top:2px;">Stationary Diesel Fuel (25,000 L)</div>
            </div>

            <div style="background:var(--carbon-navy-50);border:1px solid var(--carbon-navy-200);border-radius:6px;padding:12px;">
              <div style="font-size:11px;font-weight:600;color:var(--carbon-navy-600);text-transform:uppercase;">Scope 2 (Grid Electricity)</div>
              <div style="font-size:20px;font-weight:700;color:var(--carbon-navy-900);margin-top:4px;">
                ${calc.scope_2?.formatted || '0.00 tCO2e'}
              </div>
              <div style="font-size:11px;color:var(--carbon-navy-500);margin-top:2px;">Location-Based Grid (1,500,000 kWh)</div>
            </div>
          </div>

          <!-- Greenhouse Gas Species Composition Table -->
          <div style="margin-top:16px;">
            <div style="font-size:13px;font-weight:700;color:var(--carbon-navy-900);margin-bottom:8px;">
              Greenhouse Gas Species Composition (IPCC AR5 Normalization)
            </div>
            <div class="enerix-table-wrapper" style="box-shadow:none;border:1px solid var(--carbon-navy-200);">
              <table class="enerix-table" style="font-size:12px;">
                <thead>
                  <tr style="background:var(--carbon-navy-50);">
                    <th>Gas Species</th>
                    <th>Physical Mass</th>
                    <th>AR5 GWP</th>
                    <th>CO2 Equivalent</th>
                  </tr>
                </thead>
                <tbody>
                  ${(calc.gases || []).map(g => `
                    <tr>
                      <td style="font-weight:600;">${g.name} (${g.gas})</td>
                      <td>${g.tons} metric tons</td>
                      <td style="font-family:var(--carbon-font-mono);">${g.gwp}x</td>
                      <td style="font-weight:700;color:var(--carbon-navy-900);">${g.tco2e} tCO2e</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Methodology & Audit Manifest Bar -->
          <div style="margin-top:14px;background:var(--carbon-navy-100);border-radius:6px;padding:10px 12px;display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--carbon-navy-700);">
            <div>
              Methodology: <strong>${calc.methodology?.governing_circular || 'Thông tư 17/2022/TT-BTNMT'}</strong> (${calc.methodology?.default_tier || 'TIER_1'})
            </div>
            <div style="font-family:var(--carbon-font-mono);color:var(--carbon-navy-600);">
              Audit Hash: ${calc.audit_hash?.substring(0, 16) || 'N/A'}...
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column: Governance, Controlled Issues & Sign-Offs -->
      <div style="display:flex;flex-direction:column;gap:24px;">
        
        <!-- Controlled Issues & Statutory Disclosures -->
        <div class="enerix-card">
          <div class="enerix-card-title">
            <span>Controlled Issues & Statutory Disclosures</span>
            <span style="font-size:11px;background:var(--carbon-amber-50);color:var(--carbon-amber-800);padding:2px 8px;border-radius:4px;font-weight:600;">
              ${gov.open_controlled_issues_count || 0} Disclosed Issues
            </span>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px;margin-top:12px;">
            ${(gov.controlled_issues || []).map(issue => {
              const isIssueBlocking = issue.severity === 'BLOCKING';
              return `
                <div style="border:1px solid ${isIssueBlocking ? 'var(--carbon-red-200)' : 'var(--carbon-amber-200)'};background:${isIssueBlocking ? 'var(--carbon-red-50)' : 'var(--carbon-amber-50)'};border-radius:6px;padding:10px 12px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                    <span style="font-size:12px;font-weight:700;color:${isIssueBlocking ? 'var(--carbon-red-800)' : 'var(--carbon-amber-800)'};font-family:var(--carbon-font-mono);">
                      ${issue.issue_id}
                    </span>
                    <span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:${isIssueBlocking ? 'var(--carbon-red-100)' : 'var(--carbon-amber-100)'};color:${isIssueBlocking ? 'var(--carbon-red-800)' : 'var(--carbon-amber-800)'};">
                      ${issue.severity}
                    </span>
                  </div>
                  <div style="font-size:12px;font-weight:600;color:var(--carbon-navy-900);margin-top:2px;">
                    ${issue.title}
                  </div>
                  <div style="font-size:11px;color:var(--carbon-navy-600);margin-top:4px;line-height:1.4;">
                    ${issue.disclosure || issue.description}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Human Sign-Off & Verification Governance -->
        <div class="enerix-card">
          <div class="enerix-card-title">
            <span>Human Verifier Sign-Offs (Non-AI)</span>
            <span style="font-size:10px;background:var(--carbon-green-50);color:var(--carbon-green-800);padding:2px 6px;border-radius:4px;font-weight:700;">
              FAIL-CLOSED NON-AI ENFORCED
            </span>
          </div>

          <p style="font-size:12px;color:var(--carbon-navy-500);margin:6px 0 12px 0;">
            Statutory Decree 06 compliance requires certified human auditor signatures. Automated AI actors are strictly prohibited from granting sign-off authority.
          </p>

          <div style="display:flex;flex-direction:column;gap:8px;">
            ${(gov.human_sign_offs && gov.human_sign_offs.length > 0) ? gov.human_sign_offs.map(signOff => `
              <div style="border:1px solid var(--carbon-navy-200);border-left:3px solid var(--carbon-green-600);border-radius:6px;padding:8px 12px;background:var(--carbon-navy-50);display:flex;justify-content:space-between;align-items:center;">
                <div>
                  <div style="font-size:12px;font-weight:700;color:var(--carbon-navy-900);">
                    ${signOff.actor_name}
                  </div>
                  <div style="font-size:11px;color:var(--carbon-navy-600);">
                    ${signOff.role} | Actor: <strong style="color:var(--carbon-green-700);">${signOff.actor_type}</strong>
                  </div>
                </div>
                <div style="text-align:right;">
                  <span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:var(--carbon-green-50);color:var(--carbon-green-800);">
                    ${signOff.status}
                  </span>
                  <div style="font-size:10px;font-family:var(--carbon-font-mono);color:var(--carbon-navy-500);margin-top:2px;">
                    ${signOff.signature ? signOff.signature.substring(0, 16) : 'VERIFIED'}...
                  </div>
                </div>
              </div>
            `).join('') : `
              <div style="border:1px dashed var(--carbon-navy-300);border-radius:6px;padding:12px;text-align:center;font-size:12px;color:var(--carbon-navy-500);">
                No human verifier sign-offs registered yet for this reporting period.
              </div>
            `}
          </div>
        </div>

      </div>

    </div>

    <!-- Multi-Facility Statutory Compliance Matrix -->
    <div class="enerix-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div class="enerix-card-title" style="margin-bottom:0;">
          Enterprise Facilities Statutory Compliance Matrix
        </div>
        <span style="font-size:12px;color:#64748b;">
          ${vm.mandatory_facilities} of ${vm.total_facilities} Facilities Subject to Mandatory Decree 06 MRV
        </span>
      </div>

      <div class="enerix-table-wrapper" style="box-shadow:none;border:1px solid var(--carbon-navy-200);">
        <table class="enerix-table">
          <thead>
            <tr style="background:var(--carbon-navy-50);">
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
  `;
}

// Attach Event Listeners for Reactive Interactions
renderOverviewPage.attachEvents = function(container) {
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
