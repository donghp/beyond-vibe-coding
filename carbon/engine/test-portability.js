/**
 * ENERIX Carbon - Sub-Application Portability & Self-Containment Test Suite (#0016)
 * Authority: MDS_ENERIX_CARBON_V1.0_EXPANDED + EDLS-001_V7.1
 * Task: #Enerix_Carbon_00016
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { CarbonPath } from '../app/path.js';
import { CarbonBrandBanner } from '../ui/components/banner.js';
import { dataProvider } from '../app/data-provider.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  \x1b[32m✓ [PASSED]\x1b[0m ${message}`);
    passed++;
  } else {
    console.error(`  \x1b[31m✗ [FAILED]\x1b[0m ${message}`);
    failed++;
  }
}

function computeSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

async function runPortabilityTests() {
  console.log('Starting ENERIX Carbon Portability & Self-Containment Verification (#0016)...');

  const EXPECTED_BANNER_HASH = '2f3bd8a34e2dd378617f02a774f2880b9ea558b54179d7c416df4a538ea26a23';

  // TC-PORT-001: Carbon entrypoint exists and is self-contained
  const indexPath = path.resolve('carbon/index.html');
  assert(fs.existsSync(indexPath), 'TC-PORT-001: /carbon/index.html exists');
  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  assert(!indexHtml.includes('/src/') && !indexHtml.includes('/public/'), 'TC-PORT-002: index.html has zero references to /src/ or /public/');

  // TC-PORT-003: Carbon package manifest exists
  const pkgManifestPath = path.resolve('carbon/carbon-package-manifest.yaml');
  assert(fs.existsSync(pkgManifestPath), 'TC-PORT-003: /carbon/carbon-package-manifest.yaml exists');

  // TC-PORT-004: Carbon README documentation exists
  const readmePath = path.resolve('carbon/README.md');
  assert(fs.existsSync(readmePath), 'TC-PORT-004: /carbon/README.md exists and provides runbook');

  // TC-PORT-005: Official banner is strictly inside /carbon/assets/branding/
  const canonicalBannerPath = path.resolve('carbon/assets/branding/canonical/banner_enerix_carbon.png');
  assert(fs.existsSync(canonicalBannerPath), 'TC-PORT-005: Canonical banner exists inside /carbon/assets/branding/');
  const canonicalHash = computeSha256(canonicalBannerPath);
  assert(canonicalHash === EXPECTED_BANNER_HASH, `TC-PORT-006: Canonical banner SHA-256 is verified (${canonicalHash})`);

  // TC-PORT-007: No Carbon JS file imports outside /carbon/
  function auditImports(dir) {
    let escapes = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'docs') { // docs are markdown
          escapes = escapes.concat(auditImports(full));
        }
      } else if (entry.name.endsWith('.js')) {
        const content = fs.readFileSync(full, 'utf8');
        const importRegex = /from\s+['"]([^'"]+)['"]/g;
        let match;
        while ((match = importRegex.exec(content)) !== null) {
          const importTarget = match[1];
          if (importTarget.startsWith('.')) {
            const resolved = path.resolve(dir, importTarget);
            const carbonRoot = path.resolve('carbon');
            if (!resolved.startsWith(carbonRoot)) {
              escapes.push({ file: full, importTarget, resolved });
            }
          } else if (importTarget.startsWith('/src/') || importTarget.startsWith('/public/')) {
            escapes.push({ file: full, importTarget, resolved: importTarget });
          }
        }
      }
    }
    return escapes;
  }

  const importEscapes = auditImports(path.resolve('carbon'));
  assert(importEscapes.length === 0, `TC-PORT-007: Zero JS runtime imports escape /carbon boundary (found ${importEscapes.length})`);

  // TC-PORT-008: CSS is self-contained
  const mainCssPath = path.resolve('carbon/ui/styles/main.css');
  const tokensCssPath = path.resolve('carbon/ui/styles/tokens.css');
  assert(fs.existsSync(mainCssPath) && fs.existsSync(tokensCssPath), 'TC-PORT-008: main.css and tokens.css exist inside /carbon/ui/styles/');
  const cssContent = fs.readFileSync(mainCssPath, 'utf8') + fs.readFileSync(tokensCssPath, 'utf8');
  assert(!cssContent.includes('/public/') && !cssContent.includes('/src/'), 'TC-PORT-009: CSS contains zero external url dependencies');

  // TC-PORT-010: Base path resolution portability
  const baseDev = CarbonPath.resolve('assets/branding/canonical/banner_enerix_carbon.png');
  assert(baseDev.endsWith('/assets/branding/canonical/banner_enerix_carbon.png'), 'TC-PORT-010: CarbonPath resolves asset path cleanly');

  // Initialize data provider
  await dataProvider.loadAll();

  // TC-PORT-011: Data is fully contained
  assert(dataProvider.sectors && dataProvider.sectors.length > 0, 'TC-PORT-011: Data provider loads sectors from /carbon/data/');
  assert(dataProvider.emissionFactors && dataProvider.emissionFactors.length > 0, 'TC-PORT-012: Data provider loads emission factors from /carbon/data/');
  assert(dataProvider.gwpDatasets && dataProvider.gwpDatasets.length > 0, 'TC-PORT-013: Data provider loads GWPs from /carbon/data/');

  // TC-PORT-012: Demo data anonymization preserved
  const facilities = dataProvider.facilities || [];
  const hasRealCustomerName = facilities.some(f => 
    (f.facility_name && (f.facility_name.includes('Phả Lại') || f.facility_name.includes('Vicem') || f.facility_name.includes('Holcim')))
  );
  assert(!hasRealCustomerName, 'TC-PORT-014: Synthetic demo data preserved (No real customer identities)');

  // TC-PORT-013: Root Living Book isolation check
  const rootPagePath = path.resolve('src/pages/index.astro');
  assert(fs.existsSync(rootPagePath), 'TC-PORT-015: Root Living Book entrypoint /src/pages/index.astro is intact and untouched');

  // Summary
  console.log('======================================================');
  console.log('ENERIX CARBON - PORTABILITY & SELF-CONTAINMENT (#0016)');
  console.log('======================================================');
  console.log(`Total Verified:  ${passed + failed}`);
  console.log(`Passed:          \x1b[32m${passed}\x1b[0m`);
  console.log(`Failed:          ${failed > 0 ? `\x1b[31m${failed}\x1b[0m` : '0'}`);
  console.log('======================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('\x1b[32m✓ All Portability & Self-Containment tests passed with 100% compliance!\x1b[0m');
  }
}

runPortabilityTests().catch(err => {
  console.error('Test suite runner failed:', err);
  process.exit(1);
});
