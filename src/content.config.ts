import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // One-line standfirst used on cards and meta description fallback.
      summary: z.string(),
      role: z.string(),
      year: z.string(),
      status: z.enum(['live', 'archived']),
      stack: z.array(z.string()).default([]),
      order: z.number(),
      repo: z.string().url().optional(),
      live: z.string().url().optional(),
      // Draft entries never render in any query (filtered on read).
      draft: z.boolean().default(false),
      hero: image().optional(),
      gallery: z.array(image()).default([]),
    }),
});

const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.md' }),
  schema: z.object({
    org: z.string(),
    role: z.string(),
    location: z.string(),
    // YYYY-MM; end null means ongoing.
    start: z.string(),
    end: z.string().nullable().default(null),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    order: z.number(),
  }),
});

const education = defineCollection({
  loader: glob({ base: './src/content/education', pattern: '**/*.md' }),
  schema: z.object({
    institution: z.string(),
    credential: z.string(),
    field: z.string(),
    start: z.string(),
    end: z.string(),
    score: z.string().optional(),
    notes: z.array(z.string()).default([]),
    order: z.number(),
  }),
});

const settings = defineCollection({
  loader: glob({ base: './src/content/settings', pattern: '**/*.md' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string().email(),
    domain: z.string(),
    // Site-root path of the downloadable resume PDF under public/.
    resume: z.string(),
    links: z.array(z.string().url()).default([]),
  }),
});

export const collections = { projects, experience, education, settings };
