import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const categories = ['projects','guides','how-tos','mini-how-tos','reviews','tests','tutorials','deep-dives','teardowns','experiments','reference'] as const;
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(), description: z.string(), category: z.enum(categories),
    lang: z.enum(['en','nb']), date: z.coerce.date(), updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]), series: z.string().optional(),
    changelog: z.array(z.object({ date: z.coerce.date(), type: z.enum(['editorial','sources','lab-test','hardware-test']), note: z.string().min(8) })).default([]),
    translationKey: z.string().optional(), draft: z.boolean().default(false),
    tested: z.boolean().default(false), evidence: z.enum(['documentation','desk-research','lab-tested','hardware-verified']).optional(),
  }),
});
export const collections = { articles };
