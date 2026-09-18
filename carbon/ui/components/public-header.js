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
  const logoUrl = CarbonPath.resolve('assets/branding/ENERIXON_CARBON_LOGO_CANONICAL.png');
  const currentRoute = stateStore.getRoute ? stateStore.getRoute() : 'overview';

  return `
    <header class="public-header" style="background:#ffffff;color:#0B1727;border-bottom:1px solid #E2E8F0;position:sticky;top:0;z-index:100;width:100%;height:70px;box-shadow:0 1px 2px rgba(11,23,39,0.02);box-sizing:border-box;">
      <style>
        .public-header-container {
          max-width: 1280px;
          width: 100%;
          height: 100%;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
        }
        .header-logo-img {
          width: 120px;
          height: auto;
          display: block;
          object-fit: contain;
        }
        @media (max-width: 768px) {
          .header-logo-img {
            width: 108px;
          }
          .public-main-nav {
            display: none !important;
          }
          .public-header-container {
            padding: 0 16px;
          }
        }
        @media (max-width: 480px) {
          .header-logo-img {
            width: 98px;
          }
          .header-search-btn, .locale-selector-container {
            display: none !important;
          }
        }
      </style>
      <div class="public-header-container">
        
        <!-- LEFT: Logo -->
        <div style="display:flex;align-items:center;">
          <div class="brand" style="display:flex;align-items:center;cursor:pointer;" onclick="window.location.hash='#overview'">
            <img src="${logoUrl}" alt="ENERIXON CARBON" class="header-logo-img" />
          </div>
        </div>

        <!-- CENTER: Navigation links -->
        <nav class="public-main-nav" style="display:flex;gap:32px;align-items:center;font-size:14px;font-weight:600;height:100%;font-family:var(--carbon-font-sans, sans-serif);">
          <a href="#overview" style="color:${currentRoute === 'overview' ? '#0066FF' : '#334155'};text-decoration:none;transition:all 0.15s ease;display:flex;align-items:center;height:100%;box-sizing:border-box;border-bottom:${currentRoute === 'overview' ? '3px solid #0066FF' : '3px solid transparent'};">Platform</a>
          <a href="#solutions" style="color:${currentRoute === 'solutions' ? '#0066FF' : '#334155'};text-decoration:none;transition:all 0.15s ease;display:flex;align-items:center;height:100%;box-sizing:border-box;border-bottom:${currentRoute === 'solutions' ? '3px solid #0066FF' : '3px solid transparent'};">Solutions</a>
          <a href="#science" style="color:${currentRoute === 'science' ? '#0066FF' : '#334155'};text-decoration:none;transition:all 0.15s ease;display:flex;align-items:center;height:100%;box-sizing:border-box;border-bottom:${currentRoute === 'science' ? '3px solid #0066FF' : '3px solid transparent'};">Science</a>
          <a href="#resources" style="color:${currentRoute === 'resources' ? '#0066FF' : '#334155'};text-decoration:none;transition:all 0.15s ease;display:flex;align-items:center;height:100%;box-sizing:border-box;border-bottom:${currentRoute === 'resources' ? '3px solid #0066FF' : '3px solid transparent'};">Resources</a>
          <a href="#company" style="color:${currentRoute === 'company' ? '#0066FF' : '#334155'};text-decoration:none;transition:all 0.15s ease;display:flex;align-items:center;height:100%;box-sizing:border-box;border-bottom:${currentRoute === 'company' ? '3px solid #0066FF' : '3px solid transparent'};">Company</a>
        </nav>

        <!-- RIGHT: Search, Language selector, Book a Demo -->
        <div style="display:flex;align-items:center;gap:16px;">
          <button class="header-search-btn" style="background:transparent;border:none;cursor:pointer;color:#64748B;display:flex;align-items:center;justify-content:center;padding:8px;border-radius:6px;transition:color 0.15s ease;" title="Search" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          
          <div class="locale-selector-container">
            <select id="app-locale-select" class="carbon-locale-select" onchange="window.setAppLocale(this.value)" style="border:1px solid #CBD5E1;background:#ffffff;padding:6px 12px;border-radius:8px;font-size:13px;font-weight:600;height:38px;cursor:pointer;color:#334155;outline:none;box-sizing:border-box;">
              <option value="en" ${currentLocale === 'en' ? 'selected' : ''}>English</option>
              <option value="vi" ${currentLocale === 'vi' ? 'selected' : ''}>Tiếng Việt</option>
            </select>
          </div>

          <button id="public-book-demo-btn" class="enerix-button enerix-button-primary btn-book-demo-cta" style="background:#0066FF;color:#ffffff;padding:0 20px;height:40px;border-radius:8px;font-weight:700;font-size:13.5px;cursor:pointer;border:none;box-shadow:0 2px 6px rgba(0,102,255,0.15);transition:all 0.15s ease;box-sizing:border-box;white-space:nowrap;">
            Book a Demo
          </button>
        </div>

      </div>
    </header>
  `;
}
