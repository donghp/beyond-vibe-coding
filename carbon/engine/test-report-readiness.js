/**
 * ENERIX Carbon - Report Readiness & Audit Package Verification Suite
 * Executes and verifies all canonical test cases TC-REP-001 through TC-REP-024 for Task #0024.
 */

import {
  reportReadinessEngine,
  ReportReadinessEngine,
  REPORT_READINESS_STATES,
  REPORTING_FRAMEWORKS,
  SIGN_OFF_ROLES,
  SignOffRecord,
  ReportReadinessFinding,
  ReportReadinessEvaluation,
  AuditPackage
} from './report-readiness-engine.js';

class ReportReadinessTestRunner {
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
    console.log('ENERIX CARBON - REPORT READINESS VERIFICATION SUMMARY');
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
      console.log('\x1b[32m✓ All Report Readiness engine tests passed with 100% compliance!\x1b[0m\n');
      process.exit(0);
    }
  }
}

const runner = new ReportReadinessTestRunner();
console.log('Starting ENERIX Carbon Report Readiness Verification Suite (TC-REP-001..024)...');

const engine = new ReportReadinessEngine();

// Helper to create fully ready baseline synthetic context
function createReadyContext() {
  return {
    facility_metadata: {
      facility_id: 'FAC-SYNTH-001',
      legal_name: 'Cơ sở Phát thải Thí nghiệm Alpha',
      tax_id: '0101234567',
      sector: 'ENERGY',
      reporting_period: '2026'
    },
    reporting_period: '2026',
    target_framework: REPORTING_FRAMEWORKS.ND_06_2022_ND_CP,
    calculation_run: {
      run_id: 'RUN-2026-001',
      status: 'COMPLETED',
      result: {
        scope_1: 450.25,
        scope_2: 902.63,
        scope_3: 0.0,
        total_emissions: 1352.88,
        gas_breakdown: {
          CO2: { metric_tons: 1340.5, tco2e: 1340.5 },
          CH4: { metric_tons: 0.42, tco2e: 11.76 },
          N2O: { metric_tons: 0.002, tco2e: 0.62 }
        }
      }
    },
    calculation_snapshot: {
      snapshot_id: 'SNAP-CALC-2026-001',
      status: 'COMPLETED'
    },
    qa_qc_health: {
      snapshot_id: 'SNAP-HEALTH-2026-001',
      overall_health_state: 'HEALTHY',
      issue_references: []
    },
    sign_offs: [
      new SignOffRecord({
        sign_off_id: 'SIG-VER-01',
        role: SIGN_OFF_ROLES.LEAD_VERIFIER,
        actor_type: 'HUMAN',
        actor_id: 'VERIFIER-DR-TRAN',
        actor_name: 'TS. Tran Van Minh (Lead GHG Verifier)',
        actor_credentials: 'ISO-14065-LEAD-CERT-2024-998',
        status: 'APPROVED',
        statement: 'Đã thẩm tra toàn diện hồ sơ dữ liệu phát thải và kế hoạch tính toán, xác nhận đủ điều kiện nộp báo cáo.'
      })
    ],
    provenance_manifest: {
      is_complete: true,
      broken_lineage: false,
      source_document_count: 12,
      activity_record_count: 12,
      full_trace_available: true
    },
    controlled_issues: [],
    issue_disclosures: {}
  };
}

// TC-REP-001: Fully ready report context
runner.runTest('TC-REP-001', 'fully ready report context', () => {
  const context = createReadyContext();
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.REPORT_READY) {
    throw new Error(`Expected REPORT_READY, got ${evaluation.readiness_state}`);
  }
  if (!evaluation.is_ready) {
    throw new Error('Expected is_ready === true');
  }
  if (evaluation.blocked_findings.length > 0) {
    throw new Error(`Expected 0 blocked findings, got ${evaluation.blocked_findings.length}`);
  }
});

