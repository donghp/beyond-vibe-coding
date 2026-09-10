export type PublicationStatus = 'unpublished' | 'published' | 'archived';
export type ContentStatus = 'draft' | 'partial' | 'complete' | 'final';

export interface ChapterStatus {
  publicationStatus: PublicationStatus;
  contentStatus: ContentStatus;
}

export type VisualDnaProgressionStep = 
  | 'INTENTION' 
  | 'CONTEXT' 
  | 'AI CAPABILITY' 
  | 'CONTROL' 
  | 'VERIFICATION' 
  | 'VALUE';

export interface EditorialDiagramAsset {
  id: string;
  chapterOrder: number;
  title: string;
  caption?: string;
  assetPath: string;
  progressionStep?: VisualDnaProgressionStep;
  altText: string;
}

export interface WorkflowVisualAsset {
  id: string;
  title: string;
  description?: string;
  assetPath: string;
  altText: string;
}
