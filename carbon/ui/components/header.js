/**
 * ENERIX Carbon - Header Component
 * MDS ENERIX Carbon V1.0 Standard:
 * - Deep Navy structural shell (#0b192c)
 * - Carbon Blue accent
 * - Clean SVG brand mark
 * - Responsive navigation toggle
 */
import { I18nManager } from '../../app/i18n.js';

export function renderHeader() {
  const currentLocale = I18nManager.currentLocale;
  return `
    <header class="carbon-header" role="banner">
      <div class="header-left">
        <button class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Toggle Navigation Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
        <div class="brand">
          <svg class="brand-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span class="brand-title">${I18nManager.t('common.title')}</span>
          <span class="brand-badge">Regulatory GHG v7.0</span>
        </div>
      </div>
      <div class="header-right-desktop">
        <div class="locale-selector-container">
          <label for="app-locale-select" class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;">Select Language</label>
          <select id="app-locale-select" class="carbon-locale-select" onchange="window.setAppLocale(this.value)">
            <option value="en" ${currentLocale === 'en' ? 'selected' : ''}>English</option>
            <option value="vi" ${currentLocale === 'vi' ? 'selected' : ''}>Tiếng Việt</option>
          </select>
        </div>
        <span class="carbon-compliance-tag">QĐ 42/2026/QĐ-TTg Compliant</span>
        <a href="../" class="carbon-back-link">← Back to Living Book</a>
      </div>
      <div class="header-right-mobile" style="display:none;"></div>
    </header>
  `;
}
