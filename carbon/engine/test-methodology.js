/**
 * ENERIX Carbon - Methodology Selection Engine Test Suite
 * Executes and verifies all 20 required methodological scenarios (TC-MTH-001 to TC-MTH-020),
 * boundary conditions, and fail-closed evaluation rules.
 */

import {
  methodologySelectionEngine,
  GOVERNED_METHODOLOGIES,
  CONTROLLED_ISSUES,
  MethodologySelectionEngine
} from './methodology-engine.js';

class MethodologyTestRunner {
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
    console.log('ENERIX CARBON - METHODOLOGY VERIFICATION SUMMARY');
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
      console.log('\n\x1b[32m✓ All methodology selection engine tests passed with 100% compliance and integrity!\x1b[0m\n');
    }
  }
}

const runner = new MethodologyTestRunner();

console.log('Starting ENERIX Carbon Methodology Selection Engine Verification Suite...\n');

// Standard Compliant Inputs for TC-MTH-001 Base
const baseContext = {
  facility_id: "FAC-MOIT-POWER-001",
  facility: {
    sector_id: "SEC-01-ENERGY"
  },
  regulatory_applicability: {
    applicability_status: "APPLICABLE",
    matched_rules: ["RULE-MOIT-POWER-BASE"]
  },
  reporting_period: {
    period_start: "2026-01-01",
    period_end: "2026-06-30"
  },
  activity_context: {
    activity_type: "ACT-COAL",
    source_class: "stationary_combustion",
    parameters: ["PAR-NCV"]
  },
  evidence_context: {
    supplied_evidence: ["fuel_invoice"]
  },
  provenance: {
    created_by: "Gov Auditor",
    reviewed_by: "Compliance Panel"
  }
};

// TC-MTH-001: Single clearly applicable methodology
runner.runTest('TC-MTH-001', 'Single clearly applicable methodology resolution', () => {
  // Use a custom engine instance with only ONE active candidate matching SEC-01-ENERGY to avoid conflict
  const singleCandidate = GOVERNED_METHODOLOGIES.filter(m => m.methodology_id === "METH-BCT-38-2023");
  const engine = new MethodologySelectionEngine(singleCandidate);

  const result = engine.evaluate(baseContext);

  if (result.selection_status !== "APPLICABLE") {
    throw new Error(`Expected APPLICABLE, got ${result.selection_status}`);
  }
  if (result.selected_methodology_id !== "METH-BCT-38-2023") {
    throw new Error(`Expected METH-BCT-38-2023, got ${result.selected_methodology_id}`);
  }
  if (result.selected_methodology_version !== "1.0.0") {
    throw new Error(`Expected version 1.0.0, got ${result.selected_methodology_version}`);
  }
});

// TC-MTH-002: Clearly non-applicable methodology
runner.runTest('TC-MTH-002', 'Clearly non-applicable methodology sector mismatch', () => {
  const singleCandidate = GOVERNED_METHODOLOGIES.filter(m => m.methodology_id === "METH-BCT-38-2023");
  const engine = new MethodologySelectionEngine(singleCandidate);

  const context = {
    ...baseContext,
    facility: { sector_id: "SEC-03-CONSTRUCTION" } // CONSTRUCTION sector is registered, but candidate is bound to SEC-01-ENERGY
  };
  const result = engine.evaluate(context);
  if (result.selection_status !== "NOT_APPLICABLE") {
    throw new Error(`Expected NOT_APPLICABLE, got ${result.selection_status}`);
  }
});

// TC-MTH-003: Missing activity context
runner.runTest('TC-MTH-003', 'Missing activity context triggers REQUIRES_REVIEW', () => {
  const context = {
    ...baseContext,
    activity_context: null
  };
  const result = methodologySelectionEngine.evaluate(context);
  if (result.selection_status !== "REQUIRES_REVIEW") {
    throw new Error(`Expected REQUIRES_REVIEW, got ${result.selection_status}`);
  }
  if (!result.selection_reason.includes("Missing required activity context")) {
    throw new Error(`Expected missing context reason, got: ${result.selection_reason}`);
  }
});

// TC-MTH-004: Ambiguous sector mapping
runner.runTest('TC-MTH-004', 'Ambiguous sector mapping triggers REQUIRES_REVIEW', () => {
  const context = {
    ...baseContext,
    facility: { sector_id: "SEC-AMBIGUOUS" }
  };
  const result = methodologySelectionEngine.evaluate(context);
  if (result.selection_status !== "REQUIRES_REVIEW") {
    throw new Error(`Expected REQUIRES_REVIEW, got ${result.selection_status}`);
  }
  if (!result.selection_reason.includes("Sector mapping is AMBIGUOUS")) {
    throw new Error(`Expected ambiguous sector mapping reason, got: ${result.selection_reason}`);
  }
});

