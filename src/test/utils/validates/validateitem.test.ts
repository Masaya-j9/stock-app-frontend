import { describe, it, expect } from 'vitest';
import { validateRegisterItemData } from '@/utils/validates/validateItem';

const ITEM_NAME_MAX_LENGTH = 255;
const ITEM_QUANTITY_MAX_VALUE = 1000;
const DESCRIPTION_MAX_LENGTH = 255;

describe('validateRegisterItemData', () => {
  it('正常なデータでバリデーションを通過する', () => {
    const validData = {
      name: 'テストアイテム',
      quantity: 10,
      description: 'これはテスト用アイテムです',
      categoryIds: [1, 2],
    };

    const result = validateRegisterItemData(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it('nameが空文字だとエラー', () => {
    const invalidData = {
      name: '',
      quantity: 10,
      description: '説明あり',
      categoryIds: [1],
    };

    const result = validateRegisterItemData(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors?.name).toBeDefined();
    }
  });

  it(`nameが${ITEM_NAME_MAX_LENGTH + 1}文字以上だとエラー`, () => {
    const longName = 'a'.repeat(ITEM_NAME_MAX_LENGTH + 1);
    const invalidData = {
      name: longName,
      quantity: 10,
      description: '説明あり',
      categoryIds: [1],
    };

    const result = validateRegisterItemData(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors?.name).toBeDefined();
    }
  });

  it('quantityが0以下だとエラー', () => {
    const invalidData = {
      name: '有効な名前',
      quantity: 0,
      description: '説明あり',
      categoryIds: [1],
    };

    const result = validateRegisterItemData(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors?.quantity).toBeDefined();
    }
  });

  it(`quantityが${ITEM_QUANTITY_MAX_VALUE + 1}以上だとエラー`, () => {
    const invalidData = {
      name: '有効な名前',
      quantity: ITEM_QUANTITY_MAX_VALUE + 1,
      description: '説明あり',
      categoryIds: [1],
    };

    const result = validateRegisterItemData(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors?.quantity).toBeDefined();
    }
  });

  it('descriptionが空文字だとエラー', () => {
    const invalidData = {
      name: '有効な名前',
      quantity: 5,
      description: '',
      categoryIds: [1],
    };

    const result = validateRegisterItemData(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors?.description).toBeDefined();
    }
  });

  it(`descriptionが${DESCRIPTION_MAX_LENGTH + 1}文字以上だとエラー`, () => {
    const longDescription = 'あ'.repeat(DESCRIPTION_MAX_LENGTH + 1);
    const invalidData = {
      name: '有効な名前',
      quantity: 5,
      description: longDescription,
      categoryIds: [1],
    };

    const result = validateRegisterItemData(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors?.description).toBeDefined();
    }
  });

  it('categoryIdsが空だとエラー', () => {
    const invalidData = {
      name: '有効な名前',
      quantity: 5,
      description: '説明あり',
      categoryIds: [],
    };

    const result = validateRegisterItemData(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors?.categoryIds).toBeDefined();
    }
  });
});
