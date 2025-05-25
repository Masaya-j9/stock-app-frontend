import { vi, expect, describe, it, beforeEach } from "vitest";
import { editItemAction } from "@/app/items/[id]/edit/actions";
import { extractItemPayload } from "@/utils/payloads/payloadRequestItem";
import { validateEditItemData } from "@/utils/validates/validateItem";

// モックの設定
vi.mock("@/utils/payloads/payloadRequestItem", () => ({
  extractItemPayload: vi.fn(),
}));

vi.mock("@/utils/validates/validateItem", () => ({
  validateEditItemData: vi.fn(),
}));

// グローバルのfetchをモック
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("editItemAction", () => {
  const mockFormData = new FormData();
  const mockId = "123";
  const mockValidData = {
    name: "テストアイテム",
    quantity: 10,
    description: "説明文",
    categoryIds: [1, 2],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  it("正常に更新できる場合", async () => {
    // モックの設定
    (extractItemPayload as any).mockReturnValue(mockValidData);
    (validateEditItemData as any).mockReturnValue({
      success: true,
      data: mockValidData,
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: mockId, ...mockValidData }),
    });

    const result = await editItemAction(mockId, mockFormData);

    expect(result).toEqual({
      success: true,
      data: { id: mockId, ...mockValidData },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/items/${mockId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockValidData),
      }
    );
  });

  it("バリデーションエラーの場合", async () => {
    const validationError = {
      message: "バリデーションエラー",
    };

    (extractItemPayload as any).mockReturnValue(mockValidData);
    (validateEditItemData as any).mockReturnValue({
      success: false,
      error: validationError,
    });

    const result = await editItemAction(mockId, mockFormData);

    expect(result).toEqual({
      success: false,
      error: validationError,
    });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("APIエラーの場合", async () => {
    (extractItemPayload as any).mockReturnValue(mockValidData);
    (validateEditItemData as any).mockReturnValue({
      success: true,
      data: mockValidData,
    });
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: () => Promise.resolve(JSON.stringify({ message: "APIエラー" })),
    });

    const result = await editItemAction(mockId, mockFormData);

    expect(result).toEqual({
      success: false,
      error: {
        message: "APIエラー",
        statusCode: 400,
      },
    });
  });

  it("予期せぬエラーの場合", async () => {
    (extractItemPayload as any).mockReturnValue(mockValidData);
    (validateEditItemData as any).mockReturnValue({
      success: true,
      data: mockValidData,
    });
    mockFetch.mockRejectedValueOnce(new Error("予期せぬエラー"));

    const result = await editItemAction(mockId, mockFormData);

    expect(result).toEqual({
      success: false,
      error: {
        message: "予期せぬエラー",
        statusCode: 500,
      },
    });
  });
});
