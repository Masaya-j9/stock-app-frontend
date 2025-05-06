import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchItemById } from "@/lib/items/fetchItem";  // もし `fetchItemById` がこのパスにあれば
import { Items as Item } from "@/types/items";  // もしアイテム型がこのパスにあれば

describe("fetchItemById", () => {
  const mockItem: Item = {
    id: 1,
    name: "Mock Item",
    description: "Mock description",
    quantity: 5,
    itemsCategories: [
      { id: 1, name: "Category A", description: "Category A description", itemId: 0, createdAt: "", updatedAt: "" },
      { id: 2, name: "Category B", description: "Category B description", itemId: 0, createdAt: "", updatedAt: "" },
    ],
  };

  beforeEach(() => {
    vi.restoreAllMocks(); // 各テストの前にモックをリセット
  });

  it("should return item when fetch is successful", async () => {
    // fetchをモックする
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockItem,
    }));

    const result = await fetchItemById("1");
    expect(result).toEqual(mockItem);  // 結果が期待したアイテムと一致するか確認
  });

  it("should return null when item is not found (404)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    }));

    const result = await fetchItemById("999");
    expect(result).toBeNull();  // アイテムが見つからない場合はnullを返す
  });

  it("should throw error when response is not ok (e.g. 500)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    }));

    await expect(fetchItemById("500")).rejects.toThrow("Could not fetch item data.");  // サーバーエラー時にエラーをスローする
  });

  it("should throw error when fetch throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

    await expect(fetchItemById("1")).rejects.toThrow("Could not fetch item data.");  // ネットワークエラー時にエラーをスローする
  });
});
