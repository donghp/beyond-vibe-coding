import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chaptersCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/chapters" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    shortTitle: z.string(),
    order: z.number(),
    description: z.string(),
    readingTime: z.string(),
    topics: z.array(z.string()),
    hero: z.string().nullable().optional(),
    published: z.string(),
    publicationStatus: z.enum(['unpublished', 'published', 'archived']).default('unpublished'),
    contentStatus: z.enum(['draft', 'partial', 'complete', 'final']).default('draft'),
    updated: z.string().optional(),
    version: z.string()
  }).refine((data) => {
    // Invariant: publicationStatus === 'published' requires contentStatus !== 'draft'
    if (data.publicationStatus === 'published' && data.contentStatus === 'draft') {
      return false;
    }
    return true;
  }, {
    message: "A chapter with publicationStatus 'published' cannot have contentStatus 'draft'."
  })
});

const openingsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/openings" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    order: z.number(),
    pageNumber: z.string().optional(),
    recipient: z.string().optional(),
    author: z.string().optional(),
    bookTitle: z.string().optional(),
    heading: z.string().optional(),
    quoteEn: z.string().optional(),
    quoteVi: z.string().optional()
  })
});

export const collections = {
  chapters: chaptersCollection,
  openings: openingsCollection,
};
