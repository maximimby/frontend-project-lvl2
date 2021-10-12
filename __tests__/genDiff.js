import { describe, test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';

describe('genDiff', () => {
  const resultStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  const resultJson = '[{"type":"NESTED","key":"common","differences":[{"type":"ADDED","key":"follow","value":false},{"type":"NOT_CHANGED","key":"setting1","value":"Value 1"},{"type":"REMOVED","key":"setting2","value":200},{"type":"REMOVED","key":"setting3","value":true},{"type":"ADDED","key":"setting3","value":null},{"type":"ADDED","key":"setting4","value":"blah blah"},{"type":"ADDED","key":"setting5","value":{"key5":"value5"}},{"type":"NESTED","key":"setting6","differences":[{"type":"NESTED","key":"doge","differences":[{"type":"REMOVED","key":"wow","value":""},{"type":"ADDED","key":"wow","value":"so much"}]},{"type":"NOT_CHANGED","key":"key","value":"value"},{"type":"ADDED","key":"ops","value":"vops"}]}]},{"type":"NESTED","key":"group1","differences":[{"type":"REMOVED","key":"baz","value":"bas"},{"type":"ADDED","key":"baz","value":"bars"},{"type":"NOT_CHANGED","key":"foo","value":"bar"},{"type":"REMOVED","key":"nest","value":{"key":"value"}},{"type":"ADDED","key":"nest","value":"str"}]},{"type":"REMOVED","key":"group2","value":{"abc":12345,"deep":{"id":45}}},{"type":"ADDED","key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

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
});
