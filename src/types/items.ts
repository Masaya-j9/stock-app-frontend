import { z } from "zod";

const ITEM_NAME_MIN_LENGTH = 1;
const ITEM_NAME_MAX_LENGTH = 255;
const ITEM_QUANTITY_MIN_VALUE = 1;
const ITEM_QUANTITY_MAX_VALUE = 1000;
const DESCRIPTION_MIN_LENGTH = 1;
const DESCRIPTION_MAX_LENGTH = 255;
const CATEGORY_ID_INCLUDES_MIN_VALUE = 1;

export const ItemRegisterSchema = z.object({
  name: z
    .string()
    .min(ITEM_NAME_MIN_LENGTH, '名前は必須です')
    .max(ITEM_NAME_MAX_LENGTH, '名前は255文字以内で入力してください'),

  quantity: z
    .number()
    .min(ITEM_QUANTITY_MIN_VALUE, '数量は1以上でなければなりません')
    .max(ITEM_QUANTITY_MAX_VALUE, '数量は1000以下でなければなりません'),

  description: z
    .string()
    .min(DESCRIPTION_MIN_LENGTH, '説明は必須です')
    .max(DESCRIPTION_MAX_LENGTH, '説明は255文字以内で入力してください'),

  categoryIds: z
    .array(z.number().int())
    .min(CATEGORY_ID_INCLUDES_MIN_VALUE, '少なくとも1つのカテゴリを選択してください'),
});

export type ItemCategory = {
  id: number;
  name: string;
  itemId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type Items = {
  id: number;
  name: string;
  quantity: number;
  description: string;
  itemsCategories?: ItemCategory[];
}

export type ItemResponse = {
  count: number;
  totalPages: number;
  results: Items[];
}

export type ItemRegisterRequest = z.infer<typeof ItemRegisterSchema>;