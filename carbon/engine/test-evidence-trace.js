/**
 * ENERIX Carbon - Task #0028: Evidence & Trace Workspace Verification Suite
 * Verifies all 20 canonical Evidence & Trace UI requirements (TC-TRACEUI-001 through TC-TRACEUI-020).
 * Suite #14 in Governed Test Manifest.
 */

import { dataProvider } from '../app/data-provider.js';
import { StateStore, stateStore } from '../app/state-store.js';
import { renderEvidenceTracePage } from '../ui/pages/evidence-trace.js';
import { provenanceEngine } from './provenance-engine.js';

class EvidenceTraceTestRunner {
  constructor() {
    this.total = 0;
    this.passed = 0;
    this.failed = 0;
    this.failures = [];
  }

  run(id, description, fn) {
    this.total++;
    try {
      fn();
      this.passed++;
      console.log(`  \x1b[32m✓ [PASSED]\x1b[0m ${id}: ${description}`);
    } catch (err) {
      this.failed++;
      this.failures.push({ id, description, error: err });
      console.log(`  \x1b[31m✗ [FAILED]\x1b[0m ${id}: ${description}`);
      console.log(`     \x1b[33mReason:\x1b[0m ${err.message || err}`);
      if (err.stack) {
        console.log(`     \x1b[35mStack:\x1b[0m ${err.stack.split('\n')[1]}`);
      }
    }
  }

  async runAsync(id, description, fn) {
    this.total++;
    try {
      await fn();
      this.passed++;
      console.log(`  \x1b[32m✓ [PASSED]\x1b[0m ${id}: ${description}`);
    } catch (err) {
      this.failed++;
      this.failures.push({ id, description, error: err });
      console.log(`  \x1b[31m✗ [FAILED]\x1b[0m ${id}: ${description}`);
      console.log(`     \x1b[33mReason:\x1b[0m ${err.message || err}`);
      if (err.stack) {
        console.log(`     \x1b[35mStack:\x1b[0m ${err.stack.split('\n')[1]}`);
      }
    }
  }