// TC-MTH-005: Historical methodology selection
runner.runTest('TC-MTH-005', 'Historical methodology version selection (2025 Circular 13)', () => {
  const context = {
    ...baseContext,
    facility: { sector_id: "SEC-03-CONSTRUCTION" },
    reporting_period: {
      period_start: "2025-01-01",
      period_end: "2025-12-31"
    },
    activity_context: {
      activity_type: "ACT-CLINKER",
      source_class: "industrial_process",
      parameters: ["PAR-PURITY"]
    },
    evidence_context: {
      supplied_evidence: ["production_record"]
    }
  };
  const result = methodologySelectionEngine.evaluate(context);
  if (result.selection_status !== "APPLICABLE") {
    throw new Error(`Expected APPLICABLE historical run, got ${result.selection_status} due to ${result.selection_reason}`);
  }
  if (result.selected_methodology_id !== "METH-BXD-13-2024") {
    throw new Error(`Expected METH-BXD-13-2024, got ${result.selected_methodology_id}`);
  }
});

// TC-MTH-006: Methodology effective_from boundary
runner.runTest('TC-MTH-006', 'Methodology effective_from boundary check', () => {
  const context = {
    ...baseContext,
    facility: { sector_id: "SEC-03-CONSTRUCTION" },
    reporting_period: {
      period_start: "2023-01-01",
      period_end: "2023-12-31" // completely before Circular 13 effective date (2024-01-01)
    },
    activity_context: {
      activity_type: "ACT-CLINKER",
      source_class: "industrial_process",
      parameters: ["PAR-PURITY"]
    },
    evidence_context: {
      supplied_evidence: ["production_record"]
    }
  };
  const result = methodologySelectionEngine.evaluate(context);
  if (result.selection_status !== "NOT_APPLICABLE") {
    throw new Error(`Expected NOT_APPLICABLE before effective boundary, got ${result.selection_status}`);
  }
});

// TC-MTH-007: Methodology effective_to boundary
runner.runTest('TC-MTH-007', 'Methodology effective_to boundary check (Circular 13 replacement)', () => {
  const context = {
    ...baseContext,
    facility: { sector_id: "SEC-03-CONSTRUCTION" },
    reporting_period: {
      period_start: "2026-10-01",
      period_end: "2026-12-31" // after Circular 13 effective_to (2026-09-25)
    },
    activity_context: {
      activity_type: "ACT-CLINKER",
      source_class: "industrial_process",
      parameters: ["PAR-PURITY"]
    },
    evidence_context: {
      supplied_evidence: ["production_record"]
    }
  };
  const result = methodologySelectionEngine.evaluate(context);
  if (result.selection_status !== "APPLICABLE") {
    throw new Error(`Expected APPLICABLE for new active circular, got ${result.selection_status}`);
  }
  if (result.selected_methodology_id !== "METH-MOC-CEMENT-2026") {
    throw new Error(`Expected updated methodology METH-MOC-CEMENT-2026, got ${result.selected_methodology_id}`);
  }
});

// TC-MTH-008: Multiple valid candidates without precedence
runner.runTest('TC-MTH-008', 'Multiple valid candidates conflict without precedence triggers REQUIRES_REVIEW', () => {
  const result = methodologySelectionEngine.evaluate(baseContext);
  if (result.selection_status !== "REQUIRES_REVIEW") {
    throw new Error(`Expected REQUIRES_REVIEW on candidates conflict, got ${result.selection_status}`);
  }
  if (!result.selection_reason.includes("Multiple valid methodology candidates conflict")) {
    throw new Error(`Expected conflict message, got: ${result.selection_reason}`);
  }
});

// TC-MTH-009: Invalid methodology status
runner.runTest('TC-MTH-009', 'DRAFT methodology candidates are blocked from selection', () => {
  const draftOnlyCandidate = GOVERNED_METHODOLOGIES.filter(m => m.methodology_id === "METH-DRAFT-99-2026");
  const engine = new MethodologySelectionEngine(draftOnlyCandidate);

  const result = engine.evaluate(baseContext);
  if (result.selection_status !== "NOT_APPLICABLE" && result.selection_status !== "BLOCKED") {
    throw new Error(`Expected NOT_APPLICABLE or BLOCKED, got ${result.selection_status}`);
  }
});