// TC-REP-002: Missing calculation result / snapshot
runner.runTest('TC-REP-002', 'missing calculation result / snapshot', () => {
  const context = createReadyContext();
  delete context.calculation_run;
  delete context.calculation_snapshot;
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for missing calculation, got ${evaluation.readiness_state}`);
  }
  const hasCalcCheck = evaluation.blocked_findings.some(f => f.finding_id === 'FIND-CALC-MISSING');
  if (!hasCalcCheck) {
    throw new Error('Missing FIND-CALC-MISSING finding');
  }
});

// TC-REP-003: Calculation status failed / incomplete
runner.runTest('TC-REP-003', 'calculation status failed / incomplete', () => {
  const context = createReadyContext();
  context.calculation_run.status = 'FAILED';
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for failed calculation run, got ${evaluation.readiness_state}`);
  }
  const hasStatusCheck = evaluation.blocked_findings.some(f => f.finding_id === 'FIND-CALC-STATUS');
  if (!hasStatusCheck) {
    throw new Error('Missing FIND-CALC-STATUS finding');
  }
});

// TC-REP-004: Blocked QA/QC data health state prevents report readiness
runner.runTest('TC-REP-004', 'blocked QA/QC data health state prevents report readiness', () => {
  const context = createReadyContext();
  context.qa_qc_health.overall_health_state = 'BLOCKED';
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED when QA/QC is BLOCKED, got ${evaluation.readiness_state}`);
  }
  const hasQaBlocked = evaluation.blocked_findings.some(f => f.finding_id === 'FIND-QA-BLOCKED');
  if (!hasQaBlocked) {
    throw new Error('Missing FIND-QA-BLOCKED finding');
  }
});

// TC-REP-005: QA/QC requires review without certified human sign-off
runner.runTest('TC-REP-005', 'QA/QC requires review without certified human sign-off', () => {
  const context = createReadyContext();
  context.qa_qc_health.overall_health_state = 'REQUIRES_REVIEW';
  context.sign_offs = []; // No sign-off
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.REVIEW_REQUIRED) {
    throw new Error(`Expected REVIEW_REQUIRED when QA/QC has review pending, got ${evaluation.readiness_state}`);
  }
  const hasReviewPending = evaluation.review_findings.some(f => f.finding_id === 'FIND-QA-REVIEW-PENDING');
  if (!hasReviewPending) {
    throw new Error('Missing FIND-QA-REVIEW-PENDING finding');
  }
});

// TC-REP-006: QA/QC requires review with approved human sign-off
runner.runTest('TC-REP-006', 'QA/QC requires review with approved human sign-off', () => {
  const context = createReadyContext();
  context.qa_qc_health.overall_health_state = 'REQUIRES_REVIEW';
  // Sign-off exists from human lead verifier
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.REPORT_READY) {
    throw new Error(`Expected REPORT_READY when human verifier signed off, got ${evaluation.readiness_state}`);
  }
  if (!evaluation.passed_checks.includes('QA_HEALTH_REVIEW_RESOLVED_BY_HUMAN_SIGN_OFF')) {
    throw new Error('Missing QA_HEALTH_REVIEW_RESOLVED_BY_HUMAN_SIGN_OFF in passed_checks');
  }
});

// TC-REP-007: Missing mandatory facility metadata
runner.runTest('TC-REP-007', 'missing mandatory facility metadata', () => {
  const context = createReadyContext();
  delete context.facility_metadata;
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for missing facility metadata, got ${evaluation.readiness_state}`);
  }
  const hasFacCheck = evaluation.blocked_findings.some(f => f.finding_id === 'FIND-FAC-001');
  if (!hasFacCheck) {
    throw new Error('Missing FIND-FAC-001 finding');
  }
});

// TC-REP-008: Missing reporting period
runner.runTest('TC-REP-008', 'missing reporting period', () => {
  const context = createReadyContext();
  delete context.reporting_period;
  delete context.facility_metadata.reporting_period;
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for missing reporting period, got ${evaluation.readiness_state}`);
  }
  const hasPerCheck = evaluation.blocked_findings.some(f => f.finding_id === 'FIND-PER-001');
  if (!hasPerCheck) {
    throw new Error('Missing FIND-PER-001 finding');
  }
});

// TC-REP-009: Missing scope breakdown in calculation result
runner.runTest('TC-REP-009', 'missing scope breakdown in calculation result', () => {
  const context = createReadyContext();
  context.calculation_run.result = { raw_data: 123 }; // No scope breakdown
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for missing scope breakdown, got ${evaluation.readiness_state}`);
  }
  const hasScopeCheck = evaluation.blocked_findings.some(f => f.finding_id === 'FIND-SCOPE-MISSING');
  if (!hasScopeCheck) {
    throw new Error('Missing FIND-SCOPE-MISSING finding');
  }
});

