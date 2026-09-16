/**
 * ENERIX Carbon - Task #0027: Calculation Studio Verification Suite
 * Verifies all 20 calculation studio canonical requirements (TC-CALCUI-001 through TC-CALCUI-020).
 * Suite #13 in Governed Test Manifest.
 */

import { dataProvider } from '../app/data-provider.js';
import { StateStore, stateStore } from '../app/state-store.js';
import { renderCalculationsPage } from '../ui/pages/calculations.js';
import fs from 'fs';
import path from 'path';

class CalculationStudioTestRunner {
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
    console.log('ENERIX CARBON - CALCULATION STUDIO VERIFICATION (#0027)');
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
      console.log('\x1b[32m✓ All Calculation Studio verification tests passed with 100% compliance!\x1b[0m\n');
      process.exit(0);
    }
  }
}

const runner = new CalculationStudioTestRunner();

console.log('Starting ENERIX Carbon Calculation Studio Verification Suite (#0027)...\n');

(async function executeTests() {
  await dataProvider.loadAll();
  stateStore.setSelectedFacilityId('FAC-2026-001');

  // TC-CALCUI-001: workspace loads with title & headers
  runner.run('TC-CALCUI-001', 'workspace loads with primary statutory layout & headers', () => {
    const html = renderCalculationsPage();
    if (typeof html !== 'string' || html.length < 500) {
      throw new Error('Expected substantial HTML output from renderCalculationsPage');
    }
    if (!html.includes('Calculation Studio')) {
      throw new Error('Missing "Calculation Studio" page title');
    }
    if (!html.includes('Governed Deterministic Calculation Workspace')) {
      throw new Error('Missing subtitle descriptor');
    }
  });

  // TC-CALCUI-002: facility context properly resolved
  runner.run('TC-CALCUI-002', 'active facility context properly resolved in header', () => {
    const html = renderCalculationsPage();
    if (!html.includes('FAC-2026-001')) {
      throw new Error('Missing active facility ID');
    }
    if (!html.includes('SEC-01-ENERGY')) {
      throw new Error('Missing sector ID');
    }
    if (!html.includes('0101234567')) {
      throw new Error('Missing tax ID');
    }
  });

  // TC-CALCUI-003: statutory framework and applicability status correctly surfaced
  runner.run('TC-CALCUI-003', 'statutory framework and applicability status surfaced', () => {
    const html = renderCalculationsPage();
    if (!html.includes('Nghị định 06/2022/NĐ-CP') && !html.includes('Quyết định 42/2026/QĐ-TTg') && !html.includes('QĐ 42/2026/QĐ-TTg')) {
      throw new Error('Missing statutory legal basis in Calculation Studio');
    }
    if (!html.includes('MANDATORY')) {
      throw new Error('Missing MANDATORY status badge');
    }
  });

  // TC-CALCUI-004: temporal regime state and segmentation controls present
  runner.run('TC-CALCUI-004', 'temporal regime state and segmentation controls present and reactive', () => {
    const html = renderCalculationsPage();
    if (!html.includes('btn-calc-toggle-temporal')) {
      throw new Error('Missing temporal toggle button');
    }
    if (!html.includes('DUAL_REGIME_SEGMENTED') && !html.includes('SINGLE_REGIME') && !html.includes('SEGMENTATION_REQUIRED')) {
      throw new Error('Missing temporal regime badge');
    }
  });

  // TC-CALCUI-005: all 6 validation gates evaluated and rendered
  runner.run('TC-CALCUI-005', 'all 6 statutory validation gates (G3 blueprint) evaluated and rendered', () => {
    const vm = stateStore.getCalculationStudioViewModel();
    if (!vm.plan || !Array.isArray(vm.plan.validation_gates) || vm.plan.validation_gates.length !== 6) {
      throw new Error(`Expected 6 validation gates in plan, found ${vm.plan?.validation_gates?.length}`);
    }
    const html = renderCalculationsPage();
    if (!html.includes('Facility Identity & Legal Boundary') || !html.includes('Sector MRV Methodology Bound')) {
      throw new Error('Missing validation gate names in rendered HTML');
    }
  });

  // TC-CALCUI-006: sector MRV methodology binding surfaced
  runner.run('TC-CALCUI-006', 'sector MRV methodology binding surfaced with governing circular and tier', () => {
    const html = renderCalculationsPage();
    if (!html.includes('Thông tư 38/2023/TT-BCT') && !html.includes('Thông tư 17/2022/TT-BTNMT')) {
      throw new Error('Missing governing MRV circular reference in methodology binding');
    }
  });

  // TC-CALCUI-007: deterministic execution trigger button present
  runner.run('TC-CALCUI-007', 'deterministic execution trigger button present', () => {
    const html = renderCalculationsPage();
    if (!html.includes('btn-execute-calc')) {
      throw new Error('Missing calculation execution button');
    }
    if (!html.includes('Execute Governed Calculation Engine Run')) {
      throw new Error('Missing execution button label');
    }
  });

  // TC-CALCUI-008: fail-closed execution blocker alert when temporal segmentation required
  runner.run('TC-CALCUI-008', 'fail-closed blocker alert rendered when temporal segmentation required but disabled', () => {
    // Force unsegmented temporal state that straddles transition date
    stateStore.setTemporalSegmentation(false);
    const vm = stateStore.getCalculationStudioViewModel();
    if (vm.temporal_status === 'REQUIRES_SEGMENTATION') {
      if (vm.can_execute) {
        throw new Error('Execution must be blocked when temporal segmentation is required');
      }
      const html = renderCalculationsPage();
      if (!html.includes('Deterministic Execution Blocked (Fail-Closed Rule Enforced)')) {
        throw new Error('Missing fail-closed execution blocker alert');
      }
    }
    // Restore segmented compliant state
    stateStore.setTemporalSegmentation(true);
  });

  // TC-CALCUI-009: total gross emissions snapshot displayed with IPCC AR5 sum
  runner.run('TC-CALCUI-009', 'total gross GHG emissions snapshot displayed with IPCC AR5 sum', () => {
    stateStore.setTemporalSegmentation(true);
    const html = renderCalculationsPage();
    if (!html.includes('calc-total-emissions')) {
      throw new Error('Missing total emissions display element');
    }
    if (!html.includes('1.082,32 t CO₂e') && !html.includes('1,082.32')) {
      throw new Error('Missing expected total gross emissions value');
    }
  });

  // TC-CALCUI-010: Scope 1 direct emissions correctly rendered
  runner.run('TC-CALCUI-010', 'Scope 1 direct emissions correctly rendered with diesel fuel breakdown', () => {
    const html = renderCalculationsPage();
    if (!html.includes('Scope 1 (Direct Emissions)')) {
      throw new Error('Missing Scope 1 title');
    }
    if (!html.includes('67,42 t CO₂e') && !html.includes('67.42')) {
      throw new Error('Missing Scope 1 emissions value');
    }
  });

  // TC-CALCUI-011: Scope 2 indirect emissions correctly rendered
  runner.run('TC-CALCUI-011', 'Scope 2 indirect emissions correctly rendered with grid electricity breakdown', () => {
    const html = renderCalculationsPage();
    if (!html.includes('Scope 2 (Energy Indirect)')) {
      throw new Error('Missing Scope 2 title');
    }
    if (!html.includes('1.014,90 t CO₂e') && !html.includes('1,014.90')) {
      throw new Error('Missing Scope 2 emissions value');
    }
  });

  // TC-CALCUI-012: Scope 3 value chain emissions handled gracefully
  runner.run('TC-CALCUI-012', 'Scope 3 value chain emissions handled gracefully without fake placeholders', () => {
    const html = renderCalculationsPage();
    if (!html.includes('Scope 3 (Value Chain)')) {
      throw new Error('Missing Scope 3 card');
    }
    if (!html.includes('0.00 tCO2e')) {
      throw new Error('Missing Scope 3 zero state');
    }
  });

  // TC-CALCUI-013: greenhouse gas species composition table rendered with AR5 GWP multipliers
  runner.run('TC-CALCUI-013', 'greenhouse gas species composition table rendered with AR5 GWP multipliers', () => {
    const html = renderCalculationsPage();
    if (!html.includes('Greenhouse Gas Species Composition') || !html.includes('Carbon Dioxide (Điôxít cacbon)')) {
      throw new Error('Missing GHG species composition table');
    }
    if (!html.includes('Khí Mê-tan') || !html.includes('Khí Đinitơ ôxít')) {
      throw new Error('Missing CH4 or N2O descriptions');
    }
    if (!html.includes('28') || !html.includes('265')) {
      throw new Error('Missing AR5 GWP multipliers (28 for CH4, 265 for N2O)');
    }
  });

  // TC-CALCUI-014: sequential calculation steps trace rendered
  runner.run('TC-CALCUI-014', 'sequential calculation steps trace rendered with model classes & factor bindings', () => {
    const html = renderCalculationsPage();
    if (!html.includes('STEP-01') || !html.includes('STEP-02') || !html.includes('STEP-03')) {
      throw new Error('Missing calculation step IDs');
    }
    if (!html.includes('MODEL-01') || !html.includes('MODEL-03')) {
      throw new Error('Missing model class codes in steps trace');
    }
  });

  // TC-CALCUI-015: bound activity data ledger rendered with evidence links
  runner.run('TC-CALCUI-015', 'bound activity data ledger rendered with quantities, units, and evidence references', () => {
    const html = renderCalculationsPage();
    if (!html.includes('ACT-REC-001') || !html.includes('ACT-REC-002')) {
      throw new Error('Missing activity record IDs');
    }
    if (!html.includes('EVI-INV-2026-01') || !html.includes('EVI-INV-2026-02')) {
      throw new Error('Missing linked evidence references');
    }
  });

  // TC-CALCUI-016: emission factors registry and GWP datasets specifications table rendered
  runner.run('TC-CALCUI-016', 'emission factors registry and GWP datasets table rendered with source references', () => {
    const html = renderCalculationsPage();
    if (!html.includes('EF-VN-GRID-2024') || !html.includes('EF-DIESEL-CO2')) {
      throw new Error('Missing emission factor IDs');
    }
    if (!html.includes('MONRE-OFFICIAL-GRID-2024') || !html.includes('IPCC-2006-VOL2')) {
      throw new Error('Missing statutory source documents');
    }
  });

  // TC-CALCUI-017: calculation integrity manifest rendered
  runner.run('TC-CALCUI-017', 'calculation integrity manifest rendered with Snapshot ID, Integrity Hash, and Reproducibility Hash', () => {
    const html = renderCalculationsPage();
    if (!html.includes('SNAPSHOT_ID') || !html.includes('INTEGRITY_HASH') || !html.includes('REPRODUCIBILITY_HASH')) {
      throw new Error('Missing calculation integrity manifest fields');
    }
  });

  // TC-CALCUI-018: standard contract calculation models reference rendered (MODEL-01 to MODEL-07)
  runner.run('TC-CALCUI-018', 'standard contract calculation models reference rendered (MODEL-01 to MODEL-07)', () => {
    const html = renderCalculationsPage();
    if (!html.includes('MODEL-01') || !html.includes('MODEL-07')) {
      throw new Error('Missing MODEL-01 to MODEL-07 in models catalog table');
    }
  });

  // TC-CALCUI-019: StateStore.executeCalculation() deterministically invokes calculation engine
  runner.run('TC-CALCUI-019', 'StateStore.executeCalculation() deterministically executes and stores historical snapshot', () => {
    const result = stateStore.executeCalculation();
    if (!result || typeof result.total_co2e_tons !== 'number') {
      throw new Error('Expected numeric total_co2e_tons from calculation execution');
    }
    if (result.total_co2e_tons !== 1082.32) {
      throw new Error(`Expected total_co2e_tons to equal 1082.32, got ${result.total_co2e_tons}`);
    }
    const snapshots = dataProvider.getHistoricalCalculationSnapshots('FAC-2026-001');
    if (snapshots.length === 0) {
      throw new Error('Expected historical calculation snapshot to be stored in DataProvider');
    }
  });

  // TC-CALCUI-020: UI is strictly NOT calculation authority (zero duplicate formulas computed in view)
  runner.run('TC-CALCUI-020', 'UI is strictly NOT calculation authority: zero duplicate formulas in view rendering', () => {
    const calculationsCode = fs.readFileSync(path.resolve(process.cwd(), 'carbon/ui/pages/calculations.js'), 'utf8');
    // Check that calculations.js does not contain ad-hoc multiplication formulas for emissions
    if (calculationsCode.includes('quantity * factor') || calculationsCode.includes('ad * ef') || calculationsCode.includes('activity * ef')) {
      throw new Error('Forbidden mathematical calculation formula found in UI page');
    }
  });

  runner.report();
})();
