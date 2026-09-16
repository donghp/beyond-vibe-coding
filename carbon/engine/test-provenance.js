/**
 * ENERIX Carbon - Evidence & Provenance Verification Suite
 * Executes and verifies all canonical test cases for G4 Task #0022.
 */

import {
  provenanceEngine,
  ProvenanceEngine,
  ProvenanceRecord,
  LineageEdge,
  PROVENANCE_SUBJECT_TYPES,
  TRANSFORMATION_TYPES,
  RELATIONSHIP_TYPES,
  ACTOR_TYPES
} from './provenance-engine.js';
import { CalculationEngineError } from './calculation-engine.js';

class ProvenanceTestRunner {
  constructor() {
    this.totalTests = 0;
    this.passed = 0;
    this.failed = 0;
    this.testFailures = [];
  }

  runTest(testId, description, testFn) {
    this.totalTests++;
    try {
      testFn();
      this.passed++;
      console.log(`  \x1b[32m✓ [PASSED]\x1b[0m ${testId}: ${description}`);
    } catch (err) {
      this.failed++;
      this.testFailures.push({ testId, description, error: err });
      console.log(`  \x1b[31m✗ [FAILED]\x1b[0m ${testId}: ${description}`);
      console.log(`     \x1b[33mReason:\x1b[0m ${err.message || err}`);
      if (err.stack) {
        console.log(`     \x1b[35mStack:\x1b[0m ${err.stack.split('\n')[1]}`);
      }
    }
  }

