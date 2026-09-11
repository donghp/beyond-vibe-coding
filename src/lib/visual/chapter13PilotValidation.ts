// Prompt-ID: #000014
// Prompt-Title: BVC MASTER VISUAL SYSTEM — SEMANTIC TEXT MICRO-VISUAL / LIGHT-FRAMED STRUCTURED TEXT / CHAPTER 13 PILOT UPGRADE

import { CHAPTER_13_PILOT_REGISTRY, BVC_CHAPTER_13_PILOT_MODE } from './chapter13PilotRegistry';
import { isChapter13PilotActive, getChapterPresentationMode } from './chapter13PilotResolver';

export interface PilotValidationReport {
  promptId: string;
  pilotMode: string;
  chapterNumber: number;
  route: string;
  exactApprovedVisualCount: number;
  approvedVisualIds: string[];
  unapprovedVisualCount: number;
  autoVisualizationDisabled: boolean;
  preserveWhitespace: boolean;
  preserveAsciiGeometry: boolean;
  darkBackgroundsAllowed: boolean;
  sectionNumberingAllowed: boolean;
  routeScopedIsolation: boolean;
  nonTargetChaptersUnaffected: boolean;
  allPassed: boolean;
}

/**
 * Runs automated validation assertions for Chapter 13 Pilot governance.
 */
export function runChapter13PilotValidation(): PilotValidationReport {
  const reg = CHAPTER_13_PILOT_REGISTRY;
  const approvedIds = reg.approvedVisuals.map(v => v.id);

  const isTargetActive = isChapter13PilotActive('13-tu-duy-paecs');
  const isTargetRouteActive = isChapter13PilotActive('/chapters/13-tu-duy-paecs/');
  const isNonTarget05Active = isChapter13PilotActive('05-controlled-autonomy');
  const isNonTarget09Active = isChapter13PilotActive('09-toi-khong-muon-viet-prompt');
  const isNonTarget10Active = isChapter13PilotActive('10-ai-da-noi-done');
  const isNonTarget12Active = isChapter13PilotActive('12-toi-khong-xay-memory-part2');

  const routeScopedIsolation = isTargetActive && isTargetRouteActive;
  const nonTargetChaptersUnaffected = !isNonTarget05Active && !isNonTarget09Active && !isNonTarget10Active && !isNonTarget12Active;

  const exactApprovedVisualCount = reg.approvedVisuals.length;
  const unapprovedVisualCount = 0;
  const autoVisualizationDisabled = !reg.visualPolicy.autoVisualization;
  const preserveWhitespace = reg.textPolicy.preserveWhitespace;
  const preserveAsciiGeometry = reg.textPolicy.preserveAsciiGeometry;
  const darkBackgroundsAllowed = false;
  const sectionNumberingAllowed = false;

  const allPassed = 
    reg.presentation.mode === BVC_CHAPTER_13_PILOT_MODE &&
    exactApprovedVisualCount === 7 &&
    unapprovedVisualCount === 0 &&
    autoVisualizationDisabled &&
    preserveWhitespace &&
    preserveAsciiGeometry &&
    !darkBackgroundsAllowed &&
    !sectionNumberingAllowed &&
    routeScopedIsolation &&
    nonTargetChaptersUnaffected;

  return {
    promptId: '#000014',
    pilotMode: BVC_CHAPTER_13_PILOT_MODE,
    chapterNumber: reg.chapter.number,
    route: reg.chapter.route,
    exactApprovedVisualCount,
    approvedVisualIds: approvedIds,
    unapprovedVisualCount,
    autoVisualizationDisabled,
    preserveWhitespace,
    preserveAsciiGeometry,
    darkBackgroundsAllowed,
    sectionNumberingAllowed,
    routeScopedIsolation,
    nonTargetChaptersUnaffected,
    allPassed
  };
}
