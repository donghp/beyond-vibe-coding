/**
 * ENERIX Carbon - QA/QC & Data Health Verification Suite
 * Executes and verifies all canonical test cases TC-QA-001 through TC-QA-024 for Task #0023.
 */

import {
  qaqcEngine,
  QAQCEngine,
  QA_RESULT_STATES,
  DATA_HEALTH_STATES,
  QA_SEVERITY,
  HEALTH_DIMENSIONS,
  QACheck,
  DataHealthSnapshot
} from './qa-qc-engine.js';

class QAQCTestRunner {
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
    console.log('ENERIX CARBON - QA/QC & DATA HEALTH VERIFICATION SUMMARY');
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
      console.log('\x1b[32m✓ All QA/QC & Data Health engine tests passed with 100% compliance!\x1b[0m\n');
      process.exit(0);
    }
  }
}

const runner = new QAQCTestRunner();
console.log('Starting ENERIX Carbon QA/QC & Data Health Verification Suite (TC-QA-001..024)...');

const engine = new QAQCEngine();

// Helper to create a fully healthy baseline synthetic context
function createHealthyContext() {
  return {
    facility_id: 'FAC-SYNTH-001',
    reporting_period: '2026',
    tier: 'TIER_2',
    regulatory_context: {
      rule_id: 'ND-06-2022-ND-CP',
      status: 'APPLICABLE'
    },
    methodology: {
      methodology_id: 'METH-MOIT-38-2023',
      selection_state: 'APPROVED'
    },
    calculation_plan: {
      plan_id: 'PLAN-2026-001',
      plan_status: 'READY',
      steps: [
        { step_id: 'STEP-01', calculation_model_ref: 'MODEL-01' }
      ]
    },
    activity_data: [
      {
        activity_data_id: 'ACT-001',
        facility_id: 'FAC-SYNTH-001',
        activity_type: 'GRID_ELECTRICITY',
        quantity: 1250.0,
        unit: 'MWh',
        activity_period: {
          start: '2026-01-01T00:00:00Z',
          end: '2026-01-31T23:59:59Z'
        },
        evidence_refs: ['EVI-001'],
        provenance: {
          source_id: 'ELEC-BILL-01.pdf',
          source_type: 'RAW_UPLOAD',
          actor_type: 'HUMAN',
          actor_id: 'AUDITOR-01'
        }
      }
    ],
    evidence_registry: {
      'EVI-001': {
        evidence_id: 'EVI-001',
        evidence_state: 'approved'
      }
    },
    emission_factors: [
      {
        factor_id: 'EF-GRID-VN-2026',
        status: 'ACTIVE',
        value: 0.7221,
        unit: 't CO2e/MWh'
      }
    ],
    gwp_dataset: {
      dataset_id: 'GWP-IPCC-AR5'
    }
  };
}

// TC-QA-001: fully healthy context
runner.runTest('TC-QA-001', 'fully healthy context', () => {
  const context = createHealthyContext();
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.HEALTHY) {
    throw new Error(`Expected HEALTHY, got ${snapshot.overall_health_state}`);
  }
  if (snapshot.findings.length > 0) {
    throw new Error(`Expected 0 findings, got ${snapshot.findings.length}`);
  }
});

// TC-QA-002: missing required ActivityData
runner.runTest('TC-QA-002', 'missing required ActivityData', () => {
  const context = createHealthyContext();
  context.activity_data = []; // Empty
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for empty activity data, got ${snapshot.overall_health_state}`);
  }
  const hasEmptyCheck = snapshot.blocked_checks.some(c => c.check_id === 'CHK-ACT-EMPTY');
  if (!hasEmptyCheck) {
    throw new Error('Missing CHK-ACT-EMPTY blocked check');
  }
});

// TC-QA-003: invalid quantity/unit
runner.runTest('TC-QA-003', 'invalid quantity/unit', () => {
  const context = createHealthyContext();
  context.activity_data[0].quantity = -100.0; // Negative quantity
  context.activity_data[0].unit = ''; // Missing unit
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for negative quantity and missing unit, got ${snapshot.overall_health_state}`);
  }
  const hasNegQty = snapshot.blocked_checks.some(c => c.check_id.startsWith('CHK-ACT-QTY-NEG'));
  const hasMissingUnit = snapshot.blocked_checks.some(c => c.check_id.startsWith('CHK-ACT-UNIT-MISSING'));
  if (!hasNegQty || !hasMissingUnit) {
    throw new Error('Failed to capture negative quantity and missing unit checks');
  }
});