  report() {
    console.log('\n======================================================');
    console.log('ENERIX CARBON - EVIDENCE & PROVENANCE SUMMARY');
    console.log('======================================================');
    console.log(`Total Verified:  ${this.totalTests}`);
    console.log(`Passed:          \x1b[32m${this.passed}\x1b[0m`);
    console.log(`Failed:          ${this.failed > 0 ? `\x1b[31m${this.failed}\x1b[0m` : `\x1b[32m0\x1b[0m`}`);
    console.log('======================================================');

    if (this.failed > 0) {
      console.log('\nDetailed Failures:');
      this.testFailures.forEach(f => {
        console.log(`\n- \x1b[31m${f.testId}\x1b[0m: ${f.description}`);
        console.log(`  Error: ${f.error.message || f.error}`);
      });
      process.exit(1);
    } else {
      console.log('\x1b[32m✓ All Evidence & Provenance engine tests passed with 100% compliance!\x1b[0m\n');
      process.exit(0);
    }
  }
}

const runner = new ProvenanceTestRunner();

console.log('Starting ENERIX Carbon Evidence & Provenance Verification Suite...');

// Setup a fresh isolated engine instance for the test suite
const engine = new ProvenanceEngine();

// TC-PROV-001: basic provenance record
runner.runTest('TC-PROV-001', 'Verify basic provenance record creation and indexing', () => {
  engine.clear();
  const record = engine.registerProvenance({
    provenance_id: 'PRV-DOC-001',
    subject_type: PROVENANCE_SUBJECT_TYPES.DOCUMENT,
    subject_id: 'DOC-INV-2026-001',
    source_type: 'RAW_FILE_UPLOAD',
    source_id: 'INV-2026-001.pdf',
    source_version: '1.0.0',
    transformation_type: TRANSFORMATION_TYPES.INGESTION,
    actor_type: ACTOR_TYPES.SYSTEM,
    actor_id: 'SYS-UPLOAD-HANDLER',
    timestamp: '2026-09-16T10:00:00Z',
    engine_version: '1.0.0'
  });

  if (!record || record.provenance_id !== 'PRV-DOC-001') {
    throw new Error('Failed to create basic provenance record');
  }
  if (!record.integrity_hash || !record.integrity_hash.startsWith('repro-hash-')) {
    throw new Error('Record missing valid reproducibility hash');
  }
  const indexed = engine.getRecordsForSubject('DOC-INV-2026-001');
  if (indexed.length !== 1 || indexed[0].provenance_id !== 'PRV-DOC-001') {
    throw new Error('Subject indexing failed');
  }
});

// TC-PROV-002: Document → Candidate lineage
runner.runTest('TC-PROV-002', 'Verify Document → Candidate lineage registration and query', () => {
  engine.registerProvenance({
    provenance_id: 'PRV-CAN-001',
    subject_type: PROVENANCE_SUBJECT_TYPES.EXTRACTION_CANDIDATE,
    subject_id: 'CAN-DOC-001',
    source_type: 'OCR_AI_EXTRACTION',
    source_id: 'DOC-INV-2026-001',
    source_version: '1.0.0',
    parent_provenance_id: 'PRV-DOC-001',
    transformation_type: TRANSFORMATION_TYPES.EXTRACTION,
    relationship_type: RELATIONSHIP_TYPES.DERIVED_FROM,
    actor_type: ACTOR_TYPES.AI,
    actor_id: 'AI_OCR_EMULATOR',
    timestamp: '2026-09-16T10:05:00Z'
  });

  engine.registerEdge({
    from_subject_id: 'DOC-INV-2026-001',
    from_subject_type: PROVENANCE_SUBJECT_TYPES.DOCUMENT,
    to_subject_id: 'CAN-DOC-001',
    to_subject_type: PROVENANCE_SUBJECT_TYPES.EXTRACTION_CANDIDATE,
    relationship_type: RELATIONSHIP_TYPES.DERIVED_FROM
  });

  const sourceDoc = engine.getCandidateSourceDocument('CAN-DOC-001');
  if (!sourceDoc || sourceDoc.document_id !== 'DOC-INV-2026-001') {
    throw new Error('Candidate source document query failed');
  }
});

// TC-PROV-003: Candidate → ActivityData lineage
runner.runTest('TC-PROV-003', 'Verify Candidate → ActivityData lineage with human review transformation', () => {
  engine.registerProvenance({
    provenance_id: 'PRV-ACT-001',
    subject_type: PROVENANCE_SUBJECT_TYPES.ACTIVITY_DATA,
    subject_id: 'ACT-2026-001',
    source_type: 'EXTRACTION_CANDIDATE',
    source_id: 'CAN-DOC-001',
    source_version: '1.0.0',
    parent_provenance_id: 'PRV-CAN-001',
    transformation_type: TRANSFORMATION_TYPES.HUMAN_CORRECTION,
    relationship_type: RELATIONSHIP_TYPES.DERIVED_FROM,
    actor_type: ACTOR_TYPES.HUMAN,
    actor_id: 'AUDITOR-LEAD-01',
    timestamp: '2026-09-16T10:10:00Z',
    evidence_refs: ['EVI-001']
  });

  engine.registerEdge({
    from_subject_id: 'CAN-DOC-001',
    from_subject_type: PROVENANCE_SUBJECT_TYPES.EXTRACTION_CANDIDATE,
    to_subject_id: 'ACT-2026-001',
    to_subject_type: PROVENANCE_SUBJECT_TYPES.ACTIVITY_DATA,
    relationship_type: RELATIONSHIP_TYPES.DERIVED_FROM
  });

  const records = engine.getRecordsForSubject('ACT-2026-001');
  if (records.length === 0 || records[0].transformation_type !== TRANSFORMATION_TYPES.HUMAN_CORRECTION) {
    throw new Error('Activity data lineage transformation type mismatch');
  }
});

// TC-PROV-004: ActivityData → Evidence linkage
runner.runTest('TC-PROV-004', 'Verify ActivityData → Evidence linkage and state query', () => {
  engine.registerEvidence({
    evidence_id: 'EVI-001',
    title: 'Fuel Invoice Invoice #88291',
    evidence_type: 'FUEL_INVOICE',
    facility_id: 'FAC-VN-001',
    evidence_state: 'approved'
  });

  engine.registerEdge({
    from_subject_id: 'EVI-001',
    from_subject_type: PROVENANCE_SUBJECT_TYPES.EVIDENCE,
    to_subject_id: 'ACT-2026-001',
    to_subject_type: PROVENANCE_SUBJECT_TYPES.ACTIVITY_DATA,
    relationship_type: RELATIONSHIP_TYPES.SUPPORTED_BY
  });

  const evidenceList = engine.getSupportingEvidence('ACT-2026-001');
  if (evidenceList.length !== 1 || evidenceList[0].evidence_id !== 'EVI-001') {
    throw new Error('Supporting evidence query failed');
  }
  if (evidenceList[0].evidence_state !== 'approved') {
    throw new Error('Evidence state not properly tracked');
  }
});

// TC-PROV-005: ActivityData → CalculationPlan linkage
runner.runTest('TC-PROV-005', 'Verify ActivityData → CalculationPlan linkage', () => {
  engine.registerProvenance({
    provenance_id: 'PRV-PLAN-001',
    subject_type: PROVENANCE_SUBJECT_TYPES.CALCULATION_PLAN,
    subject_id: 'PLAN-2026-001',
    source_type: 'METHODOLOGY_PLAN',
    source_id: 'METH-MOIT-38-2023',
    source_version: '1.0.0',
    transformation_type: TRANSFORMATION_TYPES.PLANNING,
    actor_type: ACTOR_TYPES.SYSTEM,
    actor_id: 'CALCULATION_PLAN_ENGINE',
    methodology_id: 'METH-MOIT-38-2023',
    methodology_version: '1.0.0',
    regulatory_rule_id: 'RULE-QD-42-2026-PRIMARY',
    timestamp: '2026-09-16T10:15:00Z'
  });

  engine.registerEdge({
    from_subject_id: 'ACT-2026-001',
    from_subject_type: PROVENANCE_SUBJECT_TYPES.ACTIVITY_DATA,
    to_subject_id: 'PLAN-2026-001',
    to_subject_type: PROVENANCE_SUBJECT_TYPES.CALCULATION_PLAN,
    relationship_type: RELATIONSHIP_TYPES.CONSUMED_BY
  });

  const plan = engine.getConsumingCalculationPlan('ACT-2026-001');
  if (!plan || plan.plan_id !== 'PLAN-2026-001') {
    throw new Error('Consuming calculation plan query failed');
  }
});

// TC-PROV-006: CalculationPlan → CalculationRun linkage
runner.runTest('TC-PROV-006', 'Verify CalculationPlan → CalculationRun linkage', () => {
  engine.registerProvenance({
    provenance_id: 'PRV-RUN-001',
    subject_type: PROVENANCE_SUBJECT_TYPES.CALCULATION_RUN,
    subject_id: 'RUN-2026-001',
    source_type: 'CALCULATION_PLAN',
    source_id: 'PLAN-2026-001',
    source_version: '1.0.0',
    transformation_type: TRANSFORMATION_TYPES.CALCULATION,
    actor_type: ACTOR_TYPES.SYSTEM,
    actor_id: 'CALCULATION_ENGINE',
    methodology_id: 'METH-MOIT-38-2023',
    regulatory_rule_id: 'RULE-QD-42-2026-PRIMARY',
    timestamp: '2026-09-16T10:20:00Z'
  });

  engine.registerEdge({
    from_subject_id: 'PLAN-2026-001',
    from_subject_type: PROVENANCE_SUBJECT_TYPES.CALCULATION_PLAN,
    to_subject_id: 'RUN-2026-001',
    to_subject_type: PROVENANCE_SUBJECT_TYPES.CALCULATION_RUN,
    relationship_type: RELATIONSHIP_TYPES.CONSUMED_BY
  });

  const run = engine.getConsumingCalculationRun('PLAN-2026-001');
  if (!run || run.run_id !== 'RUN-2026-001') {
    throw new Error('Consuming calculation run query failed');
  }
});

// TC-PROV-007: CalculationRun → Snapshot linkage
runner.runTest('TC-PROV-007', 'Verify CalculationRun → Snapshot linkage', () => {
  const snapshot = engine.createRunSnapshot({
    calculation_run_id: 'RUN-2026-001',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    methodology_id: 'METH-MOIT-38-2023',
    ruleId: 'RULE-QD-42-2026-PRIMARY',
    resultCO2e: 450.5
  });

  engine.registerProvenance({
    provenance_id: 'PRV-SNAP-001',
    subject_type: PROVENANCE_SUBJECT_TYPES.SNAPSHOT,
    subject_id: 'SNAP-2026-001',
    source_type: 'CALCULATION_RUN',
    source_id: 'RUN-2026-001',
    source_version: '1.0.0',
    transformation_type: TRANSFORMATION_TYPES.SNAPSHOT_FREEZE,
    actor_type: ACTOR_TYPES.SYSTEM,
    actor_id: 'PROVENANCE_ENGINE',
    timestamp: '2026-09-16T10:25:00Z'
  });

  engine.registerEdge({
    from_subject_id: 'RUN-2026-001',
    from_subject_type: PROVENANCE_SUBJECT_TYPES.CALCULATION_RUN,
    to_subject_id: 'SNAP-2026-001',
    to_subject_type: PROVENANCE_SUBJECT_TYPES.SNAPSHOT,
    relationship_type: RELATIONSHIP_TYPES.SNAPSHOT_OF
  });

  const freezingSnap = engine.getFreezingSnapshot('RUN-2026-001');
  if (!freezingSnap || freezingSnap.snapshot_id !== 'SNAP-2026-001') {
    throw new Error('Freezing snapshot query failed');
  }
});

// TC-PROV-008: Snapshot → Result lineage
runner.runTest('TC-PROV-008', 'Verify Snapshot → Result lineage', () => {
  engine.registerProvenance({
    provenance_id: 'PRV-RES-001',
    subject_type: PROVENANCE_SUBJECT_TYPES.RESULT,
    subject_id: 'RES-2026-001',
    source_type: 'SNAPSHOT',
    source_id: 'SNAP-2026-001',
    source_version: '1.0.0',
    transformation_type: TRANSFORMATION_TYPES.CALCULATION,
    actor_type: ACTOR_TYPES.SYSTEM,
    actor_id: 'CALCULATION_ENGINE',
    timestamp: '2026-09-16T10:30:00Z'
  });

  engine.registerEdge({
    from_subject_id: 'SNAP-2026-001',
    from_subject_type: PROVENANCE_SUBJECT_TYPES.SNAPSHOT,
    to_subject_id: 'RES-2026-001',
    to_subject_type: PROVENANCE_SUBJECT_TYPES.RESULT,
    relationship_type: RELATIONSHIP_TYPES.DERIVED_FROM
  });

  const resRecords = engine.getRecordsForSubject('RES-2026-001');
  if (resRecords.length === 0 || resRecords[0].source_id !== 'SNAP-2026-001') {
    throw new Error('Result lineage mapping failed');
  }
});

// TC-PROV-009: full backward trace
runner.runTest('TC-PROV-009', 'Verify full backward trace from Result to Source Document', () => {
  const trace = engine.traceBackward('RES-2026-001');
  
  if (trace.chain.length < 6) {
    throw new Error(`Backward trace chain depth too shallow: ${trace.chain.length}`);
  }
  const hasDoc = trace.root_sources.some(s => s.document_id === 'DOC-INV-2026-001');
  if (!hasDoc) {
    throw new Error('Backward trace did not terminate at root Document DOC-INV-2026-001');
  }
  if (!trace.evidence_records.includes('EVI-001')) {
    throw new Error('Backward trace missed supporting evidence record');
  }
});

// TC-PROV-010: full forward trace
runner.runTest('TC-PROV-010', 'Verify full forward trace from Document to Result', () => {
  const trace = engine.traceForward('DOC-INV-2026-001');
  
  if (trace.chain.length < 6) {
    throw new Error(`Forward trace chain depth too shallow: ${trace.chain.length}`);
  }
  const hasResult = trace.terminals.some(t => t.subject_id === 'RES-2026-001');
  if (!hasResult) {
    throw new Error('Forward trace did not reach terminal Result RES-2026-001');
  }
});

// TC-PROV-011: multiple evidence per ActivityData
runner.runTest('TC-PROV-011', 'Verify multiple evidence items supporting single ActivityData record', () => {
  engine.registerEvidence({ evidence_id: 'EVI-LOG-002', title: 'Sub-meter Log', evidence_state: 'validated' });
  engine.registerEvidence({ evidence_id: 'EVI-CAL-003', title: 'Calibration Certificate', evidence_state: 'approved' });

  engine.registerEdge({
    from_subject_id: 'EVI-LOG-002',
    from_subject_type: PROVENANCE_SUBJECT_TYPES.EVIDENCE,
    to_subject_id: 'ACT-2026-001',
    to_subject_type: PROVENANCE_SUBJECT_TYPES.ACTIVITY_DATA,
    relationship_type: RELATIONSHIP_TYPES.SUPPORTED_BY
  });

  engine.registerEdge({
    from_subject_id: 'EVI-CAL-003',
    from_subject_type: PROVENANCE_SUBJECT_TYPES.EVIDENCE,
    to_subject_id: 'ACT-2026-001',
    to_subject_type: PROVENANCE_SUBJECT_TYPES.ACTIVITY_DATA,
    relationship_type: RELATIONSHIP_TYPES.SUPPORTED_BY
  });

  const evidence = engine.getSupportingEvidence('ACT-2026-001');
  if (evidence.length !== 3) {
    throw new Error(`Expected 3 evidence items, found ${evidence.length}`);
  }
  const ids = evidence.map(e => e.evidence_id);
  if (!ids.includes('EVI-001') || !ids.includes('EVI-LOG-002') || !ids.includes('EVI-CAL-003')) {
    throw new Error('Missing expected evidence ID in multi-evidence query');
  }
});

// TC-PROV-012: versioned source lineage
runner.runTest('TC-PROV-012', 'Verify versioned source lineage tracking', () => {
  const versions = engine.getLineageVersions('RES-2026-001');
  if (!versions['ACT-2026-001'] || versions['ACT-2026-001'].version !== '1.0.0') {
    throw new Error('Version tracking failed for ActivityData');
  }
  if (!versions['PLAN-2026-001'] || versions['PLAN-2026-001'].version !== '1.0.0') {
    throw new Error('Version tracking failed for CalculationPlan');
  }
});

// TC-PROV-013: historical immutability
runner.runTest('TC-PROV-013', 'Verify historical provenance immutability (frozen objects)', () => {
  const record = engine.getRecord('PRV-ACT-001');
  if (!Object.isFrozen(record)) {
    throw new Error('Provenance record was not frozen upon registration');
  }
  try {
    record.status = 'TAMPERED';
  } catch (e) {
    // In strict mode modifying frozen object throws
  }
  if (record.status === 'TAMPERED') {
    throw new Error('Direct mutation succeeded on immutable provenance record!');
  }
});

// TC-PROV-014: missing source
runner.runTest('TC-PROV-014', 'Verify validation blocks record with missing source', () => {
  const result = engine.verifyProvenanceCompleteness({
    source_id: null,
    source_version: '1.0.0',
    transformation_type: TRANSFORMATION_TYPES.INGESTION,
    actor_type: ACTOR_TYPES.SYSTEM,
    actor_id: 'SYS',
    engine_version: '1.0.0'
  });

  if (result.status !== 'BLOCKED') {
    throw new Error('Expected BLOCKED status on missing source');
  }
  const hasIssue = result.issues.some(i => i.code === 'SOURCE_MISSING');
  if (!hasIssue) {
    throw new Error('Missing SOURCE_MISSING issue code');
  }
});

// TC-PROV-015: missing evidence
runner.runTest('TC-PROV-015', 'Verify validation flags ActivityData with missing evidence', () => {
  const result = engine.verifyProvenanceCompleteness(
    {
      subject_type: PROVENANCE_SUBJECT_TYPES.ACTIVITY_DATA,
      source_id: 'DOC-001',
      source_version: '1.0.0',
      transformation_type: TRANSFORMATION_TYPES.EXTRACTION,
      actor_type: ACTOR_TYPES.SYSTEM,
      actor_id: 'SYS',
      engine_version: '1.0.0',
      evidence_refs: []
    },
    { requireEvidence: true }
  );

  if (result.status !== 'REQUIRES_REVIEW') {
    throw new Error('Expected REQUIRES_REVIEW status on missing evidence');
  }
  const hasIssue = result.issues.some(i => i.code === 'EVIDENCE_MISSING');
  if (!hasIssue) {
    throw new Error('Missing EVIDENCE_MISSING issue code');
  }
});

// TC-PROV-016: missing version
runner.runTest('TC-PROV-016', 'Verify validation flags record with missing version', () => {
  const result = engine.verifyProvenanceCompleteness({
    source_id: 'DOC-001',
    source_version: null,
    transformation_type: TRANSFORMATION_TYPES.INGESTION,
    actor_type: ACTOR_TYPES.SYSTEM,
    actor_id: 'SYS',
    engine_version: '1.0.0'
  });

  if (result.status !== 'REQUIRES_REVIEW') {
    throw new Error('Expected REQUIRES_REVIEW status on missing version');
  }
  const hasIssue = result.issues.some(i => i.code === 'VERSION_MISSING');
  if (!hasIssue) {
    throw new Error('Missing VERSION_MISSING issue code');
  }
});

// TC-PROV-017: broken parent lineage
runner.runTest('TC-PROV-017', 'Verify validation blocks record with broken parent lineage reference', () => {
  const result = engine.verifyProvenanceCompleteness(
    {
      source_id: 'DOC-001',
      source_version: '1.0.0',
      transformation_type: TRANSFORMATION_TYPES.EXTRACTION,
      actor_type: ACTOR_TYPES.SYSTEM,
      actor_id: 'SYS',
      engine_version: '1.0.0',
      parent_provenance_id: 'PRV-GHOST-DOES-NOT-EXIST'
    },
    { requireParent: true }
  );

  if (result.status !== 'BLOCKED') {
    throw new Error('Expected BLOCKED status on broken parent lineage');
  }
  const hasIssue = result.issues.some(i => i.code === 'BROKEN_PARENT_REFERENCE');
  if (!hasIssue) {
    throw new Error('Missing BROKEN_PARENT_REFERENCE issue code');
  }
});

// TC-PROV-018: duplicate provenance identity
runner.runTest('TC-PROV-018', 'Verify error on duplicate provenance identity with conflicting payload', () => {
  let threw = false;
  try {
    engine.registerProvenance({
      provenance_id: 'PRV-DOC-001', // Already exists in test setup
      subject_id: 'DOC-DIFFERENT-FILE',
      source_type: 'TAMPERED',
      source_id: 'TAMPERED.pdf'
    });
  } catch (err) {
    if (err instanceof CalculationEngineError && err.code === 'DUPLICATE_PROVENANCE_IDENTITY') {
      threw = true;
    }
  }
  if (!threw) {
    throw new Error('Failed to reject duplicate provenance identity with differing payload');
  }
});

// TC-PROV-019: conflicting lineage edges
runner.runTest('TC-PROV-019', 'Verify error on conflicting derivation edges for single subject', () => {
  let threw = false;
  try {
    // Attempt to register a conflicting second derivation source for ACT-2026-001
    engine.registerEdge({
      from_subject_id: 'CAN-COMPETING-SOURCE-999',
      to_subject_id: 'ACT-2026-001',
      relationship_type: RELATIONSHIP_TYPES.DERIVED_FROM
    });
  } catch (err) {
    if (err instanceof CalculationEngineError && err.code === 'CONFLICTING_LINEAGE_EDGES') {
      threw = true;
    }
  }
  if (!threw) {
    throw new Error('Failed to block conflicting derivation lineage edges');
  }
});

// TC-PROV-020: deterministic provenance identity
runner.runTest('TC-PROV-020', 'Verify deterministic reproducibility hash calculation', () => {
  const payload1 = {
    subject_id: 'ACT-001',
    facility_id: 'FAC-01',
    quantity: 500,
    unit: 'liters'
  };
  // Same content with keys in reversed order
  const payload2 = {
    unit: 'liters',
    quantity: 500,
    facility_id: 'FAC-01',
    subject_id: 'ACT-001'
  };

  const hash1 = engine.computeReproducibilityHash(payload1);
  const hash2 = engine.computeReproducibilityHash(payload2);

  if (hash1 !== hash2) {
    throw new Error(`Reproducibility hash non-deterministic: ${hash1} !== ${hash2}`);
  }
});

// TC-PROV-021: human reviewer attribution
runner.runTest('TC-PROV-021', 'Verify valid human reviewer approval attribution', () => {
  const record = engine.registerProvenance({
    provenance_id: 'PRV-APP-001',
    subject_type: PROVENANCE_SUBJECT_TYPES.ACTIVITY_DATA,
    subject_id: 'ACT-2026-002',
    source_type: 'MANUAL_ENTRY',
    source_id: 'ENTRY-002',
    source_version: '1.0.0',
    transformation_type: TRANSFORMATION_TYPES.APPROVAL,
    relationship_type: RELATIONSHIP_TYPES.APPROVED_BY,
    actor_type: ACTOR_TYPES.HUMAN,
    actor_id: 'CHIEF_AUDITOR_NGUYEN'
  });

  if (!record || record.actor_type !== ACTOR_TYPES.HUMAN) {
    throw new Error('Human reviewer approval attribution failed');
  }
});

// TC-PROV-022: AI/OCR actor attribution without approval authority
runner.runTest('TC-PROV-022', 'Verify AI/OCR actor is strictly blocked from approval authority', () => {
  let threw = false;
  try {
    engine.registerProvenance({
      provenance_id: 'PRV-AI-APPROVE-FAIL',
      subject_type: PROVENANCE_SUBJECT_TYPES.ACTIVITY_DATA,
      subject_id: 'ACT-2026-003',
      source_type: 'AI_OCR_EXTRACTION',
      source_id: 'EXT-003',
      source_version: '1.0.0',
      transformation_type: TRANSFORMATION_TYPES.APPROVAL,
      relationship_type: RELATIONSHIP_TYPES.APPROVED_BY,
      actor_type: ACTOR_TYPES.AI,
      actor_id: 'AI_MODEL_LLM'
    });
  } catch (err) {
    if (err instanceof CalculationEngineError && err.code === 'AI_AUTHORITY_VIOLATION') {
      threw = true;
    }
  }
  if (!threw) {
    throw new Error('AI actor was improperly permitted to grant approval authority!');
  }
});

// TC-PROV-023: snapshot provenance preservation
runner.runTest('TC-PROV-023', 'Verify snapshot preserves provenance and detects tamper', () => {
  const snapshot = engine.createRunSnapshot({
    calculation_run_id: 'RUN-SNAP-TEST-01',
    facility_id: 'FAC-HN-001',
    period: '2026-Q1',
    ruleId: 'RULE-QD-42-2026-PRIMARY',
    methodologyId: 'METH-MOIT-38-2023',
    factorsUsed: ['EF-DIESEL-01'],
    gwpDatasetId: 'GWP-IPCC-AR5',
    resultCO2e: 125.75,
    gasResults: [{ gas: 'CO2', emissions_tons: 125.75 }]
  });

  const check1 = engine.verifySnapshotIntegrity(snapshot);
  if (check1.tamperDetected !== false) {
    throw new Error('Snapshot integrity check failed on untampered snapshot');
  }

  // Artificially tamper with snapshot
  snapshot.outputs.result_co2e_tons = 999.0;
  const check2 = engine.verifySnapshotIntegrity(snapshot);
  if (check2.tamperDetected !== true) {
    throw new Error('Snapshot integrity check failed to detect altered output');
  }
});

// TC-PROV-024: no numerical calculation leakage
runner.runTest('TC-PROV-024', 'Verify zero calculation leakage in ProvenanceEngine (static reflection)', () => {
  const methods = Object.getOwnPropertyNames(ProvenanceEngine.prototype);
  const forbiddenPatterns = [
    'calculateEmissions',
    'applyEmissionFactor',
    'applyGwp',
    'executeModel',
    'calculateScope'
  ];

  for (const forbidden of forbiddenPatterns) {
    if (methods.includes(forbidden)) {
      throw new Error(`Calculation leakage detected: ${forbidden} exists on ProvenanceEngine`);
    }
  }

  // Ensure ProvenanceRecord does not calculate anything
  const provRecord = new ProvenanceRecord({
    provenance_id: 'PRV-DUMMY',
    subject_id: 'SUB-DUMMY'
  });
  if (provRecord.total_emissions !== undefined || provRecord.co2e !== undefined) {
    throw new Error('Calculation leakage detected on ProvenanceRecord entity');
  }
});

// Run report
runner.report();
