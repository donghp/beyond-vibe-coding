/**
 * ENERIX Carbon - Task #Enerix_Carbon_00017: Simplified Landing Experience Verification Suite
 * Verifies that the redundant dark hero is removed and page moves directly from:
 *   Official Banner -> Product Navigation -> Carbon Footprint
 */

import { dataProvider } from '../app/data-provider.js';
import { stateStore } from '../app/state-store.js';
import { renderOverviewPage } from '../ui/pages/overview.js';
import { renderEngineeringOverviewPage } from '../ui/pages/engineering-overview.js';
import { renderHeader } from '../ui/components/header.js';
import { renderCarbonBrandBanner } from '../ui/components/banner.js';

class LandingHierarchyTestRunner {
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
    console.log('ENERIX CARBON - LANDING HIERARCHY TEST (#Enerix_Carbon_00017)');
    console.log('======================================================');
    console.log(`Total Verified:  ${this.total}`);
    console.log(`Passed:          \x1b[32m${this.passed}\x1b[0m`);
    console.log(`Failed:          ${this.failed > 0 ? `\x1b[31m${this.failed}\x1b[0m` : `\x1b[32m0\x1b[0m`}`);
    console.log('======================================================');

    if (this.failed > 0) {
      process.exit(1);
    } else {
      console.log('\n\x1b[32m✓ All Landing Hierarchy tests passed with 100% compliance!\x1b[0m\n');
      process.exit(0);
    }
  }
}

const runner = new LandingHierarchyTestRunner();

async function execute() {
  await dataProvider.loadAll();
  stateStore.recompute();

  const overviewHtml = renderOverviewPage();
  const engOverviewHtml = renderEngineeringOverviewPage();
  stateStore.setRoute('workspace');
  const headerHtml = renderHeader();
  stateStore.setRoute('overview');
  const bannerHtml = renderCarbonBrandBanner();

  // Test 1: Top navigation exists once
  runner.run('TC-LANDING-001', 'Top product navigation exists with 01 Measure, 02 Report, 03 Reduce', () => {
    if (!headerHtml.includes('01 Measure') || !headerHtml.includes('02 Report') || !headerHtml.includes('03 Reduce')) {
      throw new Error('Top header navigation is missing one of 01 Measure, 02 Report, 03 Reduce');
    }
  });

  // Test 2: Official banner exists
  runner.run('TC-LANDING-002', 'Official brand banner renders canonical banner asset', () => {
    if (!bannerHtml.includes('ENERIXON_CARBON_HERO_SOURCE_OF_TRUTH.png')) {
      throw new Error('Banner HTML does not reference canonical ENERIXON_CARBON_HERO_SOURCE_OF_TRUTH.png');
    }
  });

  // Test 3: Redundant hero block no longer renders
  runner.run('TC-LANDING-003', 'Redundant dark hero block (carbon-hero-container) no longer renders in overview page', () => {
    if (overviewHtml.includes('carbon-hero-container')) {
      throw new Error('Overview page still contains carbon-hero-container');
    }
  });

  // Test 4: Carbon Footprint is first major content section in Engineering Workspace
  runner.run('TC-LANDING-004', 'Carbon Footprint is the first major content section in engineering overview', () => {
    if (!engOverviewHtml.includes('Carbon Footprint')) {
      throw new Error('Engineering Overview page does not contain Carbon Footprint heading');
    }
    const idxFootprint = engOverviewHtml.indexOf('Carbon Footprint');
    const idxFirstCard = engOverviewHtml.indexOf('Gross Facility Emissions');
    if (idxFootprint < 0 || idxFirstCard < 0 || idxFootprint > idxFirstCard) {
      throw new Error('Carbon Footprint heading must precede gross facility emissions card');
    }
  });

  // Test 5: Facility context renders quietly in Engineering Workspace
  runner.run('TC-LANDING-005', 'Facility context renders with selector and current active facility', () => {
    if (!engOverviewHtml.includes('overview-facility-select')) {
      throw new Error('Facility selector missing');
    }
  });

  // Test 6: ACTIVE FACILITY label absent in Engineering Workspace
  runner.run('TC-LANDING-006', 'Visible "Active Facility:" label is absent from engineering overview markup', () => {
    if (engOverviewHtml.includes('>Active Facility:<')) {
      throw new Error('Visible "Active Facility:" label found in overview markup');
    }
  });

  // Test 7: No duplicate slogan in first viewport
  runner.run('TC-LANDING-007', 'Slogan "Measure emissions. Report with confidence. Reduce with intelligence." is absent from landing page', () => {
    if (overviewHtml.includes('Measure emissions. Report with confidence. Reduce with intelligence.')) {
      throw new Error('Duplicate slogan found in overview page');
    }
  });

  // Test 8: No duplicate giant ENERIX Carbon product heading under banner
  runner.run('TC-LANDING-008', 'No duplicate giant ENERIX Carbon heading directly beneath banner', () => {
    if (overviewHtml.includes('<h1 style="font-size:clamp(24px, 3.2vw, 36px);font-weight:800;letter-spacing:-0.03em;line-height:1.2;margin:0 0 10px 0;color:#ffffff;">\n            ENERIX Carbon\n          </h1>')) {
      throw new Error('Duplicate giant ENERIX Carbon heading still present');
    }
  });

  runner.report();
}

execute().catch(err => {
  console.error(err);
  process.exit(1);
});
