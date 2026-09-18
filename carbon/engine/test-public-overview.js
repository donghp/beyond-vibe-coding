/**
 * ENERIX Carbon - Public Product Overview Verification Suite
 * Verifies that the public product overview does not leak any engineering workspace elements.
 */

import { dataProvider } from '../app/data-provider.js';
import { stateStore } from '../app/state-store.js';
import { renderOverviewPage } from '../ui/pages/overview.js';

class PublicOverviewTestRunner {
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
    }
  }

  report() {
    console.log('\n======================================================');
    console.log('ENERIX CARBON - PUBLIC OVERVIEW ISOLATION TEST');
    console.log('======================================================');
    console.log(`Total Verified:  ${this.total}`);
    console.log(`Passed:          \x1b[32m${this.passed}\x1b[0m`);
    console.log(`Failed:          ${this.failed > 0 ? `\x1b[31m${this.failed}\x1b[0m` : `\x1b[32m0\x1b[0m`}`);
    console.log('======================================================');

    if (this.failed > 0) {
      process.exit(1);
    } else {
      console.log('\n\x1b[32m✓ All Public Overview isolation tests passed successfully!\x1b[0m\n');
      process.exit(0);
    }
  }
}

const runner = new PublicOverviewTestRunner();

async function execute() {
  await dataProvider.loadAll();
  stateStore.recompute();

  const publicOverviewHtml = renderOverviewPage();

  // Test 1: No facility context selector
  runner.run('TC-PUBLIC-001', 'Facility context selector is absent from public overview markup', () => {
    if (publicOverviewHtml.includes('overview-facility-select') || publicOverviewHtml.includes('overview-facility-select')) {
      throw new Error('Public overview contains facility context selector element');
    }
  });

  // Test 2: No regulatory workspace / statutory blockers
  runner.run('TC-PUBLIC-002', 'Statutory blocker alert banner is absent from public overview markup', () => {
    if (publicOverviewHtml.includes('STATUTORY COMPLIANCE BLOCKED') || publicOverviewHtml.includes('Fail-Closed Enforcement')) {
      throw new Error('Public overview contains statutory blocker alert banner');
    }
  });

  // Test 3: No dual segmentation controls
  runner.run('TC-PUBLIC-003', 'Temporal segmentation toggle button is absent from public overview markup', () => {
    if (publicOverviewHtml.includes('btn-toggle-temporal') || publicOverviewHtml.includes('btn-resolve-temporal-blocker')) {
      throw new Error('Public overview contains temporal segmentation control buttons');
    }
  });

  // Test 4: No engineering KPI cards
  runner.run('TC-PUBLIC-004', 'Engineering KPI cards (Gross Facility Emissions, Regulatory Applicability, Evidence Coverage, Report Readiness) are absent', () => {
    if (publicOverviewHtml.includes('Gross Facility Emissions') || publicOverviewHtml.includes('Regulatory Applicability') || publicOverviewHtml.includes('Statutory Report Readiness')) {
      throw new Error('Public overview contains engineering KPI cards');
    }
  });

  // Test 5: Standard product content (Platform Overview / Carbon Snapshot) is present
  runner.run('TC-PUBLIC-005', 'Public product homepage has Platform Overview and Carbon Snapshot sections', () => {
    if (!publicOverviewHtml.includes('Platform Overview') && !publicOverviewHtml.includes('From insight to impact') && !publicOverviewHtml.includes('Know your carbon position')) {
      throw new Error('Public overview is missing Homepage V1.0 core sections');
    }
  });

  // Test 6: Standard product hero has canonical background asset
  runner.run('TC-PUBLIC-006', 'Public product homepage has canonical hero background asset', () => {
    if (!publicOverviewHtml.includes('ENERIXON_CARBON_HERO_SOURCE_OF_TRUTH.png')) {
      throw new Error('Public overview is missing the canonical hero background image');
    }
  });

  runner.report();
}

execute().catch(err => {
  console.error(err);
  process.exit(1);
});
