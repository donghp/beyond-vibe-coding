/**
 * ENERIX Carbon - App State & Data Provider Verification Suite
 * Executes and verifies all canonical test cases TC-STATE-001 through TC-STATE-024 for Task #0025.
 * Confirms that UI consumes governed state without reimplementing calculation,
 * regulatory, temporal, methodology, QA/QC, or readiness logic.
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  dataProvider,
  DataProvider,
  PROVIDER_STATUS,
  DATA_SOURCE_CLASSIFICATION,
  CATALOG_CLASSIFICATIONS
} from '../app/data-provider.js';
import { stateStore, StateStore, STATUS_NORMALIZATION } from '../app/state-store.js';
import { CalculationEngineError } from './calculation-engine.js';
import { SIGN_OFF_ROLES } from './report-readiness-engine.js';

class AppStateTestRunner {
  constructor() {
    this.totalTests = 0;
    this.passed = 0;
    this.failed = 0;
    this.testFailures = [];
  }

  async runTest(testId, description, testFn) {
    this.totalTests++;
    try {
      await testFn();
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
    console.log('ENERIX CARBON - APP STATE & DATA PROVIDER SUMMARY');
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
      console.log('\x1b[32m✓ All App State & Data Provider tests passed with 100% compliance!\x1b[0m\n');
      process.exit(0);
    }
  }
}

const runner = new AppStateTestRunner();
console.log('Starting ENERIX Carbon App State & Data Provider Verification Suite (TC-STATE-001..024)...');

async function executeSuite() {
  // TC-STATE-001: DataProvider loads all catalogs and facilities successfully
  await runner.runTest(
    'TC-STATE-001',
    'Verify DataProvider loads all repository catalogs and facilities',
    async () => {
      const loaded = await dataProvider.loadAll();
      if (!loaded) throw new Error('dataProvider.loadAll() failed');
      if (dataProvider.getFacilities().length === 0) throw new Error('Facilities catalog empty');
      if (dataProvider.getSectors().length === 0) throw new Error('Sectors catalog empty');
      if (dataProvider.getEmissionFactors().length === 0) throw new Error('Emission factors catalog empty');
      if (dataProvider.getMethodologies().length === 0) throw new Error('Methodologies catalog empty');
      if (dataProvider.getCalculationModels().length === 0) throw new Error('Calculation models catalog empty');
    }
  );

  // TC-STATE-002: Dual-environment loading handles Node & browser gracefully
  await runner.runTest(
    'TC-STATE-002',
    'Verify DataProvider universal resource loader resolves local JSON',
    async () => {
      const customProvider = new DataProvider();
      const sectors = await customProvider.loadJsonResource('data/sectors.json');
      if (!sectors || !Array.isArray(sectors.sectors)) {
        throw new Error('loadJsonResource failed to load sectors in current runtime');
      }
    }
  );

  // TC-STATE-003: DataProvider exposes all 10 verified engines
  await runner.runTest(
    'TC-STATE-003',
    'Verify DataProvider exposes all 10 verified G1-G4 engines',
    () => {
      const engines = dataProvider.getEngines();
      const requiredEngines = [
        'regulatory',
        'temporal',
        'methodology',
        'plan',
        'activityEvidence',
        'calculation',
        'documentIntelligence',
        'provenance',
        'qaqc',
        'readiness'
      ];
      for (const eng of requiredEngines) {
        if (!engines[eng]) throw new Error(`Missing engine '${eng}' in DataProvider engine registry`);
      }
    }
  );

  // TC-STATE-004: DataProvider entity lookup helpers
  await runner.runTest(
    'TC-STATE-004',
    'Verify DataProvider lookup helpers return matching entities',
    () => {
      const fac = dataProvider.getFacility('FAC-2026-001');
      if (!fac || fac.facility_id !== 'FAC-2026-001') {
        throw new Error('getFacility failed to resolve FAC-2026-001');
      }
      const sec = dataProvider.getSector('SEC-01-ENERGY');
      if (!sec || sec.sector_id !== 'SEC-01-ENERGY') {
        throw new Error('getSector failed to resolve SEC-01-ENERGY');
      }
      const ef = dataProvider.getEmissionFactor('EF-VN-GRID-2024');
      if (!ef || ef.factor_id !== 'EF-VN-GRID-2024') {
        throw new Error('getEmissionFactor failed to resolve EF-VN-GRID-2024');
      }
      const meth = dataProvider.getMethodology('METH-BCT-38-2023');
      if (!meth || meth.methodology_id !== 'METH-BCT-38-2023') {
        throw new Error('getMethodology failed to resolve METH-BCT-38-2023');
      }
    }
  );

  // TC-STATE-005: DataProvider fail-closed on nonexistent ID
  await runner.runTest(
    'TC-STATE-005',
    'Verify DataProvider lookup helpers fail-closed on unknown IDs',
    () => {
      const fac = dataProvider.getFacility('FAC-UNKNOWN-999');
      if (fac !== null) throw new Error('getFacility should return null for unknown ID');
      const ef = dataProvider.getEmissionFactor('EF-NONEXISTENT');
      if (ef !== null) throw new Error('getEmissionFactor should return null for unknown ID');
    }
  );

  // TC-STATE-006: StateStore initializes with canonical default context
  await runner.runTest(
    'TC-STATE-006',
    'Verify StateStore initializes with default context (FAC-2026-001, 2026)',
    () => {
      const store = new StateStore();
      if (store.getSelectedFacilityId() !== 'FAC-2026-001') {
        throw new Error(`Expected default facility FAC-2026-001, got ${store.getSelectedFacilityId()}`);
      }
      if (store.getSelectedReportingYear() !== 2026) {
        throw new Error(`Expected default year 2026, got ${store.getSelectedReportingYear()}`);
      }
      if (store.getRoute() !== 'overview') {
        throw new Error(`Expected default route 'overview', got ${store.getRoute()}`);
      }
    }
  );

  // TC-STATE-007: StateStore re-evaluates governed state on facility change
  await runner.runTest(
    'TC-STATE-007',
    'Verify StateStore re-evaluates pipeline on facility selection change',
    () => {
      const store = new StateStore();
      store.setSelectedFacilityId('FAC-2026-002');
      const state = store.getGovernedState();
      if (state.facility.facility_id !== 'FAC-2026-002') {
        throw new Error('Governed state facility did not update to FAC-2026-002');
      }
      if (state.facility.sector_id !== 'SEC-03-CONSTRUCTION') {
        throw new Error(`Expected sector SEC-03-CONSTRUCTION for FAC-2026-002, got ${state.facility.sector_id}`);
      }
    }
  );

  // TC-STATE-008: StateStore consumes regulatoryEngine without UI reimplementation
  await runner.runTest(
    'TC-STATE-008',
    'Verify StateStore consumes regulatoryEngine output without UI logic duplication',
    () => {
      const store = new StateStore();
      store.setSelectedFacilityId('FAC-2026-001');
      const state = store.getGovernedState();
      if (!state.regulatory) throw new Error('Missing regulatory evaluation in governed state');
      if (state.regulatory.applicability_status !== 'MANDATORY') {
        throw new Error(`Expected MANDATORY status from regulatoryEngine, got ${state.regulatory.applicability_status}`);
      }
      if (!state.regulatory.matched_rules || state.regulatory.matched_rules.length === 0) {
        throw new Error('Expected matched rules from regulatoryEngine');
      }
    }
  );

  // TC-STATE-009: StateStore detects temporal transition straddling (ISSUE-TEMP-001)
  await runner.runTest(
    'TC-STATE-009',
    'Verify StateStore flags unsegmented temporal transition straddling',
    () => {
      const store = new StateStore();
      store.setSelectedReportingPeriod({
        period_start: '2026-01-01',
        period_end: '2026-12-31'
      });
      store.setTemporalSegmentation(false);
      const state = store.getGovernedState();
      if (!state.temporal.straddles_transition) {
        throw new Error('Expected temporal transition straddling to be detected for full year 2026');
      }
      if (state.temporal.status !== 'REQUIRES_SEGMENTATION') {
        throw new Error(`Expected REQUIRES_SEGMENTATION status, got ${state.temporal.status}`);
      }
      if (state.temporal.active_issue !== 'ISSUE-TEMP-001') {
        throw new Error(`Expected active_issue ISSUE-TEMP-001, got ${state.temporal.active_issue}`);
      }
    }
  );

  // TC-STATE-010: StateStore supports temporal segmentation resolving ISSUE-TEMP-001
  await runner.runTest(
    'TC-STATE-010',
    'Verify StateStore resolves temporal straddling when segmentation is enabled',
    () => {
      const store = new StateStore();
      store.setSelectedReportingPeriod({
        period_start: '2026-01-01',
        period_end: '2026-12-31'
      });
      store.setTemporalSegmentation(true);
      const state = store.getGovernedState();
      if (!state.temporal.is_segmented) {
        throw new Error('Expected is_segmented to be true');
      }
      if (state.temporal.status !== 'SEGMENTED_COMPLIANT') {
        throw new Error(`Expected SEGMENTED_COMPLIANT status, got ${state.temporal.status}`);
      }
      if (state.temporal.segments.length !== 2) {
        throw new Error(`Expected 2 segmented regimes, got ${state.temporal.segments.length}`);
      }
    }
  );

  // TC-STATE-011: StateStore methodology selection for active facility
  await runner.runTest(
    'TC-STATE-011',
    'Verify StateStore resolves sector-specific methodology (Circular 38 for Energy)',
    () => {
      const store = new StateStore();
      store.setSelectedFacilityId('FAC-2026-001');
      const state = store.getGovernedState();
      if (state.methodology.methodology_id !== 'METH-MOIT-38-2023') {
        throw new Error(`Expected METH-MOIT-38-2023 for Energy facility, got ${state.methodology.methodology_id}`);
      }
      if (state.methodology.default_tier !== 'TIER_2') {
        throw new Error(`Expected TIER_2 for Energy methodology, got ${state.methodology.default_tier}`);
      }
    }
  );

  // TC-STATE-012: StateStore calculation plan generation
  await runner.runTest(
    'TC-STATE-012',
    'Verify StateStore provides calculation plan with bound model and factor references',
    () => {
      const store = new StateStore();
      store.setSelectedFacilityId('FAC-2026-001');
      const state = store.getGovernedState();
      if (!state.plan || state.plan.plan_status !== 'READY') {
        throw new Error('Calculation plan not ready in governed state');
      }
      if (state.plan.steps.length < 2) {
        throw new Error(`Expected at least 2 plan steps, got ${state.plan.steps.length}`);
      }
    }
  );

  // TC-STATE-013: StateStore activity data & evidence binding
  await runner.runTest(
    'TC-STATE-013',
    'Verify StateStore provides activity records with evidence references',
    () => {
      const store = new StateStore();
      store.setSelectedFacilityId('FAC-2026-001');
      const state = store.getGovernedState();
      if (!state.activityRecords || state.activityRecords.length === 0) {
        throw new Error('Activity records missing in governed state');
      }
      const gridRecord = state.activityRecords.find(a => a.activity_type === 'ACT-GRID-ELEC');
      if (!gridRecord || !gridRecord.evidence_ref) {
        throw new Error('Grid electricity record missing or unbacked by evidence_ref');
      }
    }
  );

  // TC-STATE-014: StateStore deterministic calculation execution (zero UI calculation)
  await runner.runTest(
    'TC-STATE-014',
    'Verify StateStore calculation execution produces immutable calculation snapshot',
    () => {
      const store = new StateStore();
      store.setSelectedFacilityId('FAC-2026-001');
      const state = store.getGovernedState();
      if (!state.calculation || state.calculation.status !== 'COMPLETED') {
        throw new Error('Calculation snapshot missing or status not COMPLETED');
      }
      if (!state.calculation.audit_hash || !state.calculation.audit_hash.startsWith('sha256-')) {
        throw new Error(`Invalid audit_hash on snapshot: ${state.calculation.audit_hash}`);
      }
    }
  );

  // TC-STATE-015: Scope 1, 2, 3 and individual GHG gases preserved strictly from calculation
  await runner.runTest(
    'TC-STATE-015',
    'Verify emissions totals and individual GHG gases are preserved strictly from calculation',
    () => {
      const store = new StateStore();
      store.setSelectedFacilityId('FAC-2026-001');
      const state = store.getGovernedState();
      const result = state.calculation.result;
      if (typeof result.scope_1 !== 'number' || result.scope_1 <= 0) {
        throw new Error(`Invalid scope_1 emissions: ${result.scope_1}`);
      }
      if (typeof result.scope_2 !== 'number' || result.scope_2 <= 0) {
        throw new Error(`Invalid scope_2 emissions: ${result.scope_2}`);
      }
      if (typeof result.total_emissions !== 'number' || result.total_emissions <= 0) {
        throw new Error(`Invalid total emissions: ${result.total_emissions}`);
      }
      if (!result.gas_breakdown || !result.gas_breakdown.CO2 || !result.gas_breakdown.CH4 || !result.gas_breakdown.N2O) {
        throw new Error('Missing individual GHG gas breakdown (CO2, CH4, N2O)');
      }
    }
  );

  // TC-STATE-016: Document intelligence extraction candidates
  await runner.runTest(
    'TC-STATE-016',
    'Verify StateStore integrates source documents with verification status',
    () => {
      const store = new StateStore();
      const state = store.getGovernedState();
      if (!state.documents || state.documents.length === 0) {
        throw new Error('Source documents missing in governed state');
      }
      const evnDoc = state.documents.find(d => d.document_id === 'DOC-EVN-2026-Q1');
      if (!evnDoc || evnDoc.status !== 'VERIFIED') {
        throw new Error('EVN source document missing or not VERIFIED');
      }
    }
  );

  // TC-STATE-017: End-to-end provenance graph with deterministic hash
  await runner.runTest(
    'TC-STATE-017',
    'Verify StateStore provenance manifest contains deterministic reproducibility hash',
    () => {
      const store = new StateStore();
      const state = store.getGovernedState();
      if (!state.provenance || !state.provenance.reproducibility_hash) {
        throw new Error('Provenance manifest or reproducibility hash missing');
      }
      if (!state.provenance.reproducibility_hash.startsWith('repro-hash-')) {
        throw new Error(`Expected repro-hash-* prefix, got ${state.provenance.reproducibility_hash}`);
      }
    }
  );

  // TC-STATE-018: QA/QC Data Health snapshot (no arbitrary score)
  await runner.runTest(
    'TC-STATE-018',
    'Verify StateStore QA/QC data health snapshot has enum status and no arbitrary 0-100 score',
    () => {
      const store = new StateStore();
      store.setTemporalSegmentation(true);
      const state = store.getGovernedState();
      if (!state.dataHealth || !state.dataHealth.status) {
        throw new Error('Data health snapshot missing in governed state');
      }
      const allowedStates = ['HEALTHY', 'REQUIRES_REVIEW', 'BLOCKED'];
      if (!allowedStates.includes(state.dataHealth.status)) {
        throw new Error(`Invalid data health status: ${state.dataHealth.status}`);
      }
      // Anti-slop verification: ensure no arbitrary percentage or numeric score exists
      if (state.dataHealth.score !== undefined || state.dataHealth.health_percentage !== undefined) {
        throw new Error('Detected arbitrary numeric health score in QA/QC snapshot (violates EC-TEST-001)');
      }
    }
  );

  // TC-STATE-019: Report readiness evaluation
  await runner.runTest(
    'TC-STATE-019',
    'Verify StateStore evaluates report readiness via reportReadinessEngine',
    () => {
      const store = new StateStore();
      store.setTemporalSegmentation(true);
      const state = store.getGovernedState();
      if (!state.reportReadiness) {
        throw new Error('Report readiness evaluation missing in governed state');
      }
      // Without lead verifier human sign-off, readiness should be REVIEW_REQUIRED
      if (state.reportReadiness.readiness_status !== 'REVIEW_REQUIRED') {
        throw new Error(`Expected REVIEW_REQUIRED prior to verifier sign-off, got ${state.reportReadiness.readiness_status}`);
      }
    }
  );

  // TC-STATE-020: Fail-Closed rejection of AI actor sign-offs
  await runner.runTest(
    'TC-STATE-020',
    'Verify StateStore rejects AI/OCR actor sign-off attempts fail-closed',
    () => {
      const store = new StateStore();
      let rejected = false;
      try {
        store.addSignOff({
          role: SIGN_OFF_ROLES.LEAD_VERIFIER,
          actor_name: 'AI Model Gemini 2.0',
          actor_type: 'AI',
          signature: 'SIG-AI-AUTO'
        });
      } catch (err) {
        rejected = true;
        if (err.code !== 'AI_SIGN_OFF_REJECTED') {
          throw new Error(`Expected code AI_SIGN_OFF_REJECTED, got ${err.code}`);
        }
      }
      if (!rejected) throw new Error('StateStore failed to reject AI actor sign-off');
    }
  );

  // TC-STATE-021: Certified human sign-offs enable REPORT_READY state
  await runner.runTest(
    'TC-STATE-021',
    'Verify StateStore transitions to REPORT_READY upon certified human sign-off',
    () => {
      const store = new StateStore();
      store.setTemporalSegmentation(true);

      // Add certified human lead verifier sign-off
      store.addSignOff({
        role: SIGN_OFF_ROLES.LEAD_VERIFIER,
        actor_name: 'Dr. Nguyen Van Auditor (Lead GHG Verifier #VN-884)',
        actor_type: 'HUMAN',
        signature: 'SIG-NGUYEN-VAN-AUDITOR-CERTIFIED'
      });

      const state = store.getGovernedState();
      if (state.reportReadiness.readiness_status !== 'REPORT_READY') {
        throw new Error(`Expected REPORT_READY status, got ${state.reportReadiness.readiness_status}`);
      }
      if (!state.reportReadiness.overall_ready) {
        throw new Error('Expected overall_ready to be true');
      }
      if (!state.auditPackage) {
        throw new Error('Expected compiled AuditPackage when REPORT_READY');
      }
    }
  );

  // TC-STATE-022: Controlled issues tracking without silent closure
  await runner.runTest(
    'TC-STATE-022',
    'Verify StateStore tracks all controlled issues without silent auto-closure',
    () => {
      const store = new StateStore();
      const state = store.getGovernedState();
      if (!state.controlledIssues || state.controlledIssues.length === 0) {
        throw new Error('Controlled issues registry missing in governed state');
      }
      const requiredIssues = [
        'ISSUE-TEMP-001',
        'ISSUE-TEMP-002',
        'ISSUE-RRM-001',
        'ISSUE-RRM-002',
        'ISSUE-RRM-003',
        'ISSUE-SPM-001',
        'ISSUE-MTH-001',
        'ISSUE-EFR-001',
        'ISSUE-GWP-001',
        'ISSUE-CES-001',
        'ISSUE-PROV-001'
      ];
      for (const issueId of requiredIssues) {
        const found = state.controlledIssues.find(i => i.id === issueId);
        if (!found) throw new Error(`Missing controlled issue ${issueId}`);
      }
    }
  );

  // TC-STATE-023: Formal disclosure statement for ISSUE-TEMP-002
  await runner.runTest(
    'TC-STATE-023',
    'Verify formal disclosure statement for controlled issue ISSUE-TEMP-002',
    () => {
      const store = new StateStore();
      store.addIssueDisclosure(
        'ISSUE-TEMP-002',
        'Mid-month billing cycles split using calendar-day linear weighting under verified auditor review.',
        'Nguyen Van Auditor'
      );
      const state = store.getGovernedState();
      const issue2 = state.controlledIssues.find(i => i.id === 'ISSUE-TEMP-002');
      if (!issue2 || issue2.status !== 'DISCLOSED_COMPLIANT') {
        throw new Error(`Expected DISCLOSED_COMPLIANT status for ISSUE-TEMP-002, got ${issue2?.status}`);
      }
      const disclosures = store.getControlledIssueDisclosures();
      if (disclosures.length === 0 || disclosures[0].issue_id !== 'ISSUE-TEMP-002') {
        throw new Error('Disclosure record missing in store');
      }
    }
  );

  // TC-STATE-024: Static audit verification: zero calculation leakage in StateStore & DataProvider
  await runner.runTest(
    'TC-STATE-024',
    'Verify static reflection: zero emission calculation formulas in StateStore and DataProvider',
    () => {
      const stateStoreSource = fs.readFileSync(
        path.resolve(process.cwd(), 'carbon/app/state-store.js'),
        'utf8'
      );
      const dataProviderSource = fs.readFileSync(
        path.resolve(process.cwd(), 'carbon/app/data-provider.js'),
        'utf8'
      );

      // Search for forbidden calculation leaks:
      const forbiddenPatterns = [
        /function\s+calculateEmissions/,
        /def\s+calc_co2e/,
        /activity_data\s*\*\s*emission_factor/,
        /tco2e\s*=\s*quantity\s*\*/,
        /gwp_multiplier\s*\*/
      ];

      for (const pattern of forbiddenPatterns) {
        if (pattern.test(stateStoreSource)) {
          throw new Error(`Detected forbidden calculation formula in state-store.js matching ${pattern}`);
        }
        if (pattern.test(dataProviderSource)) {
          throw new Error(`Detected forbidden calculation formula in data-provider.js matching ${pattern}`);
        }
      }
    }
  );

  // ==========================================================
  // TC-APP-001 THROUGH TC-APP-020: FOCUSED APPLICATION-STATE TESTS
  // ==========================================================

  // TC-APP-001: Separation of Domain State vs Presentation State
  await runner.runTest(
    'TC-APP-001',
    'Verify strict separation between Domain State and View/Presentation State',
    () => {
      const store = new StateStore();
      const domainState = store.getGovernedState();
      const viewState = store.getViewState();

      if (!domainState.calculation || !domainState.regulatory) {
        throw new Error('Domain state missing governed engine calculation/regulatory truth');
      }
      if (typeof viewState.activeTab !== 'string' || !viewState.expandedPanels) {
        throw new Error('View state missing presentation UI parameters');
      }
      // Domain state should not contain UI presentation parameters
      if (domainState.activeTab !== undefined || domainState.expandedPanels !== undefined) {
        throw new Error('Domain state contaminated with view parameters');
      }
    }
  );

  // TC-APP-002: View State updates do not trigger domain re-calculation
  await runner.runTest(
    'TC-APP-002',
    'Verify updating View State does not trigger domain re-calculation or mutate truth',
    () => {
      const store = new StateStore();
      const initialDomain = store.getGovernedState();
      const initialTimestamp = initialDomain.evaluationTimestamp;

      store.updateViewState({ activeTab: 'emissions', sortOrder: 'desc' });

      const postUpdateDomain = store.getGovernedState();
      if (postUpdateDomain.evaluationTimestamp !== initialTimestamp) {
        throw new Error('Updating ViewState caused unrequested domain re-calculation');
      }
      if (postUpdateDomain.calculation.total_co2e_tons !== initialDomain.calculation.total_co2e_tons) {
        throw new Error('Updating ViewState mutated calculation result');
      }
    }
  );

  // TC-APP-003: Provider Status lifecycle
  await runner.runTest(
    'TC-APP-003',
    'Verify DataProvider lifecycle status enums (LOADING, AVAILABLE, EMPTY, ERROR)',
    async () => {
      if (!PROVIDER_STATUS.LOADING || !PROVIDER_STATUS.AVAILABLE || !PROVIDER_STATUS.EMPTY || !PROVIDER_STATUS.ERROR) {
        throw new Error('PROVIDER_STATUS missing required lifecycle enum states');
      }
      if (!dataProvider.isAvailable()) {
        throw new Error(`Expected dataProvider.isAvailable() to be true, got status: ${dataProvider.getStatus()}`);
      }
      if (dataProvider.isLoading() || dataProvider.isEmpty() || dataProvider.isError()) {
        throw new Error('Provider incorrectly reports loading, empty, or error state');
      }
    }
  );

  // TC-APP-004: Fail-closed behavior on missing or unresolvable facility context
  await runner.runTest(
    'TC-APP-004',
    'Verify fail-closed behavior on missing facility context with structured error',
    () => {
      const store = new StateStore();
      store.setSelectedFacilityId('FAC-NON-EXISTENT-999');
      const state = store.getGovernedState();

      if (state.facility !== null) {
        throw new Error('Expected facility to be null for non-existent facility');
      }
      if (state.reportReadiness.is_ready !== false || state.reportReadiness.readiness_state !== 'BLOCKED') {
        throw new Error('Expected fail-closed BLOCKED readiness for invalid facility');
      }
      const err = store.getErrorProvenance();
      if (!err || err.error_code !== 'FACILITY_NOT_FOUND') {
        throw new Error('Expected structured error provenance with code FACILITY_NOT_FOUND');
      }
    }
  );

  // TC-APP-005: Multi-facility isolation
  await runner.runTest(
    'TC-APP-005',
    'Verify multi-facility isolation prevents cross-facility sign-off and state leakage',
    () => {
      const store = new StateStore();
      store.setSelectedFacilityId('FAC-2026-001');

      // Add sign-off for Facility 1
      store.addHumanSignOff({
        role: SIGN_OFF_ROLES.LEAD_VERIFIER,
        actor_name: 'Lead Verifier 1',
        actor_type: 'HUMAN',
        signature: 'SIG-VERIFIER-1'
      });
      const stateFac1 = store.getGovernedState();
      if (stateFac1.signOffs.length !== 1) {
        throw new Error('Facility 1 sign-off not recorded');
      }

      // Switch to Facility 2
      store.setSelectedFacilityId('FAC-2026-002');
      const stateFac2 = store.getGovernedState();
      if (stateFac2.signOffs.length !== 0) {
        throw new Error('Facility 1 sign-off leaked to Facility 2');
      }

      // Switch back to Facility 1
      store.setSelectedFacilityId('FAC-2026-001');
      const stateFac1Restored = store.getGovernedState();
      if (stateFac1Restored.signOffs.length !== 1) {
        throw new Error('Facility 1 sign-off was lost upon returning');
      }
    }
  );

  // TC-APP-006: Data Source Classification enum & tagging
  await runner.runTest(
    'TC-APP-006',
    'Verify Data Source Classification enums and mapping',
    () => {
      const required = [
        'AUTHORITATIVE',
        'SYNTHETIC_TEST_DATA',
        'DEMO_FIXTURE',
        'DERIVED_VIEW_DATA',
        'UNKNOWN'
      ];
      for (const req of required) {
        if (!DATA_SOURCE_CLASSIFICATION[req]) {
          throw new Error(`Missing classification enum ${req}`);
        }
      }
    }
  );

  // TC-APP-007: Authoritative catalog manifest validation
  await runner.runTest(
    'TC-APP-007',
    'Verify authoritative catalog manifest marks regulatory and factor files authoritative',
    () => {
      const manifest = dataProvider.getDataCatalogManifest();
      if (!Array.isArray(manifest) || manifest.length === 0) {
        throw new Error('Catalog manifest empty or invalid');
      }
      const sectorsEntry = manifest.find(m => m.resource === 'data/sectors.json');
      if (!sectorsEntry || !sectorsEntry.is_authoritative) {
        throw new Error('sectors.json must be marked AUTHORITATIVE');
      }
      const efEntry = manifest.find(m => m.resource === 'data/emission-factors.json');
      if (!efEntry || !efEntry.is_authoritative) {
        throw new Error('emission-factors.json must be marked AUTHORITATIVE');
      }
    }
  );

  // TC-APP-008: Demo fixtures explicitly marked as DEMO_FIXTURE
  await runner.runTest(
    'TC-APP-008',
    'Verify demo activity and document fixtures are strictly classified as DEMO_FIXTURE',
    () => {
      const demoActsClass = dataProvider.getDataSourceClassification('demo-data/demo-activities.json');
      if (demoActsClass !== DATA_SOURCE_CLASSIFICATION.DEMO_FIXTURE) {
        throw new Error(`Expected DEMO_FIXTURE for demo-activities.json, got ${demoActsClass}`);
      }
      const demoDocsClass = dataProvider.getDataSourceClassification('demo-data/demo-documents.json');
      if (demoDocsClass !== DATA_SOURCE_CLASSIFICATION.DEMO_FIXTURE) {
        throw new Error(`Expected DEMO_FIXTURE for demo-documents.json, got ${demoDocsClass}`);
      }
    }
  );

  // TC-APP-009: Overview ViewModel contract
  await runner.runTest(
    'TC-APP-009',
    'Verify Overview ViewModel contract is read-oriented and formats CO2e consistently',
    () => {
      const store = new StateStore();
      const vm = store.getOverviewViewModel();
      if (typeof vm.total_facilities !== 'number') throw new Error('Invalid total_facilities in Overview VM');
      if (typeof vm.total_emissions_formatted !== 'string') throw new Error('Invalid formatted emissions');
      if (!vm.total_emissions_formatted.includes('tCO2e') && !vm.total_emissions_formatted.includes('t CO₂e')) throw new Error('Overview VM emissions must include tCO2e unit');
      if (!vm.active_facility_id) throw new Error('Missing active_facility_id in Overview VM');
    }
  );

  // TC-APP-010: Inventory ViewModel contract
  await runner.runTest(
    'TC-APP-010',
    'Verify Inventory ViewModel contract breaks down Scope 1, 2, 3 and individual gases',
    () => {
      const store = new StateStore();
      const vm = store.getInventoryViewModel();
      if (!vm.scope_1 || !vm.scope_2 || !vm.scope_3) {
        throw new Error('Inventory VM missing scope breakdown');
      }
      if (typeof vm.scope_1.tons !== 'number' || typeof vm.scope_2.tons !== 'number') {
        throw new Error('Inventory VM scope values must be numbers');
      }
      if (typeof vm.individual_gases !== 'object') {
        throw new Error('Inventory VM missing individual GHG gases transparency');
      }
    }
  );

  // TC-APP-011: Regulatory ViewModel contract
  await runner.runTest(
    'TC-APP-011',
    'Verify Regulatory ViewModel exposes legal basis without UI logic duplication',
    () => {
      const store = new StateStore();
      const vm = store.getRegulatoryViewModel();
      if (!vm.facility_id || !vm.status) throw new Error('Regulatory VM missing facility or status');
      if (typeof vm.mandatory !== 'boolean') throw new Error('Regulatory VM mandatory flag must be boolean');
      if (!vm.legal_basis) throw new Error('Regulatory VM missing legal basis');
    }
  );

  // TC-APP-012: Readiness ViewModel contract
  await runner.runTest(
    'TC-APP-012',
    'Verify Readiness ViewModel reflects blocking findings, review findings, and audit package',
    () => {
      const store = new StateStore();
      const vm = store.getReadinessViewModel();
      if (!vm.readiness_state) throw new Error('Readiness VM missing readiness_state');
      if (!Array.isArray(vm.blocked_findings) || !Array.isArray(vm.review_findings)) {
        throw new Error('Readiness VM findings must be arrays');
      }
      if (typeof vm.is_ready !== 'boolean') throw new Error('Readiness VM is_ready must be boolean');
    }
  );

  // TC-APP-013: Status Normalization enum and invariants
  await runner.runTest(
    'TC-APP-013',
    'Verify STATUS_NORMALIZATION enum maintains discrete states without lossy merging',
    () => {
      const expected = [
        'BLOCKED',
        'REQUIRES_REVIEW',
        'READY',
        'NOT_READY',
        'CALCULATION_READY',
        'REPORT_READY'
      ];
      for (const s of expected) {
        if (STATUS_NORMALIZATION[s] !== s) {
          throw new Error(`STATUS_NORMALIZATION missing or mismatched state ${s}`);
        }
      }
    }
  );

  // TC-APP-014: Error Provenance tracking format
  await runner.runTest(
    'TC-APP-014',
    'Verify structured Error Provenance captures source_engine, operation, and error_code',
    () => {
      const store = new StateStore();
      store.setSelectedFacilityId('FAC-INVALID');
      const err = store.getErrorProvenance();
      if (!err.source_engine || !err.operation || !err.error_code || !err.timestamp) {
        throw new Error('Error provenance missing required diagnostic fields');
      }
    }
  );

  // TC-APP-015: Historical Calculation Snapshot addressability via DataProvider
  await runner.runTest(
    'TC-APP-015',
    'Verify Historical Calculation Snapshots can be stored, retrieved, and isolated',
    () => {
      const testSnapshot = {
        snapshot_id: 'SNAP-TEST-2026-001',
        facility_id: 'FAC-2026-001',
        total_co2e_tons: 1081.90,
        timestamp: new Date().toISOString()
      };
      const stored = dataProvider.storeHistoricalCalculationSnapshot(testSnapshot);
      if (!stored) throw new Error('Failed to store historical snapshot');

      const retrieved = dataProvider.getHistoricalCalculationSnapshot('SNAP-TEST-2026-001');
      if (!retrieved || retrieved.total_co2e_tons !== 1081.90) {
        throw new Error('Failed to retrieve exact historical snapshot');
      }
      const facilitySnapshots = dataProvider.getHistoricalCalculationSnapshots('FAC-2026-001');
      if (!facilitySnapshots.some(s => s.snapshot_id === 'SNAP-TEST-2026-001')) {
        throw new Error('Historical snapshot missing in facility-scoped list');
      }
    }
  );

  // TC-APP-016: Immutable Governed State
  await runner.runTest(
    'TC-APP-016',
    'Verify Governed State is deeply frozen and throws on attempted mutation',
    () => {
      const store = new StateStore();
      const state = store.getGovernedState();
      if (!Object.isFrozen(state)) {
        throw new Error('Governed state root object is not frozen');
      }
      let mutationBlocked = false;
      try {
        state.custom_tamper_prop = 'tampered';
      } catch {
        mutationBlocked = true;
      }
      if (!mutationBlocked && state.custom_tamper_prop !== undefined) {
        throw new Error('Governed state allowed unauthorized runtime modification');
      }
    }
  );

  // TC-APP-017: StateStore reactive subscription notifications
  await runner.runTest(
    'TC-APP-017',
    'Verify StateStore reactive subscription triggers on state updates',
    () => {
      const store = new StateStore();
      let callCount = 0;
      const unsubscribe = store.subscribe(() => {
        callCount++;
      });
      store.updateViewState({ activeModal: 'AUDIT_PACKAGE' });
      if (callCount === 0) {
        throw new Error('Subscription callback was not triggered on updateViewState');
      }
      unsubscribe();
      store.updateViewState({ activeModal: null });
      if (callCount !== 1) {
        throw new Error('Unsubscribe failed to detach listener');
      }
    }
  );

  // TC-APP-018: Controlled Issues registry and formal disclosure reflection
  await runner.runTest(
    'TC-APP-018',
    'Verify Controlled Issues registry exposes governed issues to UI layer',
    () => {
      const store = new StateStore();
      const issues = store.getControlledIssues();
      if (!Array.isArray(issues) || issues.length === 0) {
        throw new Error('getControlledIssues must return an array of issues');
      }
      const issueTemp1 = issues.find(i => i.id === 'ISSUE-TEMP-001');
      if (!issueTemp1 || !issueTemp1.governed) {
        throw new Error('ISSUE-TEMP-001 missing or not marked governed');
      }
    }
  );

  // TC-APP-019: Zero hard-coded calculation leakage in view models
  await runner.runTest(
    'TC-APP-019',
    'Verify View Models extract exact numbers from calculation engine snapshot without formulas',
    () => {
      const store = new StateStore();
      const state = store.getGovernedState();
      const overviewVM = store.getOverviewViewModel();
      const inventoryVM = store.getInventoryViewModel();

      if (overviewVM.total_emissions_co2e !== state.calculation.total_co2e_tons) {
        throw new Error('Overview VM emissions do not match engine calculation snapshot');
      }
      if (inventoryVM.total_tons !== state.calculation.total_co2e_tons) {
        throw new Error('Inventory VM total does not match engine calculation snapshot');
      }
    }
  );

  // TC-APP-020: Complete end-to-end integration: Provider -> StateStore -> ViewModels
  await runner.runTest(
    'TC-APP-020',
    'Verify end-to-end data pipeline integrity from DataProvider to ViewModels',
    async () => {
      const store = new StateStore();
      store.setSelectedFacilityId('FAC-2026-001');
      store.setTemporalSegmentation(true);
      store.addHumanSignOff({
        role: SIGN_OFF_ROLES.LEAD_VERIFIER,
        actor_name: 'Lead Verifier',
        actor_type: 'HUMAN',
        signature: 'SIG-VERIFIER-APPROVED'
      });

      const overviewVM = store.getOverviewViewModel();
      const readinessVM = store.getReadinessViewModel();

      if (!overviewVM.is_report_ready) {
        throw new Error('Expected Overview VM to report ready after verifier sign-off');
      }
      if (readinessVM.readiness_state !== 'REPORT_READY') {
        throw new Error(`Expected REPORT_READY in readiness VM, got ${readinessVM.readiness_state}`);
      }
      if (!readinessVM.has_audit_package) {
        throw new Error('Expected compiled audit package in readiness VM');
      }
    }
  );

  runner.report();
}

executeSuite();
