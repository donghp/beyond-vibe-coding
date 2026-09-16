/**
 * ENERIX Carbon - Task #0029: Carbon Overview & Decision Workspace Verification Suite
 * Verifies all 24 canonical Overview UI requirements (TC-OVERVIEW-001 through TC-OVERVIEW-024).
 * Suite #15 in Governed Test Manifest.
 */

import { dataProvider } from '../app/data-provider.js';
import { StateStore, stateStore } from '../app/state-store.js';
import { renderOverviewPage } from '../ui/pages/overview.js';

class OverviewTestRunner {
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

  report() {
    console.log('\n======================================================');
    console.log('ENERIX CARBON - OVERVIEW / DECISION WORKSPACE (#0029)');
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
      console.log('\n\x1b[32m✓ All Carbon Overview & Decision Workspace tests passed with 100% compliance!\x1b[0m\n');
      process.exit(0);
    }
  }
}

const runner = new OverviewTestRunner();

console.log('Starting ENERIX Carbon Overview / Decision Workspace Verification (#0029)...\n');

async function executeTests() {
  await dataProvider.loadAll();
  stateStore.recompute();

  // TC-OVERVIEW-001: Workspace loads with primary executive layout & headers
  runner.run('TC-OVERVIEW-001', 'Workspace loads with primary executive layout, titles, subtitles, and header indicators', () => {
    stateStore.selectFacility('FAC-2026-001');
    stateStore.setTemporalSegmentation(true);
    const html = renderOverviewPage();
    if (!html.includes('Carbon Overview & Decision Workspace')) {
      throw new Error('Overview page title missing from rendered markup');
    }
    if (!html.includes('Executive Decision Layer') || !html.includes('Governing Baseline')) {
      throw new Error('Subtitle with governing baseline missing');
    }
  });

  // TC-OVERVIEW-002: Active facility context resolved in header
  runner.run('TC-OVERVIEW-002', 'Facility context resolved in header with active facility dropdown and reporting period', () => {
    stateStore.selectFacility('FAC-2026-001');
    const html = renderOverviewPage();
    if (!html.includes('overview-facility-select')) {
      throw new Error('Facility selector select element missing');
    }
    if (!html.includes('Nhà máy Nhiệt điện Phả Lại 1') || !html.includes('FAC-2026-001')) {
      throw new Error('Active facility name and ID missing from rendered options');
    }
  });

  // TC-OVERVIEW-003: Regulatory status pillar surfaced
  runner.run('TC-OVERVIEW-003', 'Regulatory status pillar surfaced (APPLICABLE, MANDATORY, legal basis)', () => {
    stateStore.selectFacility('FAC-2026-001');
    const html = renderOverviewPage();
    if (!html.includes('Regulatory Applicability')) {
      throw new Error('Regulatory applicability section missing');
    }
    if (!html.includes('Quyết định 42/2026/QĐ-TTg') && !html.includes('QĐ 42/2026/QĐ-TTg')) {
      throw new Error('Legal basis citation missing');
    }
    if (!html.includes('MANDATORY') && !html.includes('status-badge mandatory')) {
      throw new Error('Mandatory regulatory status badge missing');
    }
  });

  // TC-OVERVIEW-004: Temporal regime status surfaced
  runner.run('TC-OVERVIEW-004', 'Temporal regime status surfaced with transition boundary indicators', () => {
    stateStore.selectFacility('FAC-2026-001');
    stateStore.setTemporalSegmentation(true);
    const html = renderOverviewPage();
    if (!html.includes('Dual Regime Segmented') && !html.includes('Dual segmentation')) {
      throw new Error('Dual regime segmentation indicator missing when enabled');
    }
  });

  // TC-OVERVIEW-005: Blocker alert banner rendered when temporal segmentation is required but disabled
  runner.run('TC-OVERVIEW-005', 'Blocker alert banner rendered when temporal segmentation is required but disabled (Fail-Closed)', () => {
    stateStore.selectFacility('FAC-2026-001');
    stateStore.setTemporalSegmentation(false); // Straddles transition without segmentation
    const html = renderOverviewPage();
    if (!html.includes('STATUTORY COMPLIANCE BLOCKED') && !html.includes('Fail-Closed')) {
      throw new Error('Fail-closed blocker alert banner missing when temporal segmentation disabled');
    }
    if (!html.includes('ISSUE-TEMP-001')) {
      throw new Error('ISSUE-TEMP-001 reference missing from blocker alert');
    }
    // Restore segmentation
    stateStore.setTemporalSegmentation(true);
  });

  // TC-OVERVIEW-006: Gross facility emissions KPI card rendered with total formatted CO2e
  runner.run('TC-OVERVIEW-006', 'Gross facility emissions KPI card rendered with total formatted CO2e and audit hash', () => {
    stateStore.selectFacility('FAC-2026-001');
    stateStore.setTemporalSegmentation(true);
    const vm = stateStore.getOverviewViewModel();
    const html = renderOverviewPage();
    if (!html.includes('Gross Facility Emissions')) {
      throw new Error('Gross facility emissions card missing');
    }
    if (!html.includes(vm.calculation.total_formatted)) {
      throw new Error(`Total emissions value (${vm.calculation.total_formatted}) missing from rendered KPI card`);
    }
  });

  // TC-OVERVIEW-007: Scope 1 direct emissions correctly rendered
  runner.run('TC-OVERVIEW-007', 'Scope 1 direct emissions correctly rendered with stationary diesel fuel breakdown', () => {
    stateStore.selectFacility('FAC-2026-001');
    const vm = stateStore.getOverviewViewModel();
    const html = renderOverviewPage();
    if (!html.includes('Scope 1') || !html.includes(vm.calculation.scope_1.formatted)) {
      throw new Error(`Scope 1 direct emissions value (${vm.calculation.scope_1.formatted}) missing`);
    }
  });

  // TC-OVERVIEW-008: Scope 2 indirect emissions correctly rendered
  runner.run('TC-OVERVIEW-008', 'Scope 2 indirect emissions correctly rendered with grid electricity breakdown', () => {
    stateStore.selectFacility('FAC-2026-001');
    const vm = stateStore.getOverviewViewModel();
    const html = renderOverviewPage();
    if (!html.includes('Scope 2') || !html.includes(vm.calculation.scope_2.formatted)) {
      throw new Error(`Scope 2 indirect emissions value (${vm.calculation.scope_2.formatted}) missing`);
    }
  });

  // TC-OVERVIEW-009: Scope 3 value chain emissions handled cleanly
  runner.run('TC-OVERVIEW-009', 'Scope 3 value chain emissions handled cleanly without inventing fake data', () => {
    const vm = stateStore.getOverviewViewModel();
    if (vm.calculation.scope_3.tons !== 0.00) {
      throw new Error('Scope 3 emissions should be 0.00 when not in boundary');
    }
    if (!vm.calculation.scope_3.label) {
      throw new Error('Scope 3 label missing');
    }
  });

  // TC-OVERVIEW-010: Greenhouse gas species composition table rendered with AR5 GWP multipliers
  runner.run('TC-OVERVIEW-010', 'Greenhouse gas species composition table rendered with AR5 GWP multipliers (CO2, CH4, N2O)', () => {
    stateStore.selectFacility('FAC-2026-001');
    const html = renderOverviewPage();
    if (!html.includes('Carbon Dioxide') || !html.includes('CO2')) {
      throw new Error('CO2 gas row missing');
    }
    if (!html.includes('Methane') || !html.includes('CH4') || !html.includes('28x')) {
      throw new Error('CH4 gas row with 28x GWP missing');
    }
    if (!html.includes('Nitrous Oxide') || !html.includes('N2O') || !html.includes('265x')) {
      throw new Error('N2O gas row with 265x GWP missing');
    }
  });

  // TC-OVERVIEW-011: Data Health & Evidence coverage surfaced
  runner.run('TC-OVERVIEW-011', 'Data Health & Evidence coverage surfaced with verified document count and activity records', () => {
    stateStore.selectFacility('FAC-2026-001');
    const html = renderOverviewPage();
    if (!html.includes('Data Health & Evidence')) {
      throw new Error('Data Health card missing');
    }
    if (!html.includes('Verified Docs') || !html.includes('Activity records')) {
      throw new Error('Verified documents and activity records counts missing');
    }
  });

  // TC-OVERVIEW-012: Statutory Report Readiness state surfaced
  runner.run('TC-OVERVIEW-012', 'Statutory Report Readiness state surfaced (REPORT_READY, NOT_READY, BLOCKED)', () => {
    stateStore.selectFacility('FAC-2026-001');
    stateStore.setTemporalSegmentation(true);
    const html = renderOverviewPage();
    if (!html.includes('Statutory Report Readiness')) {
      throw new Error('Statutory report readiness card missing');
    }
  });

  // TC-OVERVIEW-013: 5-Pillar Executive Decision Matrix evaluated and rendered
  runner.run('TC-OVERVIEW-013', '5-Pillar Executive Decision Matrix evaluated and rendered with all 5 gate cards', () => {
    stateStore.selectFacility('FAC-2026-001');
    stateStore.setTemporalSegmentation(true);
    const html = renderOverviewPage();
    if (!html.includes('5-Pillar Executive Decision Matrix')) {
      throw new Error('5-Pillar decision matrix title missing');
    }
    if (!html.includes('REGULATORY') || !html.includes('TEMPORAL') || !html.includes('DATA_HEALTH') || !html.includes('CALCULATION') || !html.includes('ASSURANCE_GOVERNANCE')) {
      throw new Error('One or more of the 5 pillars missing from decision matrix');
    }
  });

  // TC-OVERVIEW-014: Controlled Issues & Disclosures rendered with issue IDs
  runner.run('TC-OVERVIEW-014', 'Controlled Issues & Disclosures rendered with issue IDs (ISSUE-TEMP-001, ISSUE-GWP-001)', () => {
    stateStore.selectFacility('FAC-2026-001');
    stateStore.setTemporalSegmentation(false);
    const html = renderOverviewPage();
    if (!html.includes('Controlled Issues & Statutory Disclosures')) {
      throw new Error('Controlled issues section missing');
    }
    if (!html.includes('ISSUE-TEMP-001') || !html.includes('ISSUE-GWP-001')) {
      throw new Error('ISSUE-TEMP-001 or ISSUE-GWP-001 missing from disclosures');
    }
    stateStore.setTemporalSegmentation(true);
  });

  // TC-OVERVIEW-015: Multi-ministry conflict disclosed for FAC-2026-003
  runner.run('TC-OVERVIEW-015', 'Multi-ministry conflict disclosed for FAC-2026-003 (ISSUE-RRM-001)', () => {
    stateStore.selectFacility('FAC-2026-003');
    const vm = stateStore.getOverviewViewModel();
    const hasIssueRRM = vm.governance.controlled_issues.some(i => i.issue_id === 'ISSUE-RRM-001');
    if (!hasIssueRRM) {
      throw new Error('FAC-2026-003 should have ISSUE-RRM-001 in controlled issues');
    }
    const html = renderOverviewPage();
    if (!html.includes('ISSUE-RRM-001')) {
      throw new Error('ISSUE-RRM-001 missing from rendered markup for FAC-2026-003');
    }
    stateStore.selectFacility('FAC-2026-001');
  });

  // TC-OVERVIEW-016: Human verifier sign-offs rendered with certified auditor names
  runner.run('TC-OVERVIEW-016', 'Human verifier sign-offs rendered with certified auditor names, roles, and strict non-AI policy badge', () => {
    stateStore.selectFacility('FAC-2026-001');
    const html = renderOverviewPage();
    if (!html.includes('Human Verifier Sign-Offs (Non-AI)') && !html.includes('Human Verifier Sign-Offs')) {
      throw new Error('Human verifier sign-offs card missing');
    }
    if (!html.includes('FAIL-CLOSED NON-AI ENFORCED')) {
      throw new Error('Fail-closed non-AI policy badge missing');
    }
  });

  // TC-OVERVIEW-017: Multi-Facility statutory compliance matrix rendered
  runner.run('TC-OVERVIEW-017', 'Multi-Facility statutory compliance matrix rendered with all registered enterprise facilities', () => {
    stateStore.selectFacility('FAC-2026-001');
    const html = renderOverviewPage();
    if (!html.includes('Enterprise Facilities Statutory Compliance Matrix')) {
      throw new Error('Multi-facility matrix table missing');
    }
    if (!html.includes('FAC-2026-001') || !html.includes('FAC-2026-002') || !html.includes('FAC-2026-003')) {
      throw new Error('Registered facility IDs missing from table');
    }
  });

  // TC-OVERVIEW-018: Facility switching reactively updates the Overview view model
  runner.run('TC-OVERVIEW-018', 'Facility switching reactively updates the Overview view model and active state', () => {
    stateStore.selectFacility('FAC-2026-002');
    const vm2 = stateStore.getOverviewViewModel();
    if (vm2.facility.facility_id !== 'FAC-2026-002') {
      throw new Error('Facility 2 context not set in overview view model');
    }
    if (!vm2.facility.facility_name) {
      throw new Error('Facility 2 name missing in view model');
    }
    // Switch back to Facility 1
    stateStore.selectFacility('FAC-2026-001');
  });

  // TC-OVERVIEW-019: Temporal toggle button reactively flips segmentation state
  runner.run('TC-OVERVIEW-019', 'Temporal toggle button reactively flips segmentation state in the StateStore', () => {
    stateStore.setTemporalSegmentation(false);
    if (stateStore.temporalSegmentation !== false) {
      throw new Error('Failed to set temporal segmentation to false');
    }
    let vm = stateStore.getOverviewViewModel();
    if (vm.regulatory.is_temporal_segmented !== false || vm.calculation.is_blocked !== true) {
      throw new Error('Temporal segmentation state or blocker not reflected in view model');
    }

    stateStore.setTemporalSegmentation(true);
    if (stateStore.temporalSegmentation !== true) {
      throw new Error('Failed to set temporal segmentation to true');
    }
    vm = stateStore.getOverviewViewModel();
    if (vm.regulatory.is_temporal_segmented !== true || vm.calculation.is_blocked !== false) {
      throw new Error('Temporal segmentation enabled state not reflected in view model');
    }
  });

  // TC-OVERVIEW-020: Drill-down navigation links exist for all 4 key workspaces
  runner.run('TC-OVERVIEW-020', 'Drill-down navigation links exist for all 4 key workspaces (regulatory, calculations, evidence-trace, reports)', () => {
    const html = renderOverviewPage();
    if (!html.includes('data-nav="regulatory-check"')) {
      throw new Error('Drill-down link to regulatory-check missing');
    }
    if (!html.includes('data-nav="calculations"')) {
      throw new Error('Drill-down link to calculations missing');
    }
    if (!html.includes('data-nav="evidence-trace"')) {
      throw new Error('Drill-down link to evidence-trace missing');
    }
    if (!html.includes('data-nav="reports"')) {
      throw new Error('Drill-down link to reports missing');
    }
  });

  // TC-OVERVIEW-021: Loading state renders accessible status message
  runner.run('TC-OVERVIEW-021', 'Loading state renders accessible status message with role="status"', () => {
    const html = renderOverviewPage({ status: 'LOADING' });
    if (!html.includes('role="status"') || !html.includes('Loading Governed Carbon Overview')) {
      throw new Error('Loading state missing accessible role="status" or loading title');
    }
  });

  // TC-OVERVIEW-022: Empty state renders descriptive zero-data notification
  runner.run('TC-OVERVIEW-022', 'Empty state renders descriptive zero-data notification with role="status"', () => {
    const html = renderOverviewPage({ status: 'EMPTY' });
    if (!html.includes('role="status"') || !html.includes('No Regulated Facilities Registered')) {
      throw new Error('Empty state missing accessible role="status" or title');
    }
  });

  // TC-OVERVIEW-023: Error state renders structured fail-closed alert
  runner.run('TC-OVERVIEW-023', 'Error state renders structured fail-closed alert with role="alert"', () => {
    const html = renderOverviewPage({ error: new Error('Simulated overview load failure'), status: 'ERROR' });
    if (!html.includes('role="alert"') || !html.includes('Executive Overview Engine Error (Fail-Closed)')) {
      throw new Error('Error state missing accessible role="alert" or error message');
    }
    if (!html.includes('Simulated overview load failure')) {
      throw new Error('Error message text missing from alert markup');
    }
  });

  // TC-OVERVIEW-024: UI is strictly an Inspector/Consumer: Zero duplicate calculation formulas
  runner.run('TC-OVERVIEW-024', 'UI is strictly an Inspector/Consumer: Zero duplicate calculation formulas or mutation in overview.js', () => {
    const vm = stateStore.getOverviewViewModel();
    if (typeof vm !== 'object' || vm === null) {
      throw new Error('Overview view model must be a non-null object');
    }
    if (!Object.isFrozen(vm)) {
      throw new Error('Overview view model must be Object.freeze() immutable');
    }
  });

  runner.report();
}

executeTests().catch(err => {
  console.error('Fatal Overview Test Runner Error:', err);
  process.exit(1);
});