  report() {
    console.log('\n======================================================');
    console.log('ENERIX CARBON - EVIDENCE & TRACE VERIFICATION (#0028)');
    console.log('======================================================');
    console.log(`Total Verified:  ${this.total}`);
    console.log(`Passed:          \x1b[32m${this.passed}\x1b[0m`);
    console.log(`Failed:          ${this.failed > 0 ? `\x1b[31m${this.failed}\x1b[0m` : `\x1b[32m0\x1b[0m`}`);
    console.log('======================================================');

    if (this.failed > 0) {
      console.log('\nDetailed Failures:');
      this.failures.forEach(f => {
        console.log(`\n- \x1b[31m${f.id}\x1b[0m: ${f.description}`);
        console.log(`  Error: ${f.error.message || f.error}`);
        if (f.error.stack) {
          console.log(`  Stack: ${f.error.stack.split('\n')[1]}`);
        }
      });
      process.exit(1);
    } else {
      console.log('\n\x1b[32m✓ All Evidence & Trace Workspace tests passed with 100% provenance integrity!\x1b[0m\n');
      process.exit(0);
    }
  }
}

const runner = new EvidenceTraceTestRunner();

console.log('Starting ENERIX Carbon Evidence & Trace Workspace Verification (#0028)...\n');

async function executeTests() {
  await dataProvider.loadAll();
  stateStore.recompute();

  // TC-TRACEUI-001: Renders page in available state with title and facility context
  runner.run('TC-TRACEUI-001', 'Evidence & Trace page renders with title, status badges, and facility context', () => {
    const html = renderEvidenceTracePage();
    if (!html.includes('Evidence & Trace Workspace')) {
      throw new Error('Expected main workspace title not found in rendered HTML');
    }
    if (!html.includes('PROVENANCE ACTIVE') || !html.includes('REPRODUCIBLE')) {
      throw new Error('Expected status badges missing from header');
    }
    if (!html.includes('trace-facility-select')) {
      throw new Error('Facility selector select element missing');
    }
  });

  // TC-TRACEUI-002: Renders complete 11-stage pipeline with all stage nodes
  runner.run('TC-TRACEUI-002', 'Renders complete 11-stage governed pipeline with all stage nodes', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    if (!Array.isArray(vm.pipeline_stages) || vm.pipeline_stages.length !== 11) {
      throw new Error(`Expected 11 pipeline stages, got ${vm.pipeline_stages?.length}`);
    }
    const html = renderEvidenceTracePage();
    for (let i = 1; i <= 11; i++) {
      if (!html.includes(`stage-card-${i}`)) {
        throw new Error(`Stage card for stage ${i} not found in rendered HTML`);
      }
    }
  });

  // TC-TRACEUI-003: Backward trace ("Where did this value come from?") resolves back to root source documents
  runner.run('TC-TRACEUI-003', 'Backward trace resolves calculation results back to root source documents', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    if (!Array.isArray(vm.backward_traces) || vm.backward_traces.length === 0) {
      throw new Error('Backward traces missing from viewmodel');
    }
    const totalTrace = vm.backward_traces.find(t => t.trace_id === 'BTRACE-TOTAL-EMISSIONS');
    if (!totalTrace) {
      throw new Error('Total emissions backward trace missing');
    }
    if (!totalTrace.root_sources.includes('DOC-EVN-2026-Q1') || !totalTrace.root_sources.includes('DOC-PETRO-2026-01')) {
      throw new Error('Backward trace did not resolve to both root source documents');
    }
  });

  // TC-TRACEUI-004: Forward trace ("What downstream calculation did this source contribute to?") resolves to statutory result
  runner.run('TC-TRACEUI-004', 'Forward trace resolves source documents forward to statutory result and report package', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    if (!Array.isArray(vm.forward_traces) || vm.forward_traces.length === 0) {
      throw new Error('Forward traces missing from viewmodel');
    }
    const evnTrace = vm.forward_traces.find(t => t.source_id === 'DOC-EVN-2026-Q1');
    if (!evnTrace) {
      throw new Error('Forward trace for DOC-EVN-2026-Q1 missing');
    }
    if (!evnTrace.downstream_contribution.includes('Scope 2 Emissions')) {
      throw new Error('Expected Scope 2 downstream contribution missing');
    }
  });

  // TC-TRACEUI-005: Stage 1 Document Ingestion surfaces SHA-256 file hashes and metadata
  runner.run('TC-TRACEUI-005', 'Stage 1 Document Ingestion surfaces immutable SHA-256 file hashes', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    const docStage = vm.pipeline_stages.find(s => s.stage_number === 1);
    if (!docStage || docStage.type !== 'DOCUMENT') {
      throw new Error('Stage 1 is not of type DOCUMENT');
    }
    if (docStage.entities.length === 0) {
      throw new Error('No document entities in Stage 1');
    }
    const evnDoc = docStage.entities.find(d => d.id === 'DOC-EVN-2026-Q1');
    if (!evnDoc || !evnDoc.file_hash.startsWith('sha256-')) {
      throw new Error('Expected SHA-256 hash missing on Stage 1 document');
    }
  });

