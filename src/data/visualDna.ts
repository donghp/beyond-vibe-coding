/**
 * BVC VISUAL DNA V1.0 — FOUNDATIONAL CREATIVE BASELINE
 * Canonical Visual Authority for Beyond Vibe Coding — Living Book
 */

export interface WatermarkConfig {
  text: string;
  fontFamily: string;
  fontSize: number;
  letterSpacing: string;
  fill: string;
  position: 'bottom-right' | 'bottom-center';
}

export interface ChapterHeroAssetConfig {
  width: number;
  height: number;
  aspectRatio: string; // "21:9"
  quality: number;
  watermark: WatermarkConfig;
}

export interface EditorialDiagramConfig {
  type: 'diagram' | 'workflow' | 'architecture';
  progression: readonly ['INTENTION', 'CONTEXT', 'AI CAPABILITY', 'CONTROL', 'VERIFICATION', 'VALUE'];
  allowedFormats: readonly ['webp', 'svg'];
}

export const BVC_VISUAL_DNA = {
  manifesto: {
    en: "Human intention leads. AI capability follows. Real value emerges between them.",
    vi: "Con người định hướng. AI khuếch đại năng lực. Giá trị thật được tạo ra ở điểm giao giữa hai bên."
  },
  palette: {
    navy950: '#0a101d',
    navy900: '#0f172a',
    techBlue: '#0066ff',
    cyanRestrained: '#00e5ff',
    emerald400: '#10b981',
    slate100: '#f1f5f9',
    white: '#ffffff',
  },
  progression: [
    'INTENTION',
    'CONTEXT',
    'AI CAPABILITY',
    'CONTROL',
    'VERIFICATION',
    'VALUE'
  ] as const,
  heroConfig: {
    width: 1920,
    height: 823,
    aspectRatio: '21:9',
    quality: 85,
    watermark: {
      text: '© Beyond Vibe Coding · Hồng Đông',
      fontFamily: 'monospace',
      fontSize: 14,
      letterSpacing: '2px',
      fill: 'rgba(255, 255, 255, 0.65)',
      position: 'bottom-right'
    }
  } satisfies ChapterHeroAssetConfig,
  assetPaths: {
    cover: '/images/cover.png',
    coverVn: '/images/cover-vn.png',
    heroPattern: (chapterOrder: number) => `/images/chapter-${chapterOrder.toString().padStart(2, '0')}-hero.webp`,
    diagramPattern: (chapterOrder: number, diagramId: string) => `/images/diagrams/chapter-${chapterOrder.toString().padStart(2, '0')}-${diagramId}.webp`,
    workflowPattern: (workflowId: string) => `/images/workflows/${workflowId}.webp`
  }
} as const;

/**
 * Returns canonical relative path for a chapter hero image.
 */
export function getChapterHeroPath(chapterOrder: number): string {
  return BVC_VISUAL_DNA.assetPaths.heroPattern(chapterOrder);
}

/**
 * Returns canonical relative path for an editorial diagram image.
 */
export function getDiagramPath(chapterOrder: number, diagramId: string): string {
  return BVC_VISUAL_DNA.assetPaths.diagramPattern(chapterOrder, diagramId);
}

/**
 * Returns canonical relative path for a workflow visual asset.
 */
export function getWorkflowPath(workflowId: string): string {
  return BVC_VISUAL_DNA.assetPaths.workflowPattern(workflowId);
}
