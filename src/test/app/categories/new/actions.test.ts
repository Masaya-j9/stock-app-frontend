import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { registerCategoryAction } from '@/app/categories/new/actions';
import { extractCategoryPayload } from '@/utils/payloads/payloadRequestCategory';
import { validateRegisterCategoryData } from '@/utils/validates/validateCategory';
import type { CategoryRegisterRequest } from '@/types/categories';

vi.mock('@/utils/payloads/payloadRequestCategory');
vi.mock('@/utils/validates/validateCategory');

describe('registerCategoryAction', () => {
  const formData = new FormData();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('バリデーションに失敗した場合はバリデーションエラーを返す', async () => {
    (extractCategoryPayload as Mock).mockReturnValue({ name: '' });
    (validateRegisterCategoryData as Mock).mockReturnValue({
      success: false,
      error: { message: '名前は必須です' },
    });

    const result = await registerCategoryAction(formData);
    expect(result).toEqual({
      success: false,
      error: { message: '名前は必須です' },
    });
  });

  it('APIコールに失敗した場合、APIエラーを返す', async () => {
    const payload: CategoryRegisterRequest = {
      name: '文房具',
      description: '文房具のカテゴリです',
    };
    (extractCategoryPayload as Mock).mockReturnValue(payload);
    (validateRegisterCategoryData as Mock).mockReturnValue({
      success: true,
      data: payload,
    });

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      text: () => Promise.resolve(JSON.stringify({ message: 'カテゴリが重複しています' })),
    });

    const result = await registerCategoryAction(formData);
    expect(result).toEqual({
      success: false,
      error: {
        message: 'カテゴリが重複しています',
        statusCode: 400,
      },
    });
  });

  it('APIコールに成功した場合、成功レスポンスを返す', async () => {
    const payload: CategoryRegisterRequest = {
      name: '電子機器',
      description: '電子機器のカテゴリです',
    };
    (extractCategoryPayload as Mock).mockReturnValue(payload);
    (validateRegisterCategoryData as Mock).mockReturnValue({
      success: true,
      data: payload,
    });

    const mockResponseData = { id: 1, name: '電子機器' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponseData),
    });

    const result = await registerCategoryAction(formData);
    expect(result).toEqual({
      success: true,
      data: mockResponseData,
    });
  });

  it('予期せぬ例外が発生した場合、500エラーを返す', async () => {
    (extractCategoryPayload as Mock).mockImplementation(() => {
      throw new Error('予期せぬエラー');
    });

    const result = await registerCategoryAction(formData);
    expect(result).toEqual({
      success: false,
      error: {
        message: '予期せぬエラー',
        statusCode: 500,
      },
    });
  });
});
