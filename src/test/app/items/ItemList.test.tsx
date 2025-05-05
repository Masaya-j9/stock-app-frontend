// tests/components/ItemList.test.tsx
import { render, screen } from '@testing-library/react';
import ItemList from '@/app/items/ItemList';
import { Items } from '@/types/items';
import { describe, expect, it } from 'vitest';

describe('ItemList', () => {
  const mockItems: Items[] = [
    {
      id: 1,
      name: 'アイテム1',
      quantity: 10,
      description: 'アイテム1の説明',
      itemsCategories: [{
        id: 1, name: 'カテゴリー1', description: 'カテゴリー1の説明',
        itemId: 0,
        createdAt: '',
        updatedAt: ''
      }]
    },
    {
      id: 2,
      name: 'アイテム2',
      quantity: 5,
      description: 'アイテム2の説明',
      itemsCategories: [{
        id: 2, name: 'カテゴリー2',
        itemId: 0,
        description: '',
        createdAt: '',
        updatedAt: ''
      }]
    }
  ];

  it('アイテムがある場合、正しい内容が表示される', () => {
    render(<ItemList items={mockItems} />);

    // アイテム名が表示されているか確認
    expect(screen.getByText('アイテム1')).toBeInTheDocument();
    expect(screen.getByText('アイテム2')).toBeInTheDocument();

    // 在庫情報が表示されているか確認
    expect(screen.getByText('在庫: 10')).toBeInTheDocument();
    expect(screen.getByText('在庫: 5')).toBeInTheDocument();

    // カテゴリが表示されているか確認
    expect(screen.getByText('カテゴリー1')).toBeInTheDocument();
    expect(screen.getByText('カテゴリー2')).toBeInTheDocument();
  });

  it('アイテムがない場合、"アイテムがありません" メッセージが表示される', () => {
    render(<ItemList items={[]} />);

    // アイテムがない場合、メッセージが表示されるか確認
    expect(screen.getByText('アイテムがありません')).toBeInTheDocument();
  });
});
