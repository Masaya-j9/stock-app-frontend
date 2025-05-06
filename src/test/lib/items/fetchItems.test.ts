import { fetchItems } from "@/lib/items/fetchItems";
import { vi, describe, it, expect } from "vitest";

vi.stubGlobal("fetch", vi.fn());

describe("fetchItems", () => {
  it("正常にデータを取得できる", async () => {
    const mockData = {
      results: [{ id: 1, name: "Item1", quantity: 10 }],
      totalPages: 3,
    };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await fetchItems(1);
    expect(data).toEqual(mockData);
  });

  it("エラーレスポンスで例外が投げられる", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      text: async () => "Server Error",
    });

    await expect(fetchItems(1)).rejects.toThrow(
      "Failed to fetch items: 500 Internal Server Error"
    );
  });

  it("ページ番号が0以下の場合、400エラーが返ってくる", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      text: async () => "Bad Request",
    });

    await expect(fetchItems(0)).rejects.toThrow(
      "ページ番号は1以上でなければなりません"
    );
  });
});
