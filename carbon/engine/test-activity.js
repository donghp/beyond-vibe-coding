/**
 * ENERIX Carbon - Activity Data and Evidence Verification Suite
 * Executes and verifies all 24 required activity data & evidence scenarios (TC-ACT-001 to TC-ACT-024).
 */

import { activityEvidenceEngine, ActivityData, Evidence } from './activity-evidence-engine.js';

class ActivityTestRunner {
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
    console.log('ENERIX CARBON - ACTIVITY & EVIDENCE VERIFICATION SUMMARY');
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
      console.log('\n\x1b[32m✓ All Activity Data & Evidence workflow tests passed with 100% compliance!\x1b[0m\n');
    }
  }
}

const runner = new ActivityTestRunner();

console.log('Starting ENERIX Carbon Activity Data and Evidence Verification Suite...\n');

// Standard Synthetic Fixtures labeled with TEST_ONLY_SYNTHETIC
const getMockPlan = () => ({
  plan_id: 'PLAN-2026-001',
  facility_context: {
    id: 'FAC-STEEL-01',
    sector_id: 'SEC-01-ENERGY'
  },
  temporal_segment: {
    reporting_period: {
      start: '2026-01-01',
      end: '2026-12-31'
    }
  },
  steps: [
    {
      step_id: 'STEP-1',
      activity_type: 'ACT-COAL',
      expected_unit: 't'
    }
  ]
});

const getMockActivityData = (overrides = {}) => new ActivityData({
  activity_data_id: 'ACT-DATA-100',
  facility_id: 'FAC-STEEL-01',
  calculation_plan_id: 'PLAN-2026-001',
  plan_step_id: 'STEP-1',
  activity_type: 'ACT-COAL',
  quantity: 1500.0,
  unit: 't',
  activity_period: {
    start: '2026-05-01',
    end: '2026-05-31'
  },
  source_type: 'MANUAL',
  provenance: {
    source_ref: 'INV-2026-COAL-001',
    created_by: 'Inventory Officer'
  },
  evidence_refs: ['EVI-COAL-998'],
  approval_state: 'APPROVED',
  ...overrides
});

const getMockEvidence = (overrides = {}) => new Evidence({
  evidence_id: 'EVI-COAL-998',
  evidence_type: 'FUEL_INVOICE',
  title: 'Coal Delivery Invoice',
  source_ref: '/docs/invoices/coal_2026_05.pdf',
  coverage_period: {
    start: '2026-05-01',
    end: '2026-05-31'
  },
  facility_id: 'FAC-STEEL-01',
  activity_data_id: 'ACT-DATA-100',
  approval_state: 'APPROVED',
  evidence_state: 'EVIDENCE_APPROVED',
  ...overrides
});

// Run Verification Suite
runner.runTest('TC-ACT-001', 'Verify standard valid observed ActivityData becomes calculation-ready', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData();
  const evidence = [getMockEvidence()];

  const res = activityEvidenceEngine.validate(ad, plan, evidence);
  if (!res.isValid) throw new Error('Expected validation to succeed');
  if (res.readiness !== 'CALCULATION_READY') throw new Error(`Expected readiness CALCULATION_READY, got ${res.readiness}`);
});

runner.runTest('TC-ACT-002', 'Verify fail-closed on missing quantity (no default conversion to 0)', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({ quantity: null });
  const evidence = [getMockEvidence()];

  const res = activityEvidenceEngine.validate(ad, plan, evidence);
  if (res.isValid) throw new Error('Expected validation to fail');
  if (ad.quantity === 0) throw new Error('Quantity must not be silently defaulted to 0');
  const hasMissingQty = res.issues.some(i => i.code === 'MISSING_QUANTITY');
  if (!hasMissingQty) throw new Error('Expected MISSING_QUANTITY issue');
});

runner.runTest('TC-ACT-003', 'Verify fail-closed on negative or invalid quantity values', () => {
  const plan = getMockPlan();
  const adNegative = getMockActivityData({ quantity: -15.0 });
  const adString = getMockActivityData({ quantity: '1500' });
  const evidence = [getMockEvidence()];

  const resNeg = activityEvidenceEngine.validate(adNegative, plan, evidence);
  if (resNeg.isValid || !resNeg.issues.some(i => i.code === 'NEGATIVE_QUANTITY')) {
    throw new Error('Expected NEGATIVE_QUANTITY error');
  }

  const resStr = activityEvidenceEngine.validate(adString, plan, evidence);
  if (resStr.isValid || !resStr.issues.some(i => i.code === 'INVALID_QUANTITY_TYPE')) {
    throw new Error('Expected INVALID_QUANTITY_TYPE error');
  }
});

