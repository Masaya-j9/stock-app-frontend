import { ItemRegisterSchema, ItemRegisterRequest, ItemEditRequest, ItemEditSchema } from '@/types/items';

type ValidationResult =
  | { success: true; data: ItemRegisterRequest }
  | { success: false; error: { message: string; statusCode: number; errors?: Record<string, string[]> } };

type ValidationItemEditResult =
  | { success: true; data: ItemEditRequest }
  | { success: false; error: { message: string; statusCode: number; errors?: Record<string, string[]> } };

export function validateRegisterItemData(data: {
  name: string;
  quantity: number;
  description: string;
  categoryIds: number[];
}): ValidationResult {
  const result = ItemRegisterSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    console.error('バリデーションエラー:', errors);

    return {
      success: false,
      error: {
        message: '入力されたデータにエラーがあります',
        statusCode: 400,
        errors,
      },
    };
  }

  return { success: true, data: result.data };
}

export  function validateEditItemData(data: {
  name: string;
  quantity: number;
  description: string;
  categoryIds: number[];
}): ValidationItemEditResult {
  const result = ItemEditSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    console.error('バリデーションエラー:', errors);
    return {
      success: false,
      error: {
        message: '入力されたデータにエラーがあります',
        statusCode: 400,
        errors,
      },
    };
  }

  return { success: true, data: result.data };
}