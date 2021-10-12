import { describe, test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';

describe('genDiff', () => {
  test('json', () => {
    const filePath1 = '__fixtures__/file1.json';
    const filePath2 = '__fixtures__/file2.json';
    const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(filePath1, filePath2)).toBe(result);
  });

  test('yaml', () => {
    const filePath1 = '__fixtures__/file1.yml';
    const filePath2 = '__fixtures__/file2.yml';
    const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(filePath1, filePath2)).toBe(result);
  });
});