runner.runTest('TC-ACT-004', 'Verify fail-closed on unit incompatibility (no default conversion)', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({ unit: 'kg' }); // Step expected_unit is 't'
  const evidence = [getMockEvidence()];

  const res = activityEvidenceEngine.validate(ad, plan, evidence);
  if (res.isValid || res.validation_results.unit_compatibility !== 'UNIT_INCOMPATIBLE') {
    throw new Error('Expected UNIT_INCOMPATIBLE status');
  }
  if (ad.unit !== 'kg') throw new Error('Unit must not be silently converted');
});

runner.runTest('TC-ACT-005', 'Verify fail-closed on complete temporal mismatch vs plan reporting period', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({
    activity_period: { start: '2027-01-01', end: '2027-02-01' }
  });
  const evidence = [getMockEvidence({
    coverage_period: { start: '2027-01-01', end: '2027-02-01' }
  })];

  const res = activityEvidenceEngine.validate(ad, plan, evidence);
  if (res.isValid || !res.issues.some(i => i.code === 'TEMPORAL_MISMATCH')) {
    throw new Error('Expected TEMPORAL_MISMATCH validation failure');
  }
});

runner.runTest('TC-ACT-006', 'Verify fail-closed when activity period crosses temporal plan boundary', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({
    activity_period: { start: '2025-12-15', end: '2026-01-15' } // Crosses lower boundary 2026-01-01
  });
  const evidence = [getMockEvidence({
    coverage_period: { start: '2025-12-15', end: '2026-01-15' }
  })];

  const res = activityEvidenceEngine.validate(ad, plan, evidence);
  if (res.isValid || !res.issues.some(i => i.code === 'TEMPORAL_MISMATCH')) {
    throw new Error('Expected boundary crossing to result in TEMPORAL_MISMATCH error');
  }
});

runner.runTest('TC-ACT-007', 'Verify propagation of ISSUE-TEMP-002 on mid-month transition auditing', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({
    activity_period: { start: '2026-09-01', end: '2026-09-30' } // Straddles 2026-09-25
  });
  const evidence = [getMockEvidence({
    coverage_period: { start: '2026-09-01', end: '2026-09-30' }
  })];

  const res = activityEvidenceEngine.validate(ad, plan, evidence);
  const midMonthIssue = res.issues.find(i => i.issue_id === 'ISSUE-TEMP-002');
  if (!midMonthIssue) {
    throw new Error('Expected ISSUE-TEMP-002 propagation for mid-month boundary crossing');
  }
});

runner.runTest('TC-ACT-008', 'Verify validation error when record is missing provenance parameters', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({ provenance: null });
  const evidence = [getMockEvidence()];

  const res = activityEvidenceEngine.validate(ad, plan, evidence);
  if (res.isValid || !res.issues.some(i => i.code === 'MISSING_PROVENANCE')) {
    throw new Error('Expected MISSING_PROVENANCE error');
  }
});

runner.runTest('TC-ACT-009', 'Verify validation error on absolute missing supporting evidence', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({ evidence_refs: [] });
  const evidence = [];

  const res = activityEvidenceEngine.validate(ad, plan, evidence);
  if (res.isValid || !res.issues.some(i => i.code === 'MISSING_EVIDENCE')) {
    throw new Error('Expected MISSING_EVIDENCE error');
  }
});

runner.runTest('TC-ACT-010', 'Verify record remains non-ready when evidence is available but not approved', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData();
  const unapprovedEvidence = getMockEvidence({ approval_state: 'DRAFT', evidence_state: 'EVIDENCE_AVAILABLE' });

  const res = activityEvidenceEngine.validate(ad, plan, [unapprovedEvidence]);
  if (res.isValid || res.readiness === 'CALCULATION_READY') {
    throw new Error('Expected unapproved evidence to block calculation readiness');
  }
  if (!res.issues.some(i => i.code === 'EVIDENCE_NOT_APPROVED')) {
    throw new Error('Expected EVIDENCE_NOT_APPROVED error');
  }
});

