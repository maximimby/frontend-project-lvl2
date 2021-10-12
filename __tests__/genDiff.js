import fs from 'fs';
import { describe, test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';

describe('genDiff', () => {
  const resultStylish = fs.readFileSync('__fixtures__/resultStylish.txt', 'utf-8');
  const resultJson = fs.readFileSync('__fixtures__/resultJson.json', 'utf-8');
  const resultPlain = fs.readFileSync('__fixtures__/resultPlain.txt', 'utf-8');

  test('json with stylish output format', () => {
    const filePath1 = '__fixtures__/file1.json';
    const filePath2 = '__fixtures__/file2.json';

    expect(genDiff(filePath1, filePath2)).toBe(resultStylish);
  });

  test('yaml with stylish output format', () => {
    const filePath1 = '__fixtures__/file1.yml';
    const filePath2 = '__fixtures__/file2.yml';

    expect(genDiff(filePath1, filePath2)).toBe(resultStylish);
  });

  test('json with json output format', () => {
    const filePath1 = '__fixtures__/file1.json';
    const filePath2 = '__fixtures__/file2.json';

    expect(genDiff(filePath1, filePath2, 'json')).toBe(resultJson);
  });

  test('yaml with json output format', () => {
    const filePath1 = '__fixtures__/file1.yml';
    const filePath2 = '__fixtures__/file2.yml';

    expect(genDiff(filePath1, filePath2, 'json')).toBe(resultJson);
  });

  test('json with plain output format', () => {
    const filePath1 = '__fixtures__/file1.json';
    const filePath2 = '__fixtures__/file2.json';

    expect(genDiff(filePath1, filePath2, 'plain')).toBe(resultPlain);
  });

  test('yaml with plain output format', () => {
    const filePath1 = '__fixtures__/file1.yml';
    const filePath2 = '__fixtures__/file2.yml';

    expect(genDiff(filePath1, filePath2, 'plain')).toBe(resultPlain);
  });
});
