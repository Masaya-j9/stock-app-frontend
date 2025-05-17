import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { ErrorMessage } from '@/components/ErrorMessage'; // 相対パス調整
import { ErrorType } from '@/types/errors';

afterEach(cleanup);

describe('ErrorMessage', () => {
  it('カスタムメッセージが表示される', () => {
    render(<ErrorMessage type="network" message="カスタムエラー" />);
    expect(screen.getByText('カスタムエラー')).toBeInTheDocument();
  });

  it('デフォルトメッセージが type に応じて表示される', () => {
    const messages: Record<ErrorType, string> = {
      network: 'ネットワーク接続に失敗しました。',
      validation: '入力内容に誤りがあります。',
      conflict: '既に存在するデータがあります。',
      auth: '認証に失敗しました。ログインしてください。',
      unknown: '予期しないエラーが発生しました。',
      notFoundItem: 'アイテムが見つかりません。',
      create: 'アイテムの登録に失敗しました。',
      update: 'アイテムの更新に失敗しました。',
      delete: 'アイテムの削除に失敗しました。',
    };

    for (const [type, text] of Object.entries(messages)) {
      render(<ErrorMessage type={type as ErrorType} />);
      expect(screen.getByText(text)).toBeInTheDocument();
      cleanup();
    }
  });

  it('typeもmessageもない場合、unknown メッセージが表示される', () => {
    render(<ErrorMessage />);
    expect(screen.getByText('予期しないエラーが発生しました。')).toBeInTheDocument();
  });

  it('タイトルとして「エラーが発生しました」が常に表示される', () => {
    render(<ErrorMessage />);
    expect(screen.getByText('エラーが発生しました')).toBeInTheDocument();
  });
});