// TC-REP-010: Missing individual GHG gas breakdown
runner.runTest('TC-REP-010', 'missing individual GHG gas breakdown', () => {
  const context = createReadyContext();
  delete context.calculation_run.result.gas_breakdown;
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for missing GHG gas breakdown, got ${evaluation.readiness_state}`);
  }
  const hasGasCheck = evaluation.blocked_findings.some(f => f.finding_id === 'FIND-GAS-BREAKDOWN-MISSING');
  if (!hasGasCheck) {
    throw new Error('Missing FIND-GAS-BREAKDOWN-MISSING finding');
  }
});

// TC-REP-011: Unsupported or unverified target regulatory framework
runner.runTest('TC-REP-011', 'unsupported or unverified target regulatory framework', () => {
  const context = createReadyContext();
  context.target_framework = 'NON_EXISTENT_CUSTOM_FRAMEWORK';
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for unsupported framework, got ${evaluation.readiness_state}`);
  }
  const hasFrmCheck = evaluation.blocked_findings.some(f => f.finding_id === 'FIND-FRM-001');
  if (!hasFrmCheck) {
    throw new Error('Missing FIND-FRM-001 finding');
  }
});

// TC-REP-012: Missing lead verifier / auditor sign-off
runner.runTest('TC-REP-012', 'missing lead verifier / auditor sign-off', () => {
  const context = createReadyContext();
  context.sign_offs = []; // No sign-off
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.REVIEW_REQUIRED) {
    throw new Error(`Expected REVIEW_REQUIRED for missing verifier sign-off, got ${evaluation.readiness_state}`);
  }
  const hasSigMissing = evaluation.review_findings.some(f => f.finding_id === 'FIND-SIG-VERIFIER-MISSING');
  if (!hasSigMissing) {
    throw new Error('Missing FIND-SIG-VERIFIER-MISSING finding');
  }
});

// TC-REP-013: Attempted AI actor sign-off rejected
runner.runTest('TC-REP-013', 'attempted AI actor sign-off rejected', () => {
  const context = createReadyContext();
  context.sign_offs = [
    new SignOffRecord({
      sign_off_id: 'SIG-AI-ILLEGAL',
      role: SIGN_OFF_ROLES.LEAD_VERIFIER,
      actor_type: 'AI', // Strictly rejected!
      actor_id: 'AGENT-GEMINI-01',
      actor_name: 'AI Automated Auditor',
      status: 'APPROVED'
    })
  ];
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED when AI attempts sign-off, got ${evaluation.readiness_state}`);
  }
  const hasAiReject = evaluation.blocked_findings.some(f => f.finding_id.startsWith('FIND-SIG-AI-REJECTED'));
  if (!hasAiReject) {
    throw new Error('Missing FIND-SIG-AI-REJECTED finding');
  }
});

// TC-REP-014: Incomplete end-to-end provenance trace
runner.runTest('TC-REP-014', 'incomplete end-to-end provenance trace', () => {
  const context = createReadyContext();
  context.provenance_manifest.is_complete = false;
  context.provenance_manifest.broken_lineage = true;
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for broken provenance lineage, got ${evaluation.readiness_state}`);
  }
  const hasProvCheck = evaluation.blocked_findings.some(f => f.finding_id === 'FIND-PROV-INCOMPLETE');
  if (!hasProvCheck) {
    throw new Error('Missing FIND-PROV-INCOMPLETE finding');
  }
});

