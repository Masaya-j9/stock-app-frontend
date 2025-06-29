import { render, screen } from "@testing-library/react";
import { DeletedItemList } from "@/app/items/deleted/DeletedItemList";
import type { ItemResponse } from "@/types/items";
import React from "react";
import { describe, expect, it } from 'vitest';

describe("DeletedItemList", () => {
  const baseProps = {
    page: 1,
    setPage: () => {},
  };

  it("アイテムがない場合にメッセージが表示される", () => {
    const items: ItemResponse = { results: [], totalPages: 1, count: 0 };
    render(<DeletedItemList items={items} {...baseProps} />);
    expect(screen.getByText("論理削除済みアイテムはありません。"))
      .toBeInTheDocument();
  });

  it("アイテム名・説明・在庫・カテゴリーが表示される", () => {
    const items: ItemResponse = {
      results: [
        {
          id: 1,
          name: "削除アイテム1",
          quantity: 5,
          description: "説明1",
          itemsCategories: [
            { id: 10, name: "カテゴリA", itemId: 1, description: "", createdAt: "", updatedAt: "" },
            { id: 11, name: "カテゴリB", itemId: 1, description: "", createdAt: "", updatedAt: "" },
          ],
        },
      ],
      totalPages: 1,
      count: 1,
    };
    render(<DeletedItemList items={items} {...baseProps} />);
    expect(screen.getByText("削除アイテム1")).toBeInTheDocument();
    expect(screen.getByText("説明1")).toBeInTheDocument();
    expect(screen.getByText("在庫: 5")).toBeInTheDocument();
    expect(screen.getByText("カテゴリA")).toBeInTheDocument();
    expect(screen.getByText("カテゴリB")).toBeInTheDocument();
  });

  it("カテゴリーがない場合は'カテゴリー: -'が表示される", () => {
    const items: ItemResponse = {
      results: [
        {
          id: 2,
          name: "削除アイテム2",
          quantity: 1,
          description: "説明2",
          itemsCategories: [],
        },
      ],
      totalPages: 1,
      count: 1,
    };
    render(<DeletedItemList items={items} {...baseProps} />);
    expect(screen.getByText("カテゴリー: -")).toBeInTheDocument();
  });
});
