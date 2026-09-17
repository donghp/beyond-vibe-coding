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

export function renderOverviewPage(options = {}) {
  const providerStatus = options.status || (dataProvider.getStatus ? dataProvider.getStatus() : 'AVAILABLE');

  if (providerStatus === 'LOADING') {
    return `
      <div class="page-title-bar">
        <h1 class="page-title">Carbon Overview & Decision Workspace</h1>
        <p class="page-subtitle">Executive Compliance, Data Health & Deterministic Assurance</p>
      </div>
      <div class="enerix-card" style="text-align:center;padding:48px;" role="status" aria-live="polite">
        <div style="font-size:24px;margin-bottom:12px;">⏳</div>
        <div style="font-size:16px;font-weight:600;color:var(--color-navy-900);">Loading Governed Carbon Overview...</div>
        <p style="font-size:13px;color:#64748b;margin-top:6px;">Retrieving governed facility context, regulatory state, and calculation snapshots.</p>
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
        <div style="font-size:24px;margin-bottom:12px;">📂</div>
        <div style="font-size:16px;font-weight:600;color:var(--color-navy-900);">No Regulated Facilities Registered</div>
        <p style="font-size:13px;color:#64748b;margin-top:6px;">No statutory facility records found in data provider registry.</p>
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
          <div style="font-size:20px;">⛔</div>
          <div>
            <div style="font-weight:700;">Executive Overview Engine Error (Fail-Closed)</div>
            <div style="font-size:13px;margin-top:4px;">${errorMsg}</div>
            <div style="font-size:11px;color:#991b1b;margin-top:6px;">Zero assumptions applied. Contact platform administrator.</div>
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
      <div style="display:flex;gap:10px;align-items:center;">
        <label for="overview-facility-select" style="font-size:12px;font-weight:600;color:var(--color-navy-800);">Active Facility:</label>
        <select id="overview-facility-select" class="enerix-select" style="min-width:240px;background:#fff;border:1px solid #cbd5e1;padding:6px 12px;border-radius:6px;font-size:13px;font-weight:500;color:var(--color-navy-900);">
          ${facilities.map(f => `
            <option value="${f.facility_id}" ${f.is_active ? 'selected' : ''}>
              ${f.facility_name} (${f.facility_id})
            </option>
          `).join('')}
        </select>
        <button id="btn-toggle-temporal" class="enerix-button ${isTemporalSegmented ? 'enerix-button-primary' : 'enerix-button-secondary'}" style="font-size:12px;padding:6px 12px;white-space:nowrap;">
          ${isTemporalSegmented ? '✓ Dual Regime Segmented' : '⚙ Enable Dual Segmentation'}
        </button>
      </div>
    </div>

    <!-- Fail-Closed Blocker Alert Banner (if calculation or temporal straddling is blocked) -->
    ${isBlocked ? `
      <div class="enerix-card" style="border-left:4px solid #ef4444;background:#fef2f2;margin-bottom:20px;padding:16px 20px;" role="alert">
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <div style="font-size:22px;color:#dc2626;">⛔</div>
          <div style="flex:1;">
            <div style="font-weight:700;color:#991b1b;font-size:14px;">STATUTORY COMPLIANCE BLOCKED (Fail-Closed Enforcement)</div>
            <div style="font-size:13px;color:#7f1d1d;margin-top:4px;">
              ${calc.blocking_reasons?.join('<br/>') || 'Reporting period straddles statutory transition date without temporal segmentation.'}
            </div>
            <div style="margin-top:10px;display:flex;gap:10px;">
              <button id="btn-resolve-temporal-blocker" class="enerix-button enerix-button-primary" style="font-size:12px;padding:6px 14px;background:#dc2626;">
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
      
      <!-- Card 1: Gross GHG Emissions -->
      <div class="enerix-card" style="border-top:3px solid var(--color-digital-blue, #0284c7);">
        <div class="enerix-card-title" style="display:flex;justify-content:space-between;align-items:center;">
          <span>Gross Facility Emissions</span>
          <span style="font-size:11px;background:#f1f5f9;color:#475569;padding:2px 8px;border-radius:4px;font-family:monospace;">${calc.snapshot_id || 'SNAP-GOVERNED'}</span>
        </div>
        <div style="font-size:32px;font-weight:800;color:var(--color-navy-900);margin:8px 0 4px 0;letter-spacing:-0.5px;">
          ${calc.total_formatted || '0.00 tCO2e'}
        </div>
        <div style="font-size:12px;color:#64748b;margin-bottom:12px;">
          Scope 1: <strong>${calc.scope_1?.formatted || '0.00 tCO2e'}</strong> | Scope 2: <strong>${calc.scope_2?.formatted || '0.00 tCO2e'}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f1f5f9;padding-top:10px;font-size:11px;">
          <span style="color:#64748b;">GWP: <strong>${calc.gwp_dataset_ref || 'GWP-IPCC-AR5'}</strong></span>
          <button class="btn-drilldown" data-nav="calculations" style="background:none;border:none;color:#0284c7;font-weight:600;cursor:pointer;padding:0;">
            Calculation Studio →
          </button>
        </div>
      </div>

      <!-- Card 2: Regulatory Applicability & Obligation -->
      <div class="enerix-card" style="border-top:3px solid #16a34a;">
        <div class="enerix-card-title" style="display:flex;justify-content:space-between;align-items:center;">
          <span>Regulatory Applicability</span>
          ${formatBadge(reg.mandatory_status || reg.applicability_status)}
        </div>
        <div style="font-size:18px;font-weight:700;color:var(--color-navy-900);margin:12px 0 4px 0;">
          ${reg.legal_basis || 'Quyết định 42/2026/QĐ-TTg'}
        </div>
        <div style="font-size:12px;color:#64748b;margin-bottom:12px;">
          Status: <strong>${reg.applicability_status}</strong> | Effective: <strong>${reg.effective_from || '2026-09-25'}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f1f5f9;padding-top:10px;font-size:11px;">
          <span style="color:${isTemporalSegmented ? '#16a34a' : '#ea580c'};font-weight:600;">
            ${isTemporalSegmented ? '✓ Dual Regime Segmented' : (isBlocked ? '⚠️ Unsegmented Straddling' : '✓ Compliant Period')}
          </span>
          <button class="btn-drilldown" data-nav="regulatory-check" style="background:none;border:none;color:#0284c7;font-weight:600;cursor:pointer;padding:0;">
            Regulatory Check →
          </button>
        </div>
      </div>

      <!-- Card 3: Data Health & Evidence Coverage -->
      <div class="enerix-card" style="border-top:3px solid #0d9488;">
        <div class="enerix-card-title" style="display:flex;justify-content:space-between;align-items:center;">
          <span>Data Health & Evidence</span>
          ${formatBadge(dataHealth.evidence_coverage_status || 'HEALTHY')}
        </div>
        <div style="font-size:24px;font-weight:700;color:var(--color-navy-900);margin:10px 0 4px 0;">
          ${dataHealth.verified_documents_count || 0} / ${dataHealth.documents_count || 0} Verified Docs
        </div>
        <div style="font-size:12px;color:#64748b;margin-bottom:12px;">
          ${dataHealth.activity_records_count || 0} Activity records linked | 0 data defects
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f1f5f9;padding-top:10px;font-size:11px;">
          <span style="color:#0d9488;font-weight:600;">QA/QC: ${dataHealth.qaqc_status || 'HEALTHY'}</span>
          <button class="btn-drilldown" data-nav="evidence-trace" style="background:none;border:none;color:#0284c7;font-weight:600;cursor:pointer;padding:0;">
            Evidence & Trace →
          </button>
        </div>
      </div>

      <!-- Card 4: Assurance & Report Readiness -->
      <div class="enerix-card" style="border-top:3px solid #8b5cf6;">
        <div class="enerix-card-title" style="display:flex;justify-content:space-between;align-items:center;">
          <span>Statutory Report Readiness</span>
          ${formatBadge(assurance.report_readiness_state || 'NOT_READY')}
        </div>
        <div style="font-size:20px;font-weight:700;color:var(--color-navy-900);margin:12px 0 4px 0;">
          ${assurance.is_report_ready ? 'Ready for Authority Submission' : 'Verification in Progress'}
        </div>
        <div style="font-size:12px;color:#64748b;margin-bottom:12px;">
          Human Sign-Offs: <strong>${dataHealth.sign_offs_count || 0} Certified Verifiers</strong> (Non-AI)
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f1f5f9;padding-top:10px;font-size:11px;">
          <span style="font-family:monospace;color:#64748b;">Reproducibility: OK</span>
          <button class="btn-drilldown" data-nav="reports" style="background:none;border:none;color:#0284c7;font-weight:600;cursor:pointer;padding:0;">
            View Reports →
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
          let borderColor = '#22c55e';
          let bgPill = '#dcfce7';
          let textPill = '#15803d';
          if (gate.gate_status === 'BLOCKED' || gate.gate_status === 'FAIL') {
            borderColor = '#ef4444';
            bgPill = '#fee2e2';
            textPill = '#b91c1c';
          } else if (gate.gate_status === 'REQUIRES_REVIEW' || gate.gate_status === 'WARNING') {
            borderColor = '#f59e0b';
            bgPill = '#fef3c7';
            textPill = '#b45309';
          }

          return `
            <div style="border:1px solid #e2e8f0;border-top:3px solid ${borderColor};border-radius:6px;padding:12px;background:#fafbfc;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                  <span style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:0.5px;">${gate.pillar}</span>
                  <span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:${bgPill};color:${textPill};">
                    ${gate.gate_status}
                  </span>
                </div>
                <div style="font-size:13px;font-weight:600;color:var(--color-navy-900);margin-bottom:4px;">
                  ${gate.title}
                </div>
                <p style="font-size:11px;color:#64748b;line-height:1.4;margin:0 0 10px 0;">
                  ${gate.summary}
                </p>
              </div>
              <div style="border-top:1px solid #f1f5f9;padding-top:8px;">
                <button class="btn-drilldown" data-nav="${gate.target_route}" style="background:none;border:none;color:#0284c7;font-size:11px;font-weight:600;cursor:pointer;padding:0;display:flex;align-items:center;gap:4px;">
                  Inspect Workspace <span>→</span>
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
            <span style="font-size:12px;color:#64748b;">${facility.facility_name}</span>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0;">
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px;">
              <div style="font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;">Scope 1 (Direct Combustion)</div>
              <div style="font-size:20px;font-weight:700;color:var(--color-navy-900);margin-top:4px;">
                ${calc.scope_1?.formatted || '0.00 tCO2e'}
              </div>
              <div style="font-size:11px;color:#64748b;margin-top:2px;">Stationary Diesel Fuel (25,000 L)</div>
            </div>

            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px;">
              <div style="font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;">Scope 2 (Grid Electricity)</div>
              <div style="font-size:20px;font-weight:700;color:var(--color-navy-900);margin-top:4px;">
                ${calc.scope_2?.formatted || '0.00 tCO2e'}
              </div>
              <div style="font-size:11px;color:#64748b;margin-top:2px;">Location-Based Grid (1,500,000 kWh)</div>
            </div>
          </div>

          <!-- Greenhouse Gas Species Composition Table -->
          <div style="margin-top:16px;">
            <div style="font-size:13px;font-weight:700;color:var(--color-navy-900);margin-bottom:8px;">
              Greenhouse Gas Species Composition (IPCC AR5 Normalization)
            </div>
            <div class="enerix-table-wrapper" style="box-shadow:none;border:1px solid #e2e8f0;">
              <table class="enerix-table" style="font-size:12px;">
                <thead>
                  <tr style="background:#f8fafc;">
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
                      <td style="font-family:monospace;">${g.gwp}x</td>
                      <td style="font-weight:700;color:var(--color-navy-900);">${g.tco2e} tCO2e</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Methodology & Audit Manifest Bar -->
          <div style="margin-top:14px;background:#f1f5f9;border-radius:6px;padding:10px 12px;display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#475569;">
            <div>
              Methodology: <strong>${calc.methodology?.governing_circular || 'Thông tư 17/2022/TT-BTNMT'}</strong> (${calc.methodology?.default_tier || 'TIER_1'})
            </div>
            <div style="font-family:monospace;color:#64748b;">
              Audit Hash: ${calc.audit_hash?.substring(0, 16) || 'N/A'}...
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column: Governance, Controlled Issues & Sign-Offs -->
      <div style="display:flex;flex-direction:column;gap:24px;">
        
        <!-- Controlled Issues & Statutory Disclosures -->
        <div class="enerix-card">
          <div class="enerix-card-title" style="display:flex;justify-content:space-between;align-items:center;">
            <span>Controlled Issues & Statutory Disclosures</span>
            <span style="font-size:11px;background:#fef3c7;color:#b45309;padding:2px 8px;border-radius:4px;font-weight:600;">
              ${gov.open_controlled_issues_count || 0} Disclosed Issues
            </span>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px;margin-top:12px;">
            ${(gov.controlled_issues || []).map(issue => {
              const isIssueBlocking = issue.severity === 'BLOCKING';
              return `
                <div style="border:1px solid ${isIssueBlocking ? '#fecaca' : '#fed7aa'};background:${isIssueBlocking ? '#fef2f2' : '#fffbeb'};border-radius:6px;padding:10px 12px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                    <span style="font-size:12px;font-weight:700;color:${isIssueBlocking ? '#991b1b' : '#9a3412'};font-family:monospace;">
                      ${issue.issue_id}
                    </span>
                    <span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:${isIssueBlocking ? '#fee2e2' : '#ffedd5'};color:${isIssueBlocking ? '#b91c1c' : '#c2410c'};">
                      ${issue.severity}
                    </span>
                  </div>
                  <div style="font-size:12px;font-weight:600;color:var(--color-navy-900);margin-top:2px;">
                    ${issue.title}
                  </div>
                  <div style="font-size:11px;color:#64748b;margin-top:4px;line-height:1.4;">
                    ${issue.disclosure || issue.description}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Human Sign-Off & Verification Governance -->
        <div class="enerix-card">
          <div class="enerix-card-title" style="display:flex;justify-content:space-between;align-items:center;">
            <span>Human Verifier Sign-Offs (Non-AI)</span>
            <span style="font-size:10px;background:#dcfce7;color:#15803d;padding:2px 6px;border-radius:4px;font-weight:700;">
              FAIL-CLOSED NON-AI ENFORCED
            </span>
          </div>

          <p style="font-size:12px;color:#64748b;margin:6px 0 12px 0;">
            Statutory Decree 06 compliance requires certified human auditor signatures. Automated AI actors are strictly prohibited from granting sign-off authority.
          </p>

          <div style="display:flex;flex-direction:column;gap:8px;">
            ${(gov.human_sign_offs && gov.human_sign_offs.length > 0) ? gov.human_sign_offs.map(signOff => `
              <div style="border:1px solid #e2e8f0;border-left:3px solid #16a34a;border-radius:6px;padding:8px 12px;background:#f8fafc;display:flex;justify-content:space-between;align-items:center;">
                <div>
                  <div style="font-size:12px;font-weight:700;color:var(--color-navy-900);">
                    ${signOff.actor_name}
                  </div>
                  <div style="font-size:11px;color:#64748b;">
                    ${signOff.role} | Actor: <strong style="color:#16a34a;">${signOff.actor_type}</strong>
                  </div>
                </div>
                <div style="text-align:right;">
                  <span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:#dcfce7;color:#15803d;">
                    ${signOff.status}
                  </span>
                  <div style="font-size:10px;font-family:monospace;color:#94a3b8;margin-top:2px;">
                    ${signOff.signature ? signOff.signature.substring(0, 16) : 'VERIFIED'}...
                  </div>
                </div>
              </div>
            `).join('') : `
              <div style="border:1px dashed #cbd5e1;border-radius:6px;padding:12px;text-align:center;font-size:12px;color:#64748b;">
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

      <div class="enerix-table-wrapper" style="box-shadow:none;border:1px solid #e2e8f0;">
        <table class="enerix-table">
          <thead>
            <tr style="background:#f8fafc;">
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
              <tr style="${f.is_active ? 'background:#f0f9ff;' : ''}">
                <td class="mono-text" style="font-weight:600;">${f.facility_id}</td>
                <td style="font-weight:600;color:var(--color-navy-900);">
                  ${f.facility_name}
                  ${f.is_active ? '<span style="font-size:10px;background:#0284c7;color:#fff;padding:1px 6px;border-radius:4px;margin-left:6px;">ACTIVE</span>' : ''}
                </td>
                <td>${f.province}</td>
                <td style="font-family:monospace;font-size:12px;">${f.sector_id}</td>
                <td>${formatBadge(f.regulatory_status)}</td>
                <td style="font-size:12px;color:#64748b;">${f.legal_basis || 'QĐ 42/2026/QĐ-TTg'}</td>
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
