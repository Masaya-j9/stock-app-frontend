import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CategoryResponseSchema = z.object({
  count: z.number(),
  categories: z.array(CategorySchema),
});

export type Category = z.infer<typeof CategorySchema>;
export type CategoryResponse = z.infer<typeof CategoryResponseSchema>;