runner.runTest('TC-ACT-011', 'Verify approved ActivityData with approved evidence becomes calculation-ready', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({ approval_state: 'APPROVED' });
  const evidence = [getMockEvidence({ approval_state: 'APPROVED' })];

  const res = activityEvidenceEngine.validate(ad, plan, evidence);
  if (!res.isValid || res.readiness !== 'CALCULATION_READY') {
    throw new Error('Expected approved status with approved evidence to be calculation-ready');
  }
});

runner.runTest('TC-ACT-012', 'Verify rejected ActivityData remains strictly blocked', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({ approval_state: 'REJECTED' });
  const evidence = [getMockEvidence()];

  const res = activityEvidenceEngine.validate(ad, plan, evidence);
  if (res.readiness !== 'BLOCKED' || !res.issues.some(i => i.code === 'RECORD_REJECTED')) {
    throw new Error('Rejected activity records must remain strictly blocked from calculations');
  }
});

runner.runTest('TC-ACT-013', 'Verify superseded ActivityData remains strictly excluded', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({ approval_state: 'SUPERSEDED' });
  const evidence = [getMockEvidence()];

  const res = activityEvidenceEngine.validate(ad, plan, evidence);
  if (res.readiness !== 'BLOCKED' || !res.issues.some(i => i.code === 'RECORD_SUPERSEDED')) {
    throw new Error('Superseded historical records must be excluded from calculations');
  }
});

runner.runTest('TC-ACT-014', 'Verify conflict detection across overlapping activity records', () => {
  const ad1 = getMockActivityData({ activity_data_id: 'ACT-1', quantity: 1500 });
  const ad2 = getMockActivityData({ activity_data_id: 'ACT-2', quantity: 1800 }); // Different quantity for same period

  const conflicts = activityEvidenceEngine.checkConflicts([ad1, ad2]);
  if (conflicts.length === 0 || conflicts[0].code !== 'CONFLICT_DETECTED') {
    throw new Error('Expected overlapping periods with different quantities to trigger CONFLICT_DETECTED');
  }
  if (!conflicts.some(c => c.issue_id === 'ISSUE-RRM-001')) {
    throw new Error('Expected conflict to propagate ISSUE-RRM-001');
  }
});

runner.runTest('TC-ACT-015', 'Verify duplicate activity data detection', () => {
  const ad1 = getMockActivityData({ activity_data_id: 'ACT-1' });
  const ad2 = getMockActivityData({ activity_data_id: 'ACT-2' }); // Completely duplicate details

  const duplicates = activityEvidenceEngine.checkDuplicates([ad1, ad2]);
  if (duplicates.length === 0 || duplicates[0].code !== 'DUPLICATE_RECORD') {
    throw new Error('Expected identical records to trigger DUPLICATE_RECORD');
  }
});

runner.runTest('TC-ACT-016', 'Verify support for multiple attached evidence records', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({ evidence_refs: ['EVI-1', 'EVI-2'] });
  const ev1 = getMockEvidence({ evidence_id: 'EVI-1' });
  const ev2 = getMockEvidence({ evidence_id: 'EVI-2' });

  const res = activityEvidenceEngine.validate(ad, plan, [ev1, ev2]);
  if (!res.isValid || res.readiness !== 'CALCULATION_READY') {
    throw new Error('Expected validation to pass with multiple approved evidence records');
  }
  if (res.directlySubstantiated.length !== 2) {
    throw new Error(`Expected 2 directly substantiated evidence references, got ${res.directlySubstantiated.length}`);
  }
});

runner.runTest('TC-ACT-017', 'Verify distinction of administrative-only facility/evidence relationship', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({ evidence_refs: ['EVI-DIRECT'] });
  const evDirect = getMockEvidence({ evidence_id: 'EVI-DIRECT' });
  const evAdmin = getMockEvidence({ evidence_id: 'EVI-ADMIN', activity_data_id: null }); // Administrative only

  const res = activityEvidenceEngine.validate(ad, plan, [evDirect, evAdmin]);
  if (res.administrativeEvidence.length !== 1 || res.administrativeEvidence[0] !== 'EVI-ADMIN') {
    throw new Error('Expected administrative-only facility evidence mapping to be properly categorised');
  }
});

