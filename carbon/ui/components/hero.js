/**
 * ENERIX Carbon - Public Responsive Hero Component
 * Task #Enerix_Carbon_00039
 *
 * Uses clean text-free background image (bg_banner02.png) with HTML text overlays.
 */
import { CarbonPath } from '../../app/path.js';

export function renderPublicHero(options = {}) {
  const overline = options.overline || 'MEASURE TODAY. REDUCE FOR TOMORROW.';
  const headline = options.headline || 'Turn carbon data into <span style="color:#00a0e0;">opportunities.</span>';
  const subtitle = options.subtitle || 'Trusted carbon intelligence for a cleaner, more resilient future.';
  const primaryCta = options.primaryCtaText || 'Explore ENERIX Carbon →';
  const secondaryCta = options.secondaryCtaText || 'Watch Video';
  const showTrustStrip = options.showTrustStrip !== false;

  const bgUrl = CarbonPath.resolve('assets/branding/bg_banner02.png');

  return `
    <section class="carbon-public-hero" style="background-image: url('${bgUrl}');">
      <div class="carbon-public-hero-overlay">
        <div class="carbon-public-hero-container">
          <!-- Left Content Area -->
          <div class="carbon-public-hero-content">
            <span class="carbon-public-hero-overline">${overline}</span>
            <h1 class="carbon-public-hero-headline">${headline}</h1>
            <p class="carbon-public-hero-subtitle">${subtitle}</p>
            <div class="carbon-public-hero-actions">
              <button id="btn-hero-primary" class="carbon-public-hero-btn-primary btn-drilldown" data-nav="measure">
                ${primaryCta}
              </button>
              <button id="btn-hero-secondary" class="carbon-public-hero-btn-secondary btn-drilldown" data-nav="solutions">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block;vertical-align:middle;margin-right:6px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                ${secondaryCta}
              </button>
            </div>
          </div>

          <!-- Right Floating Visual Context Badges -->
          <div class="carbon-public-hero-badges">
            <div class="carbon-hero-glass-badge">
              <div style="width:10px;height:10px;border-radius:50%;background:#38bdf8;box-shadow:0 0 10px #38bdf8;"></div>
              <div>
                <div style="font-size:11px;font-weight:700;color:#38bdf8;text-transform:uppercase;">Net Zero Roadmap</div>
                <div style="font-size:13px;font-weight:700;">2050 Statutory Trajectory</div>
              </div>
            </div>
            <div class="carbon-hero-glass-badge">
              <div style="width:10px;height:10px;border-radius:50%;background:#22c55e;box-shadow:0 0 10px #22c55e;"></div>
              <div>
                <div style="font-size:11px;font-weight:700;color:#4ade80;text-transform:uppercase;">Deterministic Engine</div>
                <div style="font-size:13px;font-weight:700;">100% Verifiable GHG Scope 1-3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ${showTrustStrip ? `
        <div class="carbon-trust-strip">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="color:#38bdf8;font-weight:800;">✓</span> ISO 14064-1 Compliant
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="color:#38bdf8;font-weight:800;">✓</span> Decision 42/2026/QĐ-TTg Framework
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="color:#38bdf8;font-weight:800;">✓</span> 1,200+ Regulated Facilities
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="color:#38bdf8;font-weight:800;">✓</span> 100% Governed Data Provenance
          </div>
        </div>
      ` : ''}
    </section>
  `.trim();
}
