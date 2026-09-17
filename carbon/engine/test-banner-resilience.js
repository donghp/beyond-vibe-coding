/**
 * ENERIX Carbon - Banner Asset Integrity & Resilience Verification Suite (#0013)
 * Authority: MDS_ENERIX_CARBON_V1.0_EXPANDED + EDLS-001_V7.1
 * Task: #Enerix_Carbon_00013
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { CarbonBrandBanner } from '../ui/components/banner.js';
import { CarbonPath } from '../app/path.js';

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

console.log('Starting ENERIX Carbon Banner Integrity & Resilience Verification (#0013)...');

const EXPECTED_HASH = 'f919b31b4dc1b21e251c5ae7cb11dadd276b7f7b437715ee893cb1283e5cf5b3';

// TC-BAN-001: Canonical asset exists
const canonicalPath = path.resolve('carbon/assets/branding/canonical/banner_enerix_carbon.png');
assert(fs.existsSync(canonicalPath), 'TC-BAN-001: Canonical banner asset exists at carbon/assets/branding/canonical/banner_enerix_carbon.png');

// TC-BAN-002: Canonical asset SHA-256 matches uploaded source
const canonicalHash = computeSha256(canonicalPath);
assert(canonicalHash === EXPECTED_HASH, `TC-BAN-002: Canonical asset SHA-256 matches approved source (${canonicalHash})`);

// TC-BAN-003: Historical legacy asset is preserved
const legacyPath = path.resolve('carbon/assets/branding/banner_enerix_carbon.png');
assert(fs.existsSync(legacyPath), 'TC-BAN-003: Legacy/root banner asset preserved at carbon/assets/branding/banner_enerix_carbon.png');

// TC-BAN-004: Legacy asset hash matches approved source
const legacyHash = computeSha256(legacyPath);
assert(legacyHash === EXPECTED_HASH, `TC-BAN-004: Legacy asset SHA-256 matches approved source (${legacyHash})`);

// TC-BAN-005: Branding manifest exists and is valid
const manifestPath = path.resolve('carbon/assets/branding/manifest.json');
assert(fs.existsSync(manifestPath), 'TC-BAN-005: Branding asset manifest exists at carbon/assets/branding/manifest.json');
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert(manifest.assets && manifest.assets.length > 0, 'TC-BAN-006: Manifest declares required branding assets');
  assert(manifest.assets[0].sha256 === EXPECTED_HASH, 'TC-BAN-007: Manifest records exact SHA-256 integrity hash');
  assert(manifest.assets[0].required === true, 'TC-BAN-008: Manifest specifies canonical banner as required=true');
}

// TC-BAN-009: CarbonBrandBanner resolves canonical path
const bannerUrl = CarbonBrandBanner.getUrl();
assert(bannerUrl.includes('assets/branding/canonical/banner_enerix_carbon.png'), `TC-BAN-009: CarbonBrandBanner resolves canonical path (${bannerUrl})`);

// TC-BAN-010: CarbonBrandBanner.render() produces valid HTML with accessibility
const html = CarbonBrandBanner.render({ variant: 'hero', priority: true });
assert(html.includes('carbon-brand-banner-container') && html.includes('variant-hero'), 'TC-BAN-010: CarbonBrandBanner renders container with variant-hero class');
assert(html.includes('alt="ENERIXON Carbon'), 'TC-BAN-011: CarbonBrandBanner includes accessible alt attribute');
assert(html.includes('onerror='), 'TC-BAN-012: CarbonBrandBanner includes fail-safe onerror handler');
assert(html.includes('carbon-brand-banner-fallback'), 'TC-BAN-013: CarbonBrandBanner embeds governed fallback markup');

// TC-BAN-014: Runtime resilience - Missing asset does not throw
try {
  const safeOutput = CarbonBrandBanner.render(null);
  assert(typeof safeOutput === 'string' && safeOutput.length > 0, 'TC-BAN-014: CarbonBrandBanner handles null/invalid options safely without throwing');
} catch (e) {
  assert(false, `TC-BAN-014: CarbonBrandBanner threw exception on invalid input: ${e.message}`);
}

// TC-BAN-015: Build validation logic
function validateBuildAssets() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  for (const asset of manifest.assets) {
    if (asset.required) {
      const fullPath = path.resolve('carbon', asset.canonical_path);
      if (!fs.existsSync(fullPath)) {
        throw new Error(`[AssetValidationError] Required canonical asset missing: ${asset.canonical_path}`);
      }
      const actualHash = computeSha256(fullPath);
      if (actualHash !== asset.sha256) {
        throw new Error(`[AssetValidationError] Integrity hash mismatch for ${asset.canonical_path}: expected ${asset.sha256}, got ${actualHash}`);
      }
    }
  }
  return true;
}

assert(validateBuildAssets() === true, 'TC-BAN-015: Build asset validation passes against source package');

// Summary
console.log('======================================================');
console.log('ENERIX CARBON - BANNER INTEGRITY & RESILIENCE (#0013)');
console.log('======================================================');
console.log(`Total Verified:  ${passed + failed}`);
console.log(`Passed:          \x1b[32m${passed}\x1b[0m`);
console.log(`Failed:          ${failed > 0 ? `\x1b[31m${failed}\x1b[0m` : '0'}`);
console.log('======================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\x1b[32m✓ All Banner Integrity & Resilience tests passed with 100% compliance!\x1b[0m');
}
