const stylish = (differences) => {
  const array = [];
  differences.forEach(({ type, key, value }) => {
    if (type === 'NOT_CHANGED') {
      array.push(`  ${key}: ${value}`);
    } else if (type === 'REMOVED') {
      array.push(`- ${key}: ${value}`);
    } else if (type === 'ADDED') {
      array.push(`+ ${key}: ${value}`);
    }
  });
  return `{\n${array.map((string) => `  ${string}`).join('\n')}\n}`;
};

export default stylish;
