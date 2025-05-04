import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

// import対象を調整（default exportは関数としてimport）
import ItemsPage from "@/app/items/page";

// fetchをモック
global.fetch = vi.fn();

describe("ItemsPage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("正常にアイテム一覧を表示する", async () => {
    const mockData = {
      results: [
        {
          id: "1",
          name: "アイテムA",
          quantity: 10,
          description: "説明A",
          itemsCategories: [{ id: "1", name: "カテゴリ1" }],
        },
      ],
    };

    // fetchモックの定義
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const Component = await ItemsPage(); // async component を呼び出す
    render(Component);

    expect(await screen.findByText("アイテムA")).toBeInTheDocument();
    expect(screen.getByText("在庫: 10")).toBeInTheDocument();
    expect(screen.getByText("カテゴリ1")).toBeInTheDocument();
  });

  it("API失敗時にエラーメッセージを表示する", async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      text: async () => "サーバーエラー",
      headers: new Headers(),
    });

    const Component = await ItemsPage();
    render(Component);

    expect(await screen.findByText("データの取得に失敗しました")).toBeInTheDocument();
  });
});