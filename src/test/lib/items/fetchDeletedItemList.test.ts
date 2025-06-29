/// <reference types="vitest" />
import { fetchDeletedItemList } from "@/lib/items/fetchDeletedItemList";
import { vi, beforeEach, describe, it, expect } from "vitest";

// fetchのグローバルモック
beforeEach(() => {
  vi.resetAllMocks();
});

describe("fetchDeletedItemList", () => {
  it("正常にデータを取得できる", async () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          name: "削除アイテム1",
          quantity: 5,
          description: "説明1",
          itemsCategories: [],
        },
      ],
      totalPages: 2,
      count: 1,
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      )
    );
    const res = await fetchDeletedItemList(1);
    expect(res).toEqual(mockResponse);
  });

  it("APIエラー時は例外を投げる", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ message: "エラー" }),
        })
      )
    );
    await expect(fetchDeletedItemList(1)).rejects.toThrow("エラー");
  });
});