// TC-MTH-010: Missing provenance
runner.runTest('TC-MTH-010', 'Missing provenance in context blocks selection (Fail-Closed)', () => {
  const context = {
    ...baseContext,
    provenance: null
  };
  const result = methodologySelectionEngine.evaluate(context);
  if (result.selection_status !== "BLOCKED") {
    throw new Error(`Expected BLOCKED for missing provenance, got ${result.selection_status}`);
  }
  if (!result.selection_reason.includes("Missing mandatory selection provenance")) {
    throw new Error(`Expected missing provenance reason, got: ${result.selection_reason}`);
  }
});

// TC-MTH-011: Missing required evidence
runner.runTest('TC-MTH-011', 'Missing required evidence blocks selection (Fail-Closed)', () => {
  const singleCandidate = GOVERNED_METHODOLOGIES.filter(m => m.methodology_id === "METH-BCT-38-2023");
  const engine = new MethodologySelectionEngine(singleCandidate);

  const context = {
    ...baseContext,
    evidence_context: { supplied_evidence: [] } // missing fuel_invoice
  };

  const result = engine.evaluate(context);
  if (result.selection_status !== "BLOCKED") {
    throw new Error(`Expected BLOCKED due to missing evidence, got ${result.selection_status}`);
  }
  if (!result.selection_reason.includes("Missing required evidence")) {
    throw new Error(`Expected missing evidence reason, got: ${result.selection_reason}`);
  }
});

// TC-MTH-012: Evidence present but methodology still ambiguous
runner.runTest('TC-MTH-012', 'Evidence present but methodology still ambiguous on multiple candidates', () => {
  // Both are active and evidence is supplied, so both match
  const result = methodologySelectionEngine.evaluate(baseContext);
  if (result.selection_status !== "REQUIRES_REVIEW") {
    throw new Error(`Expected REQUIRES_REVIEW, got ${result.selection_status}`);
  }
});

// TC-MTH-013: Multiple calculation model bindings
runner.runTest('TC-MTH-013', 'Multiple calculation model bindings are preserved in result', () => {
  const context = {
    ...baseContext,
    facility: { sector_id: "SEC-03-CONSTRUCTION" },
    reporting_period: {
      period_start: "2025-01-01",
      period_end: "2025-12-31"
    },
    activity_context: {
      activity_type: "ACT-CLINKER",
      source_class: "industrial_process",
      parameters: ["PAR-PURITY"]
    },
    evidence_context: {
      supplied_evidence: ["production_record"]
    }
  };
  const result = methodologySelectionEngine.evaluate(context);
  if (result.selection_status !== "APPLICABLE") {
    throw new Error(`Expected APPLICABLE, got ${result.selection_status}`);
  }
  const models = result.activity_basis.applicable_models;
  if (!Array.isArray(models) || models.length !== 2) {
    throw new Error(`Expected exactly 2 model bindings for METH-BXD-13-2024, got ${JSON.stringify(models)}`);
  }
});

// TC-MTH-014: Regulatory applicability unresolved
runner.runTest('TC-MTH-014', 'Unresolved regulatory applicability blocks selection', () => {
  const context = {
    ...baseContext,
    regulatory_applicability: { applicability_status: "REQUIRES_REVIEW" }
  };
  const result = methodologySelectionEngine.evaluate(context);
  if (result.selection_status !== "REQUIRES_REVIEW") {
    throw new Error(`Expected REQUIRES_REVIEW, got ${result.selection_status}`);
  }
});

// TC-MTH-015: Temporal straddling methodology context
runner.runTest('TC-MTH-015', 'Temporal straddling of methodology transition date triggers REQUIRES_REVIEW', () => {
  const context = {
    ...baseContext,
    facility: { sector_id: "SEC-03-CONSTRUCTION" },
    reporting_period: {
      period_start: "2026-09-01",
      period_end: "2026-10-01" // straddles Circular 13 sunset date 2026-09-25
    },
    activity_context: {
      activity_type: "ACT-CLINKER",
      source_class: "industrial_process",
      parameters: ["PAR-PURITY"]
    },
    evidence_context: {
      supplied_evidence: ["production_record"]
    }
  };
  const result = methodologySelectionEngine.evaluate(context);
  if (result.selection_status !== "REQUIRES_REVIEW") {
    throw new Error(`Expected REQUIRES_REVIEW for straddling boundary, got ${result.selection_status}`);
  }
  if (!result.selection_reason.includes("straddles methodology effective boundaries")) {
    throw new Error(`Expected straddle reason, got: ${result.selection_reason}`);
  }
});

