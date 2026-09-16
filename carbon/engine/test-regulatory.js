/**
 * ENERIX Carbon - Regulatory Applicability Engine Test Runner
 * Executes and verifies all 20 regulatory evaluation scenarios specified in the mandate.
 */

import { regulatoryEngine, GOVERNED_RULES, TAXONOMY_REGISTRY } from './regulatory-engine.js';

class RegulatoryTestRunner {
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
    console.log('ENERIX CARBON - REGULATORY VERIFICATION SUMMARY');
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
      console.log('\n\x1b[32m✓ All regulatory applicability verification tests passed successfully!\x1b[0m\n');
      process.exit(0);
    }
  }
}

const runner = new RegulatoryTestRunner();

console.log('Starting ENERIX Carbon Regulatory Applicability Engine Verification Suite...\n');

// 1. Clearly Applicable Rule
runner.runTest('TC-REG-01', 'Clearly Applicable Rule (Energy Facility meeting 1200 TOE threshold)', () => {
  const context = {
    facility_id: 'FAC-ENG-001',
    jurisdiction: 'VN',
    reporting_period: { period_start: '2027-01-01', period_end: '2027-12-31' },
    facility: {
      sector_id: 'SEC-01-ENERGY',
      attributes: { annual_energy_consumption: 1200 }
    }
  };
  const result = regulatoryEngine.evaluate(context);
  if (result.applicability_status !== 'APPLICABLE' || result.mandatory_status !== 'MANDATORY') {
    throw new Error(`Expected APPLICABLE and MANDATORY, got Applicability=${result.applicability_status}, Mandatory=${result.mandatory_status}`);
  }
  if (!result.matched_rules.includes('RULE-QD-42-2026-PRIMARY')) {
    throw new Error('Expected RULE-QD-42-2026-PRIMARY to be matched');
  }
});

// 2. Clearly Non-applicable Rule
runner.runTest('TC-REG-02', 'Clearly Non-applicable Rule (Energy Facility below 1000 TOE threshold)', () => {
  const context = {
    facility_id: 'FAC-ENG-002',
    jurisdiction: 'VN',
    reporting_period: { period_start: '2027-01-01', period_end: '2027-12-31' },
    facility: {
      sector_id: 'SEC-01-ENERGY',
      attributes: { annual_energy_consumption: 500 }
    }
  };
  const result = regulatoryEngine.evaluate(context);
  if (result.applicability_status !== 'NOT_APPLICABLE' || result.mandatory_status !== 'NOT_MANDATORY') {
    throw new Error(`Expected NOT_APPLICABLE and NOT_MANDATORY, got Applicability=${result.applicability_status}, Mandatory=${result.mandatory_status}`);
  }
});

// 3. Unknown Condition
runner.runTest('TC-REG-03', 'Unknown Condition (Missing annual energy consumption attribute)', () => {
  const context = {
    facility_id: 'FAC-ENG-003',
    jurisdiction: 'VN',
    reporting_period: { period_start: '2027-01-01', period_end: '2027-12-31' },
    facility: {
      sector_id: 'SEC-01-ENERGY',
      attributes: { annual_energy_consumption: null } // missing
    }
  };
  const result = regulatoryEngine.evaluate(context);
  if (result.applicability_status !== 'UNKNOWN' || result.mandatory_status !== 'UNKNOWN') {
    throw new Error(`Expected UNKNOWN status on missing threshold attribute, got Applicability=${result.applicability_status}, Mandatory=${result.mandatory_status}`);
  }
});

// 4. Requires-Review Condition
runner.runTest('TC-REG-04', 'Requires-Review Condition (Partial sector mapping)', () => {
  const context = {
    facility_id: 'FAC-WST-001',
    jurisdiction: 'VN',
    reporting_period: { period_start: '2027-01-01', period_end: '2027-12-31' },
    facility: {
      sector_id: 'SEC-02-WASTE',
      attributes: { annual_energy_consumption: 800 }
    }
  };
  const result = regulatoryEngine.evaluate(context);
  // Partial mapping triggers compliance audit escalation
  if (result.applicability_status !== 'REQUIRES_REVIEW' || result.mandatory_status !== 'REQUIRES_REVIEW') {
    throw new Error(`Expected REQUIRES_REVIEW due to partial mapping, got Applicability=${result.applicability_status}`);
  }
});

