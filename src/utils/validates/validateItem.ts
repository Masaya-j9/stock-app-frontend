import { ItemRegisterSchema, ItemRegisterRequest } from '@/types/items';

export function validateRegisterItemData(data: { name: string; quantity: number; description: string; categoryIds: number[] }): ItemRegisterRequest {
  const result = ItemRegisterSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    console.error('バリデーションエラー:', errors);
    throw new Error('入力されたデータにエラーがあります');
  }

  return result.data;
}