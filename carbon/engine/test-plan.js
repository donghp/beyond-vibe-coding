/**
 * ENERIX Carbon - Calculation Plan Engine Test Suite
 * Executes and verifies all 24 required plan engine scenarios (TC-PLAN-001 to TC-PLAN-024),
 * checking for fail-closed behavior, metadata isolation, and dynamic model structures.
 */

import { calculationPlanEngine, CalculationPlan } from './plan-engine.js';
import { CONTROLLED_ISSUES } from './methodology-engine.js';

class PlanTestRunner {
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
    console.log('ENERIX CARBON - CALCULATION PLAN VERIFICATION SUMMARY');
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
      console.log('\n\x1b[32m✓ All calculation plan engine tests passed with 100% compliance and integrity!\x1b[0m\n');
    }
  }
}

const runner = new PlanTestRunner();

console.log('Starting ENERIX Carbon Calculation Plan Engine Verification Suite...\n');

// Standard Compliant Inputs for TC-PLAN-001 Base
const getBaseContext = () => ({
  facility_id: "FAC-STEEL-01",
  facility: {
    sector_id: "SEC-01-ENERGY",
    toe_consumption: 1200
  },
  reporting_period: {
    period_start: "2026-01-01",
    period_end: "2026-12-31"
  },
  regulatory_applicability: {
    applicability_status: "APPLICABLE",
    matched_rules: ["RULE-QD-42-2026-PRIMARY"]
  },
  activity_context: {
    activity_type: "ACT-COAL",
    source_class: "stationary_combustion",
    parameters: ["PAR-NCV"]
  },
  activity_data: [
    { quantity: 150.5, unit: "t" }
  ],
  emission_factors: [
    { factor_id: "EF-COAL-001", gas: "CO2e", value: 2.5, unit: "t/t" }
  ],
  gwp_dataset: {
    dataset_id: "GWP-IPCC-AR5"
  },
  evidence_context: {
    supplied_evidence: ["fuel_invoice"]
  },
  provenance: {
    created_by: "Gov Auditor",
    reviewed_by: "Compliance Panel"
  }
});

const getBaseSelection = () => ({
  selected_methodology_id: "METH-BCT-38-2023",
  selected_methodology_version: "1.0.0",
  selection_status: "APPLICABLE",
  selection_reason: "Single clearly applicable methodology successfully resolved.",
  activity_basis: {
    activity_type: "ACT-COAL",
    source_class: "stationary_combustion",
    applicable_models: [
      { model_id: "MODEL-02", selection_strength: "REQUIRED" }
    ]
  },
  evidence_basis: {
    required_evidence: ["fuel_invoice"],
    supplied_evidence: ["fuel_invoice"],
    evidence_compliance_status: true
  }
});

// TC-PLAN-001: Minimal valid calculation plan
runner.runTest('TC-PLAN-001', 'Minimal valid calculation plan creation', () => {
  const context = getBaseContext();
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  if (plan.status !== "READY" || plan.readiness !== "READY") {
    throw new Error(`Expected plan status/readiness to be READY, got status=${plan.status}, readiness=${plan.readiness}`);
  }
  if (!plan.reproducibility_identity) {
    throw new Error("Missing reproducibility_identity");
  }
  if (plan.steps.length === 0) {
    throw new Error("Expected at least one step");
  }
  if (plan.required_activity_data.length === 0) {
    throw new Error("Expected required activity data list");
  }
});

// TC-PLAN-002: Missing facility
runner.runTest('TC-PLAN-002', 'Fail-Closed on missing facility identifier', () => {
  const context = getBaseContext();
  delete context.facility_id;
  delete context.facility;
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  if (plan.status !== "BLOCKED" || plan.readiness !== "BLOCKED") {
    throw new Error(`Expected status=BLOCKED, readiness=BLOCKED; got status=${plan.status}, readiness=${plan.readiness}`);
  }
});

// TC-PLAN-003: Missing regulatory applicability
runner.runTest('TC-PLAN-003', 'Fail-Closed on missing regulatory applicability', () => {
  const context = getBaseContext();
  delete context.regulatory_applicability;
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  if (plan.status !== "BLOCKED" || plan.readiness !== "BLOCKED") {
    throw new Error(`Expected status=BLOCKED, readiness=BLOCKED; got status=${plan.status}, readiness=${plan.readiness}`);
  }
});

