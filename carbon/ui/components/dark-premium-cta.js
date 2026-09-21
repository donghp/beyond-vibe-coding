/**
 * ENERIX Carbon - Canonical Dark Premium CTA Component
 * Part of Global Page Layout System V1.0
 * Dark navy background, Earth visual, outcomes list, primary/secondary actions.
 */
import { CarbonPath } from '../../app/path.js';
import { ICONS } from './icons.js';
import { I18nManager } from '../../app/i18n.js';
import { PUBLIC_ROUTES } from '../../app/routes.js';

export function renderDarkPremiumCTA() {
  const earthBgUrl = CarbonPath.resolve('assets/branding/footer_earth_background.png');

  return `
    <section class="carbon-bottom-cta-section" data-earth-asset="${earthBgUrl}" style="width:100%;background-color:#071120;background-image:linear-gradient(90deg, rgba(7,17,32,0.92) 0%, rgba(7,17,32,0.6) 45%, rgba(7,17,32,0.1) 100%), url('${earthBgUrl}');background-size:cover;background-repeat:no-repeat;background-position:right center;padding:80px 24px;color:#ffffff;font-family:'Be Vietnam Pro', var(--carbon-font-sans, sans-serif);box-sizing:border-box;border-top:1px solid #1E293B;overflow:hidden;position:relative;">
      <style>
        .bottom-cta-grid {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 64px;
          position: relative;
          z-index: 2;
        }
        .cta-left-content {
          flex: 1;
          max-width: 600px;
        }
        .cta-headline {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 20px;
          letter-spacing: -0.025em;
          color: #FFFFFF;
        }
        .cta-gradient-text {
          background: linear-gradient(135deg, #20B45B 0%, #078FF0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        .cta-right-outcomes {
          display: flex;
          flex-direction: column;
          gap: 24px;
          border-left: 1px solid rgba(255,255,255,0.15);
          padding-left: 40px;
        }
        .outcome-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .outcome-icon-box {
          color: #078FF0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 1024px) {
          .bottom-cta-grid {
            flex-direction: column;
            text-align: center;
            gap: 48px;
          }
          .cta-left-content {
            max-width: 100%;
          }
          .cta-right-outcomes {
            border-left: none;
            padding-left: 0;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 32px;
          }
        }
        @media (max-width: 640px) {
          .cta-right-outcomes {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
          }
        }
      </style>
      
      <div class="bottom-cta-grid">
        <!-- Left side -->
        <div class="cta-left-content">
          <div style="font-size:11px;font-weight:700;color:#078FF0;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:16px;">
            ${I18nManager.t('public.cta_eyebrow')}
          </div>
          <h2 class="cta-headline">
            ${I18nManager.t('public.cta_title_1')}<br/>
            <span class="cta-gradient-text">${I18nManager.t('public.cta_title_2')}</span>
          </h2>
          <p style="font-size:17px;color:#CBD5E1;line-height:1.6;margin:0 0 32px 0;max-width:520px;font-weight:400;">
            ${I18nManager.t('public.cta_desc')}
          </p>
          <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
            <button class="btn-book-demo-cta" style="background:#078FF0;color:#ffffff;padding:0 24px;height:48px;border-radius:6px;font-weight:700;font-size:14.5px;cursor:pointer;border:none;box-shadow:0 10px 20px rgba(7,143,240,0.2);transition:all 0.2s ease;display:flex;align-items:center;gap:8px;">
              ${I18nManager.t('public.book_demo')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button class="btn-explore-platform" onclick="if (window.stateStore) { window.stateStore.setRoute('platform'); history.pushState(null, '', '${PUBLIC_ROUTES.platform}'); window.scrollTo({top:0, behavior:'smooth'}); }" style="background:transparent;color:#ffffff;border:1px solid rgba(255,255,255,0.25);padding:0 24px;height:48px;border-radius:6px;font-weight:700;font-size:14.5px;cursor:pointer;transition:all 0.2s ease;">
              ${I18nManager.t('public.explore_platform')}
            </button>
          </div>
        </div>

        <!-- Right side Outcomes -->
        <div class="cta-right-outcomes">
          <div class="outcome-item">
            <div class="outcome-icon-box">
              ${ICONS.trendingDown(22, '#078FF0')}
            </div>
            <div>
              <div style="font-weight:700;font-size:14px;color:#ffffff;letter-spacing:0.02em;text-transform:uppercase;">${I18nManager.t('public.cta_outcome_1_title')}</div>
              <div style="font-size:13px;color:#94A3B8;">${I18nManager.t('public.cta_outcome_1_desc')}</div>
            </div>
          </div>
          <div class="outcome-item">
            <div class="outcome-icon-box">
              ${ICONS.shield(22, '#20B45B')}
            </div>
            <div>
              <div style="font-weight:700;font-size:14px;color:#ffffff;letter-spacing:0.02em;text-transform:uppercase;">${I18nManager.t('public.cta_outcome_2_title')}</div>
              <div style="font-size:13px;color:#94A3B8;">${I18nManager.t('public.cta_outcome_2_desc')}</div>
            </div>
          </div>
          <div class="outcome-item">
            <div class="outcome-icon-box">
              ${ICONS.clock(22, '#F59E0B')}
            </div>
            <div>
              <div style="font-weight:700;font-size:14px;color:#ffffff;letter-spacing:0.02em;text-transform:uppercase;">${I18nManager.t('public.cta_outcome_3_title')}</div>
              <div style="font-size:13px;color:#94A3B8;">${I18nManager.t('public.cta_outcome_3_desc')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
