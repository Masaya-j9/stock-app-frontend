import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryRegisterForm from '@/components/categories/CategoryRegisterForm';

describe('CategoryRegisterForm', () => {
  const setup = (props = {}) => {
    const onSubmit = vi.fn();
    render(<CategoryRegisterForm onSubmit={onSubmit} mode="create" {...props} />);
    return { onSubmit };
  };

  it('初期レンダリングでフォームの値が空または指定値であること', () => {
    setup({ initialValues: { name: 'テストカテゴリ', description: '説明文' } });

    expect(screen.getByLabelText(/カテゴリ名/i)).toHaveValue('テストカテゴリ');
    expect(screen.getByLabelText(/説明/i)).toHaveValue('説明文');
  });

  it('名前が空のまま送信するとエラーメッセージが表示される', async () => {
    const { onSubmit } = setup();

    const submitButton = screen.getByRole('button', { name: /登録/i });
    await userEvent.click(submitButton);

    expect(screen.getByText(/カテゴリ名は必須です/i)).toBeDefined();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('正しい入力で送信するとonSubmitが呼ばれる', async () => {
    const { onSubmit } = setup();

    const nameInput = screen.getByLabelText(/カテゴリ名/i);
    const descriptionInput = screen.getByLabelText(/説明/i);
    const submitButton = screen.getByRole('button', { name: /登録/i });

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, '新しいカテゴリ');
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'カテゴリの説明です');
    await userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      name: '新しいカテゴリ',
      description: 'カテゴリの説明です',
    });
  });
});