// TC-MTH-016: Deterministic repeated selection
runner.runTest('TC-MTH-016', 'Deterministic repeated selection reproducibility (50 iterations)', () => {
  const singleCandidate = GOVERNED_METHODOLOGIES.filter(m => m.methodology_id === "METH-BCT-38-2023");
  const engine = new MethodologySelectionEngine(singleCandidate);

  const firstResult = engine.evaluate(baseContext);
  for (let i = 0; i < 50; i++) {
    const iterResult = engine.evaluate(baseContext);
    if (JSON.stringify(firstResult) !== JSON.stringify(iterResult)) {
      throw new Error(`Varying result detected on iteration ${i}!`);
    }
  }
});

// TC-MTH-017: Historical selection reproducibility
runner.runTest('TC-MTH-017', 'Historical selection reproducibility (independent of evaluation system clock)', () => {
  const context = {
    ...baseContext,
    facility: { sector_id: "SEC-03-CONSTRUCTION" },
    reporting_period: {
      period_start: "2025-01-01",
      period_end: "2025-12-31"
    },
    activity_context: {
      activity_type: "ACT-CLINKER",
      source_class: "industrial_process",
      parameters: ["PAR-PURITY"]
    },
    evidence_context: {
      supplied_evidence: ["production_record"]
    }
  };
  const firstResult = methodologySelectionEngine.evaluate(context);
  const secondResult = methodologySelectionEngine.evaluate(context);
  if (firstResult.reproducibility_identity !== secondResult.reproducibility_identity) {
    throw new Error("Reproducibility identities must match perfectly across runs.");
  }
});

// TC-MTH-018: Methodology revision creates new version
runner.runTest('TC-MTH-018', 'Methodology revision resolves newer version (2.0.0 METH-MOC-CEMENT-2026)', () => {
  const context = {
    ...baseContext,
    facility: { sector_id: "SEC-03-CONSTRUCTION" },
    reporting_period: {
      period_start: "2026-10-01",
      period_end: "2027-10-01" // Post-revision period
    },
    activity_context: {
      activity_type: "ACT-CLINKER",
      source_class: "industrial_process",
      parameters: ["PAR-PURITY"]
    },
    evidence_context: {
      supplied_evidence: ["production_record"]
    }
  };
  const result = methodologySelectionEngine.evaluate(context);
  if (result.selection_status !== "APPLICABLE") {
    throw new Error(`Expected APPLICABLE post-revision, got ${result.selection_status}`);
  }
  if (result.selected_methodology_id !== "METH-MOC-CEMENT-2026" || result.selected_methodology_version !== "2.0.0") {
    throw new Error(`Expected METH-MOC-CEMENT-2026 v2.0.0, got ${result.selected_methodology_id} v${result.selected_methodology_version}`);
  }
});

// TC-MTH-019: Parameter requirement without numerical fallback
runner.runTest('TC-MTH-019', 'Missing mandatory parameter blocks selection without default values (Fail-Closed)', () => {
  const singleCandidate = GOVERNED_METHODOLOGIES.filter(m => m.methodology_id === "METH-BCT-38-2023");
  const engine = new MethodologySelectionEngine(singleCandidate);

  const context = {
    ...baseContext,
    activity_context: {
      activity_type: "ACT-COAL",
      source_class: "stationary_combustion",
      parameters: [] // missing PAR-NCV
    }
  };

  const result = engine.evaluate(context);
  if (result.selection_status !== "BLOCKED") {
    throw new Error(`Expected BLOCKED for missing parameter requirement, got ${result.selection_status}`);
  }
  if (!result.selection_reason.includes("Missing required parameter requirement")) {
    throw new Error(`Expected missing parameter reason, got: ${result.selection_reason}`);
  }
});

// TC-MTH-020: Controlled issue preservation
runner.runTest('TC-MTH-020', 'Controlled issue register preservation', () => {
  if (!CONTROLLED_ISSUES["ISSUE-MTH-001"]) {
    throw new Error("Missing ISSUE-MTH-001 in Controlled Issues registry.");
  }
  if (CONTROLLED_ISSUES["ISSUE-MTH-001"].status !== "OPEN_CONTROLLED") {
    throw new Error("ISSUE-MTH-001 must have status OPEN_CONTROLLED.");
  }
});

runner.report();