// TC-PLAN-004: Missing temporal segment
runner.runTest('TC-PLAN-004', 'Fail-Closed on missing temporal segment', () => {
  const context = getBaseContext();
  delete context.reporting_period;
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  if (plan.status !== "BLOCKED" || plan.readiness !== "BLOCKED") {
    throw new Error(`Expected status=BLOCKED, readiness=BLOCKED; got status=${plan.status}, readiness=${plan.readiness}`);
  }
});

// TC-PLAN-005: Missing methodology selection
runner.runTest('TC-PLAN-005', 'Fail-Closed on missing methodology selection', () => {
  const context = getBaseContext();
  const plan = calculationPlanEngine.generatePlan(context, null);

  if (plan.status !== "BLOCKED" || plan.readiness !== "BLOCKED") {
    throw new Error(`Expected status=BLOCKED, readiness=BLOCKED; got status=${plan.status}, readiness=${plan.readiness}`);
  }
});

// TC-PLAN-006: Methodology selected but activity data missing
runner.runTest('TC-PLAN-006', 'Fail-Closed when methodology selected but activity data missing', () => {
  const context = getBaseContext();
  context.activity_data = []; // empty
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  if (plan.status !== "BLOCKED" || plan.readiness !== "NOT_READY") {
    throw new Error(`Expected status=BLOCKED, readiness=NOT_READY; got status=${plan.status}, readiness=${plan.readiness}`);
  }
});

// TC-PLAN-007: Methodology selected but parameter requirement missing
runner.runTest('TC-PLAN-007', 'Fail-Closed when methodology selected but parameter requirement missing', () => {
  const context = getBaseContext();
  context.activity_context.parameters = []; // missing PAR-NCV
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  if (plan.status !== "BLOCKED" || plan.readiness !== "NOT_READY") {
    throw new Error(`Expected status=BLOCKED, readiness=NOT_READY; got status=${plan.status}, readiness=${plan.readiness}`);
  }
});

// TC-PLAN-008: Required EF requirement missing
runner.runTest('TC-PLAN-008', 'Fail-Closed when methodology selected but emission factor missing', () => {
  const context = getBaseContext();
  context.emission_factors = []; // missing
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  if (plan.status !== "BLOCKED" || plan.readiness !== "NOT_READY") {
    throw new Error(`Expected status=BLOCKED, readiness=NOT_READY; got status=${plan.status}, readiness=${plan.readiness}`);
  }
});

// TC-PLAN-009: Required GWP requirement missing
runner.runTest('TC-PLAN-009', 'Fail-Closed when methodology selected but GWP dataset missing', () => {
  const context = getBaseContext();
  delete context.gwp_dataset; // missing
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  if (plan.status !== "BLOCKED" || plan.readiness !== "NOT_READY") {
    throw new Error(`Expected status=BLOCKED, readiness=NOT_READY; got status=${plan.status}, readiness=${plan.readiness}`);
  }
});

// TC-PLAN-010: Required evidence requirement missing
runner.runTest('TC-PLAN-010', 'Fail-Closed when methodology selected but required evidence missing', () => {
  const context = getBaseContext();
  context.evidence_context.supplied_evidence = []; // missing
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  if (plan.status !== "BLOCKED" || plan.readiness !== "NOT_READY") {
    throw new Error(`Expected status=BLOCKED, readiness=NOT_READY; got status=${plan.status}, readiness=${plan.readiness}`);
  }
});

// TC-PLAN-011: Multiple calculation steps
runner.runTest('TC-PLAN-011', 'Verify support for multiple calculation steps', () => {
  const context = getBaseContext();
  const selection = getBaseSelection();
  // We can explicitly configure MODEL-08 for multi-step mass balance
  selection.activity_basis.applicable_models = [{ model_id: "MODEL-08", selection_strength: "REQUIRED" }];

  const plan = calculationPlanEngine.generatePlan(context, selection);
  if (plan.steps.length < 2) {
    throw new Error(`Expected multiple steps for MODEL-08, got ${plan.steps.length}`);
  }
});