// TC-QA-004: temporal inconsistency
runner.runTest('TC-QA-004', 'temporal inconsistency', () => {
  const context = createHealthyContext();
  context.activity_data[0].activity_period = {
    start: '2026-05-30',
    end: '2026-05-01' // Inverted
  };
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for inverted temporal dates, got ${snapshot.overall_health_state}`);
  }
  const hasOrderCheck = snapshot.blocked_checks.some(c => c.check_id.startsWith('CHK-TEMP-ORDER'));
  if (!hasOrderCheck) {
    throw new Error('Missing temporal order check');
  }
});

// TC-QA-005: temporal straddle
runner.runTest('TC-QA-005', 'temporal straddle', () => {
  const context = createHealthyContext();
  context.activity_data[0].activity_period = {
    start: '2026-09-01',
    end: '2026-09-30' // Straddles 2026-09-25
  };
  context.activity_data[0].segmented = false;
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for unsegmented straddle, got ${snapshot.overall_health_state}`);
  }
  if (!snapshot.issue_references.includes('ISSUE-TEMP-001')) {
    throw new Error('Expected ISSUE-TEMP-001 to be surfaced');
  }
});

// TC-QA-006: mid-month ISSUE-TEMP-002
runner.runTest('TC-QA-006', 'mid-month ISSUE-TEMP-002', () => {
  const context = createHealthyContext();
  context.has_unresolved_mid_month = true;
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.REQUIRES_REVIEW) {
    throw new Error(`Expected REQUIRES_REVIEW for mid-month issue, got ${snapshot.overall_health_state}`);
  }
  if (!snapshot.issue_references.includes('ISSUE-TEMP-002')) {
    throw new Error('Expected ISSUE-TEMP-002 to be surfaced');
  }
});

// TC-QA-007: missing evidence
runner.runTest('TC-QA-007', 'missing evidence', () => {
  // Case A: Mandatory regime -> BLOCKED
  const contextA = createHealthyContext();
  contextA.activity_data[0].evidence_refs = [];
  contextA.tier = 'TIER_2';
  contextA.evidence_mandatory = true;
  const snapshotA = engine.evaluateHealth(contextA);

  if (snapshotA.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for missing mandatory evidence, got ${snapshotA.overall_health_state}`);
  }

  // Case B: Non-mandatory / Tier 1 regime -> REQUIRES_REVIEW per ISSUE-PROV-002
  const contextB = createHealthyContext();
  contextB.activity_data[0].evidence_refs = [];
  contextB.tier = 'TIER_1';
  contextB.evidence_mandatory = false;
  const snapshotB = engine.evaluateHealth(contextB);

  if (snapshotB.overall_health_state !== DATA_HEALTH_STATES.REQUIRES_REVIEW) {
    throw new Error(`Expected REQUIRES_REVIEW for missing Tier 1 evidence, got ${snapshotB.overall_health_state}`);
  }
  if (!snapshotB.issue_references.includes('ISSUE-PROV-002')) {
    throw new Error('Expected ISSUE-PROV-002 to be surfaced for Tier 1 missing evidence');
  }
});

// TC-QA-008: evidence available but not approved
runner.runTest('TC-QA-008', 'evidence available but not approved', () => {
  const context = createHealthyContext();
  context.evidence_registry['EVI-001'].evidence_state = 'submitted'; // Not approved
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.REQUIRES_REVIEW) {
    throw new Error(`Expected REQUIRES_REVIEW for unapproved evidence, got ${snapshot.overall_health_state}`);
  }
  const hasUnapprovedCheck = snapshot.review_checks.some(c => c.check_id.startsWith('CHK-EVI-UNAPPROVED'));
  if (!hasUnapprovedCheck) {
    throw new Error('Missing CHK-EVI-UNAPPROVED check');
  }
});

// TC-QA-009: missing provenance
runner.runTest('TC-QA-009', 'missing provenance', () => {
  const context = createHealthyContext();
  delete context.activity_data[0].provenance;
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for missing provenance, got ${snapshot.overall_health_state}`);
  }
  if (!snapshot.issue_references.includes('ISSUE-PROV-001')) {
    throw new Error('Expected ISSUE-PROV-001 to be surfaced');
  }
});

