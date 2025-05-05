import React from "react";
import { describe, it, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomPagination from "@/components/Pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe("CustomPagination", () => {
  it("正しいページ数と現在のページが反映されている", () => {
    renderWithTheme(
      <CustomPagination currentPage={2} totalPages={5} onPageChange={() => {}} />
    );
    // 現在のページが選択されていることを確認
    const page2Button = screen.getByRole("button", { name: "page 2" });
    expect(page2Button).toHaveAttribute("aria-current", "true");

    // 総ページ数のボタンが表示されている
    expect(screen.getByRole("button", { name: "Go to page 5" })).toBeInTheDocument();
  });

  it("ページ変更時に onPageChange が呼ばれる", () => {
    const onPageChangeMock = vi.fn();

    renderWithTheme(
      <CustomPagination currentPage={1} totalPages={3} onPageChange={onPageChangeMock} />
    );

    const page2Button = screen.getByRole("button", { name: "Go to page 2" });
    fireEvent.click(page2Button);

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });
});
