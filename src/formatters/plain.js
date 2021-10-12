import isObject from '../utils/isObject.js';

const convertValue = (value) => {
  if (isObject(value)) {
    return '[comlex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const convertKey = (key, prefix) => [...prefix, key].join('.');

const plain = (differences, prefix = []) => {
  const array = [];

  differences.forEach(({
    type,
    key,
    value,
    differences: nestedDifferences,
  }, index) => {
    if (type === 'NESTED') {
      array.push(plain(nestedDifferences, [...prefix, key]));
    } else if (type === 'REMOVED' && differences[index + 1]?.type === 'ADDED' && differences[index + 1]?.key === key) {
      array.push(`Property '${convertKey(key, prefix)}' was updated. From ${convertValue(value)} to ${convertValue(differences[index + 1].value)}`);
    } else if (type === 'REMOVED') {
      array.push(`Property '${convertKey(key, prefix)}' was removed`);
    } else if (type === 'ADDED') {
      array.push(`Property '${convertKey(key, prefix)}' was added with value: ${convertValue(value)}`);
    }
  });

  return array.join('\n');
};

export default plain;
