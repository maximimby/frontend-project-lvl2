import isObject from '../utils/isObject.js';

const addPadding = (string) => {
  const stringSplit = string.split('\n');
  const firstLine = stringSplit[0];
  const otherLines = stringSplit.slice(1);

  return [
    firstLine,
    ...otherLines.map((line) => `    ${line}`),
  ].join('\n');
};

const convertValueToString = (value) => {
  if (isObject(value)) {
    const array = Object.entries(value).reduce((acc, [key, val]) => [
      ...acc,
      `  ${key}: ${isObject(val) ? convertValueToString(val) : val}`,
    ], []);

    return addPadding(`{\n${array.map((string) => `  ${string}`).join('\n')}\n}`);
  }

  return value;
};

const stylish = (differences) => {
  const array = differences.reduce((acc, {
    type,
    key,
    value,
    differences: nestedDifferences,
  }) => {
    if (type === 'NESTED') {
      return [...acc, `  ${key}: ${addPadding(stylish(nestedDifferences))}`];
    }
    if (type === 'NOT_CHANGED') {
      return [...acc, `  ${key}: ${convertValueToString(value)}`];
    }
    if (type === 'REMOVED') {
      return [...acc, `- ${key}: ${convertValueToString(value)}`];
    }
    if (type === 'ADDED') {
      return [...acc, `+ ${key}: ${convertValueToString(value)}`];
    }

    return acc;
  }, []);
  return `{\n${array.map((string) => `  ${string}`).join('\n')}\n}`;
};

export default stylish;
