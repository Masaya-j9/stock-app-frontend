import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DeleteConfirmModal } from "@/components/Modals/DeleteConfirmModal";

// モックコンポーネントを使って ErrorMessage を置き換える
vi.mock("@/components/ErrorMessage", () => ({
  ErrorMessage: ({ message }: { message: string }) => (
    <div>{message}</div>
  ),
}));

describe("DeleteConfirmModal", () => {
  const title = "削除の確認";
  const description = "本当に削除しますか？";
  const errorMessage = "削除に失敗しました";

  it("非表示状態ではモーダルが表示されない", () => {
    render(
      <DeleteConfirmModal
        open={false}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title={title}
        description={description}
      />
    );

    expect(screen.queryByText(title)).toBeNull();
  });

  it("表示状態でタイトル・説明が表示される", () => {
    render(
      <DeleteConfirmModal
        open={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title={title}
        description={description}
      />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("エラーメッセージが表示される", () => {
    render(
      <DeleteConfirmModal
        open={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title={title}
        description={description}
        errorMessage={errorMessage}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("削除ボタン押下時に onConfirm が呼ばれる", () => {
    const onConfirm = vi.fn();

    render(
      <DeleteConfirmModal
        open={true}
        onClose={vi.fn()}
        onConfirm={onConfirm}
        title={title}
        description={description}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "削除" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("キャンセルボタン押下時に onClose が呼ばれる", () => {
    const onClose = vi.fn();

    render(
      <DeleteConfirmModal
        open={true}
        onClose={onClose}
        onConfirm={vi.fn()}
        title={title}
        description={description}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "キャンセル" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
