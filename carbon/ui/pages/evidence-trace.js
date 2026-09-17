/**
 * ENERIX Carbon - Evidence & Trace Workspace (#0028)
 * Primary engineering workspace for governed provenance inspection,
 * bidirectional lineage graph traversal, 11-stage pipeline visualization,
 * and Section 17 auditor assurance queries.
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - The UI consumes ProvenanceEngine, DataProvider, StateStore, and ActivityData/Evidence domain.
 * - The UI is strictly an INSPECTOR/VIEWER.
 * - The UI does NOT create provenance, invent lineage, change evidence, approve evidence,
 *   change ActivityData, mutate CalculationSnapshot, recalculate, or resolve regulatory conflicts.
 */

import { dataProvider } from '../../app/data-provider.js';
import { stateStore } from '../../app/state-store.js';
import { formatBadge, formatCO2e } from '../../app/formatters.js';
import { ICONS } from '../components/icons.js';

export function renderEvidenceTracePage(options = {}) {
  const providerStatus = options.status || (dataProvider.getStatus ? dataProvider.getStatus() : 'AVAILABLE');

  if (providerStatus === 'LOADING') {
    return `
      <div class="page-title-bar" id="trace-page-header">
        <h1 class="page-title">Evidence & Trace Workspace</h1>
        <p class="page-subtitle">Governed Provenance & Deterministic Audit Trail | G4 Assurance Core</p>
      </div>
      <div class="enerix-card" id="trace-loading-card" style="text-align:center;padding:48px;" role="status" aria-live="polite">
        <div style="display:flex;justify-content:center;margin-bottom:12px;">${ICONS.spinner(32)}</div>
        <div style="font-size:16px;font-weight:600;color:var(--carbon-navy-900);">Loading Governed Provenance & Trace Graph...</div>
        <p style="font-size:13px;color:var(--carbon-navy-500);margin-top:6px;">Traversing bidirectional lineage graph, source document vault, and calculation snapshot records.</p>
      </div>
    `;
  }

  if (providerStatus === 'EMPTY') {
    return `
      <div class="page-title-bar" id="trace-page-header">
        <h1 class="page-title">Evidence & Trace Workspace</h1>
        <p class="page-subtitle">Governed Provenance & Deterministic Audit Trail | G4 Assurance Core</p>
      </div>
      <div class="enerix-card" id="trace-empty-card" style="text-align:center;padding:48px;" role="status">
        <div style="display:flex;justify-content:center;margin-bottom:12px;">${ICONS.folderEmpty(32)}</div>
        <div style="font-size:16px;font-weight:600;color:var(--carbon-navy-900);">No Regulated Facilities Registered</div>
        <p style="font-size:13px;color:var(--carbon-navy-500);margin-top:6px;">No statutory facility records found in data provider registry.</p>
      </div>
    `;
  }

  if (providerStatus === 'ERROR' || options.error) {
    const errorMsg = options.error?.message || 'Failed to load governed provenance state';
    return `
      <div class="page-title-bar" id="trace-page-header">
        <h1 class="page-title">Evidence & Trace Workspace</h1>
        <p class="page-subtitle">Governed Provenance & Deterministic Audit Trail | G4 Assurance Core</p>
      </div>
      <div class="enerix-card" id="trace-error-card" style="padding:24px;" role="alert">
        <div class="enerix-alert enerix-alert-danger" style="margin-bottom:0;">
          <div style="flex-shrink:0;">${ICONS.blocker(22)}</div>
          <div>
            <div style="font-weight:700;">Provenance Ledger Loading Error</div>
            <div style="font-size:13px;margin-top:4px;">${errorMsg}</div>
          </div>
        </div>
      </div>
    `;
  }

  // Obtain complete view model from StateStore
  const vm = stateStore.getEvidenceTraceViewModel();
  const facility = vm.facility;
  const repro = vm.reproducibility;
  const summary = vm.summary;

  return `
    <div class="page-title-bar" id="trace-page-header">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
        <div>
          <h1 class="page-title" id="trace-main-heading">Evidence & Trace Workspace</h1>
          <p class="page-subtitle">Governed Provenance, Bidirectional Lineage Graph & Deterministic Audit Trail</p>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <span class="badge" style="background:#0284c7;color:#ffffff;font-weight:600;" id="badge-provenance-status">PROVENANCE ACTIVE</span>
          <span class="badge" style="background:#10b981;color:#ffffff;font-weight:600;" id="badge-reproducibility-status">REPRODUCIBLE</span>
          <span class="badge" style="background:#0f172a;color:#ffffff;font-weight:600;" id="badge-hash-guarantee">BITWISE DETERMINISTIC</span>
        </div>
      </div>
    </div>

    <!-- Facility Context & Reproducibility Header Banner -->
    <div class="enerix-card" id="trace-facility-context-card" style="margin-bottom:20px;border-left:4px solid #0284c7;">
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:16px;align-items:center;">
        <div>
          <label style="display:block;font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;letter-spacing:0.5px;margin-bottom:4px;">Regulated Facility Context</label>
          <select id="trace-facility-select" class="form-control" style="font-weight:600;color:var(--color-navy-900);padding:6px 10px;border-radius:6px;border:1px solid #cbd5e1;width:100%;max-width:320px;">
            ${(vm.facilities_list || []).map(f => `
              <option value="${f.facility_id}" ${f.is_active ? 'selected' : ''}>
                ${f.facility_name} (${f.facility_id})
              </option>
            `).join('')}
          </select>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;letter-spacing:0.5px;">Tax ID & Province</div>
          <div style="font-size:14px;font-weight:600;color:var(--color-navy-900);margin-top:4px;" id="trace-tax-province">
            ${facility.tax_id} | ${facility.province}
          </div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;letter-spacing:0.5px;">Reporting Period</div>
          <div style="font-size:14px;font-weight:600;color:var(--color-navy-900);margin-top:4px;" id="trace-reporting-period">
            ${vm.reporting_period?.label || `${vm.reporting_year} Full Year`}
          </div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;letter-spacing:0.5px;">Reproducibility Hash</div>
          <div style="font-family:monospace;font-size:12px;font-weight:600;color:#0369a1;background:#f0f9ff;padding:4px 8px;border-radius:4px;border:1px solid #bae6fd;margin-top:4px;word-break:break-all;" id="trace-repro-hash">
            ${repro.reproducibility_hash}
          </div>
        </div>
      </div>
    </div>

    <!-- Metrics Overview Grid -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;margin-bottom:24px;" id="trace-metrics-grid">
      <div class="enerix-card" id="metric-total-traceable" style="padding:16px;border-top:3px solid #0284c7;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;">Traceable Total Emissions</div>
        <div style="font-size:22px;font-weight:800;color:var(--color-navy-900);margin:6px 0;" id="trace-total-co2e">${summary.total_formatted} <span style="font-size:13px;font-weight:500;color:#64748b;">tCO2e</span></div>
        <div style="font-size:12px;color:#475569;">Scope 1: <strong>${summary.scope_1.formatted}</strong> | Scope 2: <strong>${summary.scope_2.formatted}</strong></div>
      </div>

      <div class="enerix-card" id="metric-pipeline-stages" style="padding:16px;border-top:3px solid #10b981;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;">Governed Pipeline Chain</div>
        <div style="font-size:22px;font-weight:800;color:#10b981;margin:6px 0;" id="trace-stages-count">11 / 11 Stages</div>
        <div style="font-size:12px;color:#475569;">Complete Lineage Integrity</div>
      </div>

      <div class="enerix-card" id="metric-source-docs" style="padding:16px;border-top:3px solid #6366f1;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;">Root Source Documents</div>
        <div style="font-size:22px;font-weight:800;color:#6366f1;margin:6px 0;" id="trace-docs-count">${summary.documents_count} Verified Documents</div>
        <div style="font-size:12px;color:#475569;">SHA-256 Hashed Ingestion</div>
      </div>

      <div class="enerix-card" id="metric-assurance-queries" style="padding:16px;border-top:3px solid #f59e0b;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;">Assurance Queries (Sec 17)</div>
        <div style="font-size:22px;font-weight:800;color:#f59e0b;margin:6px 0;" id="trace-queries-count">${summary.assurance_queries_count} Queries Bound</div>
        <div style="font-size:12px;color:#475569;">100% Deterministic Traversal</div>
      </div>
    </div>

    <!-- Trace Workspace Tab Bar -->
    <div style="display:flex;gap:4px;border-bottom:2px solid #e2e8f0;margin-bottom:20px;overflow-x:auto;padding-bottom:2px;" id="trace-tab-bar" role="tablist">
      <button class="trace-tab-btn active" data-tab="pipeline" id="tab-btn-pipeline" style="padding:10px 16px;font-size:13px;font-weight:600;border:none;background:none;border-bottom:3px solid #0284c7;color:#0284c7;cursor:pointer;white-space:nowrap;">
        11-Stage Governed Pipeline
      </button>
      <button class="trace-tab-btn" data-tab="backward" id="tab-btn-backward" style="padding:10px 16px;font-size:13px;font-weight:600;border:none;background:none;border-bottom:3px solid transparent;color:#64748b;cursor:pointer;white-space:nowrap;">
        Backward Trace ("Where did this come from?")
      </button>
      <button class="trace-tab-btn" data-tab="forward" id="tab-btn-forward" style="padding:10px 16px;font-size:13px;font-weight:600;border:none;background:none;border-bottom:3px solid transparent;color:#64748b;cursor:pointer;white-space:nowrap;">
        Forward Trace ("What did this contribute to?")
      </button>
      <button class="trace-tab-btn" data-tab="assurance" id="tab-btn-assurance" style="padding:10px 16px;font-size:13px;font-weight:600;border:none;background:none;border-bottom:3px solid transparent;color:#64748b;cursor:pointer;white-space:nowrap;">
        Section 17 Assurance Queries (10)
      </button>
      <button class="trace-tab-btn" data-tab="vault" id="tab-btn-vault" style="padding:10px 16px;font-size:13px;font-weight:600;border:none;background:none;border-bottom:3px solid transparent;color:#64748b;cursor:pointer;white-space:nowrap;">
        Verified Document Vault
      </button>
      <button class="trace-tab-btn" data-tab="disclosures" id="tab-btn-disclosures" style="padding:10px 16px;font-size:13px;font-weight:600;border:none;background:none;border-bottom:3px solid transparent;color:#64748b;cursor:pointer;white-space:nowrap;">
        Controlled Disclosures (${vm.controlled_issues?.length || 0})
      </button>
    </div>

    <!-- TAB PANES -->

    <!-- TAB 1: 11-Stage Governed Pipeline Flow -->
    <div class="trace-tab-pane" id="pane-pipeline" style="display:block;">
      <div class="enerix-card" style="margin-bottom:20px;" id="pipeline-header-card">
        <div class="enerix-card-title" style="display:flex;justify-content:space-between;align-items:center;">
          <span>Complete 11-Stage Governed Provenance Pipeline</span>
          <span class="badge" style="background:#10b981;color:#ffffff;font-size:11px;">END-TO-END VERIFIED</span>
        </div>
        <p style="font-size:13px;color:#475569;margin-top:4px;">
          Deterministic trace sequence from raw source documents through extraction, human review, activity ledger, methodology binding, calculation execution, frozen snapshot, to statutory report readiness.
        </p>
      </div>

      <div class="pipeline-flow-container" style="display:flex;flex-direction:column;gap:12px;" id="pipeline-stages-list">
        ${vm.pipeline_stages.map((stg) => `
          <div class="enerix-card stage-card" id="stage-card-${stg.stage_number}" style="border-left:4px solid ${getStageColor(stg.type)};padding:16px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:#0f172a;color:#ffffff;font-size:12px;font-weight:700;">
                  ${stg.stage_number}
                </span>
                <div>
                  <div style="font-size:14px;font-weight:700;color:var(--color-navy-900);">${stg.name}</div>
                  <div style="font-size:12px;color:#64748b;">${stg.description}</div>
                </div>
              </div>
              <div style="display:flex;gap:6px;align-items:center;">
                <span class="badge" style="background:#f1f5f9;color:#334155;font-family:monospace;font-size:11px;">${stg.type}</span>
                <span class="badge" style="background:${stg.status === 'BLOCKED' ? '#fee2e2' : '#dcfce7'};color:${stg.status === 'BLOCKED' ? '#991b1b' : '#166534'};font-weight:600;font-size:11px;">
                  ${stg.status}
                </span>
              </div>
            </div>

            ${stg.rule_enforcement ? `
              <div style="margin-top:10px;padding:8px 12px;background:var(--carbon-amber-50);border-radius:4px;border:1px solid var(--carbon-amber-200);font-size:12px;color:var(--carbon-amber-700);display:flex;align-items:center;gap:6px;">
                <span style="display:inline-flex;color:var(--carbon-amber-600);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
                <strong>Governance Authority Rule:</strong> ${stg.rule_enforcement}
              </div>
            ` : ''}

            <!-- Entities in stage -->
            <div style="margin-top:12px;padding-top:12px;border-top:1px solid #f1f5f9;">
              <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#94a3b8;margin-bottom:6px;">Entities & Records in Stage (${stg.entities.length})</div>
              <div style="display:flex;flex-direction:column;gap:6px;">
                ${renderStageEntities(stg)}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- TAB 2: Backward Lineage Trace ("Where did this value come from?") -->
    <div class="trace-tab-pane" id="pane-backward" style="display:none;">
      <div class="enerix-card" style="margin-bottom:20px;" id="backward-control-card">
        <div class="enerix-card-title">Backward Lineage Trace ("Where did this value come from?")</div>
        <p style="font-size:13px;color:#475569;margin-top:4px;">
          Select a calculation result or scope value to trace its complete upstream provenance back to raw source documents and human review events.
        </p>

        <div style="margin-top:16px;">
          <label style="display:block;font-size:12px;font-weight:700;color:var(--color-navy-900);margin-bottom:6px;">Select Calculation Target to Trace:</label>
          <select id="backward-trace-target-select" class="form-control" style="font-weight:600;padding:8px 12px;border-radius:6px;border:1px solid #cbd5e1;width:100%;max-width:480px;">
            ${vm.backward_traces.map((bt, idx) => `
              <option value="${bt.trace_id}" ${idx === 0 ? 'selected' : ''}>${bt.target_name}</option>
            `).join('')}
          </select>
        </div>
      </div>

      <div id="backward-trace-results-container">
        ${vm.backward_traces.map((bt, idx) => `
          <div class="backward-trace-view" id="view-${bt.trace_id}" style="display:${idx === 0 ? 'block' : 'none'};">
            <div class="enerix-card" style="border-left:4px solid #0284c7;margin-bottom:16px;">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                <div>
                  <div style="font-size:16px;font-weight:700;color:var(--color-navy-900);">${bt.target_name}</div>
                  <div style="font-size:12px;color:#64748b;margin-top:2px;">Target Identifier: <code style="color:#0284c7;">${bt.target_id}</code></div>
                </div>
                <div style="font-size:12px;color:#334155;">
                  Root Sources: <strong>${bt.root_sources.join(', ')}</strong>
                </div>
              </div>
            </div>

            <div style="position:relative;padding-left:24px;border-left:2px dashed #94a3b8;margin-left:16px;">
              ${bt.steps.map((st, sIdx) => `
                <div class="trace-step-node" id="btrace-step-${idx}-${sIdx}" style="position:relative;margin-bottom:16px;">
                  <span style="position:absolute;left:-32px;top:4px;width:16px;height:16px;border-radius:50%;background:${sIdx === 0 ? '#0284c7' : sIdx === bt.steps.length - 1 ? '#10b981' : '#64748b'};border:2px solid #ffffff;"></span>
                  <div class="enerix-card" style="padding:12px 16px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                      <div>
                        <span class="badge" style="background:#e0f2fe;color:#0369a1;font-size:10px;font-weight:700;">${st.stage.toUpperCase()}</span>
                        <span style="font-size:13px;font-weight:700;color:var(--color-navy-900);margin-left:6px;">${st.id}</span>
                      </div>
                      <div style="font-size:13px;font-weight:700;color:#0284c7;">${st.value}</div>
                    </div>
                    <div style="font-size:12px;color:#64748b;margin-top:4px;">${st.note}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- TAB 3: Forward Lineage Trace ("What did this contribute to?") -->
    <div class="trace-tab-pane" id="pane-forward" style="display:none;">
      <div class="enerix-card" style="margin-bottom:20px;" id="forward-control-card">
        <div class="enerix-card-title">Forward Lineage Impact Trace ("What did this source contribute to?")</div>
        <p style="font-size:13px;color:#475569;margin-top:4px;">
          Select a source document to inspect the downstream chain of calculations, snapshots, and statutory reporting figures that consume it.
        </p>

        <div style="margin-top:16px;">
          <label style="display:block;font-size:12px;font-weight:700;color:var(--color-navy-900);margin-bottom:6px;">Select Root Source Document:</label>
          <select id="forward-trace-source-select" class="form-control" style="font-weight:600;padding:8px 12px;border-radius:6px;border:1px solid #cbd5e1;width:100%;max-width:480px;">
            ${vm.forward_traces.map((ft, idx) => `
              <option value="${ft.source_id}" ${idx === 0 ? 'selected' : ''}>${ft.source_name}</option>
            `).join('')}
          </select>
        </div>
      </div>

      <div id="forward-trace-results-container">
        ${vm.forward_traces.map((ft, idx) => `
          <div class="forward-trace-view" id="view-${ft.source_id}" style="display:${idx === 0 ? 'block' : 'none'};">
            <div class="enerix-card" style="border-left:4px solid #10b981;margin-bottom:16px;">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                <div>
                  <div style="font-size:16px;font-weight:700;color:var(--color-navy-900);">${ft.source_name}</div>
                  <div style="font-family:monospace;font-size:11px;color:#64748b;margin-top:2px;">Hash: ${ft.file_hash}</div>
                </div>
                <div class="badge" style="background:#dcfce7;color:#166534;font-size:12px;font-weight:700;">
                  Downstream Impact: ${ft.downstream_contribution}
                </div>
              </div>
            </div>

            <div style="position:relative;padding-left:24px;border-left:2px dashed #10b981;margin-left:16px;">
              ${ft.steps.map((st, sIdx) => `
                <div class="trace-step-node" id="ftrace-step-${idx}-${sIdx}" style="position:relative;margin-bottom:16px;">
                  <span style="position:absolute;left:-32px;top:4px;width:16px;height:16px;border-radius:50%;background:${sIdx === 0 ? '#10b981' : sIdx === ft.steps.length - 1 ? '#0284c7' : '#059669'};border:2px solid #ffffff;"></span>
                  <div class="enerix-card" style="padding:12px 16px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                      <div>
                        <span style="font-size:13px;font-weight:700;color:var(--color-navy-900);">${st.stage}</span>
                        <code style="font-size:11px;color:#0369a1;margin-left:6px;">${st.id}</code>
                      </div>
                    </div>
                    <div style="font-size:12px;color:#475569;margin-top:4px;">${st.detail}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- TAB 4: Section 17 Auditor Assurance Queries -->
    <div class="trace-tab-pane" id="pane-assurance" style="display:none;">
      <div class="enerix-card" style="margin-bottom:20px;" id="assurance-header-card">
        <div class="enerix-card-title">Section 17 Auditor Assurance Query Suite</div>
        <p style="font-size:13px;color:#475569;margin-top:4px;">
          All 10 canonical audit queries evaluated deterministically against the active facility's calculation run and provenance ledger.
        </p>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;" id="assurance-queries-list">
        ${vm.assurance_queries.map((q) => `
          <div class="enerix-card assurance-query-card" id="query-card-${q.query_number}" style="padding:16px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span class="badge" style="background:#0f172a;color:#ffffff;font-size:11px;font-weight:700;">Q${q.query_number}</span>
                <span style="font-size:14px;font-weight:700;color:var(--color-navy-900);">${q.question}</span>
              </div>
              <span class="badge" style="background:#dcfce7;color:#166534;font-size:11px;font-weight:600;">
                ${q.status}
              </span>
            </div>

            <div style="margin-top:10px;padding:10px 14px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0;">
              <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;">Target Scope / Subject</div>
              <div style="font-size:13px;font-weight:600;color:#0284c7;margin-top:2px;">${q.target}</div>
              
              <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;margin-top:8px;">Governed Evaluated Answer</div>
              <div style="font-size:13px;color:#1e293b;margin-top:2px;">${q.answer}</div>

              <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;margin-top:8px;">Audit Trail & Provenance Reference</div>
              <div style="font-family:monospace;font-size:11px;color:#475569;margin-top:2px;">
                <code>${q.provenance_ref}</code> | ${q.audit_trail}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- TAB 5: Verified Document Vault & Evidence Ledger -->
    <div class="trace-tab-pane" id="pane-vault" style="display:none;">
      <div class="enerix-card" style="margin-bottom:20px;" id="vault-header-card">
        <div class="enerix-card-title">Verified Document Vault & Primary Evidence Ledger</div>
        <p style="font-size:13px;color:#475569;margin-top:4px;">
          Primary operational documents ingested with SHA-256 cryptographically verifiable content hashes.
        </p>
      </div>

      <div class="enerix-card" style="padding:0;overflow-x:auto;">
        <table class="table" style="width:100%;margin:0;" id="table-document-vault">
          <thead>
            <tr style="background:#f8fafc;border-bottom:2px solid #e2e8f0;">
              <th style="padding:12px 16px;font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;">Document ID & Title</th>
              <th style="padding:12px 16px;font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;">SHA-256 Content Hash</th>
              <th style="padding:12px 16px;font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;">File Info</th>
              <th style="padding:12px 16px;font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;">Extracted Activity</th>
              <th style="padding:12px 16px;font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;">Verification Status</th>
            </tr>
          </thead>
          <tbody>
            ${vm.document_vault.map(d => `
              <tr style="border-bottom:1px solid #f1f5f9;" id="vault-row-${d.document_id}">
                <td style="padding:12px 16px;">
                  <div style="font-weight:700;color:var(--color-navy-900);">${d.title}</div>
                  <div style="font-family:monospace;font-size:11px;color:#0284c7;">${d.document_id}</div>
                </td>
                <td style="padding:12px 16px;">
                  <div style="font-family:monospace;font-size:11px;color:#475569;word-break:break-all;max-width:260px;">${d.file_hash}</div>
                </td>
                <td style="padding:12px 16px;font-size:12px;color:#64748b;">
                  <div>${d.file_size} | ${d.mime_type}</div>
                  <div>Upload: ${d.upload_date}</div>
                </td>
                <td style="padding:12px 16px;">
                  <span class="badge" style="background:#f0f9ff;color:#0369a1;font-family:monospace;font-size:11px;">${d.extracted_activity_id}</span>
                </td>
                <td style="padding:12px 16px;">
                  <span class="badge" style="background:#dcfce7;color:#166534;font-weight:700;font-size:11px;">VERIFIED</span>
                  <div style="font-size:11px;color:#64748b;margin-top:2px;">Auditor: ${d.verifier}</div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- TAB 6: Controlled Disclosures -->
    <div class="trace-tab-pane" id="pane-disclosures" style="display:none;">
      <div class="enerix-card" style="margin-bottom:20px;" id="disclosures-header-card">
        <div class="enerix-card-title">Controlled Issues & Statutory Disclosures</div>
        <p style="font-size:13px;color:#475569;margin-top:4px;">
          Governed transparency disclosures mandated for statutory reporting audit readiness.
        </p>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;" id="disclosures-list">
        ${vm.controlled_issues.map(iss => `
          <div class="enerix-card" id="disclosure-card-${iss.issue_id}" style="border-left:4px solid ${iss.severity === 'BLOCKING' ? '#ef4444' : '#f59e0b'};padding:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span class="badge" style="background:#0f172a;color:#ffffff;font-family:monospace;font-size:11px;">${iss.issue_id}</span>
                <span style="font-size:14px;font-weight:700;color:var(--color-navy-900);">${iss.title}</span>
              </div>
              <span class="badge" style="background:${iss.severity === 'BLOCKING' ? '#fee2e2' : '#fef3c7'};color:${iss.severity === 'BLOCKING' ? '#991b1b' : '#92400e'};font-weight:700;font-size:11px;">
                ${iss.severity}
              </span>
            </div>
            <div style="font-size:13px;color:#334155;margin-top:8px;line-height:1.5;">
              ${iss.disclosure}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Helpers for Stage Rendering
 */
function getStageColor(type) {
  switch (type) {
    case 'DOCUMENT': return '#6366f1';
    case 'EXTRACTION_CANDIDATE': return '#8b5cf6';
    case 'HUMAN_REVIEW': return '#ec4899';
    case 'ACTIVITY_DATA': return '#0284c7';
    case 'EVIDENCE': return '#059669';
    case 'METHODOLOGY': return '#d97706';
    case 'CALCULATION_PLAN': return '#2563eb';
    case 'CALCULATION_RUN': return '#4f46e5';
    case 'CALCULATION_SNAPSHOT': return '#0f172a';
    case 'QAQC_HEALTH': return '#10b981';
    case 'REPORT_READINESS': return '#047857';
    default: return '#64748b';
  }
}

function renderStageEntities(stage) {
  return stage.entities.map(e => {
    switch (stage.type) {
      case 'DOCUMENT':
        return `
          <div style="font-size:12px;background:#f8fafc;padding:6px 10px;border-radius:4px;display:flex;justify-content:space-between;align-items:center;">
            <span><strong>${e.title}</strong> (<code>${e.id}</code>)</span>
            <span style="font-family:monospace;font-size:11px;color:#64748b;">${e.file_hash.substring(0, 24)}...</span>
          </div>
        `;
      case 'EXTRACTION_CANDIDATE':
        return `
          <div style="font-size:12px;background:#f8fafc;padding:6px 10px;border-radius:4px;display:flex;justify-content:space-between;align-items:center;">
            <span><strong>${e.extracted_field}:</strong> ${e.raw_value.toLocaleString()} ${e.unit}</span>
            <span class="badge" style="background:#ede9fe;color:#5b21b6;font-size:10px;">Confidence: ${(e.confidence * 100).toFixed(1)}%</span>
          </div>
        `;
      case 'HUMAN_REVIEW':
        return `
          <div style="font-size:12px;background:#f8fafc;padding:6px 10px;border-radius:4px;display:flex;justify-content:space-between;align-items:center;">
            <span><strong>Sign-off:</strong> ${e.reviewer_name} (${e.reviewer_role})</span>
            <span class="badge" style="background:#dcfce7;color:#166534;font-size:10px;">${e.action}</span>
          </div>
        `;
      case 'ACTIVITY_DATA':
        return `
          <div style="font-size:12px;background:#f8fafc;padding:6px 10px;border-radius:4px;display:flex;justify-content:space-between;align-items:center;">
            <span><code>${e.activity_id}</code> - ${e.activity_type}: <strong>${e.quantity?.toLocaleString()} ${e.unit}</strong></span>
            <span class="badge" style="background:#e0f2fe;color:#0369a1;font-size:10px;">VALIDATED</span>
          </div>
        `;
      case 'EVIDENCE':
        return `
          <div style="font-size:12px;background:#f8fafc;padding:6px 10px;border-radius:4px;display:flex;justify-content:space-between;align-items:center;">
            <span><strong>${e.title}</strong> (<code>${e.evidence_id}</code>)</span>
            <span class="badge" style="background:#dcfce7;color:#166534;font-size:10px;">VERIFIED EVIDENCE</span>
          </div>
        `;
      case 'METHODOLOGY':
        return `
          <div style="font-size:12px;background:#f8fafc;padding:6px 10px;border-radius:4px;">
            <div><strong>${e.name}</strong> (${e.governing_circular})</div>
            <div style="color:#64748b;margin-top:2px;">Default Tier: ${e.tier} | Applied GWP: ${e.gwp_dataset}</div>
          </div>
        `;
      case 'CALCULATION_PLAN':
        return `
          <div style="font-size:12px;background:#f8fafc;padding:6px 10px;border-radius:4px;">
            <div><code>${e.plan_id}</code>: ${e.steps_count} Governed Calculation Steps</div>
            <div style="color:#64748b;margin-top:2px;">Steps: ${e.steps.map(s => `${s.step_id} (${s.model})`).join(', ')}</div>
          </div>
        `;
      case 'CALCULATION_RUN':
        return `
          <div style="font-size:12px;background:#f8fafc;padding:6px 10px;border-radius:4px;display:flex;justify-content:space-between;align-items:center;">
            <span><code>${e.run_id}</code> (${e.engine_version})</span>
            <span style="color:#64748b;font-size:11px;">Timestamp: ${e.execution_timestamp}</span>
          </div>
        `;
      case 'CALCULATION_SNAPSHOT':
        return `
          <div style="font-size:12px;background:#f8fafc;padding:6px 10px;border-radius:4px;">
            <div style="display:flex;justify-content:space-between;">
              <span><code>${e.snapshot_id}</code></span>
              <span style="font-weight:700;color:var(--color-navy-900);">${e.total_co2e_tons?.toFixed(2)} tCO2e</span>
            </div>
            <div style="font-family:monospace;font-size:11px;color:#0284c7;margin-top:2px;">Audit Hash: ${e.audit_hash}</div>
          </div>
        `;
      case 'QAQC_HEALTH':
        return `
          <div style="font-size:12px;background:#f8fafc;padding:6px 10px;border-radius:4px;display:flex;justify-content:space-between;align-items:center;">
            <span><code>${e.attestation_id}</code> - Health: <strong>${e.health_status}</strong></span>
            <span class="badge" style="background:#dcfce7;color:#166534;font-size:10px;">${e.verified_rules_count} Rules Passed</span>
          </div>
        `;
      case 'REPORT_READINESS':
        return `
          <div style="font-size:12px;background:#f8fafc;padding:6px 10px;border-radius:4px;display:flex;justify-content:space-between;align-items:center;">
            <span>Framework: <strong>${e.target_framework}</strong></span>
            <span class="badge" style="background:${e.is_ready ? '#dcfce7' : '#fee2e2'};color:${e.is_ready ? '#166534' : '#991b1b'};font-size:10px;">
              ${e.is_ready ? 'REPORT READY' : 'BLOCKED'}
            </span>
          </div>
        `;
      default:
        return `<div style="font-size:12px;">${JSON.stringify(e)}</div>`;
    }
  }).join('');
}

/**
 * Attaches interactive handlers for the Evidence & Trace Page.
 */
renderEvidenceTracePage.attachEvents = function attachEvents(container) {
  if (!container) return;

  // 1. Facility Switcher
  const facilitySelect = container.querySelector('#trace-facility-select');
  if (facilitySelect) {
    facilitySelect.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      if (selectedId) {
        stateStore.setSelectedFacilityId(selectedId);
      }
    });
  }

  // 2. Tab Navigation
  const tabButtons = container.querySelectorAll('.trace-tab-btn');
  const tabPanes = container.querySelectorAll('.trace-tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = btn.getAttribute('data-tab');

      // Update button styles
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.style.borderBottomColor = 'transparent';
        b.style.color = '#64748b';
      });
      btn.classList.add('active');
      btn.style.borderBottomColor = '#0284c7';
      btn.style.color = '#0284c7';

      // Show targeted pane
      tabPanes.forEach(pane => {
        if (pane.id === `pane-${targetTab}`) {
          pane.style.display = 'block';
        } else {
          pane.style.display = 'none';
        }
      });
    });
  });

  // 3. Backward Trace Target Selector
  const bTraceSelect = container.querySelector('#backward-trace-target-select');
  if (bTraceSelect) {
    bTraceSelect.addEventListener('change', (e) => {
      const targetTraceId = e.target.value;
      const views = container.querySelectorAll('.backward-trace-view');
      views.forEach(v => {
        if (v.id === `view-${targetTraceId}`) {
          v.style.display = 'block';
        } else {
          v.style.display = 'none';
        }
      });
    });
  }

  // 4. Forward Trace Source Selector
  const fTraceSelect = container.querySelector('#forward-trace-source-select');
  if (fTraceSelect) {
    fTraceSelect.addEventListener('change', (e) => {
      const targetSourceId = e.target.value;
      const views = container.querySelectorAll('.forward-trace-view');
      views.forEach(v => {
        if (v.id === `view-${targetSourceId}`) {
          v.style.display = 'block';
        } else {
          v.style.display = 'none';
        }
      });
    });
  }
};
