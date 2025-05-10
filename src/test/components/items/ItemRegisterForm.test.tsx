import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemRegisterForm from '@/components/items/ItemRegisterForm';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import React from 'react';

// fetchCategories をモック
vi.mock('@/lib/category/fetchCategories', () => ({
  fetchCategories: vi.fn().mockResolvedValue({
    categories: [
      { id: 1, name: '文房具' },
      { id: 2, name: '家電' },
    ],
  }),
}));

describe('ItemRegisterForm', () => {
  const defaultProps = {
    mode: 'create' as const,
    onSubmit: vi.fn(),
    onCategoryChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('フォーム初期状態を表示する', async () => {
    render(<ItemRegisterForm {...defaultProps} />);

    expect(screen.getByLabelText(/物品名/i)).toHaveValue('');
    expect(screen.getByLabelText(/数量/i)).toHaveValue(1);
    expect(screen.getByLabelText(/説明/i)).toHaveValue('');

    // fetchCategories のカテゴリ表示待ち
    await waitFor(() => {
      expect(screen.getByLabelText('文房具')).toBeInTheDocument();
      expect(screen.getByLabelText('家電')).toBeInTheDocument();
    });
  });
  it('テキストと数量の入力変更ができる', async () => {
    render(<ItemRegisterForm {...defaultProps} />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/物品名/i), 'ノートパソコン');
    await user.clear(screen.getByLabelText(/数量/i));
    await user.type(screen.getByLabelText(/数量/i), '5');
    await user.type(screen.getByLabelText(/説明/i), '社内用');

    expect(screen.getByLabelText(/物品名/i)).toHaveValue('ノートパソコン');
    expect(screen.getByLabelText(/数量/i)).toHaveValue(5);
    expect(screen.getByLabelText(/説明/i)).toHaveValue('社内用');
  });


  it('カテゴリを選択すると onCategoryChange が呼ばれる', async () => {
    render(<ItemRegisterForm {...defaultProps} />);
    await waitFor(() => expect(screen.getByLabelText('文房具')).toBeInTheDocument());

    fireEvent.click(screen.getByLabelText('文房具'));

    expect(defaultProps.onCategoryChange).toHaveBeenCalledWith([1]);
  });

  it('フォーム送信で onSubmit が呼ばれる', async () => {
    render(<ItemRegisterForm {...defaultProps} />);
    await waitFor(() => expect(screen.getByLabelText('文房具')).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/物品名/i), { target: { value: 'プリンター' } });
    fireEvent.change(screen.getByLabelText(/数量/i), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText(/説明/i), { target: { value: 'オフィス備品' } });
    fireEvent.click(screen.getByLabelText('文房具'));

    fireEvent.click(screen.getByRole('button', { name: /登録/i }));

    await waitFor(() =>
      expect(defaultProps.onSubmit).toHaveBeenCalledWith({
        name: 'プリンター',
        quantity: 3,
        description: 'オフィス備品',
        categoryIds: [1],
      })
    );
  });
});