// 5. Blocked Condition
runner.runTest('TC-REG-05', 'Blocked Condition / Escalation Trace', () => {
  const context = {
    facility_id: 'FAC-BLK-001',
    jurisdiction: 'VN',
    reporting_period: { period_start: '2027-01-01', period_end: '2027-12-31' },
    facility: {
      sector_id: 'SEC-NONEXISTENT', // triggers mapping fallback
      attributes: {}
    }
  };
  const result = regulatoryEngine.evaluate(context);
  if (result.applicability_status !== 'REQUIRES_REVIEW') {
    throw new Error(`Expected REQUIRES_REVIEW on unmapped sector, got ${result.applicability_status}`);
  }
});

// 6. Mandatory vs Applicability Separation
runner.runTest('TC-REG-06', 'Mandatory vs Applicability Separation (Methodology rule is APPLICABLE but NOT_MANDATORY)', () => {
  const context = {
    facility_id: 'FAC-CON-001',
    jurisdiction: 'VN',
    reporting_period: { period_start: '2027-01-01', period_end: '2027-12-31' },
    facility: {
      sector_id: 'SEC-03-CONSTRUCTION',
      attributes: { annual_energy_consumption: 500 }
    }
  };
  const result = regulatoryEngine.evaluate(context);
  // Methodology rule MOC-CIRCULAR-13 applies because the sector matches
  const mocEval = result.evaluations.find(e => e.rule_id === 'RULE-MOC-CIRCULAR-13');
  if (!mocEval) {
    throw new Error('Expected RULE-MOC-CIRCULAR-13 evaluation to be run');
  }
  if (mocEval.applicability_status !== 'APPLICABLE' || mocEval.mandatory_status !== 'NOT_MANDATORY') {
    throw new Error(`Expected APPLICABLE and NOT_MANDATORY for methodology, got Applicability=${mocEval.applicability_status}, Mandatory=${mocEval.mandatory_status}`);
  }
});

// 7. Effective_From Boundary
runner.runTest('TC-REG-07', 'Effective_From Boundary (Reporting period ends before effective date)', () => {
  const context = {
    facility_id: 'FAC-ENG-001',
    jurisdiction: 'VN',
    // Ended on 2026-09-24 (Decision 42 starts on 2026-09-25)
    reporting_period: { period_start: '2026-01-01', period_end: '2026-09-24' },
    facility: {
      sector_id: 'SEC-01-ENERGY',
      attributes: { annual_energy_consumption: 1200 }
    }
  };
  const result = regulatoryEngine.evaluate(context);
  // RULE-QD-42-2026-PRIMARY should not be active
  const qd42Eval = result.evaluations.find(e => e.rule_id === 'RULE-QD-42-2026-PRIMARY');
  if (qd42Eval) {
    throw new Error('Expected RULE-QD-42-2026-PRIMARY to be excluded because period ends before its effective_from date');
  }
});

// 8. Effective_To Boundary
runner.runTest('TC-REG-08', 'Effective_To Boundary (Historical rule expired before reporting period)', () => {
  const context = {
    facility_id: 'FAC-ENG-001',
    jurisdiction: 'VN',
    // Starts 2026-09-25 (QD-13 ended on 2026-09-25 exclusive)
    reporting_period: { period_start: '2026-09-25', period_end: '2026-12-31' },
    facility: {
      sector_id: 'SEC-01-ENERGY',
      attributes: { annual_energy_consumption: 1200 }
    }
  };
  const result = regulatoryEngine.evaluate(context);
  const qd13Eval = result.evaluations.find(e => e.rule_id === 'RULE-QD-13-2024-PRIMARY');
  if (qd13Eval) {
    throw new Error('Expected RULE-QD-13-2024-PRIMARY to be excluded because period starts on/after its effective_to boundary');
  }
});

// 9. Open-ended Rule
runner.runTest('TC-REG-09', 'Open-ended Rule (Active rule with null effective_to is evaluated)', () => {
  const context = {
    facility_id: 'FAC-ENG-001',
    jurisdiction: 'VN',
    reporting_period: { period_start: '2035-01-01', period_end: '2035-12-31' },
    facility: {
      sector_id: 'SEC-01-ENERGY',
      attributes: { annual_energy_consumption: 1500 }
    }
  };
  const result = regulatoryEngine.evaluate(context);
  const qd42Eval = result.evaluations.find(e => e.rule_id === 'RULE-QD-42-2026-PRIMARY');
  if (!qd42Eval || qd42Eval.applicability_status !== 'APPLICABLE') {
    throw new Error('Expected open-ended rule to match far into the future');
  }
});

