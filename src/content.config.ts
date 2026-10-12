import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    // One-line standfirst used on cards and meta description fallback.
    summary: z.string(),
    role: z.string(),
    year: z.string(),
    status: z.enum(['placeholder', 'live', 'archived']).default('placeholder'),
    stack: z.array(z.string()).default([]),
    order: z.number(),
    repo: z.string().url().optional(),
    live: z.string().url().optional(),
  }),
});

export const collections = { projects };