runner.runTest('TC-ACT-018', 'Verify direct ActivityData/evidence substantiation relationship', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({ evidence_refs: ['EVI-SUB'] });
  const evSub = getMockEvidence({ evidence_id: 'EVI-SUB' });

  const res = activityEvidenceEngine.validate(ad, plan, [evSub]);
  if (res.directlySubstantiated.length !== 1 || res.directlySubstantiated[0] !== 'EVI-SUB') {
    throw new Error('Expected direct substantiation relationship to map correctly');
  }
});

runner.runTest('TC-ACT-019', 'Verify historical ActivityData versioning bump (preserves immutability)', () => {
  const approvedRecord = getMockActivityData({ approval_state: 'APPROVED', version: '1.0.0' });
  const updates = { quantity: 1600.0, provenance: { source_ref: 'REV-001', created_by: 'QA Manager' } };

  const { superseded, nextVersion } = activityEvidenceEngine.createNewVersion(approvedRecord, updates);
  
  if (superseded.approval_state !== 'SUPERSEDED') throw new Error('Expected old approved record to be marked SUPERSEDED');
  if (nextVersion.version !== '2.0.0') throw new Error(`Expected new version to bump to 2.0.0, got ${nextVersion.version}`);
  if (nextVersion.supersedes_id !== approvedRecord.activity_data_id) {
    throw new Error('Expected nextVersion to refer to superseded ID');
  }
  if (nextVersion.approval_state !== 'DRAFT') throw new Error('Expected revised version to start in DRAFT');
});

runner.runTest('TC-ACT-020', 'Verify deterministic repeated validation (reproducibility consistency)', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData();
  const evidence = [getMockEvidence()];

  const run1 = activityEvidenceEngine.validate(ad, plan, evidence);
  for (let i = 0; i < 50; i++) {
    const runN = activityEvidenceEngine.validate(ad, plan, evidence);
    if (JSON.stringify(run1) !== JSON.stringify(runN)) {
      throw new Error('Validation is not deterministic across repeated evaluations');
    }
  }
});

runner.runTest('TC-ACT-021', 'Verify correct CalculationPlan linkage validation', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({ calculation_plan_id: 'PLAN-2026-001' });
  const evidence = [getMockEvidence()];

  const res = activityEvidenceEngine.validate(ad, plan, evidence);
  if (!res.validation_results.plan_linked) {
    throw new Error('Expected plan_linked validation result to be true');
  }
});

runner.runTest('TC-ACT-022', 'Verify validation error when CalculationPlan linkage is missing (no orphans)', () => {
  const plan = getMockPlan();
  const ad = getMockActivityData({ calculation_plan_id: null });
  const evidence = [getMockEvidence()];

  const res = activityEvidenceEngine.validate(ad, plan, evidence);
  if (res.isValid || !res.issues.some(i => i.code === 'MISSING_PLAN_LINK')) {
    throw new Error('Expected MISSING_PLAN_LINK error');
  }
});

runner.runTest('TC-ACT-023', 'Verify source type classifications do not bypass validation gates (metadata only)', () => {
  const plan = getMockPlan();
  const adManual = getMockActivityData({ source_type: 'MANUAL', quantity: null });
  const adScada = getMockActivityData({ source_type: 'SCADA', quantity: null }); // SCADA should NOT bypass quantity gates
  const evidence = [getMockEvidence()];

  const resManual = activityEvidenceEngine.validate(adManual, plan, evidence);
  const resScada = activityEvidenceEngine.validate(adScada, plan, evidence);

  if (resManual.isValid || resScada.isValid) {
    throw new Error('Source classification must not automatically bypass mandatory gates');
  }
});

runner.runTest('TC-ACT-024', 'Verify future SCADA/API source metadata is correctly stored without live integration requirements', () => {
  const ad = getMockActivityData({
    source_type: 'API',
    measurement_context: {
      api_endpoint: 'https://scada.steelcorp.com/api/v1/metrics',
      inverter_serial: 'INV-ST-9982'
    }
  });
  if (ad.source_type !== 'API' || ad.measurement_context.inverter_serial !== 'INV-ST-9982') {
    throw new Error('SCADA/API metadata parameters were not successfully preserved');
  }
});

runner.report();
