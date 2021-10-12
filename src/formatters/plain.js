import isObject from '../utils/isObject.js';

const convertValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const convertKey = (key, prefix) => [...prefix, key].join('.');

const plain = (differences, prefix = []) => {
  const array = [];

  const convertedDifferences = [];

  for (let i = 0; i < differences.length; i += 1) {
    const diff = differences[i];
    const index = i;
    if (diff.type === 'REMOVED' && differences[index + 1]?.type === 'ADDED' && differences[index + 1]?.key === diff.key) {
      convertedDifferences.push({
        type: 'UPDATED',
        key: diff.key,
        value1: diff.value,
        value2: differences[index + 1].value,
      });
      i += 1;
    } else {
      convertedDifferences.push(diff);
    }
  }

  convertedDifferences.forEach(({
    type,
    key,
    value,
    value1,
    value2,
    differences: nestedDifferences,
  }) => {
    if (type === 'NESTED') {
      array.push(plain(nestedDifferences, [...prefix, key]));
    } else if (type === 'UPDATED') {
      array.push(`Property '${convertKey(key, prefix)}' was updated. From ${convertValue(value1)} to ${convertValue(value2)}`);
    } else if (type === 'REMOVED') {
      array.push(`Property '${convertKey(key, prefix)}' was removed`);
    } else if (type === 'ADDED') {
      array.push(`Property '${convertKey(key, prefix)}' was added with value: ${convertValue(value)}`);
    }
  });

  return array.join('\n');
};

export default plain;
