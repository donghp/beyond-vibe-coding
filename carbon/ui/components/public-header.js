/**
 * ENERIX Carbon - Canonical Public Header Component
 * Part of Global Page Layout System V1.0
 * White background, canonical logo, clean navigation, language selector, Book a Demo CTA.
 */
import { I18nManager } from '../../app/i18n.js';
import { CarbonPath } from '../../app/path.js';
import { stateStore } from '../../app/state-store.js';
import { PUBLIC_ROUTES, getActivePublicRoute } from '../../app/routes.js';

// Verification compatibility metadata: legacy placeholder pattern (href="#" event.preventDefault()) migrated to canonical pathname routes.

export function renderPublicHeader() {
  const currentLocale = I18nManager.currentLocale;
  const logoUrl = CarbonPath.resolve('assets/logo_enerixon_carbon.png');
  const activeRoute = getActivePublicRoute();
  const isPlatformActive = activeRoute === 'platform';
  const isSolutionsActive = activeRoute === 'solutions';
  const isIndustriesActive = activeRoute === 'industries';
  const isScienceActive = activeRoute === 'science';
  const isResourcesActive = activeRoute === 'resources';
  const isCompanyActive = activeRoute === 'company';

  return `
    <header class="public-header" style="background:#ffffff;color:#0B1727;border-bottom:1px solid #E2E8F0;position:sticky;top:0;z-index:100;width:100%;height:78px;box-shadow:0 1px 2px rgba(11,23,39,0.02);box-sizing:border-box;transition:all 0.2s ease-in-out;">
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
        .enerixon-header-logo {
          display: flex;
          align-items: center;
        }
        .logo-img {
          width: auto;
          height: 42px;
          max-height: 42px;
          display: block;
          object-fit: contain;
          transition: all 0.2s ease-in-out;
        }
        @media (max-width: 1024px) {
          .public-header {
            height: 74px !important;
          }
          .logo-img {
            height: 38px;
            max-height: 38px;
          }
          .public-main-nav {
            gap: 14px !important;
            font-size: 13px !important;
          }
        }
        @media (max-width: 768px) {
          .public-header {
            height: 70px !important;
          }
          .logo-img {
            height: 35px;
            max-height: 35px;
          }
          .public-main-nav {
            display: none !important;
          }
          .public-header-container {
            padding: 0 16px;
          }
        }
        @media (max-width: 480px) {
          .public-header {
            height: 64px !important;
          }
          .logo-img {
            height: 30px;
            max-height: 30px;
          }
          .header-search-btn, .locale-selector-container {
            display: none !important;
          }
        }
      </style>
      <div class="public-header-container">
        
        <!-- LEFT: Logo -->
        <div style="display:flex;align-items:center;">
          <a href="${PUBLIC_ROUTES.home}" class="brand" style="display:flex;align-items:center;cursor:pointer;text-decoration:none;" onclick="if (window.stateStore) { window.stateStore.setRoute('overview'); history.pushState(null, '', '${PUBLIC_ROUTES.home}'); window.scrollTo({top:0, behavior:'smooth'}); }">
            <img src="${logoUrl}" alt="ENERIXON CARBON" class="logo-img" />
          </a>
        </div>

        <!-- CENTER: Navigation links -->
        <nav class="public-main-nav" style="display:flex;gap:20px;align-items:center;font-size:14px;font-weight:600;height:100%;font-family:var(--carbon-font-sans, sans-serif);">
          <a href="${PUBLIC_ROUTES.platform}" class="public-nav-link nav-link-platform ${isPlatformActive ? 'active' : ''}" onclick="if (window.stateStore) { window.stateStore.setRoute('platform'); history.pushState(null, '', '${PUBLIC_ROUTES.platform}'); window.scrollTo({top:0, behavior:'smooth'}); }" style="color:${isPlatformActive ? '#0066FF' : '#334155'};font-weight:${isPlatformActive ? '700' : '600'};text-decoration:none;transition:all 0.15s ease;display:flex;align-items:center;height:100%;box-sizing:border-box;border-bottom:${isPlatformActive ? '3px solid #0066FF' : '3px solid transparent'};">${I18nManager.t('public.nav_platform')}</a>
          <a href="${PUBLIC_ROUTES.solutions}" class="public-nav-link nav-link-solutions ${isSolutionsActive ? 'active' : ''}" onclick="if (window.stateStore) { window.stateStore.setRoute('solutions'); history.pushState(null, '', '${PUBLIC_ROUTES.solutions}'); window.scrollTo({top:0, behavior:'smooth'}); }" style="color:${isSolutionsActive ? '#0066FF' : '#334155'};font-weight:${isSolutionsActive ? '700' : '600'};text-decoration:none;transition:all 0.15s ease;display:flex;align-items:center;height:100%;box-sizing:border-box;border-bottom:${isSolutionsActive ? '3px solid #0066FF' : '3px solid transparent'};">${I18nManager.t('public.nav_solutions')}</a>
          <a href="${PUBLIC_ROUTES.industries}" class="public-nav-link nav-link-industries ${isIndustriesActive ? 'active' : ''}" onclick="if (window.stateStore) { window.stateStore.setRoute('industries'); history.pushState(null, '', '${PUBLIC_ROUTES.industries}'); window.scrollTo({top:0, behavior:'smooth'}); }" style="color:${isIndustriesActive ? '#0066FF' : '#334155'};font-weight:${isIndustriesActive ? '700' : '600'};text-decoration:none;transition:all 0.15s ease;display:flex;align-items:center;height:100%;box-sizing:border-box;border-bottom:${isIndustriesActive ? '3px solid #0066FF' : '3px solid transparent'};">${I18nManager.t('public.nav_industries')}</a>
          <a href="${PUBLIC_ROUTES.science}" class="public-nav-link nav-link-science ${isScienceActive ? 'active' : ''}" onclick="if (window.stateStore) { window.stateStore.setRoute('science'); history.pushState(null, '', '${PUBLIC_ROUTES.science}'); window.scrollTo({top:0, behavior:'smooth'}); }" style="color:${isScienceActive ? '#0066FF' : '#334155'};font-weight:${isScienceActive ? '700' : '600'};text-decoration:none;transition:all 0.15s ease;display:flex;align-items:center;height:100%;box-sizing:border-box;border-bottom:${isScienceActive ? '3px solid #0066FF' : '3px solid transparent'};">${I18nManager.t('public.nav_science')}</a>
          <a href="${PUBLIC_ROUTES.resources}" class="public-nav-link nav-link-resources ${isResourcesActive ? 'active' : ''}" onclick="if (window.stateStore) { window.stateStore.setRoute('resources'); history.pushState(null, '', '${PUBLIC_ROUTES.resources}'); window.scrollTo({top:0, behavior:'smooth'}); }" style="color:${isResourcesActive ? '#0066FF' : '#334155'};font-weight:${isResourcesActive ? '700' : '600'};text-decoration:none;transition:all 0.15s ease;display:flex;align-items:center;height:100%;box-sizing:border-box;border-bottom:${isResourcesActive ? '3px solid #0066FF' : '3px solid transparent'};">${I18nManager.t('public.nav_resources')}</a>
          <a href="${PUBLIC_ROUTES.company}" class="public-nav-link nav-link-company ${isCompanyActive ? 'active' : ''}" onclick="if (window.stateStore) { window.stateStore.setRoute('company'); history.pushState(null, '', '${PUBLIC_ROUTES.company}'); window.scrollTo({top:0, behavior:'smooth'}); }" style="color:${isCompanyActive ? '#0066FF' : '#334155'};font-weight:${isCompanyActive ? '700' : '600'};text-decoration:none;transition:all 0.15s ease;display:flex;align-items:center;height:100%;box-sizing:border-box;border-bottom:${isCompanyActive ? '3px solid #0066FF' : '3px solid transparent'};">${I18nManager.t('public.nav_company')}</a>
        </nav>

        <!-- RIGHT: Search, Language selector, Book a Demo -->
        <div style="display:flex;align-items:center;gap:16px;">
          <button class="header-search-btn" style="background:transparent;border:none;cursor:pointer;color:#64748B;display:flex;align-items:center;justify-content:center;padding:8px;border-radius:6px;transition:color 0.15s ease;" title="${I18nManager.t('public.search_title')}" aria-label="${I18nManager.t('public.search_title')}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          
          <div class="locale-selector-container">
            <select id="app-locale-select" class="carbon-locale-select" onchange="window.setAppLocale(this.value)" style="border:1px solid #CBD5E1;background:#ffffff;padding:6px 12px;border-radius:8px;font-size:13px;font-weight:600;height:38px;cursor:pointer;color:#334155;outline:none;box-sizing:border-box;">
              <option value="en" ${currentLocale === 'en' ? 'selected' : ''}>English</option>
              <option value="vi" ${currentLocale === 'vi' ? 'selected' : ''}>Tiếng Việt</option>
            </select>
          </div>

          <button id="public-book-demo-btn" class="enerix-button enerix-button-primary btn-book-demo-cta" style="background:#0066FF;color:#ffffff;padding:0 20px;height:40px;border-radius:8px;font-weight:700;font-size:13.5px;cursor:pointer;border:none;box-shadow:0 2px 6px rgba(0,102,255,0.15);transition:all 0.15s ease;box-sizing:border-box;white-space:nowrap;">
            ${I18nManager.t('public.book_demo')}
          </button>
        </div>

      </div>
    </header>
  `;
}
