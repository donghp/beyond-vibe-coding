/**
 * ENERIX Carbon - Header Component
 */
import { I18nManager } from '../../app/i18n.js';

export function renderHeader() {
  const currentLocale = I18nManager.currentLocale;
  return `
    <header class="carbon-header">
      <div style="display:flex;align-items:center;">
        <button class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Toggle Navigation">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
        <div class="brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span>${I18nManager.t('common.title')}</span>
          <span class="brand-badge">Regulatory GHG v7.0</span>
        </div>
      </div>
      <div class="header-right-desktop" style="display:flex;align-items:center;gap:16px;">
        <select onchange="window.setAppLocale(this.value)" style="background:rgba(255,255,255,0.1);color:white;border:none;padding:4px;border-radius:4px;">
            <option value="en" ${currentLocale === 'en' ? 'selected' : ''}>English</option>
            <option value="vi" ${currentLocale === 'vi' ? 'selected' : ''}>Tiếng Việt</option>
        </select>
        <span style="font-size:12px;color:#94a3b8;">Decision 42/2026/QĐ-TTg Compliant</span>
        <a href="../" style="color:#e0f2fe;font-size:12px;text-decoration:none;border:1px solid rgba(255,255,255,0.2);padding:4px 10px;border-radius:4px;">← Back to Living Book</a>
      </div>
      <div class="header-right-mobile" style="display:none;">
        <!-- Mobile specific header actions if needed -->
      </div>
    </header>
  `;
}
