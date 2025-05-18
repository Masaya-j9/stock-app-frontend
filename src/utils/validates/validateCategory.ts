import { CategoryRegisterSchema, CategoryRegisterRequest } from '@/types/categories';

type ValidationResult =
  | { success: true; data: CategoryRegisterRequest }
  | { success: false; error: { message: string; statusCode: number; errors?: Record<string, string[]> } };

export function validateRegisterCategoryData(data: {
  name: string;
  description: string;
}): ValidationResult {
  const result = CategoryRegisterSchema.safeParse(data);
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