import isObject from '../utils/isObject.js';

const addPadding = (string) => {
  const [firstLine, ...otherLines] = string.split('\n');

  return [
    firstLine,
    ...otherLines.map((line) => `    ${line}`),
  ].join('\n');
};

const convertValueToString = (value) => {
  if (isObject(value)) {
    const array = [];

    Object.entries(value).forEach(([key, val]) => {
      array.push(`  ${key}: ${isObject(val) ? convertValueToString(val) : val}`);
    });

    return addPadding(`{\n${array.map((string) => `  ${string}`).join('\n')}\n}`);
  }

  return value;
};

const stylish = (differences) => {
  const array = [];
  differences.forEach(({
    type,
    key,
    value,
    differences: nestedDifferences,
  }) => {
    if (type === 'NESTED') {
      array.push(`  ${key}: ${addPadding(stylish(nestedDifferences))}`);
    } else if (type === 'NOT_CHANGED') {
      array.push(`  ${key}: ${convertValueToString(value)}`);
    } else if (type === 'REMOVED') {
      array.push(`- ${key}: ${convertValueToString(value)}`);
    } else if (type === 'ADDED') {
      array.push(`+ ${key}: ${convertValueToString(value)}`);
    }
  });
  return `{\n${array.map((string) => `  ${string}`).join('\n')}\n}`;
};

export default stylish;
