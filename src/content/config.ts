import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    lang: z.string().default('id'),
    status: z.string().default('published'),
    author: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    wordpress_id: z.string().optional(),
    original_url: z.string().optional(),
  }),
});

export const collections = { blog };
