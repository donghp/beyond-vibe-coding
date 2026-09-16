/**
 * ENERIX Carbon - Evidence & Audit Trace View
 */
import { stateStore } from '../../app/state-store.js';

export function renderEvidenceTracePage() {
  const state = stateStore.getGovernedState();
  const calculation = state.calculation;
  const provenance = state.provenance;

  const traceSnapshot = {
    calculation_id: calculation?.calculation_id || 'CALC-PENDING',
    facility_id: state.facility?.facility_id || 'FAC-2026-001',
    facility_name: state.facility?.facility_name,
    reporting_year: 2026,
    total_co2e_tons: calculation?.total_co2e_tons || 0,
    scope_breakdown: calculation?.scope_breakdown || {},
    reproducibility_hash: provenance?.reproducibility_hash || 'PENDING',
    manifest_id: provenance?.manifest_id || 'PROV-PENDING',
    activity_count: state.activityRecords?.length || 0,
    evidence_documents_count: state.documents?.length || 0,
    verified_at: calculation?.timestamp || state.evaluationTimestamp
  };

  return `
    <div class="page-title-bar">
      <h1 class="page-title">Evidence & Audit Trace Ledger</h1>
      <p class="page-subtitle">Verifiable Calculation Snapshots & Document Provenance</p>
    </div>

    <div class="enerix-card" style="margin-bottom:24px;">
      <div class="enerix-card-title">Active Governed Calculation Audit Snapshot</div>
      <div style="background:#0b192c;color:#e2e8f0;padding:16px;border-radius:6px;font-family:monospace;font-size:12px;line-height:1.6;overflow-x:auto;">
${JSON.stringify(traceSnapshot, null, 2)}
      </div>
    </div>
  `;
}
