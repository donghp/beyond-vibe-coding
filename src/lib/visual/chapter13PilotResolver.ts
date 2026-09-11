// Prompt-ID: #000014
// Prompt-Title: BVC MASTER VISUAL SYSTEM — SEMANTIC TEXT MICRO-VISUAL / LIGHT-FRAMED STRUCTURED TEXT / CHAPTER 13 PILOT UPGRADE

import { 
  CHAPTER_13_PILOT_REGISTRY, 
  BVC_CHAPTER_13_PILOT_MODE 
} from './chapter13PilotRegistry';

/**
 * Route-Scoped Resolver for Chapter 13 Pilot
 * 
 * Activated ONLY when target route/slug corresponds to Chapter 13.
 * All other chapters return false / null, ensuring 100% route isolation.
 */
export function isChapter13PilotActive(chapterOrSlug?: any): boolean {
  if (!chapterOrSlug) return false;

  if (typeof chapterOrSlug === 'string') {
    const s = chapterOrSlug.toLowerCase().trim();
    return s === '13-tu-duy-paecs' || 
           s === 'tu-duy-paecs' || 
           s === '13' || 
           s === '/chapters/13-tu-duy-paecs/' ||
           s.includes('13-tu-duy-paecs');
  }

  const id = chapterOrSlug?.id ? String(chapterOrSlug.id).toLowerCase() : '';
  const slug = chapterOrSlug?.slug ? String(chapterOrSlug.slug).toLowerCase() : '';
  const order = chapterOrSlug?.data?.order;
  const chapterNumber = chapterOrSlug?.data?.chapter;

  if (id.includes('13-tu-duy-paecs') || slug.includes('13-tu-duy-paecs')) {
    return true;
  }

  if (order === 13 || chapterNumber === 13) {
    return true;
  }

  return false;
}

/**
 * Returns the active presentation mode name for the given chapter.
 */
export function getChapterPresentationMode(chapterOrSlug?: any): string {
  if (isChapter13PilotActive(chapterOrSlug)) {
    return BVC_CHAPTER_13_PILOT_MODE;
  }
  return 'STANDARD_BVC_RENDERER';
}

/**
 * Resolves an approved visual for Chapter 13 from an asset source.
 * Strict fail-closed: returns undefined if the visual is not explicitly approved.
 */
export function resolveChapter13PilotVisual(svgSrc: string) {
  if (!svgSrc) return undefined;
  const normalized = svgSrc.toLowerCase();

  const registry = CHAPTER_13_PILOT_REGISTRY;

  if (normalized.includes('v13-02')) return registry.approvedVisuals.find(v => v.id === 'V13-02');
  if (normalized.includes('v13-03')) return registry.approvedVisuals.find(v => v.id === 'V13-03');
  if (normalized.includes('v13-05')) return registry.approvedVisuals.find(v => v.id === 'V13-04');
  if (normalized.includes('v13-07')) return registry.approvedVisuals.find(v => v.id === 'V13-05');
  if (normalized.includes('v13-11')) return registry.approvedVisuals.find(v => v.id === 'V13-06');
  if (normalized.includes('v13-12')) return registry.approvedVisuals.find(v => v.id === 'V13-07');

  return undefined;
}