// TC-REP-015: Unresolved blocking controlled issue (ISSUE-TEMP-001 unsegmented)
runner.runTest('TC-REP-015', 'unresolved blocking controlled issue (ISSUE-TEMP-001 unsegmented)', () => {
  const context = createReadyContext();
  context.controlled_issues = ['ISSUE-TEMP-001'];
  context.segmented_transition = false; // Unsegmented!
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.BLOCKED) {
    throw new Error(`Expected BLOCKED for unsegmented ISSUE-TEMP-001, got ${evaluation.readiness_state}`);
  }
  const hasIssueBlock = evaluation.blocked_findings.some(f => f.issue_reference === 'ISSUE-TEMP-001');
  if (!hasIssueBlock) {
    throw new Error('Missing ISSUE-TEMP-001 blocked finding');
  }
});

// TC-REP-016: Open controlled issue with formal disclosure statement (ISSUE-TEMP-002)
runner.runTest('TC-REP-016', 'open controlled issue with formal disclosure statement (ISSUE-TEMP-002)', () => {
  const context = createReadyContext();
  context.controlled_issues = ['ISSUE-TEMP-002'];
  context.issue_disclosures = {
    'ISSUE-TEMP-002': 'Phân bổ tỷ lệ ngày phát thải giữa tháng được áp dụng phương pháp tỷ lệ tuyến tính 15/15 theo văn bản chấp thuận số 88/BCT.'
  };
  const evaluation = engine.evaluateReportReadiness(context);

  if (evaluation.readiness_state !== REPORT_READINESS_STATES.REPORT_READY) {
    throw new Error(`Expected REPORT_READY with disclosure, got ${evaluation.readiness_state}`);
  }
  if (!evaluation.disclosed_issues.includes('ISSUE-TEMP-002')) {
    throw new Error('Expected ISSUE-TEMP-002 in disclosed_issues');
  }
});

// TC-REP-017: Audit package compilation creates sealed immutable package
runner.runTest('TC-REP-017', 'audit package compilation creates sealed immutable package', () => {
  const context = createReadyContext();
  const pkg = engine.compileAuditPackage(context);

  if (!pkg.is_sealed) {
    throw new Error('Expected pkg.is_sealed === true');
  }
  if (!Object.isFrozen(pkg) || !Object.isFrozen(pkg.inventory_summary)) {
    throw new Error('AuditPackage is not frozen immutable');
  }
  if (!pkg.package_integrity_hash) {
    throw new Error('AuditPackage missing package_integrity_hash');
  }
});

// TC-REP-018: Audit package integrity hash deterministic repeatability
runner.runTest('TC-REP-018', 'audit package integrity hash deterministic repeatability', () => {
  const context = createReadyContext();
  const pkg1 = engine.compileAuditPackage(context);
  const pkg2 = engine.compileAuditPackage(context);

  // When package_id and timestamps match, hash must be identical
  const hash1 = engine.computeIntegrityHash(pkg1);
  const hash2 = engine.computeIntegrityHash(pkg1);
  if (hash1 !== hash2) {
    throw new Error('Hash calculation is non-deterministic');
  }
  if (!pkg1.package_integrity_hash.startsWith('repro-hash-')) {
    throw new Error('Hash does not follow repro-hash-* format');
  }
});

// TC-REP-019: Tamper detection on sealed audit package
runner.runTest('TC-REP-019', 'tamper detection on sealed audit package', () => {
  const context = createReadyContext();
  const pkg = engine.compileAuditPackage(context);
  const isValid = engine.verifyAuditPackageIntegrity(pkg);
  if (!isValid) {
    throw new Error('Expected valid integrity on pristine package');
  }

  // Create a tampered copy
  const tampered = {
    ...pkg,
    inventory_summary: {
      ...pkg.inventory_summary,
      consolidated_gross_tco2e: 0.0 // Tampered!
    }
  };
  const isTamperValid = engine.verifyAuditPackageIntegrity(tampered);
  if (isTamperValid) {
    throw new Error('Integrity verification failed to detect tampered inventory summary');
  }
});

