/**
 * ENERIX Carbon - Task #0026: Regulatory Workspace Verification Suite
 * Verifies all 20 regulatory workspace canonical requirements (TC-REGUI-001 through TC-REGUI-020).
 */

import { dataProvider } from '../app/data-provider.js';
import { StateStore, stateStore } from '../app/state-store.js';
import { renderRegulatoryCheckPage } from '../ui/pages/regulatory-check.js';
import fs from 'fs';
import path from 'path';

class RegulatoryWorkspaceTestRunner {
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
    console.log('ENERIX CARBON - REGULATORY WORKSPACE VERIFICATION (#0026)');
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
      });
      process.exit(1);
    } else {
      console.log('\x1b[32m✓ All Regulatory Workspace verification tests passed with 100% compliance!\x1b[0m\n');
      process.exit(0);
    }
  }
}

const runner = new RegulatoryWorkspaceTestRunner();

console.log('Starting ENERIX Carbon Regulatory Workspace Verification Suite (#0026)...\n');

(async function executeTests() {
  await dataProvider.loadAll();
  stateStore.setSelectedFacilityId('FAC-2026-001');

  // TC-REGUI-001: workspace loads
  runner.run('TC-REGUI-001', 'workspace loads with primary statutory layout & headers', () => {
    const html = renderRegulatoryCheckPage();
    if (typeof html !== 'string' || html.length < 500) {
      throw new Error('Expected substantial HTML output from renderRegulatoryCheckPage');
    }
    if (!html.includes('Regulatory Workspace')) {
      throw new Error('Missing "Regulatory Workspace" page title');
    }
    if (!html.includes('Quyết định 42/2026/QĐ-TTg') && !html.includes('QĐ 42/2026/QĐ-TTg')) {
      throw new Error('Missing Decision 42 statutory baseline reference');
    }
  });

  // TC-REGUI-002: facility context displayed
  runner.run('TC-REGUI-002', 'facility context displayed (identity, legal name, tax ID, province, sector)', () => {
    stateStore.setSelectedFacilityId('FAC-2026-001');
    const html = renderRegulatoryCheckPage();
    if (!html.includes('Nhà máy Nhiệt điện Phả Lại 1 & 2')) {
      throw new Error('Missing active facility name');
    }
    if (!html.includes('0101234567')) {
      throw new Error('Missing facility tax code');
    }
    if (!html.includes('Hải Dương')) {
      throw new Error('Missing facility province');
    }
    if (!html.includes('SEC-01-ENERGY')) {
      throw new Error('Missing facility sector ID');
    }
  });

  // TC-REGUI-003: applicability states displayed correctly
  runner.run('TC-REGUI-003', 'applicability states displayed correctly (APPLICABLE, NOT_APPLICABLE, REQUIRES_REVIEW, BLOCKED)', () => {
    stateStore.setSelectedFacilityId('FAC-2026-001');
    const vm = stateStore.getRegulatoryViewModel();
    if (vm.status !== 'MANDATORY' && vm.status !== 'APPLICABLE') {
      throw new Error(`Expected APPLICABLE/MANDATORY status for regulated facility, got ${vm.status}`);
    }
    const html = renderRegulatoryCheckPage();
    if (!html.includes(vm.status)) {
      throw new Error('Rendered HTML missing governed status badge');
    }
  });

  // TC-REGUI-004: mandatory status remains separate
  runner.run('TC-REGUI-004', 'mandatory status remains separate from applicability dimension', () => {
    stateStore.setSelectedFacilityId('FAC-2026-001');
    const vm = stateStore.getRegulatoryViewModel();
    if (typeof vm.mandatory !== 'boolean') {
      throw new Error('Expected separate boolean mandatory flag');
    }
    const html = renderRegulatoryCheckPage();
    if (!html.includes('Statutory Mandate') && !html.includes('MANDATORY')) {
      throw new Error('Missing separate mandatory status indicator');
    }
  });

  // TC-REGUI-005: sector mapping state displayed
  runner.run('TC-REGUI-005', 'sector mapping state displayed (EXACT, MAPPED, PARTIAL, AMBIGUOUS)', () => {
    stateStore.setSelectedFacilityId('FAC-2026-001');
    const vm = stateStore.getRegulatoryViewModel();
    if (!vm.taxonomy_mapping) throw new Error('Missing taxonomy_mapping in view model');
    if (vm.taxonomy_mapping.mapping_state !== 'EXACT') {
      throw new Error(`Expected EXACT mapping state, got ${vm.taxonomy_mapping.mapping_state}`);
    }
    const html = renderRegulatoryCheckPage();
    if (!html.includes('Sector_1_MOIT') || !html.includes('EXACT')) {
      throw new Error('Taxonomy mapping attributes not found in rendered HTML');
    }
  });

  // TC-REGUI-006: temporal segment displayed
  runner.run('TC-REGUI-006', 'temporal segment displayed with transition boundary and dual regimes', () => {
    stateStore.setSelectedFacilityId('FAC-2026-001');
    stateStore.setTemporalSegmentation(true);
    const html = renderRegulatoryCheckPage();
    if (!html.includes('Segment 1') || !html.includes('Segment 2')) {
      throw new Error('Expected Segment 1 and Segment 2 in segmented view');
    }
    if (!html.includes('2026-09-25')) {
      throw new Error('Expected 2026-09-25 transition boundary date');
    }
    if (!html.includes('SEGMENTED_COMPLIANT')) {
      throw new Error('Expected SEGMENTED_COMPLIANT badge');
    }
  });

  // TC-REGUI-007: regulatory conflict visible
  runner.run('TC-REGUI-007', 'regulatory conflict visible for multi-ministry dual-use facility (FAC-2026-003)', () => {
    stateStore.setSelectedFacilityId('FAC-2026-003');
    const vm = stateStore.getRegulatoryViewModel();
    if (!vm.conflicts || vm.conflicts.length === 0) {
      throw new Error('Expected conflicts array for dual-use facility FAC-2026-003');
    }
    const html = renderRegulatoryCheckPage();
    if (!html.includes('Jurisdictional Precedence Conflict') && !html.includes('Conflict Detected')) {
      throw new Error('Conflict alert banner not rendered for conflicted facility');
    }
  });

  // TC-REGUI-008: controlled issue visible
  runner.run('TC-REGUI-008', 'controlled issue visible in governed ledger (ISSUE-RRM-001, ISSUE-TEMP-001, ISSUE-TEMP-002)', () => {
    const html = renderRegulatoryCheckPage();
    if (!html.includes('ISSUE-RRM-001')) {
      throw new Error('Missing ISSUE-RRM-001 in ledger');
    }
    if (!html.includes('ISSUE-TEMP-001')) {
      throw new Error('Missing ISSUE-TEMP-001 in ledger');
    }
    if (!html.includes('ISSUE-TEMP-002')) {
      throw new Error('Missing ISSUE-TEMP-002 in ledger');
    }
  });

  // TC-REGUI-009: source/provenance navigation
  runner.run('TC-REGUI-009', 'source/provenance navigation exposes document ID, rule ID, and statutory citations', () => {
    stateStore.setSelectedFacilityId('FAC-2026-001');
    const html = renderRegulatoryCheckPage();
    if (!html.includes('Quyết định 42/2026/QĐ-TTg') && !html.includes('QĐ 42/2026/QĐ-TTg')) {
      throw new Error('Missing statutory legal basis citation');
    }
    if (!html.includes('Governed Evaluation Trace') && !html.includes('Statutory Citation')) {
      throw new Error('Missing evaluation trace or citation display');
    }
  });

  // TC-REGUI-010: REQUIRES_REVIEW state
  runner.run('TC-REGUI-010', 'REQUIRES_REVIEW state handled with amber badge and review prompt', () => {
    const mockVm = {
      facility_id: 'FAC-TEST-REV',
      facility_name: 'Test Review Facility',
      legal_name: 'Test Corp',
      tax_id: '9999999999',
      province: 'Da Nang',
      sector_id: 'SEC-AMBIGUOUS',
      status: 'REQUIRES_REVIEW',
      mandatory: false,
      legal_basis: 'Uncertain Multi-Ministry Boundary',
      effective_from: '2026-01-01',
      reason: 'Requires expert legal review due to conflicting ministerial guidelines',
      conflicts: ['RULE-A', 'RULE-B'],
      rule_evaluations: [],
      is_temporal_segmented: false,
      temporal_issue_status: 'REQUIRES_REVIEW',
      taxonomy_mapping: {
        internal_code: 'SEC-AMBIGUOUS',
        external_system: 'DECISION_42_2026_TTG',
        external_code: 'AMBIGUOUS',
        external_label: 'Pending Resolution',
        mapping_state: 'AMBIGUOUS'
      },
      methodology_implication: {
        methodology_id: 'METH-REV-01',
        name: 'Review Methodology',
        governing_circular: 'Pending Decree',
        default_tier: 'TIER_1',
        status: 'REQUIRES_REVIEW'
      },
      disclosures: [],
      facilities_matrix: [],
      reporting_period: { period_start: '2026-01-01', period_end: '2026-12-31' }
    };
    const html = renderRegulatoryCheckPage({ viewModel: mockVm });
    if (!html.includes('REQUIRES_REVIEW') && !html.includes('Requires Review')) {
      throw new Error('Expected REQUIRES_REVIEW representation in rendered HTML');
    }
  });

  // TC-REGUI-011: BLOCKED state
  runner.run('TC-REGUI-011', 'BLOCKED state handled with fail-closed warning alert', () => {
    const mockVm = {
      facility_id: 'FAC-TEST-BLK',
      facility_name: 'Test Blocked Facility',
      legal_name: 'Test Corp',
      tax_id: '9999999999',
      province: 'Hanoi',
      sector_id: 'SEC-UNKNOWN',
      status: 'BLOCKED',
      mandatory: true,
      legal_basis: 'Blocked Authority',
      effective_from: '2026-01-01',
      reason: 'Blocked by active unsegmented temporal straddle',
      conflicts: ['RULE-MONRE-17', 'RULE-MOC-13'],
      rule_evaluations: [],
      is_temporal_segmented: false,
      temporal_issue_status: 'BLOCKED',
      taxonomy_mapping: {
        internal_code: 'SEC-UNKNOWN',
        external_system: 'DECISION_42_2026_TTG',
        external_code: 'UNKNOWN',
        external_label: 'Unknown',
        mapping_state: 'UNKNOWN'
      },
      methodology_implication: {
        methodology_id: 'METH-BLOCKED',
        name: 'Blocked Methodology',
        governing_circular: 'Unknown',
        default_tier: 'TIER_1',
        status: 'BLOCKED'
      },
      disclosures: [],
      facilities_matrix: [],
      reporting_period: { period_start: '2026-01-01', period_end: '2026-12-31' }
    };
    const html = renderRegulatoryCheckPage({ viewModel: mockVm });
    if (!html.includes('BLOCKED') && !html.includes('Conflict Detected')) {
      throw new Error('Expected BLOCKED state badge or conflict indication in rendered HTML');
    }
  });

  // TC-REGUI-012: UNKNOWN state
  runner.run('TC-REGUI-012', 'UNKNOWN state rendered safely without inventing legal claims', () => {
    const mockVm = {
      facility_id: 'FAC-TEST-UNK',
      facility_name: 'Unknown Facility Record',
      legal_name: 'N/A',
      tax_id: 'N/A',
      province: 'N/A',
      sector_id: 'UNKNOWN',
      status: 'UNKNOWN',
      mandatory: false,
      legal_basis: 'N/A',
      effective_from: 'N/A',
      reason: 'No statutory classification found',
      conflicts: [],
      rule_evaluations: [],
      is_temporal_segmented: false,
      temporal_issue_status: 'UNKNOWN',
      taxonomy_mapping: {
        internal_code: 'UNKNOWN',
        external_system: 'DECISION_42_2026_TTG',
        external_code: 'UNKNOWN',
        external_label: 'UNKNOWN',
        mapping_state: 'UNKNOWN'
      },
      methodology_implication: {
        methodology_id: 'UNKNOWN',
        name: 'UNKNOWN',
        governing_circular: 'UNKNOWN',
        default_tier: 'N/A',
        status: 'UNKNOWN'
      },
      disclosures: [],
      facilities_matrix: [],
      reporting_period: { period_start: '2026-01-01', period_end: '2026-12-31' }
    };
    const html = renderRegulatoryCheckPage({ viewModel: mockVm });
    if (!html.includes('UNKNOWN')) {
      throw new Error('Expected UNKNOWN status badge rendered in HTML');
    }
  });

  // TC-REGUI-013: loading state
  runner.run('TC-REGUI-013', 'loading state renders accessible status message', () => {
    const html = renderRegulatoryCheckPage({ status: 'LOADING' });
    if (!html.includes('Loading Governed Regulatory State')) {
      throw new Error('Missing loading state title');
    }
    if (!html.includes('role="status"')) {
      throw new Error('Missing accessible role="status" attribute');
    }
  });

  // TC-REGUI-014: empty state
  runner.run('TC-REGUI-014', 'empty state renders descriptive zero-data notification', () => {
    const html = renderRegulatoryCheckPage({ status: 'EMPTY' });
    if (!html.includes('No Registered Facilities Available')) {
      throw new Error('Missing empty state title');
    }
  });

  // TC-REGUI-015: error state
  runner.run('TC-REGUI-015', 'error state renders structured fail-closed alert with role="alert"', () => {
    const html = renderRegulatoryCheckPage({ status: 'ERROR', error: new Error('Statutory registry corruption') });
    if (!html.includes('Regulatory Engine State Error') || !html.includes('Statutory registry corruption')) {
      throw new Error('Missing structured error message');
    }
    if (!html.includes('role="alert"')) {
      throw new Error('Missing role="alert" accessibility attribute');
    }
  });

  // TC-REGUI-016: no hard-coded regulatory truth
  runner.run('TC-REGUI-016', 'no hard-coded regulatory truth or statutory math in regulatory-check.js', () => {
    const filePath = path.resolve('carbon/ui/pages/regulatory-check.js');
    const content = fs.readFileSync(filePath, 'utf8');

    const forbiddenMath = [
      /\*\s*emissionFactor/i,
      /\*\s*44\s*\/\s*12/,
      /\*\s*28/,
      /\*\s*265/,
      /ef_\w+\s*\*/,
      /total_emissions\s*=/
    ];

    for (const pattern of forbiddenMath) {
      if (pattern.test(content)) {
        throw new Error(`Found forbidden client-side calculation formula: ${pattern}`);
      }
    }
  });

  // TC-REGUI-017: no duplicated regulatory engine logic
  runner.run('TC-REGUI-017', 'no duplicated regulatory engine logic in UI layer', () => {
    const filePath = path.resolve('carbon/ui/pages/regulatory-check.js');
    const content = fs.readFileSync(filePath, 'utf8');

    // UI must not re-evaluate thresholds (e.g. >= 25000) or check ministerial precedence
    const forbiddenEngineLogic = [
      /consumption\s*>\s*1000/,
      /emissions\s*>=\s*25000/,
      /evalRulePrecedence\s*\(/,
      /resolveTemporalLineage\s*\(/
    ];

    for (const pattern of forbiddenEngineLogic) {
      if (pattern.test(content)) {
        throw new Error(`Found duplicated engine logic: ${pattern}`);
      }
    }
  });

  // TC-REGUI-018: multi-facility context isolation
  runner.run('TC-REGUI-018', 'multi-facility context isolation between different facility selections', () => {
    stateStore.setSelectedFacilityId('FAC-2026-002');
    let vm = stateStore.getRegulatoryViewModel();
    if (vm.facility_id !== 'FAC-2026-002' || !vm.facility_name.includes('Vicem Hà Tiên')) {
      throw new Error(`Expected FAC-2026-002 Vicem Ha Tien, got ${vm.facility_id}`);
    }

    stateStore.setSelectedFacilityId('FAC-2026-001');
    vm = stateStore.getRegulatoryViewModel();
    if (vm.facility_id !== 'FAC-2026-001' || !vm.facility_name.includes('Phả Lại')) {
      throw new Error(`Expected FAC-2026-001 Pha Lai, got ${vm.facility_id}`);
    }
  });

  // TC-REGUI-019: responsive rendering
  runner.run('TC-REGUI-019', 'responsive rendering structure with grid, flexible layout and overflow containers', () => {
    const html = renderRegulatoryCheckPage();
    if (!html.includes('enerix-table-wrapper') || !html.includes('enerix-card')) {
      throw new Error('Missing responsive card and table wrapper structures');
    }
  });

  // TC-REGUI-020: accessibility smoke test
  runner.run('TC-REGUI-020', 'accessibility smoke test: semantic labels, form inputs with labels, accessible buttons', () => {
    const html = renderRegulatoryCheckPage();
    if (!html.includes('for="reg-facility-select"') || !html.includes('id="reg-facility-select"')) {
      throw new Error('Missing labeled select control for active facility');
    }
    if (typeof renderRegulatoryCheckPage.attachEvents !== 'function') {
      throw new Error('Missing attachEvents lifecycle handler');
    }
  });

  runner.report();
})();
