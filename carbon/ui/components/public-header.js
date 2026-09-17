/**
 * ENERIX Carbon - Canonical Public Header Component
 * Part of Global Page Layout System V1.0
 * White background, canonical logo, clean navigation, language selector, Book a Demo CTA.
 */
import { I18nManager } from '../../app/i18n.js';
import { CarbonPath } from '../../app/path.js';
import { stateStore } from '../../app/state-store.js';

export function renderPublicHeader() {
  const currentLocale = I18nManager.currentLocale;
  const logoUrl = CarbonPath.resolve('assets/branding/logo_enerix_carbon.png');
  const currentRoute = stateStore.getRoute ? stateStore.getRoute() : 'overview';

  return `
    <header class="public-header" style="background:#ffffff;color:var(--carbon-navy-900, #08213D);border-bottom:1px solid var(--carbon-border, #E2E8F0);position:sticky;top:0;z-index:100;padding:0 32px;height:72px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.02);">
      <div style="display:flex;align-items:center;gap:40px;">
        <div class="brand" style="display:flex;align-items:center;cursor:pointer;" onclick="window.location.hash='#overview'">
          <img src="${logoUrl}" alt="ENERIXON CARBON" class="canonical-header-logo" />
        </div>
        <nav style="display:flex;gap:28px;align-items:center;font-size:14px;font-weight:600;color:var(--carbon-navy-800, #1E293B);">
          <a href="#overview" style="color:${currentRoute === 'overview' ? 'var(--carbon-blue-600, #0066ff)' : 'var(--carbon-navy-800)'};text-decoration:none;transition:color 0.15s ease;">Product</a>
          <a href="#solutions" style="color:${currentRoute === 'solutions' ? 'var(--carbon-blue-600, #0066ff)' : 'var(--carbon-navy-800)'};text-decoration:none;transition:color 0.15s ease;">Solutions</a>
          <a href="#science" style="color:${currentRoute === 'science' ? 'var(--carbon-blue-600, #0066ff)' : 'var(--carbon-navy-800)'};text-decoration:none;transition:color 0.15s ease;">Science</a>
          <a href="#resources" style="color:${currentRoute === 'resources' ? 'var(--carbon-blue-600, #0066ff)' : 'var(--carbon-navy-800)'};text-decoration:none;transition:color 0.15s ease;">Resources</a>
          <a href="#company" style="color:${currentRoute === 'company' ? 'var(--carbon-blue-600, #0066ff)' : 'var(--carbon-navy-800)'};text-decoration:none;transition:color 0.15s ease;">Company</a>
        </nav>
      </div>
      <div style="display:flex;align-items:center;gap:20px;">
        <div class="locale-selector-container">
          <select id="app-locale-select" class="carbon-locale-select" onchange="window.setAppLocale(this.value)" style="border:1px solid var(--carbon-border, #E2E8F0);background:#fff;padding:6px 12px;border-radius:6px;font-size:13px;cursor:pointer;color:var(--carbon-navy-800);">
            <option value="en" ${currentLocale === 'en' ? 'selected' : ''}>English</option>
            <option value="vi" ${currentLocale === 'vi' ? 'selected' : ''}>Tiếng Việt</option>
          </select>
        </div>
        <button id="public-book-demo-btn" class="enerix-button enerix-button-primary" style="background:var(--carbon-blue-600, #0066ff);color:#fff;padding:10px 20px;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;border:none;box-shadow:0 4px 12px rgba(0,102,255,0.25);">
          Book a Demo
        </button>
      </div>
    </header>
  `;
}
