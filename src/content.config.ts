import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chaptersCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/chapters" }),
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    shortTitle: z.string().optional(),
    order: z.number().optional(),
    description: z.string().optional(),
    readingTime: z.string().optional(),
    topics: z.array(z.string()).optional(),
    hero: z.string().nullable().optional(),
    published: z.string().optional(),
    publicationStatus: z.enum(['unpublished', 'published', 'archived']).default('unpublished'),
    contentStatus: z.enum(['draft', 'partial', 'complete', 'final']).default('draft'),
    navigationPolicy: z.string().optional(),
    updated: z.string().optional(),
    version: z.string().optional()
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
    sectionLabel: z.string().optional(),
    intro: z.string().optional(),
    quoteEn: z.string().optional(),
    quoteVi: z.string().optional()
  })
});

export const collections = {
  chapters: chaptersCollection,
  openings: openingsCollection,
};
