/**
 * ENERIX Carbon - Hero Background Verification Suite
 * Task #Enerix_Carbon_00039
 *
 * Verifies clean, text-free responsive hero background asset integration.
 */

import fs from 'fs';
import path from 'path';

let passed = 0;
let failed = 0;

function assert(condition, testId, message) {
  if (condition) {
    console.log(`  \x1b[32m✓ [PASSED]\x1b[0m ${testId}: ${message}`);
    passed++;
  } else {
    console.error(`  \x1b[31m✗ [FAILED]\x1b[0m ${testId}: ${message}`);
    failed++;
  }
}

console.log('Starting ENERIX Carbon Hero Background Verification (#Enerix_Carbon_00039)...');

// 1. Asset existence
const heroBgPath = 'carbon/assets/branding/bg_banner02.png';
const clonedHeroBgPath = 'cloned_repo/carbon/assets/branding/bg_banner02.png';
assert(fs.existsSync(heroBgPath), 'TC-HERO-001', `Clean text-free hero background exists at ${heroBgPath}`);
assert(fs.existsSync(clonedHeroBgPath), 'TC-HERO-002', `Cloned repo hero background exists at ${clonedHeroBgPath}`);

// 2. Canonical banner remains intact
const canonicalBannerPath = 'carbon/assets/branding/banner_enerix_carbon.png';
assert(fs.existsSync(canonicalBannerPath), 'TC-HERO-003', `Canonical brand banner remains intact at ${canonicalBannerPath}`);

// 3. Asset registered in branding manifest
const manifestPath = 'carbon/assets/branding/manifest.json';
let manifestJson = {};
if (fs.existsSync(manifestPath)) {
  manifestJson = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}
assert(
  manifestJson.assets && Array.isArray(manifestJson.assets) && manifestJson.assets.some(a => a.asset_id === 'CARBON_HERO_BG_TEXTFREE'),
  'TC-HERO-004',
  'bg_banner02.png registered as CARBON_HERO_BG_TEXTFREE in manifest.json'
);

// 4. Asset registered in package manifest
const packageManifestPath = 'carbon/carbon-package-manifest.yaml';
let packageManifestText = fs.existsSync(packageManifestPath) ? fs.readFileSync(packageManifestPath, 'utf8') : '';
assert(
  packageManifestText.includes('bg_banner02.png'),
  'TC-HERO-005',
  'bg_banner02.png registered in carbon-package-manifest.yaml'
);

// 5. CSS sections.css contains responsive hero classes
const sectionsCssPath = 'carbon/ui/styles/sections.css';
let cssContent = fs.existsSync(sectionsCssPath) ? fs.readFileSync(sectionsCssPath, 'utf8') : '';
assert(cssContent.includes('.carbon-public-hero'), 'TC-HERO-006', 'CSS contains .carbon-public-hero rule');
assert(cssContent.includes('.carbon-public-hero-overlay'), 'TC-HERO-007', 'CSS contains .carbon-public-hero-overlay rule');
assert(cssContent.includes('.carbon-trust-strip'), 'TC-HERO-008', 'CSS contains .carbon-trust-strip rule');

// 6. Hero component existence and background-image usage
const heroJsPath = 'carbon/ui/components/hero.js';
assert(fs.existsSync(heroJsPath), 'TC-HERO-009', `Public hero component exists at ${heroJsPath}`);

let heroJsText = fs.existsSync(heroJsPath) ? fs.readFileSync(heroJsPath, 'utf8') : '';
assert(heroJsText.includes("bg_banner02.png"), 'TC-HERO-010', 'hero.js references bg_banner02.png');
assert(heroJsText.includes("background-image: url("), 'TC-HERO-011', 'hero.js uses background-image CSS property');

// 7. HTML text overlays over background image
assert(heroJsText.includes("carbon-public-hero-headline"), 'TC-HERO-012', 'hero.js renders real HTML headline overlay');
assert(heroJsText.includes("carbon-public-hero-actions"), 'TC-HERO-013', 'hero.js renders real HTML action buttons overlay');

console.log('======================================================');
console.log('ENERIX CARBON - HERO BACKGROUND TEST SUMMARY');
console.log('======================================================');
console.log(`Total Verified:  ${passed + failed}`);
console.log(`Passed:          \x1b[32m${passed}\x1b[0m`);
console.log(`Failed:          \x1b[31m${failed}\x1b[0m`);
console.log('======================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\x1b[32m✓ All Hero Background tests passed with 100% compliance!\x1b[0m');
}