// TC-PLAN-012: Multiple calculation model bindings
runner.runTest('TC-PLAN-012', 'Verify propagation of multiple model bindings from methodology', () => {
  const context = getBaseContext();
  const selection = getBaseSelection();
  selection.activity_basis.applicable_models = [
    { model_id: "MODEL-03", selection_strength: "REQUIRED" },
    { model_id: "MODEL-04", selection_strength: "ALLOWED" }
  ];

  const plan = calculationPlanEngine.generatePlan(context, selection);
  if (plan.steps[0].calculation_model_id !== "MODEL-03") {
    throw new Error(`Expected steps bound to first active model ID, got ${plan.steps[0].calculation_model_id}`);
  }
});

// TC-PLAN-013: Temporal multi-segment plan
runner.runTest('TC-PLAN-013', 'Verify temporal multi-segment plan triggers segmentation issues', () => {
  const context = getBaseContext();
  context.is_straddled = true; // Simulating straddled reporting period
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  const hasSegmentIssue = plan.controlled_issues.some(issue => issue.id === "ISSUE-TEMP-002");
  if (!hasSegmentIssue) {
    throw new Error("Expected ISSUE-TEMP-002 (Mid-Month Transition) to be propagated inside controlled_issues");
  }
});

// TC-PLAN-014: Historical methodology/plan version
runner.runTest('TC-PLAN-014', 'Verify plan respects historical methodology and plan version context', () => {
  const context = getBaseContext();
  context.plan_version = "0.9.0";
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  if (plan.plan_version !== "0.9.0") {
    throw new Error(`Expected plan version to be 0.9.0, got ${plan.plan_version}`);
  }
});

// TC-PLAN-015: Plan supersession
runner.runTest('TC-PLAN-015', 'Verify plan supports explicit lifecycle status supersession', () => {
  const context = getBaseContext();
  context.plan_status = "SUPERSEDED";
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  if (plan.status !== "SUPERSEDED") {
    throw new Error(`Expected plan status to be SUPERSEDED, got ${plan.status}`);
  }
});

// TC-PLAN-016: Deterministic repeated plan generation
runner.runTest('TC-PLAN-016', 'Verify deterministic identical plan hashes for identical parameters', () => {
  const context1 = getBaseContext();
  const selection1 = getBaseSelection();
  const plan1 = calculationPlanEngine.generatePlan(context1, selection1);

  const context2 = getBaseContext();
  const selection2 = getBaseSelection();
  const plan2 = calculationPlanEngine.generatePlan(context2, selection2);

  if (plan1.reproducibility_identity !== plan2.reproducibility_identity) {
    throw new Error(`Expected deterministic plan hashes to be identical, got h1=${plan1.reproducibility_identity}, h2=${plan2.reproducibility_identity}`);
  }
});

// TC-PLAN-017: Dependency graph ordering
runner.runTest('TC-PLAN-017', 'Verify dependency graph ordering maps tasks correctly', () => {
  const context = getBaseContext();
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  if (plan.dependencies.length === 0) {
    throw new Error("Missing dependencies array in calculation plan");
  }
  const calcTask = plan.dependencies.find(d => d.task === "Calculation Execution");
  if (!calcTask || !calcTask.depends_on.includes("Activity Data Collection")) {
    throw new Error("Calculation Execution must depend on Activity Data Collection");
  }
});

// TC-PLAN-018: Unknown prerequisite remains non-ready
runner.runTest('TC-PLAN-018', 'Verify unknown regulatory status results in non-ready plan', () => {
  const context = getBaseContext();
  context.regulatory_applicability.applicability_status = "UNKNOWN";
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  if (plan.status !== "REVIEW_REQUIRED" || plan.readiness !== "REVIEW_REQUIRED") {
    throw new Error(`Expected status=REVIEW_REQUIRED, readiness=REVIEW_REQUIRED; got status=${plan.status}, readiness=${plan.readiness}`);
  }
});

// TC-PLAN-019: Ambiguous upstream methodology selection
runner.runTest('TC-PLAN-019', 'Verify ambiguous methodology selection results in REVIEW_REQUIRED', () => {
  const context = getBaseContext();
  const selection = getBaseSelection();
  selection.selection_status = "REQUIRES_REVIEW";
  selection.selection_reason = "Multiple overlapping circulars.";

  const plan = calculationPlanEngine.generatePlan(context, selection);
  if (plan.status !== "REVIEW_REQUIRED" || plan.readiness !== "REVIEW_REQUIRED") {
    throw new Error(`Expected status=REVIEW_REQUIRED, readiness=REVIEW_REQUIRED; got status=${plan.status}, readiness=${plan.readiness}`);
  }
});