// TC-QA-010: broken provenance lineage
runner.runTest('TC-QA-010', 'broken provenance lineage', () => {
  const context = createHealthyContext();
  context.activity_data[0].provenance.broken_lineage = true;
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for broken provenance lineage, got ${snapshot.overall_health_state}`);
  }
  const hasBrokenCheck = snapshot.blocked_checks.some(c => c.check_id.startsWith('CHK-PROV-BROKEN-LINEAGE'));
  if (!hasBrokenCheck) {
    throw new Error('Missing CHK-PROV-BROKEN-LINEAGE check');
  }
});

// TC-QA-011: methodology unresolved
runner.runTest('TC-QA-011', 'methodology unresolved', () => {
  const context = createHealthyContext();
  context.methodology = null;
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for missing methodology, got ${snapshot.overall_health_state}`);
  }
  if (!snapshot.issue_references.includes('ISSUE-MTH-001')) {
    throw new Error('Expected ISSUE-MTH-001 to be surfaced');
  }
});

// TC-QA-012: CalculationPlan not ready
runner.runTest('TC-QA-012', 'CalculationPlan not ready', () => {
  const context = createHealthyContext();
  context.calculation_plan.plan_status = 'DRAFT'; // Not READY
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for unready calculation plan, got ${snapshot.overall_health_state}`);
  }
  const hasPlanCheck = snapshot.blocked_checks.some(c => c.check_id === 'CHK-PLAN-NOT-READY');
  if (!hasPlanCheck) {
    throw new Error('Missing CHK-PLAN-NOT-READY check');
  }
});

// TC-QA-013: EF unresolved
runner.runTest('TC-QA-013', 'EF unresolved', () => {
  const context = createHealthyContext();
  context.emission_factors = []; // Missing
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for unresolved emission factors, got ${snapshot.overall_health_state}`);
  }
  if (!snapshot.issue_references.includes('ISSUE-EFR-001')) {
    throw new Error('Expected ISSUE-EFR-001 to be surfaced');
  }
});

// TC-QA-014: GWP unresolved
runner.runTest('TC-QA-014', 'GWP unresolved', () => {
  const context = createHealthyContext();
  context.gwp_dataset = null;
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for unresolved GWP dataset, got ${snapshot.overall_health_state}`);
  }
  if (!snapshot.issue_references.includes('ISSUE-GWP-001')) {
    throw new Error('Expected ISSUE-GWP-001 to be surfaced');
  }
});

// TC-QA-015: regulatory conflict
runner.runTest('TC-QA-015', 'regulatory conflict', () => {
  const context = createHealthyContext();
  context.regulatory_context.status = 'CONFLICT';
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for regulatory conflict, got ${snapshot.overall_health_state}`);
  }
  if (!snapshot.issue_references.includes('ISSUE-RRM-002')) {
    throw new Error('Expected ISSUE-RRM-002 to be surfaced');
  }
});

// TC-QA-016: sector ambiguity
runner.runTest('TC-QA-016', 'sector ambiguity', () => {
  const context = createHealthyContext();
  context.sector_ambiguity = true;
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.REQUIRES_REVIEW) {
    throw new Error(`Expected REQUIRES_REVIEW for sector ambiguity, got ${snapshot.overall_health_state}`);
  }
  if (!snapshot.issue_references.includes('ISSUE-SPM-001')) {
    throw new Error('Expected ISSUE-SPM-001 to be surfaced');
  }
});

// TC-QA-017: duplicate ActivityData
runner.runTest('TC-QA-017', 'duplicate ActivityData', () => {
  const context = createHealthyContext();
  context.activity_data.push({
    activity_data_id: 'ACT-002-CLONE',
    facility_id: 'FAC-SYNTH-001',
    activity_type: 'GRID_ELECTRICITY',
    quantity: 1250.0,
    unit: 'MWh',
    activity_period: {
      start: '2026-01-01T00:00:00Z',
      end: '2026-01-31T23:59:59Z'
    }
  });
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for duplicate activity data, got ${snapshot.overall_health_state}`);
  }
  const hasDupCheck = snapshot.blocked_checks.some(c => c.check_id.startsWith('CHK-DUP-'));
  if (!hasDupCheck) {
    throw new Error('Missing CHK-DUP check');
  }
});

// TC-QA-018: conflicting ActivityData
runner.runTest('TC-QA-018', 'conflicting ActivityData', () => {
  const context = createHealthyContext();
  context.activity_data.push({
    activity_data_id: 'ACT-002-CONFLICT',
    facility_id: 'FAC-SYNTH-001',
    activity_type: 'GRID_ELECTRICITY',
    quantity: 1800.0, // Differing quantity for identical period!
    unit: 'MWh',
    activity_period: {
      start: '2026-01-01T00:00:00Z',
      end: '2026-01-31T23:59:59Z'
    }
  });
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for conflicting activity data, got ${snapshot.overall_health_state}`);
  }
  const hasConfCheck = snapshot.blocked_checks.some(c => c.check_id.startsWith('CHK-CONF-'));
  if (!hasConfCheck) {
    throw new Error('Missing CHK-CONF check');
  }
});