// 10. Straddling Period
runner.runTest('TC-REG-10', 'Straddling Period (Crosses regulatory transition boundary, segmenting required)', () => {
  const context = {
    facility_id: 'FAC-ENG-001',
    jurisdiction: 'VN',
    // Crosses QD-42 boundary on 2026-09-25
    reporting_period: { period_start: '2026-01-01', period_end: '2026-12-31' },
    facility: {
      sector_id: 'SEC-01-ENERGY',
      attributes: { annual_energy_consumption: 1200 }
    }
  };
  const result = regulatoryEngine.evaluate(context);
  if (result.applicability_status !== 'REQUIRES_REVIEW') {
    throw new Error(`Expected straddle to trigger REQUIRES_REVIEW, got ${result.applicability_status}`);
  }
  if (!result.segments || result.segments.length < 2) {
    throw new Error('Expected structured segments in straddling result');
  }
});

// 11. Historical Rule
runner.runTest('TC-REG-11', 'Historical Rule (Evaluated using 2025 reporting period)', () => {
  const context = {
    facility_id: 'FAC-ENG-001',
    jurisdiction: 'VN',
    reporting_period: { period_start: '2025-01-01', period_end: '2025-12-31' },
    facility: {
      sector_id: 'SEC-01-ENERGY',
      attributes: { annual_energy_consumption: 1100 }
    }
  };
  const result = regulatoryEngine.evaluate(context);
  const activeQd13 = result.evaluations.find(e => e.rule_id === 'RULE-QD-13-2024-PRIMARY');
  if (!activeQd13 || activeQd13.applicability_status !== 'APPLICABLE') {
    throw new Error('Expected historical QD-13 rule to be applicable for 2025');
  }
  const qd42 = result.evaluations.find(e => e.rule_id === 'RULE-QD-42-2026-PRIMARY');
  if (qd42) {
    throw new Error('QD-42 rule should not be present in historical 2025 evaluation');
  }
});

// 12. Amended Rule
runner.runTest('TC-REG-12', 'Amended Rule Traceability', () => {
  // Verifying the edge relation representation
  const amendsExists = GOVERNED_RULES.some(r => r.rule_id === 'RULE-QD-42-2026-PRIMARY' && r.supersedes === 'RULE-QD-13-2024-PRIMARY');
  if (!amendsExists) {
    throw new Error('Rule QD-42 does not preserve relational link to superseded rule');
  }
});

// 13. Replaced Rule
runner.runTest('TC-REG-13', 'Replaced Rule Progression Check', () => {
  const qd13 = GOVERNED_RULES.find(r => r.rule_id === 'RULE-QD-13-2024-PRIMARY');
  if (qd13.superseded_by !== 'RULE-QD-42-2026-PRIMARY') {
    throw new Error('Expected QD-13 to point to QD-42 as replacing rule');
  }
});

// 14. Conflicting Rules
runner.runTest('TC-REG-14', 'Conflicting Rules (Overlapping sector jurisdiction without precedence - ISSUE-RRM-001)', () => {
  const context = {
    facility_id: 'FAC-CON-COGEN',
    jurisdiction: 'VN',
    reporting_period: { period_start: '2027-01-01', period_end: '2027-12-31' },
    facility: {
      sector_id: 'SEC-03-CONSTRUCTION',
      attributes: {
        annual_energy_consumption: 1500,
        is_dual_use_heat: true // Triggers the Circular 13 vs 17 precedence conflict
      }
    }
  };
  const result = regulatoryEngine.evaluate(context);
  if (result.applicability_status !== 'REQUIRES_REVIEW' || !result.evaluation_reason.includes('CONFLICT')) {
    throw new Error(`Expected conflict REQUIRES_REVIEW, got Applicability=${result.applicability_status}`);
  }
});

