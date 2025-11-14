import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().optional().default('Alstonville Clinic'),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