// TC-QA-019: historical version conflict
runner.runTest('TC-QA-019', 'historical version conflict', () => {
  const context = createHealthyContext();
  context.version_conflict = true;
  const snapshot = engine.evaluateHealth(context);

  if (snapshot.overall_health_state !== DATA_HEALTH_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for version conflict, got ${snapshot.overall_health_state}`);
  }
  const hasVerCheck = snapshot.blocked_checks.some(c => c.check_id === 'CHK-VER-CONFLICT');
  if (!hasVerCheck) {
    throw new Error('Missing CHK-VER-CONFLICT check');
  }
});

// TC-QA-020: controlled issue propagation
runner.runTest('TC-QA-020', 'controlled issue propagation', () => {
  const context = createHealthyContext();
  context.controlled_issues = ['ISSUE-CES-001', 'ISSUE-CES-REG-001', 'ISSUE-TEMP-003'];
  const snapshot = engine.evaluateHealth(context);

  for (const issue of context.controlled_issues) {
    if (!snapshot.issue_references.includes(issue)) {
      throw new Error(`Expected controlled issue ${issue} to be propagated into snapshot`);
    }
  }
});

// TC-QA-021: healthy state deterministic repetition
runner.runTest('TC-QA-021', 'healthy state deterministic repetition', () => {
  const context = createHealthyContext();
  const snap1 = engine.evaluateHealth(context);
  const snap2 = engine.evaluateHealth(context);
  const snap3 = engine.evaluateHealth(context);

  if (snap1.overall_health_state !== snap2.overall_health_state || snap2.overall_health_state !== snap3.overall_health_state) {
    throw new Error('Non-deterministic overall health states across runs');
  }
  if (snap1.checks.length !== snap2.checks.length || snap2.checks.length !== snap3.checks.length) {
    throw new Error('Non-deterministic checks count across runs');
  }
});

// TC-QA-022: health snapshot reproducibility
runner.runTest('TC-QA-022', 'health snapshot reproducibility', () => {
  const context = createHealthyContext();
  const snap1 = engine.evaluateHealth(context);
  const snap2 = engine.evaluateHealth(context);

  if (snap1.reproducibility_hash !== snap2.reproducibility_hash) {
    throw new Error(`Reproducibility hash mismatch: ${snap1.reproducibility_hash} vs ${snap2.reproducibility_hash}`);
  }
  if (!Object.isFrozen(snap1) || !Object.isFrozen(snap1.dimension_results)) {
    throw new Error('Health snapshot is not frozen immutable');
  }
});

// TC-QA-023: no numerical calculation leakage
runner.runTest('TC-QA-023', 'no numerical calculation leakage', () => {
  const methods = Object.getOwnPropertyNames(QAQCEngine.prototype);
  const forbidden = ['calculateEmissions', 'applyEmissionFactor', 'applyGwp', 'executeModel', 'calculateScope'];
  for (const f of forbidden) {
    if (methods.includes(f)) {
      throw new Error(`Forbidden calculation method ${f} found on QAQCEngine`);
    }
  }

  const snapshot = engine.evaluateHealth(createHealthyContext());
  if (snapshot.total_emissions !== undefined || snapshot.co2e !== undefined || snapshot.calculated_ghg !== undefined) {
    throw new Error('Numerical calculation leakage detected on DataHealthSnapshot');
  }
});

// TC-QA-024: no arbitrary numerical health score
runner.runTest('TC-QA-024', 'no arbitrary numerical health score', () => {
  const snapshot = engine.evaluateHealth(createHealthyContext());
  if (snapshot.overall_health_score !== undefined || snapshot.score !== undefined || snapshot.health_score !== undefined) {
    throw new Error('Arbitrary numerical health score found on DataHealthSnapshot! Must remain purely semantic.');
  }

  // Dimension results must also be purely semantic states
  for (const [dim, state] of Object.entries(snapshot.dimension_results)) {
    if (typeof state === 'number') {
      throw new Error(`Dimension ${dim} returned a numerical score (${state}) instead of a semantic state`);
    }
    if (!Object.values(DATA_HEALTH_STATES).includes(state)) {
      throw new Error(`Dimension ${dim} state ${state} is not a valid governed DATA_HEALTH_STATE`);
    }
  }
});

runner.report();
