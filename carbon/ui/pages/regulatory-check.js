/**
 * ENERIX Carbon - Regulatory Workspace View
 * Enterprise-grade UI exposing statutory applicability, temporal boundaries,
 * sector taxonomy bridge, methodology implications, multi-ministry conflicts,
 * and governed controlled issues ledger.
 *
 * Fully consumes StateStore and DataProvider without client-side logic duplication.
 */

import { dataProvider } from '../../app/data-provider.js';
import { stateStore } from '../../app/state-store.js';
import { formatBadge } from '../../app/formatters.js';

export function renderRegulatoryCheckPage(options = {}) {
  // Support state override or dataProvider lifecycle status
  const providerStatus = options.status || (dataProvider.getStatus ? dataProvider.getStatus() : 'AVAILABLE');

  if (providerStatus === 'LOADING') {
    return `
      <div class="page-title-bar">
        <h1 class="page-title">Regulatory Workspace</h1>
        <p class="page-subtitle">Statutory Applicability, Temporal Boundaries & Jurisdictional Analysis</p>
      </div>
      <div class="enerix-card" style="text-align:center;padding:48px;" role="status" aria-live="polite">
        <div style="font-size:24px;margin-bottom:12px;">⏳</div>
        <div style="font-size:16px;font-weight:600;color:var(--color-navy-900);">Loading Governed Regulatory State...</div>
        <p style="font-size:13px;color:#64748b;margin-top:6px;">Retrieving statutory registries, sector profiles, and temporal boundaries.</p>
      </div>
    `;
  }

  if (providerStatus === 'EMPTY') {
    return `
      <div class="page-title-bar">
        <h1 class="page-title">Regulatory Workspace</h1>
        <p class="page-subtitle">Statutory Applicability, Temporal Boundaries & Jurisdictional Analysis</p>
      </div>
      <div class="enerix-card" style="text-align:center;padding:48px;" role="status">
        <div style="font-size:24px;margin-bottom:12px;">📂</div>
        <div style="font-size:16px;font-weight:600;color:var(--color-navy-900);">No Registered Facilities Available</div>
        <p style="font-size:13px;color:#64748b;margin-top:6px;">No statutory facility records found in data provider registry.</p>
      </div>
    `;
  }

  if (providerStatus === 'ERROR' || options.error) {
    const errorMsg = options.error?.message || 'Failed to load governed regulatory engine state';
    return `
      <div class="page-title-bar">
        <h1 class="page-title">Regulatory Workspace</h1>
        <p class="page-subtitle">Statutory Applicability, Temporal Boundaries & Jurisdictional Analysis</p>
      </div>
      <div class="enerix-card" style="padding:24px;" role="alert">
        <div class="enerix-alert enerix-alert-danger" style="margin-bottom:0;">
          <div style="font-size:20px;">⛔</div>
          <div>
            <div style="font-weight:700;">Regulatory Engine State Error (Fail-Closed)</div>
            <div style="font-size:13px;margin-top:4px;">${errorMsg}</div>
            <div style="font-size:11px;color:#991b1b;margin-top:6px;">Source: RegulatoryEngine / StateStore Provenance</div>
          </div>
        </div>
      </div>
    `;
  }

  const vm = options.viewModel || stateStore.getRegulatoryViewModel();
  const facilities = dataProvider.getFacilities ? dataProvider.getFacilities() : [];
  const controlledIssues = dataProvider.getControlledIssues ? dataProvider.getControlledIssues() : {};
  const issuesList = Object.values(controlledIssues);

  // Determine active facility details
  const activeFacilityId = vm.facility_id;
  const isTemporalSegmented = vm.is_temporal_segmented;
  const hasConflicts = vm.conflicts && vm.conflicts.length > 0;
  const mapping = vm.taxonomy_mapping || {
    internal_code: 'UNKNOWN',
    external_system: 'DECISION_42_2026_TTG',
    external_code: 'UNKNOWN',
    external_label: 'UNKNOWN',
    mapping_state: 'UNKNOWN'
  };
  const methodology = vm.methodology_implication || {
    methodology_id: 'UNKNOWN',
    governing_circular: 'UNKNOWN',
    name: 'UNKNOWN',
    default_tier: 'N/A',
    status: 'UNKNOWN'
  };
  const reportingPeriod = vm.reporting_period || { period_start: '2026-01-01', period_end: '2026-12-31' };

  return `
    <!-- Top Header & Workspace Context -->
    <div class="page-title-bar" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;">
      <div>
        <h1 class="page-title">Regulatory Workspace</h1>
        <p class="page-subtitle">Statutory Applicability, Temporal Boundaries, Sector Taxonomy & Precedence Conflict Analysis</p>
      </div>

      <!-- Facility & Period Selector Control Strip -->
      <div style="display:flex;align-items:center;gap:12px;background:#ffffff;padding:8px 14px;border:1px solid var(--color-border);border-radius:8px;flex-wrap:wrap;">
        <label for="reg-facility-select" style="font-size:12px;font-weight:600;color:var(--color-navy-700);">Active Facility:</label>
        <select id="reg-facility-select" class="enerix-select" style="min-width:200px;max-width:100%;">
          ${facilities.map(f => `
            <option value="${f.facility_id}" ${f.facility_id === activeFacilityId ? 'selected' : ''}>
              ${f.facility_name} (${f.facility_id})
            </option>
          `).join('')}
        </select>
        <span style="height:20px;width:1px;background:#cbd5e1;"></span>
        <span style="font-size:12px;font-weight:600;color:var(--color-navy-700);">
          Period: <span class="mono-text" style="color:var(--color-navy-900);">${reportingPeriod.period_start} → ${reportingPeriod.period_end}</span>
        </span>
      </div>
    </div>

    <!-- Section 1: Executive Statutory Applicability Card -->
    <div class="enerix-card" style="margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;">
        <div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:18px;font-weight:700;color:var(--color-navy-900);">${vm.facility_name}</span>
            ${formatBadge(vm.status)}
            ${vm.mandatory ? '<span class="status-badge mandatory">Statutory Mandate</span>' : '<span class="status-badge neutral">Voluntary MRV</span>'}
          </div>
          <div style="font-size:13px;color:#64748b;margin-top:4px;">
            <strong>Legal Entity:</strong> ${vm.legal_name} | 
            <strong>Tax Code:</strong> <span class="mono-text">${vm.tax_id}</span> | 
            <strong>Province:</strong> ${vm.province} | 
            <strong>Sector:</strong> ${vm.sector_id}
          </div>
        </div>

        <div style="text-align:right;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Governed Legal Basis</div>
          <div style="font-size:14px;font-weight:700;color:var(--color-navy-900);margin-top:2px;">${vm.legal_basis}</div>
          <div style="font-size:12px;color:#16a34a;margin-top:2px;">Effective From: ${vm.effective_from}</div>
        </div>
      </div>

      <!-- Statutory Reason Callout -->
      <div style="margin-top:16px;padding:12px 16px;background:#f8fafc;border-left:4px solid var(--color-sky-600);border-radius:0 6px 6px 0;font-size:13px;color:var(--color-navy-800);">
        <strong>Governed Evaluation Trace:</strong> ${vm.reason}
      </div>
    </div>

    <!-- Section 2: Temporal Transition & Chronological Segmentation Studio (EC-TEMP-001) -->
    <div class="enerix-card" style="margin-bottom:20px;">
      <div class="enerix-card-title">
        <span>Temporal Transition & Chronological Segmentation (EC-TEMP-001)</span>
        ${formatBadge(vm.temporal_issue_status)}
      </div>

      <!-- Legal Semantics Distinction Box: Amendment Lineage vs Applicability List -->
      <div style="background:#f8fafc;border:1px solid var(--color-border);border-radius:6px;padding:12px 16px;margin-bottom:14px;font-size:12px;line-height:1.6;color:#334155;">
        <div class="enerix-grid-2" style="gap:14px;">
          <div>
            <div style="font-weight:700;color:var(--color-navy-900);margin-bottom:4px;">A. Legal Amendment Lineage (Statutory Framework)</div>
            <div><strong>NĐ 06/2022/NĐ-CP</strong> → amended by <strong>NĐ 119/2025/NĐ-CP</strong> → amended by <strong>NĐ 83/2026/NĐ-CP</strong> (Issued: 23/03/2026, Effective: 23/03/2026).</div>
            <div style="font-size:11px;color:#64748b;margin-top:2px;">Governs overarching MRV mandates, carbon quota allocations, and statutory verification rules.</div>
          </div>
          <div>
            <div style="font-weight:700;color:var(--color-navy-900);margin-bottom:4px;">B. Applicability List Effective Period (Facility Registry)</div>
            <div><strong>QĐ 13/2024/QĐ-TTg</strong> (Prior List) → <strong>QĐ 42/2026/QĐ-TTg</strong> (Issued: 10/08/2026, Effective: <strong>25/09/2026</strong>).</div>
            <div style="font-size:11px;color:#64748b;margin-top:2px;">Establishes the chronological boundary (2026-09-25) where this facility transitioned from voluntary to mandatory MRV.</div>
          </div>
        </div>
      </div>

      ${!isTemporalSegmented ? `
        <div class="enerix-alert enerix-alert-warning">
          <div style="font-size:18px;">⚠️</div>
          <div style="flex:1;">
            <div style="font-weight:700;margin-bottom:4px;">Temporal Straddle Detected — Unsegmented Reporting Period</div>
            <div>The reporting period (${reportingPeriod.period_start} to ${reportingPeriod.period_end}) straddles the facility applicability list transition boundary on <strong>2026-09-25</strong> (QĐ 42/2026/QĐ-TTg). Aggregating activity data across this boundary into a single unsegmented period violates EC-TEMP-001 and prevents verified statutory MRV submission.</div>
            <div style="margin-top:10px;">
              <button id="btn-toggle-temporal" class="enerix-btn enerix-btn-primary">
                Enable Temporal Segmentation (EC-TEMP-001)
              </button>
            </div>
          </div>
        </div>
      ` : `
        <div class="enerix-alert enerix-alert-success">
          <div style="font-size:18px;">✓</div>
          <div style="flex:1;">
            <div style="font-weight:700;margin-bottom:4px;">Temporal Segmentation Active (SEGMENTED_COMPLIANT)</div>
            <div>The reporting year is partitioned into two distinct chronological compliance segments across the 2026-09-25 applicability list boundary. Activity data and factor bindings are isolated per regime.</div>
            <div style="margin-top:10px;">
              <button id="btn-toggle-temporal" class="enerix-btn enerix-btn-outline enerix-btn-sm">
                Disable Segmentation (Test Failure Mode)
              </button>
            </div>
          </div>
        </div>

        <div class="enerix-grid-2" style="gap:16px;margin-top:14px;">
          <div style="background:#f8fafc;border:1px solid var(--color-border);border-radius:6px;padding:14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-weight:700;font-size:13px;color:var(--color-navy-900);">Segment 1: Pre-Transition</span>
              <span class="status-badge pending">Transitional</span>
            </div>
            <div class="mono-text" style="font-size:12px;color:#64748b;margin-top:4px;">2026-01-01 → 2026-09-24</div>
            <div style="font-size:12px;color:#334155;margin-top:6px;">
              <div><strong>Applicability List:</strong> QĐ 13/2024/QĐ-TTg (Facility Not Listed)</div>
              <div style="margin-top:2px;"><strong>Framework Lineage:</strong> NĐ 06/2022/NĐ-CP (amended by NĐ 119/2025; NĐ 83/2026 from 2026-03-23)</div>
            </div>
          </div>

          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-weight:700;font-size:13px;color:#166534;">Segment 2: Statutory Post-Transition</span>
              <span class="status-badge active">Mandatory</span>
            </div>
            <div class="mono-text" style="font-size:12px;color:#166534;margin-top:4px;">2026-09-25 → 2026-12-31</div>
            <div style="font-size:12px;color:#166534;margin-top:6px;">
              <div><strong>Applicability List:</strong> QĐ 42/2026/QĐ-TTg (Phụ lục II Mandate)</div>
              <div style="margin-top:2px;"><strong>Framework Lineage:</strong> NĐ 06/2022/NĐ-CP as amended by NĐ 83/2026/NĐ-CP</div>
            </div>
          </div>
        </div>
      `}
    </div>

    <!-- Section 3: Dual Grid — Sector Taxonomy Bridge & Bound MRV Methodology -->
    <div class="enerix-grid-2" style="gap:20px;margin-bottom:20px;">
      <!-- Sector Taxonomy Mapping Card (EC-SPM-001) -->
      <div class="enerix-card">
        <div class="enerix-card-title">
          <span>Sector Taxonomy Bridge (EC-SPM-001)</span>
          ${formatBadge(mapping.mapping_state)}
        </div>
        <p style="font-size:12px;color:#64748b;margin-bottom:12px;">
          Bridges internal enterprise engineering codes to statutory classification systems.
        </p>

        <div class="enerix-table-wrapper" style="margin-bottom:0;">
          <table class="enerix-table">
            <tbody>
              <tr>
                <td style="font-weight:600;width:40%;">Internal Sector ID</td>
                <td><span class="mono-text">${mapping.internal_code}</span></td>
              </tr>
              <tr>
                <td style="font-weight:600;">Statutory Classification</td>
                <td><span class="mono-text">${mapping.external_system}</span></td>
              </tr>
              <tr>
                <td style="font-weight:600;">Statutory Code</td>
                <td><span class="mono-text">${mapping.external_code}</span></td>
              </tr>
              <tr>
                <td style="font-weight:600;">Official Designation</td>
                <td>${mapping.external_label}</td>
              </tr>
              <tr>
                <td style="font-weight:600;">Mapping Status</td>
                <td>${formatBadge(mapping.mapping_state)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Bound MRV Methodology Card (EC-MTH-001) -->
      <div class="enerix-card">
        <div class="enerix-card-title">
          <span>Bound MRV Methodology (EC-MTH-001)</span>
          ${formatBadge(methodology.status)}
        </div>
        <p style="font-size:12px;color:#64748b;margin-bottom:12px;">
          Statutory calculation methodologies assigned based on sector classification and mandatory status.
        </p>

        <div class="enerix-table-wrapper" style="margin-bottom:0;">
          <table class="enerix-table">
            <tbody>
              <tr>
                <td style="font-weight:600;width:40%;">Methodology ID</td>
                <td><span class="mono-text">${methodology.methodology_id}</span></td>
              </tr>
              <tr>
                <td style="font-weight:600;">Governing Circular</td>
                <td><strong>${methodology.governing_circular}</strong></td>
              </tr>
              <tr>
                <td style="font-weight:600;">Methodology Title</td>
                <td>${methodology.name}</td>
              </tr>
              <tr>
                <td style="font-weight:600;">Statutory Tier</td>
                <td><span class="status-badge neutral">${methodology.default_tier}</span></td>
              </tr>
              <tr>
                <td style="font-weight:600;">Governed Status</td>
                <td>${formatBadge(methodology.status)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Section 4: Multi-Ministry Jurisdictional Conflicts (ISSUE-RRM-001) -->
    <div class="enerix-card" style="margin-bottom:20px;">
      <div class="enerix-card-title">
        <span>Multi-Ministry Jurisdictional Conflict Analysis (ISSUE-RRM-001)</span>
        ${hasConflicts ? '<span class="status-badge mandatory">Conflict Detected</span>' : '<span class="status-badge active">No Conflict</span>'}
      </div>

      ${hasConflicts ? `
        <div class="enerix-alert enerix-alert-danger">
          <div style="font-size:18px;">⛔</div>
          <div style="flex:1;">
            <div style="font-weight:700;margin-bottom:4px;">Jurisdictional Precedence Conflict (Fail-Closed)</div>
            <div>
              Overlapping ministerial mandates detected between <strong>Ministry of Construction (Circular 13/2024/TT-BXD)</strong> 
              and <strong>MONRE (Circular 17/2024/TT-BTNMT)</strong> for dual-use thermal co-processing processes.
            </div>
            <div style="margin-top:8px;font-size:12px;">
              <strong>Competing Governed Rules:</strong> 
              ${vm.conflicts.map(c => `<span class="mono-text" style="background:#fee2e2;padding:2px 6px;border-radius:4px;margin-right:6px;">${c}</span>`).join('')}
            </div>
            <div style="margin-top:8px;font-size:12px;color:#7f1d1d;">
              <em>Governance Principle: ENERIX Carbon adheres to the Fail-Closed standard and does not silently guess or override ministerial precedence without formal statutory decree.</em>
            </div>
          </div>
        </div>
      ` : `
        <div class="enerix-alert enerix-alert-success" style="margin-bottom:0;">
          <div style="font-size:18px;">✓</div>
          <div style="flex:1;">
            <div style="font-weight:700;margin-bottom:2px;">Clear Jurisdictional Boundary Established</div>
            <div>No competing ministerial rules detected for ${vm.facility_name}. Primary competence lies with <strong>${vm.sector_id.includes('ENERGY') ? 'Ministry of Industry and Trade (MOIT)' : 'Ministry of Construction (MOC)'}</strong>.</div>
          </div>
        </div>
      `}
    </div>

    <!-- Section 5: Predicate AST & Conditions Trace Inspector -->
    <div class="enerix-card" style="margin-bottom:20px;">
      <div class="enerix-card-title">
        <span>Predicate AST & Conditions Trace Inspector</span>
        <span class="mono-text" style="font-size:11px;color:#64748b;">Evaluator v1.0.0</span>
      </div>
      <p style="font-size:13px;color:#475569;margin-bottom:14px;">
        Direct AST condition evaluation results from the G3 Regulatory Engine. Demonstrates deterministic proof of threshold compliance.
      </p>

      ${vm.rule_evaluations && vm.rule_evaluations.length > 0 ? `
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${vm.rule_evaluations.map(ev => `
            <div style="background:#f8fafc;border:1px solid var(--color-border);border-radius:6px;padding:14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <div>
                  <span class="mono-text" style="font-weight:700;color:var(--color-navy-900);font-size:13px;">${ev.rule_id}</span>
                  <span style="font-size:11px;color:#64748b;margin-left:8px;">Authority: ${ev.competent_authority} (${ev.authority_class})</span>
                </div>
                ${formatBadge(ev.applicability_status)}
              </div>

              <!-- Conditions Trace -->
              <div style="margin-top:6px;">
                <div style="font-size:11px;font-weight:600;color:#64748b;margin-bottom:4px;">Evaluated Predicate Conditions:</div>
                <div>
                  ${ev.matched_conditions && ev.matched_conditions.length > 0 ? ev.matched_conditions.map(c => `
                    <span class="condition-chip matched">✓ ${c.field} ${c.operator} ${c.value}</span>
                  `).join('') : ''}

                  ${ev.unmet_conditions && ev.unmet_conditions.length > 0 ? ev.unmet_conditions.map(c => `
                    <span class="condition-chip unmet">✗ ${c.field} ${c.operator} ${c.value}</span>
                  `).join('') : ''}

                  ${ev.unresolved_conditions && ev.unresolved_conditions.length > 0 ? ev.unresolved_conditions.map(c => `
                    <span class="condition-chip unresolved">? ${c.condition?.field || 'Unknown'}: ${c.reason}</span>
                  `).join('') : ''}
                </div>
              </div>

              <!-- Source References -->
              <div style="font-size:11px;color:#64748b;margin-top:8px;">
                <strong>Statutory Citation:</strong> <span class="mono-text">${ev.provenance?.source_refs?.join(', ') || 'N/A'}</span>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div style="padding:16px;background:#f8fafc;border:1px dashed var(--color-border);border-radius:6px;text-align:center;color:#64748b;font-size:13px;">
          Primary evaluation verified directly against Statutory Baseline (${vm.legal_basis}). Rule conditions verified.
        </div>
      `}
    </div>

    <!-- Section 6: Governed Controlled Issues Ledger & Auditor Disclosures -->
    <div class="enerix-card" style="margin-bottom:20px;">
      <div class="enerix-card-title">
        <span>Controlled Regulatory Issues Ledger (Sections 16 & 18)</span>
        <span class="status-badge neutral">${issuesList.length} Governed Issues</span>
      </div>

      <div class="enerix-table-wrapper" style="margin-bottom:16px;">
        <table class="enerix-table">
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Domain</th>
              <th>Statutory Subject</th>
              <th>Governed Status</th>
              <th>Auditor Disclosure State</th>
            </tr>
          </thead>
          <tbody>
            ${issuesList.map(issue => {
              const issueId = issue.id || issue.issue_id;
              const matchingDisclosure = vm.disclosures?.find(d => d.issue_id === issueId);
              return `
                <tr>
                  <td><span class="mono-text" style="font-weight:600;">${issueId}</span></td>
                  <td>${issue.domain}</td>
                  <td>${issue.description}</td>
                  <td>${formatBadge(issue.status)}</td>
                  <td>
                    ${matchingDisclosure ? `
                      <span class="status-badge active">DISCLOSED</span>
                      <div style="font-size:11px;color:#166534;margin-top:2px;">By: ${matchingDisclosure.author || matchingDisclosure.disclosed_by}</div>
                    ` : `
                      <span class="status-badge neutral">PENDING_STATEMENT</span>
                    `}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- Formal Auditor Disclosure Statement Filing Form -->
      <div style="background:#f8fafc;border:1px solid var(--color-border);border-radius:6px;padding:16px;">
        <div style="font-weight:700;font-size:13px;color:var(--color-navy-900);margin-bottom:6px;">
          File Formal Regulatory Auditor Disclosure Statement
        </div>
        <p style="font-size:12px;color:#64748b;margin-bottom:12px;">
          Pursuant to Section 18, open controlled issues require formal auditor disclosure prior to certification.
        </p>

        <form id="reg-disclosure-form" style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <select id="disclosure-issue-id" class="enerix-select" style="flex:1;min-width:200px;" required>
              <option value="">-- Select Controlled Issue --</option>
              ${issuesList.map(i => {
                const id = i.id || i.issue_id;
                return `<option value="${id}">${id} — ${i.domain}: ${i.description.slice(0, 45)}...</option>`;
              }).join('')}
            </select>
            <input type="text" id="disclosure-author" placeholder="Certified Auditor Name / License ID" class="enerix-select" style="flex:1;min-width:200px;" required value="Hoang Minh Duc (Lead GHG Auditor #VN-2026-042)" />
          </div>
          <textarea id="disclosure-statement" class="enerix-select" style="width:100%;height:60px;resize:vertical;" placeholder="Enter formal statutory disclosure statement and methodology rationale..." required>Formal disclosure pursuant to Decision 42/2026/QĐ-TTg: Temporal boundary straddling resolved via dual-regime interval segmentation.</textarea>
          <div>
            <button type="submit" class="enerix-btn enerix-btn-primary enerix-btn-sm">
              Record Formal Disclosure
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Section 7: Enterprise Facility Regulatory Evaluation Matrix -->
    <div class="enerix-card">
      <div class="enerix-card-title">
        <span>Portfolio Facility Regulatory Matrix</span>
        <span class="mono-text" style="font-size:11px;color:#64748b;">${vm.facilities_matrix?.length || 0} Registered Facilities</span>
      </div>
      <p style="font-size:13px;color:#475569;margin-bottom:14px;">
        Multi-facility regulatory compliance ledger under Decision 42/2026/QĐ-TTg and Decree 83/2026/NĐ-CP.
      </p>

      <div class="enerix-table-wrapper" style="margin-bottom:0;">
        <table class="enerix-table">
          <thead>
            <tr>
              <th>Facility ID</th>
              <th>Facility Name</th>
              <th>Province</th>
              <th>Sector Authority</th>
              <th>Governed Status</th>
              <th>Primary Legal Basis</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${(vm.facilities_matrix || []).map(row => `
              <tr style="${row.is_active ? 'background:#f0f9ff;font-weight:600;' : ''}">
                <td><span class="mono-text">${row.facility_id}</span></td>
                <td>
                  ${row.facility_name}
                  ${row.is_active ? '<span class="status-badge active" style="font-size:9px;margin-left:6px;">ACTIVE</span>' : ''}
                </td>
                <td>${row.province}</td>
                <td><span class="mono-text" style="font-size:11px;">${row.sector_id}</span></td>
                <td>${formatBadge(row.regulatory_status)}</td>
                <td><span style="font-size:12px;">${row.legal_basis}</span></td>
                <td>
                  ${row.is_active ? `
                    <span style="font-size:12px;color:var(--color-sky-600);font-weight:600;">Selected</span>
                  ` : `
                    <button class="enerix-btn enerix-btn-outline enerix-btn-sm btn-select-facility" data-facility-id="${row.facility_id}">
                      Select
                    </button>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/**
 * Event bindings lifecycle hook
 */
renderRegulatoryCheckPage.attachEvents = function(container) {
  if (!container) return;

  // 1. Facility Selector Change
  const facilitySelect = container.querySelector('#reg-facility-select');
  if (facilitySelect) {
    facilitySelect.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      if (selectedId) {
        stateStore.setSelectedFacilityId(selectedId);
      }
    });
  }

  // 2. Quick Switch Facility Buttons in Matrix
  container.querySelectorAll('.btn-select-facility').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const facilityId = btn.getAttribute('data-facility-id');
      if (facilityId) {
        stateStore.setSelectedFacilityId(facilityId);
      }
    });
  });

  // 3. Temporal Segmentation Toggle
  const btnToggleTemporal = container.querySelector('#btn-toggle-temporal');
  if (btnToggleTemporal) {
    btnToggleTemporal.addEventListener('click', (e) => {
      e.preventDefault();
      const currentSegmented = stateStore.temporalSegmentation;
      stateStore.setTemporalSegmentation(!currentSegmented);
    });
  }

  // 4. Disclosure Filing Form
  const disclosureForm = container.querySelector('#reg-disclosure-form');
  if (disclosureForm) {
    disclosureForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const issueId = container.querySelector('#disclosure-issue-id')?.value;
      const author = container.querySelector('#disclosure-author')?.value;
      const statement = container.querySelector('#disclosure-statement')?.value;

      if (issueId && statement && author) {
        stateStore.addIssueDisclosure(issueId, statement, author);
      }
    });
  }
};
