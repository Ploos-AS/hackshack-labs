import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const categories = ['projects','guides','how-tos','mini-how-tos','reviews','tests','tutorials','deep-dives','teardowns','experiments','reference'] as const;
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(), description: z.string(), category: z.enum(categories),
    lang: z.enum(['en','nb']), date: z.coerce.date(), updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]), series: z.string().optional(),
    translationKey: z.string().optional(), draft: z.boolean().default(false),
    tested: z.boolean().default(false),
  }),
});
export const collections = { articles };
