'use server';

import { extractItemPayload } from '@/utils/payloads/payloadRequestItem';
import { validateEditItemData } from '@/utils/validates/validateItem';
import { ItemEditRequest } from '@/types/items';

export async function editItemAction(id: string, formData: FormData) {
  try {
    // Payloadの抽出
    const rawData = extractItemPayload(formData);

    // バリデーション
    const validationResult = validateEditItemData(rawData);

    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error,
      };
    }

    const validData: ItemEditRequest = validationResult.data;

    // API呼び出し（PUTメソッド）
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`, {
      method: 'PATCH',
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
