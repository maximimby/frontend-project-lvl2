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

const plain = (differences, prefix = []) => differences
  .reduce((acc, value, index) => {
    const lastIndex = acc.length - 1;
    const previousNewValue = acc[lastIndex];

    if (previousNewValue?.type === 'UPDATED' && !previousNewValue?.previous) {
      return acc.map((item, i) => {
        if (i === lastIndex) {
          return {
            ...item,
            previous: true,
          };
        }

        return item;
      });
    }

    const nextValue = differences[index + 1];

    if (value.type === 'REMOVED' && nextValue?.type === 'ADDED' && nextValue?.key === value.key) {
      return [
        ...acc,
        {
          type: 'UPDATED',
          key: value.key,
          value1: value.value,
          value2: nextValue.value,
        },
      ];
    }

    return [...acc, value];
  }, [])
  .reduce((acc, {
    type,
    key,
    value,
    value1,
    value2,
    differences: nestedDifferences,
  }) => {
    if (type === 'NESTED') {
      return [...acc, plain(nestedDifferences, [...prefix, key])];
    }
    if (type === 'UPDATED') {
      return [
        ...acc,
        `Property '${convertKey(key, prefix)}' was updated. From ${convertValue(value1)} to ${convertValue(value2)}`,
      ];
    }
    if (type === 'REMOVED') {
      return [...acc, `Property '${convertKey(key, prefix)}' was removed`];
    }
    if (type === 'ADDED') {
      return [...acc, `Property '${convertKey(key, prefix)}' was added with value: ${convertValue(value)}`];
    }

    return acc;
  }, [])
  .join('\n');

export default plain;