// 15. Ambiguous Sector Mapping
runner.runTest('TC-REG-15', 'Ambiguous Sector Mapping (Escalates to REQUIRES_REVIEW)', () => {
  const context = {
    facility_id: 'FAC-AMB-001',
    jurisdiction: 'VN',
    reporting_period: { period_start: '2027-01-01', period_end: '2027-12-31' },
    facility: {
      sector_id: 'SEC-AMBIGUOUS',
      attributes: {}
    }
  };
  const result = regulatoryEngine.evaluate(context);
  if (result.applicability_status !== 'REQUIRES_REVIEW' || !result.evaluation_reason.includes('AMBIGUOUS')) {
    throw new Error(`Expected AMBIGUOUS REQUIRES_REVIEW, got Applicability=${result.applicability_status}`);
  }
});

// 16. Multi-Sector Facility
runner.runTest('TC-REG-16', 'Multi-Sector Facility (Validates mapped internal codes)', () => {
  const context = {
    facility_id: 'FAC-MULTI-001',
    jurisdiction: 'VN',
    reporting_period: { period_start: '2027-01-01', period_end: '2027-12-31' },
    facility: {
      sector_id: 'SEC-03-CONSTRUCTION', // also maps to internal construction
      attributes: {}
    }
  };
  const result = regulatoryEngine.evaluate(context);
  if (result.evidence.internal_sector_code !== 'SECTOR-CON-002') {
    throw new Error('Expected multi-sector adapter to successfully resolve internal TCVN sector identifiers');
  }
});

// 17. Missing Jurisdiction
runner.runTest('TC-REG-17', 'Missing Jurisdiction (Fails closed / returns default VN evaluation candidates)', () => {
  const context = {
    facility_id: 'FAC-ENG-001',
    reporting_period: { period_start: '2027-01-01', period_end: '2027-12-31' },
    facility: {
      sector_id: 'SEC-01-ENERGY',
      attributes: { annual_energy_consumption: 1200 }
    }
    // jurisdiction omitted
  };
  const result = regulatoryEngine.evaluate(context);
  if (result.applicability_status !== 'APPLICABLE') {
    throw new Error('Expected default fallback to correctly resolve national candidate set rules');
  }
});

// 18. Missing Effective Date
runner.runTest('TC-REG-18', 'Missing Effective Date Rule Evaluation (Fails Closed)', () => {
  const badRule = {
    rule_id: "RULE-BAD-DATE",
    rule_version: "1.0.0",
    regulatory_document_id: "BAD-DOC",
    source_refs: ["BAD-REF"],
    assertion_refs: ["KA-BAD-001"],
    authority_class: "TIER_A",
    jurisdiction: "VN",
    effective_from: null, // Bad date!
    status: "ACTIVE",
    predicate: { operator: "AND", conditions: [] }
  };
  const mockEngine = new (regulatoryEngine.constructor)([badRule]);
  const context = {
    facility_id: 'FAC-ENG-001',
    reporting_period: { period_start: '2027-01-01', period_end: '2027-12-31' },
    facility: { sector_id: 'SEC-01-ENERGY', attributes: {} }
  };
  const result = mockEngine.evaluate(context);
  if (result.applicability_status !== 'NOT_APPLICABLE') {
    throw new Error('Expected rule with missing effective date to fail temporal selection');
  }
});

// 19. Provenance Failure
runner.runTest('TC-REG-19', 'Provenance Failure (Fail-closed on missing facility ID context parameter)', () => {
  let threw = false;
  try {
    regulatoryEngine.evaluate({}); // empty context
  } catch (err) {
    threw = true;
    if (!err.message.includes('FAIL_CLOSED')) {
      throw new Error('Expected strict FAIL_CLOSED prefix error message');
    }
  }
  if (!threw) {
    throw new Error('Expected evaluation of malformed context to throw immediate validation exception');
  }
});

// 20. Deterministic Repeated Evaluation
runner.runTest('TC-REG-20', 'Deterministic Repeated Evaluation', () => {
  const context = {
    facility_id: 'FAC-ENG-001',
    jurisdiction: 'VN',
    reporting_period: { period_start: '2027-01-01', period_end: '2027-12-31' },
    facility: {
      sector_id: 'SEC-01-ENERGY',
      attributes: { annual_energy_consumption: 1200 }
    }
  };
  const firstResult = regulatoryEngine.evaluate(context);
  for (let i = 0; i < 50; i++) {
    const iterResult = regulatoryEngine.evaluate(context);
    if (iterResult.applicability_status !== firstResult.applicability_status ||
        iterResult.mandatory_status !== firstResult.mandatory_status) {
      throw new Error(`Repetitive run ${i} produced differing compliance result statuses!`);
    }
  }
});

runner.report();
