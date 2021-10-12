import { describe, test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';

describe('genDiff', () => {
  const result = `{
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

  test('json', () => {
    const filePath1 = '__fixtures__/file1.json';
    const filePath2 = '__fixtures__/file2.json';

    expect(genDiff(filePath1, filePath2)).toBe(result);
  });

  test('yaml', () => {
    const filePath1 = '__fixtures__/file1.yml';
    const filePath2 = '__fixtures__/file2.yml';

    expect(genDiff(filePath1, filePath2)).toBe(result);
  });
});