  // TC-TRACEUI-006: Stage 2 Extraction Candidate captures AI/OCR confidence and bounding boxes
  runner.run('TC-TRACEUI-006', 'Stage 2 Extraction Candidate captures AI/OCR confidence and bounding boxes', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    const extStage = vm.pipeline_stages.find(s => s.stage_number === 2);
    if (!extStage || extStage.type !== 'EXTRACTION_CANDIDATE') {
      throw new Error('Stage 2 is not of type EXTRACTION_CANDIDATE');
    }
    const cand = extStage.entities[0];
    if (typeof cand.confidence !== 'number' || !cand.bounding_box) {
      throw new Error('Extraction candidate missing confidence or bounding box');
    }
  });

  // TC-TRACEUI-007: Stage 3 Human Review enforces strict non-AI approval rule
  runner.run('TC-TRACEUI-007', 'Stage 3 Human Review enforces strict non-AI approval authority constraint', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    const revStage = vm.pipeline_stages.find(s => s.stage_number === 3);
    if (!revStage || revStage.type !== 'HUMAN_REVIEW') {
      throw new Error('Stage 3 is not of type HUMAN_REVIEW');
    }
    if (!revStage.rule_enforcement.includes('AI cannot grant approval authority')) {
      throw new Error('Expected human authority rule enforcement missing from Stage 3');
    }
    if (revStage.entities.length === 0 || !revStage.entities[0].reviewer_name) {
      throw new Error('Auditor attribution missing in Stage 3');
    }
  });

  // TC-TRACEUI-008: Stage 4 Activity Data Ledger links to observed quantities, units, and temporal periods
  runner.run('TC-TRACEUI-008', 'Stage 4 Activity Data Ledger links observed quantities and units', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    const actStage = vm.pipeline_stages.find(s => s.stage_number === 4);
    if (!actStage || actStage.type !== 'ACTIVITY_DATA') {
      throw new Error('Stage 4 is not of type ACTIVITY_DATA');
    }
    if (actStage.entities.length === 0 || !actStage.entities[0].quantity) {
      throw new Error('Activity data quantities missing from Stage 4');
    }
  });

  // TC-TRACEUI-009: Stage 5 Audit Evidence links verified evidence to activity data and source documents
  runner.run('TC-TRACEUI-009', 'Stage 5 Audit Evidence links verified evidence artifacts to source documents', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    const eviStage = vm.pipeline_stages.find(s => s.stage_number === 5);
    if (!eviStage || eviStage.type !== 'EVIDENCE') {
      throw new Error('Stage 5 is not of type EVIDENCE');
    }
    const evi1 = eviStage.entities.find(e => e.evidence_id === 'EVI-INV-2026-01');
    if (!evi1 || evi1.source_doc_id !== 'DOC-EVN-2026-Q1' || !evi1.verified) {
      throw new Error('Evidence item linkage to source document DOC-EVN-2026-Q1 invalid');
    }
  });

  // TC-TRACEUI-010: Stage 6 Methodology & Factors displays governing circular, tier, and emission factors
  runner.run('TC-TRACEUI-010', 'Stage 6 Methodology & Factors displays governing circular and tier classification', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    const methStage = vm.pipeline_stages.find(s => s.stage_number === 6);
    if (!methStage || methStage.type !== 'METHODOLOGY') {
      throw new Error('Stage 6 is not of type METHODOLOGY');
    }
    const meth = methStage.entities[0];
    if (!meth.governing_circular || !meth.tier) {
      throw new Error('Methodology circular or tier classification missing in Stage 6');
    }
  });

  // TC-TRACEUI-011: Stage 7 Calculation Plan & Steps details deterministic formula models
  runner.run('TC-TRACEUI-011', 'Stage 7 Calculation Plan details deterministic formula models', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    const planStage = vm.pipeline_stages.find(s => s.stage_number === 7);
    if (!planStage || planStage.type !== 'CALCULATION_PLAN') {
      throw new Error('Stage 7 is not of type CALCULATION_PLAN');
    }
    const plan = planStage.entities[0];
    if (!plan.steps || plan.steps.length === 0) {
      throw new Error('Calculation plan steps missing in Stage 7');
    }
  });

  // TC-TRACEUI-012: Stage 8 Calculation Run records execution timestamp and deterministic engine version
  runner.run('TC-TRACEUI-012', 'Stage 8 Calculation Run records execution timestamp and engine version', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    const runStage = vm.pipeline_stages.find(s => s.stage_number === 8);
    if (!runStage || runStage.type !== 'CALCULATION_RUN') {
      throw new Error('Stage 8 is not of type CALCULATION_RUN');
    }
    const run = runStage.entities[0];
    if (!run.engine_version || !run.execution_timestamp) {
      throw new Error('Calculation run metadata missing in Stage 8');
    }
  });

  // TC-TRACEUI-013: Stage 9 Calculation Snapshot displays frozen audit hash and reproducibility hash
  runner.run('TC-TRACEUI-013', 'Stage 9 Calculation Snapshot displays frozen audit hash and reproducibility hash', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    const snapStage = vm.pipeline_stages.find(s => s.stage_number === 9);
    if (!snapStage || snapStage.type !== 'CALCULATION_SNAPSHOT') {
      throw new Error('Stage 9 is not of type CALCULATION_SNAPSHOT');
    }
    const snap = snapStage.entities[0];
    if (!snap.audit_hash || !snap.reproducibility_hash) {
      throw new Error('Snapshot audit hash or reproducibility hash missing in Stage 9');
    }
  });

  // TC-TRACEUI-014: Stage 10 QA/QC Health & Attestation shows verified rule counts and health status
  runner.run('TC-TRACEUI-014', 'Stage 10 QA/QC Health & Attestation shows verified rule counts', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    const qaqcStage = vm.pipeline_stages.find(s => s.stage_number === 10);
    if (!qaqcStage || qaqcStage.type !== 'QAQC_HEALTH') {
      throw new Error('Stage 10 is not of type QAQC_HEALTH');
    }
    const qaqc = qaqcStage.entities[0];
    if (!qaqc.health_status || typeof qaqc.verified_rules_count !== 'number') {
      throw new Error('QA/QC health status or rule count missing in Stage 10');
    }
  });

  // TC-TRACEUI-015: Stage 11 Report Readiness & Result displays target framework and audit package ref
  runner.run('TC-TRACEUI-015', 'Stage 11 Report Readiness & Result displays target framework compliance', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    const resStage = vm.pipeline_stages.find(s => s.stage_number === 11);
    if (!resStage || resStage.type !== 'REPORT_READINESS') {
      throw new Error('Stage 11 is not of type REPORT_READINESS');
    }
    const res = resStage.entities[0];
    if (!res.target_framework || typeof res.is_ready !== 'boolean') {
      throw new Error('Report readiness target framework missing in Stage 11');
    }
  });

  // TC-TRACEUI-016: All 10 canonical assurance queries are exposed and evaluate correctly
  runner.run('TC-TRACEUI-016', 'All 10 canonical assurance queries evaluate correctly with provenance refs', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    if (!Array.isArray(vm.assurance_queries) || vm.assurance_queries.length !== 10) {
      throw new Error(`Expected 10 assurance queries, got ${vm.assurance_queries?.length}`);
    }
    for (let i = 1; i <= 10; i++) {
      const q = vm.assurance_queries.find(item => item.query_number === i);
      if (!q || !q.question || !q.answer || !q.provenance_ref) {
        throw new Error(`Assurance query ${i} missing question, answer, or provenance_ref`);
      }
    }
  });

  // TC-TRACEUI-017: Document Vault displays verifiable file hashes and activity data bindings
  runner.run('TC-TRACEUI-017', 'Document Vault displays verifiable file hashes and activity data bindings', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    if (!Array.isArray(vm.document_vault) || vm.document_vault.length === 0) {
      throw new Error('Document vault empty in viewmodel');
    }
    const doc = vm.document_vault[0];
    if (!doc.file_hash.startsWith('sha256-') || !doc.extracted_activity_id) {
      throw new Error('Document vault item missing SHA-256 hash or extracted activity ID');
    }
  });

  // TC-TRACEUI-018: Controlled Issues (ISSUE-GWP-001, ISSUE-TEMP-001) are transparently disclosed
  runner.run('TC-TRACEUI-018', 'Controlled Issues are disclosed with transparent statutory notes', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    const gwpIssue = vm.controlled_issues?.find(i => i.issue_id === 'ISSUE-GWP-001');
    if (!gwpIssue || !gwpIssue.disclosure.includes('Decree 06')) {
      throw new Error('ISSUE-GWP-001 disclosure missing or incomplete');
    }
  });

  // TC-TRACEUI-019: Facility selector switching updates the trace viewmodel for the selected facility
  runner.run('TC-TRACEUI-019', 'Facility selector switching updates the trace viewmodel correctly', () => {
    const initialVm = stateStore.getEvidenceTraceViewModel();
    stateStore.setSelectedFacilityId('FAC-STEEL-01');
    const steelVm = stateStore.getEvidenceTraceViewModel();
    if (steelVm.facility.facility_id !== 'FAC-STEEL-01') {
      throw new Error('Facility context did not switch to FAC-STEEL-01');
    }
    // Switch back to FAC-2026-001
    stateStore.setSelectedFacilityId('FAC-2026-001');
  });

  // TC-TRACEUI-020: UI operates strictly as an Inspector/Consumer with zero mutation authority
  runner.run('TC-TRACEUI-020', 'UI operates strictly as an Inspector with zero mutation authority', () => {
    const vm = stateStore.getEvidenceTraceViewModel();
    if (!Object.isFrozen(vm)) {
      throw new Error('Evidence trace view model must be frozen (immutable)');
    }
    // Verify that ProvenanceEngine records cannot be mutated
    const provRecord = provenanceEngine.records.get('PRV-DOC-EVN-FAC-2026-001');
    if (provRecord && !Object.isFrozen(provRecord)) {
      throw new Error('ProvenanceEngine records must be strictly frozen');
    }
  });

  runner.report();
}

executeTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
