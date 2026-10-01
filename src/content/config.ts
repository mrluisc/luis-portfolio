import { defineCollection, z } from 'astro:content';

/**
 * Blog posts. The 2020-2021 posts come from Luis Carlos's COETAIL blog
 * (lmoreno.coetail.com, now offline), recovered from the Wayback Machine and
 * lightly edited (no dashes, typos fixed, meaning unchanged).
 */
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** The Wayback Machine copy the text was recovered from. */
    archive: z.string().url().optional(),
    /** True when some of the original images are left out (lost, or photos of people). */
    imagesLost: z.boolean().default(false),
  }),
});

export const collections = { blog };
