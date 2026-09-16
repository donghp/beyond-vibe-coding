/**
 * ENERIX Carbon - Task #0030: Reports & Knowledge Base UI Verification Suite
 * Verifies Reports and Knowledge Base UI integration.
 */

import { dataProvider } from '../app/data-provider.js';
import { renderReportsPage } from '../ui/pages/reports.js';
import { renderKnowledgePage } from '../ui/pages/knowledge.js';

class ReportsUiTestRunner {
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
    console.log('ENERIX CARBON - REPORTS & KNOWLEDGE UI WORKSPACE (#0030)');
    console.log('======================================================');
    console.log(`Total Verified:  ${this.total}`);
    console.log(`Passed:          \x1b[32m${this.passed}\x1b[0m`);
    console.log(`Failed:          ${this.failed > 0 ? `\x1b[31m${this.failed}\x1b[0m` : `\x1b[32m0\x1b[0m`}`);
    console.log('======================================================');

    if (this.failed > 0) process.exit(1);
    else console.log('\n\x1b[32m✓ All Reports & Knowledge UI Workspace tests passed!\x1b[0m\n');
  }
}

const runner = new ReportsUiTestRunner();

async function executeTests() {
  await dataProvider.loadAll();

  // TC-REPORTUI-001: Reports page renders with required title/subtitle
  runner.run('TC-REPORTUI-001', 'Reports page renders title and subtitle', () => {
    const html = renderReportsPage();
    if (!html.includes('Enterprise GHG Inventory Reports') || !html.includes('Governed Reporting Workspace')) {
      throw new Error('Title or subtitle missing');
    }
  });

  // TC-REPORTUI-002: Reports table surfaces governed reports
  runner.run('TC-REPORTUI-002', 'Reports table surfaces governed reports', () => {
    const html = renderReportsPage();
    const reports = dataProvider.getReports();
    if (reports.length === 0) throw new Error('Reports list empty');
    if (!html.includes(reports[0].report_number)) throw new Error('Report number missing from table');
  });

  // TC-KNOWUI-001: Knowledge page renders
  runner.run('TC-KNOWUI-001', 'Knowledge page renders', () => {
    const html = renderKnowledgePage();
    if (!html.includes('Regulatory Knowledge Base')) {
      throw new Error('Knowledge base title missing');
    }
  });

  runner.report();
}

executeTests();
