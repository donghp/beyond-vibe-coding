/**
 * ENERIX Carbon - Route & Base Path Utility
 * Enables full portability between:
 * - Current embedded path: /beyond-vibe-coding/carbon/
 * - Local development path: /carbon/
 * - Future independent deployment: https://enerixon.com/carbon/
 */

export class CarbonPath {
  /**
   * Resolves the base deployment prefix for Carbon.
   * e.g., returns '/beyond-vibe-coding/carbon' or '/carbon'
   */
  static getBase() {
    if (typeof window === 'undefined') return '/carbon';
    const pathname = window.location.pathname;
    const match = pathname.match(/^(.*\/carbon)(?:\/.*)?$/);
    if (match && match[1]) {
      return match[1];
    }
    return '/carbon';
  }

  /**
   * Resolves an internal asset or API endpoint relative to the active Carbon base.
   */
  static resolve(relativePath) {
    const cleanRel = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
    const base = CarbonPath.getBase();
    return `${base}/${cleanRel}`;
  }

  /**
   * Constructs a hash route URL without hardcoding paths.
   */
  static route(routeName) {
    return `#${routeName}`;
  }

  /**
   * Resolves back-link to host application or parent website.
   */
  static parentUrl() {
    if (typeof window === 'undefined') return '../';
    const base = CarbonPath.getBase();
    if (base.includes('/beyond-vibe-coding/')) {
      return base.replace(/\/carbon$/, '/');
    }
    return '../';
  }
}