// TC-PLAN-020: Controlled issue propagation
runner.runTest('TC-PLAN-020', 'Verify controlled issues propagate appropriately based on multi-sector context', () => {
  const context = getBaseContext();
  context.facility.sector_id = "SEC-AMBIGUOUS"; // Simulating dual-use or ambiguous sector
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  const hasSectorIssue = plan.controlled_issues.some(issue => issue.id === "ISSUE-SPM-003");
  if (!hasSectorIssue) {
    throw new Error("Expected ISSUE-SPM-003 to propagate for ambiguous facility sectors.");
  }
});

// TC-PLAN-021: MODEL-06 dynamic plan structure
runner.runTest('TC-PLAN-021', 'Verify MODEL-06 dynamic time-series plan steps', () => {
  const context = getBaseContext();
  const selection = getBaseSelection();
  selection.activity_basis.applicable_models = [{ model_id: "MODEL-06", selection_strength: "REQUIRED" }];

  const plan = calculationPlanEngine.generatePlan(context, selection);
  const initStep = plan.steps.find(s => s.step_id === "STEP-M06-INIT");
  const loopStep = plan.steps.find(s => s.step_id === "STEP-M06-DECAY-LOOP");

  if (!initStep || !loopStep) {
    throw new Error("Missing initial or iteration steps for dynamic decay model.");
  }
});

// TC-PLAN-022: MODEL-08 allocation plan structure
runner.runTest('TC-PLAN-022', 'Verify MODEL-08 mass balance allocation plan steps', () => {
  const context = getBaseContext();
  const selection = getBaseSelection();
  selection.activity_basis.applicable_models = [{ model_id: "MODEL-08", selection_strength: "REQUIRED" }];

  const plan = calculationPlanEngine.generatePlan(context, selection);
  const massIn = plan.steps.find(s => s.step_id === "STEP-M08-MASS-INFLOW");
  const massOut = plan.steps.find(s => s.step_id === "STEP-M08-MASS-OUTFLOW");
  const alloc = plan.steps.find(s => s.step_id === "STEP-M08-ALLOCATION");

  if (!massIn || !massOut || !alloc) {
    throw new Error("Missing mass inflow, mass outflow, or allocation check steps.");
  }
});

// TC-PLAN-023: MODEL-10 aggregation plan structure
runner.runTest('TC-PLAN-023', 'Verify MODEL-10 corporate aggregation boundary steps', () => {
  const context = getBaseContext();
  const selection = getBaseSelection();
  selection.activity_basis.applicable_models = [{ model_id: "MODEL-10", selection_strength: "REQUIRED" }];

  const plan = calculationPlanEngine.generatePlan(context, selection);
  const boundaryStep = plan.steps.find(s => s.step_id === "STEP-M10-VERIFY-BOUNDARIES");
  const aggregateStep = plan.steps.find(s => s.step_id === "STEP-M10-CONSOLIDATE");

  if (!boundaryStep || !aggregateStep) {
    throw new Error("Missing sub-facility boundary verification or aggregation steps.");
  }
});

// TC-PLAN-024: No numerical calculation performed
runner.runTest('TC-PLAN-024', 'Verify absolute lack of numerical calculations / authority leakage', () => {
  const context = getBaseContext();
  const selection = getBaseSelection();
  const plan = calculationPlanEngine.generatePlan(context, selection);

  // Assert that no output emissions exist on the plan object
  if (plan.total_co2e !== undefined || plan.resultCO2e !== undefined || plan.calculated_emissions !== undefined) {
    throw new Error("Numerical emissions output leaked into the Calculation Plan.");
  }

  // Deeply inspect the plan structure to ensure no computed emission numeric value keys
  const serialized = JSON.stringify(plan);
  if (serialized.includes("calculated_mass") || serialized.includes("gas_results")) {
    throw new Error("Prohibited computed gas mass arrays leaked into the plan.");
  }
});

runner.report();
