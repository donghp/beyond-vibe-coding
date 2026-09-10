export type PublicationStatus = 'unpublished' | 'published' | 'archived';
export type ContentStatus = 'draft' | 'partial' | 'complete' | 'final';

export interface ChapterStatus {
  publicationStatus: PublicationStatus;
  contentStatus: ContentStatus;
}
