export default (object1, object2) => {
  const differences = [];

  const keys = Array.from(
    new Set([...Object.keys(object1), ...Object.keys(object2)])
  ).sort();

  keys.forEach((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (value1 === value2) {
      differences.push({
        type: 'NOT_CHANGED',
        key,
        value: value1
      });
      return;
    }

    if (value1 !== undefined) {
      differences.push({
        type: 'REMOVED',
        key,
        value: value1
      });
    }

    if (value2 !== undefined) {
      differences.push({
        type: 'ADDED',
        key,
        value: value2
      });
    }
  });

  return differences;
};
