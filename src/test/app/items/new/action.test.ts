import { vi, expect, it, describe, beforeEach, Mock } from 'vitest';
import { registerItemAction } from '@/app/items/new/actions';
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
    vi.clearAllMocks();
  });

  it('アイテムの登録に成功する', async () => {
    const mockExtractItemPayload = extractItemPayload as Mock;
    const mockValidateRegisterItemData = validateRegisterItemData as Mock;

    const payload = {
      name: 'Item A',
      quantity: 10,
      description: 'Description of Item A',
      categoryIds: [1, 2],
    };

    mockExtractItemPayload.mockReturnValue(payload);

    mockValidateRegisterItemData.mockReturnValue({
      success: true,
      data: payload,
    });

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 123 }),
    });

    global.fetch = mockFetch;

    const response = await registerItemAction(mockFormData);

    expect(mockExtractItemPayload).toHaveBeenCalledWith(mockFormData);
    expect(mockValidateRegisterItemData).toHaveBeenCalledWith(payload);
    expect(mockFetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    expect(response).toEqual({ success: true, data: { id: 123 } });
  });

  it('バリデーション失敗時にエラーを返す', async () => {
    const mockExtractItemPayload = extractItemPayload as Mock;
    const mockValidateRegisterItemData = validateRegisterItemData as Mock;

    const payload = {
      name: '',
      quantity: 10,
      description: 'Invalid',
      categoryIds: [],
    };

    mockExtractItemPayload.mockReturnValue(payload);

    mockValidateRegisterItemData.mockReturnValue({
      success: false,
      error: {
        message: 'バリデーションエラー',
        errors: {
          name: '名前は必須です',
          categoryIds: 'カテゴリは1つ以上必要です',
        },
      },
    });

    const response = await registerItemAction(mockFormData);

    expect(response).toEqual({
      success: false,
      error: {
        message: 'バリデーションエラー',
        errors: {
          name: '名前は必須です',
          categoryIds: 'カテゴリは1つ以上必要です',
        },
      },
    });
  });

  it('APIリクエストが失敗したときにエラーメッセージを返す', async () => {
    const mockExtractItemPayload = extractItemPayload as Mock;
    const mockValidateRegisterItemData = validateRegisterItemData as Mock;

    const payload = {
      name: 'Item A',
      quantity: 10,
      description: 'Description of Item A',
      categoryIds: [1, 2],
    };

    mockExtractItemPayload.mockReturnValue(payload);

    mockValidateRegisterItemData.mockReturnValue({
      success: true,
      data: payload,
    });

    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 409,
      text: async () => JSON.stringify({ message: '重複アイテムです' }),
    });

    global.fetch = mockFetch;

    const response = await registerItemAction(mockFormData);

    expect(response).toEqual({
      success: false,
      error: {
        message: '重複アイテムです',
        statusCode: 409,
      },
    });
  });
});
