/**
 * ENERIX Carbon - Official Branded Visual Identity Banner Component
 * Canonical UI entry point for banner_enerix_carbon.png
 * Authority: MDS_ENERIX_CARBON_V1.0 + EDLS-001 V7.1
 * Task #Enerix_Carbon_00012 & #Enerix_Carbon_00013
 *
 * Governed Rules:
 * 1. Single source of visual identity for Carbon banner surfaces.
 * 2. References canonical asset at assets/branding/canonical/banner_enerix_carbon.png.
 * 3. Resolves asset paths strictly through CarbonPath.resolve() (no hardcoded base URLs).
 * 4. Resilient fail-safe rendering: A missing visual asset MUST NEVER crash the router or application.
 * 5. Responsive contract: desktop panoramic, tablet focal center, mobile adaptive crop.
 * 6. Never renders duplicate text overlays over the embedded brand lockup.
 * 7. Meaningful WCAG accessibility alt text by default.
 */

import { CarbonPath } from '../../app/path.js';

export const CarbonBrandBanner = {
  /**
   * Active canonical asset path within Carbon package
   * Authority: MDS_ENERIX_CARBON_V1.0_EXPANDED + EDLS-001_V7.1
   * Task #Enerix_Carbon_00021
   */
  CANONICAL_PATH: 'assets/branding/banner_enerix_carbon.png',

  /**
   * Deterministic verified hash prefix for cache-safe resolution
   */
  VERSION_HASH: '2f3bd8a3',

  /**
   * Relative canonical asset path
   */
  get ASSET_REL_PATH() {
    return this.CANONICAL_PATH;
  },

  /**
   * Canonical Alt text for accessibility compliance
   */
  DEFAULT_ALT: 'ENERIXON Carbon — Regulatory Carbon & GHG Engineering Platform',

  /**
   * Resolves the full runtime URL for the active banner asset with deterministic cache-bust.
   */
  getUrl() {
    const resolvedPath = CarbonPath.resolve(this.CANONICAL_PATH);
    return `${resolvedPath}?v=${this.VERSION_HASH}`;
  },

  /**
   * Renders the governed CarbonBrandBanner HTML markup with fail-safe error recovery.
   *
   * @param {Object} options
   * @param {'hero'|'compact'|'guide'} [options.variant='hero'] - Visual variant
   * @param {string} [options.alt] - Accessibility text
   * @param {boolean} [options.priority=false] - Eager loading for above-the-fold hero
   * @param {string} [options.className=''] - Additional CSS classes
   * @param {string} [options.subtitle=''] - Optional contextual label outside the image
   * @returns {string} HTML string
   */
  render(options = {}) {
    try {
      const variant = options.variant || 'hero';
      const alt = options.alt !== undefined ? options.alt : this.DEFAULT_ALT;
      const priority = Boolean(options.priority);
      const customClass = options.className || '';
      const imgUrl = this.getUrl();

      const loadingAttr = priority ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';

      return `
        <div class="carbon-brand-banner-container variant-${variant} ${customClass}">
          <div class="carbon-brand-banner-frame">
            <img 
              src="${imgUrl}" 
              alt="${alt}" 
              class="carbon-brand-banner-img"
              ${loadingAttr}
              onerror="this.style.display='none';if(this.nextElementSibling){this.nextElementSibling.style.display='flex';}"
            />
            <div class="carbon-brand-banner-fallback" style="display:none;padding:24px 20px;background:var(--carbon-navy-950, #0b1d3a);color:#ffffff;align-items:center;justify-content:space-between;border-radius:inherit;">
              <div>
                <div style="font-size:16px;font-weight:800;letter-spacing:-0.02em;color:#00a0e0;">ENERIXON CARBON</div>
                <div style="font-size:12px;color:rgba(255,255,255,0.7);margin-top:2px;">Regulatory Carbon & GHG Engineering Platform</div>
              </div>
              <span style="font-size:11px;background:rgba(0,160,224,0.2);color:#38bdf8;padding:3px 8px;border-radius:4px;font-weight:600;">Governed Baseline</span>
            </div>
          </div>
          ${options.subtitle ? `
            <div class="carbon-brand-banner-caption">
              ${options.subtitle}
            </div>
          ` : ''}
        </div>
      `.trim();
    } catch (err) {
      console.warn('[CarbonBrandBanner] Render error caught gracefully:', err);
      return `
        <div class="carbon-brand-banner-container variant-hero">
          <div class="carbon-brand-banner-frame" style="padding:16px;background:var(--carbon-navy-950, #0b1d3a);color:#ffffff;">
            <span style="font-weight:700;color:#00a0e0;">ENERIXON CARBON</span>
          </div>
        </div>
      `.trim();
    }
  }
};

/**
 * Functional export shorthand
 */
export function renderCarbonBrandBanner(options = {}) {
  return CarbonBrandBanner.render(options);
}
