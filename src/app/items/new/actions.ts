'use server';
import { extractItemPayload } from '@/utils/payloads/payloadRequestItem';
import { validateRegisterItemData } from '@/utils/validates/validateItem';
import { ItemRegisterRequest } from '@/types/items';

export async function registerItemAction(formData: FormData) {
  try {
    // Payloadの抽出
    const rawData = extractItemPayload(formData);

    // バリデーション結果をオブジェクトで返すように変更済みとして使う
    const validationResult = validateRegisterItemData(rawData);

    // バリデーション失敗なら、statusCodeとメッセージを返して処理終了
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error,
      };
    }


    const validData: ItemRegisterRequest = validationResult.data;

    // API呼び出し
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
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

      // APIからの409や他のエラーを返す
      return { success: false, error: { message: errorMessage, statusCode } };
    }

    const data = await res.json();
    return { success: true, data };

  } catch (err: any) {
    // 想定外のエラーはここでキャッチして500として返す
    return {
      success: false,
      error: {
        message: err.message || 'サーバーエラー',
        statusCode: 500,
      },
    };
  }
}
