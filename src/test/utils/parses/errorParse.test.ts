// tests/utils/parseApiError.test.ts
import { describe, it, expect } from 'vitest';
import { parseApiError } from '@/utils/parses/errorParse';

describe('parseApiError', () => {
  it('最後の行からパースされたJSONを返す', () => {
    const message = `Some error occurred\n{"statusCode":400,"message":"Validation failed"}`;
    const result = parseApiError(message);
    expect(result).toEqual({ statusCode: 400, message: "Validation failed" });
  });

  it('メッセージが未定義の場合はNULLを返す', () => {
    const result = parseApiError(undefined);
    expect(result).toBeNull();
  });

  it('最後の行が有効なJSONでない場合はNULLを返すこと', () => {
    const message = `Error happened\nnot a json`;
    const result = parseApiError(message);
    expect(result).toBeNull();
  });

  it('入力が空文字列の場合はNULLを返す', () => {
    const result = parseApiError('');
    expect(result).toBeNull();
  });

  it('メッセージに有効なJSON行が1行しか含まれていない場合、パースされたJSONを返す', () => {
    const message = `{"statusCode":500,"message":"Internal error"}`;
    const result = parseApiError(message);
    expect(result).toEqual({ statusCode: 500, message: "Internal error" });
  });
});