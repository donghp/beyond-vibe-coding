import { I18nManager } from '../../app/i18n.js';

export function renderPillarCard({ title, headline, desc, img }) {
  return `
    <div style="background:#ffffff;border:1px solid #E2E8F0;border-radius:16px;padding:32px;display:flex;flex-direction:column;box-shadow:0 4px 12px rgba(11,23,39,0.015);">
      <span style="font-size:11px;font-weight:800;color:#0066FF;margin-bottom:16px;display:block;">${title}</span>
      <h3 style="font-size:22px;font-weight:800;color:#0B1727;margin-bottom:12px;">${headline}</h3>
      <p style="font-size:14px;color:#475569;margin-bottom:24px;line-height:1.5;">${desc}</p>
      <img src="${img}" style="width:100%;height:180px;object-fit:cover;border-radius:12px;margin-bottom:24px;" alt="${headline}" />
      <a href="#" style="font-weight:700;color:#0066FF;text-decoration:none;">${I18nManager.t('public.learn_more')}</a>
    </div>
  `;
}
