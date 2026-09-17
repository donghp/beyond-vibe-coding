/**
 * ENERIX Carbon - Official Branded Visual Identity Banner Component
 * Canonical UI entry point for banner_enerix_carbon.png
 * Authority: MDS_ENERIX_CARBON_V1.0 + EDLS-001 V7.1
 *
 * Governed Rules:
 * 1. Single source of visual identity for Carbon banner surfaces.
 * 2. Resolves asset paths strictly through CarbonPath.resolve() (no hardcoded base URLs).
 * 3. Responsive contract: desktop panoramic, tablet focal center, mobile adaptive crop.
 * 4. Never renders duplicate text overlays over the embedded brand lockup.
 * 5. Meaningful WCAG accessibility alt text by default.
 */

import { CarbonPath } from '../../app/path.js';

export const CarbonBrandBanner = {
  /**
   * Relative canonical asset path within Carbon package
   */
  ASSET_REL_PATH: 'assets/branding/banner_enerix_carbon.png',

  /**
   * Canonical Alt text for accessibility compliance
   */
  DEFAULT_ALT: 'ENERIXON Carbon — Regulatory Carbon & GHG Engineering Platform',

  /**
   * Resolves the full runtime URL for the canonical banner asset.
   */
  getUrl() {
    return CarbonPath.resolve(this.ASSET_REL_PATH);
  },

  /**
   * Renders the governed CarbonBrandBanner HTML markup.
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
          />
        </div>
        ${options.subtitle ? `
          <div class="carbon-brand-banner-caption">
            ${options.subtitle}
          </div>
        ` : ''}
      </div>
    `.trim();
  }
};

/**
 * Functional export shorthand
 */
export function renderCarbonBrandBanner(options = {}) {
  return CarbonBrandBanner.render(options);
}
