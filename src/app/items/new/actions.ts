'use server';
import { extractItemPayload } from '@/utils/payloads/payloadRequestItem';
import { validateRegisterItemData } from '@/utils/validates/validateItem';
import { ItemRegisterRequest } from '@/types/items';

export async function registerItemAction(formData: FormData) {
  // Payloadの抽出
  const rawData = extractItemPayload(formData);
  // バリデーション
  const validData: ItemRegisterRequest = validateRegisterItemData(rawData);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validData),
  });

  if (!res.ok) {
    const errorText = await res.text(); // エラーのときだけ読む
    console.error('エラーステータス:', res.status);
    console.error('エラー内容:', errorText);
    throw new Error('アイテムの登録に失敗しました');
  }

  return res.json();
}