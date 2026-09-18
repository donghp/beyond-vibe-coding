/**
 * ENERIX Carbon - Header Component
 * MDS ENERIX Carbon V1.0 Standard:
 * - Deep Navy structural shell (#10233b / #081321)
 * - Carbon Blue accent (#00A0E0)
 * - Top-level Product Navigation: 01 Measure | 02 Report | 03 Reduce
 * - Base-path portable navigation via CarbonPath
 */
import { I18nManager } from '../../app/i18n.js';
import { CarbonPath } from '../../app/path.js';
import { stateStore } from '../../app/state-store.js';
import { renderPublicHeader } from './public-header.js';

export function renderHeader() {
  const currentRoute = stateStore.getRoute ? stateStore.getRoute() : 'overview';
  const publicRoutes = ['overview', 'measure', 'report', 'reduce', 'science', 'solutions', 'resources', 'company'];

  if (publicRoutes.includes(currentRoute)) {
    return renderPublicHeader();
  }

  const currentLocale = I18nManager.currentLocale;
  const logoUrl = CarbonPath.resolve('assets/logo_enerixon_carbon.png');
  const currentSection = stateStore.getCurrentSection ? stateStore.getCurrentSection() : 'measure';
  const parentUrl = CarbonPath.parentUrl();

  return `
    <header class="carbon-header" role="banner">
      <div class="header-left">
        <button class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Toggle Navigation Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
        <div class="brand" style="cursor:pointer;display:flex;align-items:center;gap:12px;" onclick="window.location.hash='#overview'">
          <img src="${logoUrl}" alt="ENERIXON CARBON" style="height:42px;width:auto;display:block;" />
        </div>

        <!-- Top Product-Level Navigation (01 Measure | 02 Report | 03 Reduce) -->
        <nav class="carbon-product-nav" aria-label="Product Workspaces">
          <button class="product-nav-btn ${currentSection === 'measure' ? 'active' : ''}" data-section="measure" role="tab" aria-selected="${currentSection === 'measure'}">
            <span class="nav-step">01</span>
            <span class="nav-title">${I18nManager.t('nav.measure')}</span>
          </button>
          <button class="product-nav-btn ${currentSection === 'report' ? 'active' : ''}" data-section="report" role="tab" aria-selected="${currentSection === 'report'}">
            <span class="nav-step">02</span>
            <span class="nav-title">${I18nManager.t('nav.report')}</span>
          </button>
          <button class="product-nav-btn ${currentSection === 'reduce' ? 'active' : ''}" data-section="reduce" role="tab" aria-selected="${currentSection === 'reduce'}">
            <span class="nav-step">03</span>
            <span class="nav-title">${I18nManager.t('nav.reduce')}</span>
          </button>
        </nav>
      </div>

      <div class="header-right-desktop">
        <div class="locale-selector-container">
          <label for="app-locale-select" class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;">Select Language</label>
          <select id="app-locale-select" class="carbon-locale-select" onchange="window.setAppLocale(this.value)">
            <option value="en" ${currentLocale === 'en' ? 'selected' : ''}>English</option>
            <option value="vi" ${currentLocale === 'vi' ? 'selected' : ''}>Tiếng Việt</option>
          </select>
        </div>
        <div class="carbon-gov-pill" title="Regulatory Authority: Decision 42/2026/QĐ-TTg">
          <span class="status-indicator-dot"></span>
          <span>QĐ 42/2026/QĐ-TTg</span>
        </div>
        <a href="${parentUrl}" class="carbon-back-link" title="Return to Beyond Vibe Coding Living Book">← Beyond Vibe Coding</a>
      </div>
      <div class="header-right-mobile" style="display:none;"></div>
    </header>
  `;
}
