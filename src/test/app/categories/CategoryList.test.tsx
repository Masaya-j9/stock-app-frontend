import { render, screen } from "@testing-library/react";
import CategoryList from "@/app/categories/CategoryList";
import { Category } from "@/types/categories";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("next/link", async () => {
  const React = await import("react");
  const Link = React.forwardRef<HTMLAnchorElement, any>(({ href, ...props }, ref) => (
    <a ref={ref} href={href} {...props} />
  ));
  Link.displayName = 'Link';

  return {
    default: Link,
  };
});

const mockCategories: Category[] = [
  {
    id: 1,
    name: "文房具",
    description: "ペンやノートなど",
    createdAt: new Date().toISOString(),
    updatedAt: new Date("2024-01-01").toISOString(),
  },
  {
    id: 2,
    name: "家具",
    description: "机や椅子など",
    createdAt: new Date().toISOString(),
    updatedAt: new Date("2024-01-02").toISOString(),
  },
];

describe("CategoryList", () => {
  it("カテゴリがない場合はメッセージを表示する", () => {
    render(<CategoryList categories={[]} />);
    expect(screen.getByText("カテゴリがありません")).toBeInTheDocument();
  });

  it("カテゴリ一覧を表示する", () => {
    render(<CategoryList categories={mockCategories} />);
    expect(screen.getByText("文房具")).toBeInTheDocument();
    expect(screen.getByText("家具")).toBeInTheDocument();
    expect(screen.getByText("ペンやノートなど")).toBeInTheDocument();
    expect(screen.getByText("机や椅子など")).toBeInTheDocument();
  });

  it("カテゴリへのリンクが正しい", () => {
    render(<CategoryList categories={mockCategories} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/categories/1");
    expect(links[1]).toHaveAttribute("href", "/categories/2");
  });
});