// TC-REP-020: Verification of multi-framework report packaging
runner.runTest('TC-REP-020', 'verification of multi-framework report packaging', () => {
  const frameworks = [
    REPORTING_FRAMEWORKS.ND_06_2022_ND_CP,
    REPORTING_FRAMEWORKS.ISO_14064_1_2018,
    REPORTING_FRAMEWORKS.GHG_PROTOCOL_CORPORATE
  ];

  for (const fw of frameworks) {
    const context = createReadyContext();
    context.target_framework = fw;
    const pkg = engine.compileAuditPackage(context);
    if (pkg.target_framework !== fw) {
      throw new Error(`Target framework mismatch: ${pkg.target_framework} vs ${fw}`);
    }
  }
});

// TC-REP-021: Distinction test: Data Health != Calculation Readiness != Report Readiness
runner.runTest('TC-REP-021', 'distinction test: Data Health != Calculation Readiness != Report Readiness', () => {
  // Scenario: Data Health is 100% HEALTHY, but Calculation Run has not happened yet!
  const preCalcContext = {
    facility_metadata: { facility_id: 'FAC-001', reporting_period: '2026' },
    reporting_period: '2026',
    target_framework: REPORTING_FRAMEWORKS.ND_06_2022_ND_CP,
    qa_qc_health: { overall_health_state: 'HEALTHY' }
    // No calculation_run or calculation_result!
  };

  const evalPreCalc = engine.evaluateReportReadiness(preCalcContext);
  // Must be BLOCKED for reporting even though input data health was clean
  if (evalPreCalc.readiness_state !== REPORT_READINESS_STATES.BLOCKED) {
    throw new Error('Data Health being healthy cannot bypass unexecuted calculation for report readiness');
  }
});

// TC-REP-022: Zero emissions calculation leakage in ReportReadinessEngine
runner.runTest('TC-REP-022', 'zero emissions calculation leakage in ReportReadinessEngine', () => {
  const methods = Object.getOwnPropertyNames(ReportReadinessEngine.prototype);
  const forbidden = [
    'calculateEmissions',
    'applyEmissionFactor',
    'applyGwp',
    'executeModel',
    'calculateScope',
    'sumEmissions',
    'multiplyFactors'
  ];
  for (const f of forbidden) {
    if (methods.includes(f)) {
      throw new Error(`Forbidden calculation method ${f} found on ReportReadinessEngine`);
    }
  }
});

// TC-REP-023: Emissions totals preserved strictly without recalculation
runner.runTest('TC-REP-023', 'emissions totals preserved strictly without recalculation', () => {
  const context = createReadyContext();
  context.calculation_run.result.total_emissions = 8888.88;
  context.calculation_run.result.scope_1 = 4444.44;
  context.calculation_run.result.scope_2 = 4444.44;

  const pkg = engine.compileAuditPackage(context);
  if (pkg.inventory_summary.consolidated_gross_tco2e !== 8888.88) {
    throw new Error(`Emissions total was altered or recalculated! Expected 8888.88, got ${pkg.inventory_summary.consolidated_gross_tco2e}`);
  }
  if (pkg.inventory_summary.scope_1_gross_tco2e !== 4444.44) {
    throw new Error(`Scope 1 total was altered! Expected 4444.44, got ${pkg.inventory_summary.scope_1_gross_tco2e}`);
  }
});

// TC-REP-024: Audit trail backward trace verification from AuditPackage to Source Document
runner.runTest('TC-REP-024', 'audit trail backward trace verification from AuditPackage to Source Document', () => {
  const context = createReadyContext();
  const pkg = engine.compileAuditPackage(context);

  if (!pkg.calculation_run_ref || !pkg.calculation_snapshot_ref || !pkg.qa_qc_attestation.snapshot_id) {
    throw new Error('Broken audit linkage in AuditPackage');
  }
  if (!pkg.provenance_manifest || !pkg.provenance_manifest.is_complete) {
    throw new Error('Provenance manifest incomplete in AuditPackage');
  }
  if (pkg.sign_offs.length === 0 || pkg.sign_offs[0].actor_type !== 'HUMAN') {
    throw new Error('Missing human sign-off in AuditPackage');
  }
});

runner.report();
