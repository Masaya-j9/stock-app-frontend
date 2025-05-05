import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ItemsPageClient from "@/app/items/ItemsPageClient";

// MUI ThemeProvider（必要であれば）
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

// useRouter, useSearchParams をテストファイル内でモック
const pushMock = vi.fn();

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: () => ({ push: pushMock }),
    useSearchParams: () => new URLSearchParams("page=1"),
  };
});

// Provider付きのラップ関数（MUIなどのThemeContext用）
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("ItemsPageClient", () => {
  // モックデータ
  const itemsCategories = [
    { id: 1, name: "Category 1", itemId: 1, description: "Description 1" },
    { id: 2, name: "Category 2", itemId: 1, description: "Description 2" },
  ];
  const mockItems = [
    { id: 1, name: "Item 1", quantity: 10, description: "Description 1"},
    { id: 2, name: "Item 2", quantity: 5, description: "Description 2"},
  ];

  beforeEach(() => {
    pushMock.mockClear();
  });

  it("初期描画時に ItemList が表示される", () => {
    renderWithProviders(
      <ItemsPageClient
        initialItems={mockItems}
        initialCurrentPage={1}
        initialTotalPages={2}
      />
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("totalPages が 1 以下なら Pagination は表示されない", () => {
    renderWithProviders(
      <ItemsPageClient
        initialItems={mockItems}
        initialCurrentPage={1}
        initialTotalPages={1}
      />
    );
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("ページ切り替え時に router.push が呼ばれる", () => {
    renderWithProviders(
      <ItemsPageClient
        initialItems={mockItems}
        initialCurrentPage={1}
        initialTotalPages={3}
      />
    );

    // 「2」ページボタンのクリック（Paginationの構造により要調整）
    const page2Button = screen.getByRole("button", { name: "Go to page 2" });
    fireEvent.click(page2Button);

    expect(pushMock).toHaveBeenCalledWith("/items?page=2");
  });
});
