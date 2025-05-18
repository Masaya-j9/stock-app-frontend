'use server';

import { extractCategoryPayload } from '@/utils/payloads/payloadRequestCategory';
import { validateRegisterCategoryData } from '@/utils/validates/validateCategory';
import { CategoryRegisterRequest } from '@/types/categories';

export async function registerCategoryAction(formData: FormData) {
  try {
    // Payloadの抽出
    const rawData = extractCategoryPayload(formData);

    // バリデーション
    const validationResult = validateRegisterCategoryData(rawData);

    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error,
      };
    }

    const validData: CategoryRegisterRequest = validationResult.data;

    // API呼び出し
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      let errorMessage = "APIエラー";
      const statusCode = res.status;

      try {
        const errorBody = JSON.parse(errorText);
        errorMessage = errorBody.message || errorMessage;
      } catch {}

      return {
        success: false,
        error: {
          message: errorMessage,
          statusCode,
        },
      };
    }

    const data = await res.json();
    return { success: true, data };

  } catch (err: any) {
    return {
      success: false,
      error: {
        message: err.message || 'サーバーエラー',
        statusCode: 500,
      },
    };
  }
}
