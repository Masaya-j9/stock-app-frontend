import { describe, it, expect } from 'vitest';
import { extractItemPayload } from '@/utils/payloads/payloadRequestItem';

describe('extractItemPayload', () => {
  it('正常なFormDataを処理できる', () => {
    const formData = new FormData();
    formData.append('name', 'Test Item');
    formData.append('quantity', '5');
    formData.append('description', 'A test item');
    formData.append('categoryIds', '1');
    formData.append('categoryIds', '2');

    const result = extractItemPayload(formData);

    expect(result).toEqual({
      name: 'Test Item',
      quantity: 5,
      description: 'A test item',
      categoryIds: [1, 2],
    });
  });

  it('quantityが不正な場合は1にフォールバックされる', () => {
    const formData = new FormData();
    formData.append('quantity', 'abc');

    const result = extractItemPayload(formData);
    expect(result.quantity).toBeNaN(); // 'abc' → NaN
  });

  it('categoryIdsに文字列や不正な値が含まれている場合は除外される', () => {
    const formData = new FormData();
    formData.append('categoryIds', '1');
    formData.append('categoryIds', 'abc'); // 数値でない
    formData.append('categoryIds', '3');
    formData.append('categoryIds', '4.5'); // 整数でない
    formData.append('categoryIds', '2');

    const result = extractItemPayload(formData);

    expect(result.categoryIds).toEqual([1, 3, 2]); // 'abc' と '4.5' は除外される
  });

  it('存在しないフィールドはデフォルト値になる', () => {
    const formData = new FormData();
    const result = extractItemPayload(formData);

    expect(result).toEqual({
      name: '',
      quantity: 1,
      description: '',
      categoryIds: [],
    });
  });
});
