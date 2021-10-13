import isObject from './utils/isObject.js';

const bubbleSortPart = (array, rightIndex, callback) => {
  const iter = (index, acc, sorted) => {
    if (index > rightIndex) {
      return [acc, sorted];
    }

    const nextIndex = index + 1;

    const currentElement = acc[index];
    const previousElement = acc[index - 1];

    if (callback(previousElement, currentElement) > 0) {
      const newAcc = acc.map((item, i) => {
        if (i === index) {
          return previousElement;
        }

        if (i === index - 1) {
          return currentElement;
        }

        return item;
      });

      return iter(nextIndex, newAcc, false);
    }

    return iter(nextIndex, acc);
  };

  return iter(1, array, true);
};

const bubbleSort = (array, callback) => {
  const iter = (acc, sorted, rightIndex) => {
    const [newAcc, newSorted] = bubbleSortPart(acc, rightIndex, callback);
    const newRightIndex = rightIndex - 1;

    if (newSorted) {
      return newAcc;
    }

    return iter(newAcc, newSorted, newRightIndex);
  };

  return iter(array, false, array.length - 1);
};

const getDifferences = (object1, object2) => {
  const keys = Array.from(
    new Set([...Object.keys(object1), ...Object.keys(object2)]),
  );

  const sortedKeys = bubbleSort(keys, (a, b) => a > b);

  const differences = sortedKeys.reduce((acc, key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (isObject(value1) && isObject(value2)) {
      return [...acc, {
        type: 'NESTED',
        key,
        differences: getDifferences(value1, value2),
      }];
    }

    if (value1 === value2) {
      return [...acc, {
        type: 'NOT_CHANGED',
        key,
        value: value1,
      }];
    }

    const addition1 = (() => {
      if (value1 !== undefined) {
        return [{
          type: 'REMOVED',
          key,
          value: value1,
        }];
      }

      return [];
    })();

    const addition2 = (() => {
      if (value2 !== undefined) {
        return [{
          type: 'ADDED',
          key,
          value: value2,
        }];
      }

      return [];
    })();

    const commonAddition = [...addition1, ...addition2];

    return [...acc, ...commonAddition];
  }, []);

  return differences;
};

export default getDifferences;
