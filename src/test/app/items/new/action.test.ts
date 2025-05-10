import { vi, expect, it, describe, beforeEach, Mock } from 'vitest';
import { registerItemAction } from '@/app/items/new/actions'; // ここは実際のパスに変更してください
import { extractItemPayload } from '@/utils/payloads/payloadRequestItem';
import { validateRegisterItemData } from '@/utils/validates/validateItem';

// モック
vi.mock('@/utils/payloads/payloadRequestItem');
vi.mock('@/utils/validates/validateItem');

describe('registerItemAction', () => {
  const mockFormData = new FormData();
  mockFormData.append('name', 'Item A');
  mockFormData.append('quantity', '10');
  mockFormData.append('description', 'Description of Item A');
  mockFormData.append('categoryIds', '1');
  mockFormData.append('categoryIds', '2');

  beforeEach(() => {
    // 各テストの前にモック関数をリセット
    vi.clearAllMocks();
  });

  it('アイテムの登録に成功する', async () => {
    // モック設定
    const mockExtractItemPayload = extractItemPayload as Mock;
    const mockValidateRegisterItemData = validateRegisterItemData as Mock;

    // モックの挙動
    mockExtractItemPayload.mockReturnValue({
      name: 'Item A',
      quantity: 10,
      description: 'Description of Item A',
      categoryIds: [1, 2],
    });

    mockValidateRegisterItemData.mockReturnValue({
      name: 'Item A',
      quantity: 10,
      description: 'Description of Item A',
      categoryIds: [1, 2],
    });

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    global.fetch = mockFetch;

    // 実行
    const response = await registerItemAction(mockFormData);

    // アサーション
    expect(mockExtractItemPayload).toHaveBeenCalledWith(mockFormData);
    expect(mockValidateRegisterItemData).toHaveBeenCalledWith({
      name: 'Item A',
      quantity: 10,
      description: 'Description of Item A',
      categoryIds: [1, 2],
    });
    expect(mockFetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Item A',
        quantity: 10,
        description: 'Description of Item A',
        categoryIds: [1, 2],
      }),
    });
    expect(response).toEqual({ success: true });
  });

  it('APIリクエストが失敗したときにエラーを投げる', async () => {
    const mockExtractItemPayload = extractItemPayload as Mock;
    const mockValidateRegisterItemData = validateRegisterItemData as Mock;

    // モックの挙動
    mockExtractItemPayload.mockReturnValue({
      name: 'Item A',
      quantity: 10,
      description: 'Description of Item A',
      categoryIds: [1, 2],
    });

    mockValidateRegisterItemData.mockReturnValue({
      name: 'Item A',
      quantity: 10,
      description: 'Description of Item A',
      categoryIds: [1, 2],
    });

    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => 'Error message',
    });

    global.fetch = mockFetch;

    // エラーハンドリング
    await expect(registerItemAction(mockFormData)).rejects.toThrow('アイテムの登録に失敗しました');

    expect(mockExtractItemPayload).toHaveBeenCalledWith(mockFormData);
    expect(mockValidateRegisterItemData).toHaveBeenCalledWith({
      name: 'Item A',
      quantity: 10,
      description: 'Description of Item A',
      categoryIds: [1, 2],
    });
    expect(mockFetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Item A',
        quantity: 10,
        description: 'Description of Item A',
        categoryIds: [1, 2],
      }),
    });
  });
});
