import { z } from "zod";

const CATEGORY_NAME_MIN_LENGTH = 1;
const CATEGORY_NAME_MAX_LENGTH = 255;
const DESCRIPTION_MIN_LENGTH = 1;
const DESCRIPTION_MAX_LENGTH = 255;

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CategoryRegisterSchema = z.object({
  name: z
    .string()
    .min(CATEGORY_NAME_MIN_LENGTH, 'カテゴリ名は必須です')
    .max(CATEGORY_NAME_MAX_LENGTH, 'カテゴリ名は255文字以内で入力してください'),

  description: z
    .string()
    .min(DESCRIPTION_MIN_LENGTH, '説明は必須です')
    .max(DESCRIPTION_MAX_LENGTH, '説明は255文字以内で入力してください'),
})

export const CategoryResponseSchema = z.object({
  count: z.number(),
  categories: z.array(CategorySchema),
});

export type Category = z.infer<typeof CategorySchema>;
export type CategoryResponse = z.infer<typeof CategoryResponseSchema>;
export type CategoryRegisterRequest = z.infer<typeof CategoryRegisterSchema>;