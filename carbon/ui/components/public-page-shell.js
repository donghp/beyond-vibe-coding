/**
 * ENERIX Carbon - Shared Public Page Shell Component
 * Enforces the non-negotiable public page structure:
 * LOGO -> HEADER -> BREADCRUMB (child pages) -> BANNER / HERO -> MAIN CONTENT -> SECTION FOOTER -> FOOTER
 */
import { renderPublicHeader } from './public-header.js';
import { renderDarkPremiumCTA } from './dark-premium-cta.js';
import { renderEnterpriseFooter } from './enterprise-footer.js';
import { PUBLIC_ROUTES } from '../../app/routes.js';
import { I18nManager } from '../../app/i18n.js';

export function renderBreadcrumb(items = []) {
  if (!items || items.length === 0) return '';
  const isVi = I18nManager.currentLocale === 'vi';
  const homeLabel = isVi ? 'Trang chủ' : 'Home';

  const allItems = [
    { label: homeLabel, url: PUBLIC_ROUTES.home },
    ...items
  ];

  return `
    <nav class="public-breadcrumb-bar" aria-label="Breadcrumb" style="background:#F8FAFC;border-bottom:1px solid #E2E8F0;padding:12px 24px;font-family:'Be Vietnam Pro', var(--carbon-font-sans, sans-serif);font-size:13px;width:100%;box-sizing:border-box;">
      <div style="max-width:1280px;margin:0 auto;display:flex;align-items:center;gap:8px;color:#64748B;">
        ${allItems.map((item, idx) => {
          const isLast = idx === allItems.length - 1;
          if (isLast) {
            return `<span style="color:#0F172A;font-weight:600;" aria-current="page">${item.label}</span>`;
          }
          return `
            <a href="${item.url}" class="breadcrumb-link" style="color:#475569;text-decoration:none;transition:color 0.15s ease;" onmouseover="this.style.color='#0066FF'" onmouseout="this.style.color='#475569'">${item.label}</a>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#94A3B8;"><polyline points="9 18 15 12 9 6"></polyline></svg>
          `;
        }).join('')}
      </div>
    </nav>
  `;
}

export function renderPublicPageShell(config = {}) {
  const {
    pageClass = '',
    breadcrumbItems = null,
    bannerHtml = '',
    mainContentHtml = '',
    sectionFooterHtml = null, // if null, defaults to renderDarkPremiumCTA()
    customFooterHtml = null
  } = config;

  const breadcrumb = breadcrumbItems ? renderBreadcrumb(breadcrumbItems) : '';
  const sectionFooter = sectionFooterHtml !== null ? sectionFooterHtml : renderDarkPremiumCTA();
  const footer = customFooterHtml !== null ? customFooterHtml : renderEnterpriseFooter();

  return `
    <div class="public-page-shell ${pageClass}" style="min-height:100vh;display:flex;flex-direction:column;background:#ffffff;color:#0B1727;font-family:'Be Vietnam Pro', var(--carbon-font-sans, sans-serif);overflow-x:hidden;">
      ${renderPublicHeader()}
      ${breadcrumb}
      ${bannerHtml}
      <main class="public-main-content" style="flex:1;width:100%;">
        ${mainContentHtml}
      </main>
      ${sectionFooter}
      ${footer}
    </div>
  `;
}
