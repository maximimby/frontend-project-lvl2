import fs from 'fs';
import path from 'path';
import getDifferences from './getDifferences.js';
import formatters from './formatters/index.js';
import parsers from './parsers/index.js';

const extensionsMap = {
  json: ['json'],
  yaml: ['yaml', 'yml'],
};

const getFormatFromExtension = (extension) => Object.keys(extensionsMap)
  .find((key) => extensionsMap[key].includes(extension));

export default (filePath1, filePath2, outputFormat = 'stylish') => {
  const fileContent1 = fs.readFileSync(path.resolve(filePath1), 'utf-8');
  const fileContent2 = fs.readFileSync(path.resolve(filePath2), 'utf-8');

  const filesExtension = path.extname(filePath1).slice(1);
  const inputFormat = getFormatFromExtension(filesExtension);
  const inputFormatter = parsers[inputFormat];

  const object1 = inputFormatter(fileContent1);
  const object2 = inputFormatter(fileContent2);

  const differences = getDifferences(object1, object2);
  const outputFormatter = formatters[outputFormat];

  return outputFormatter(differences);
};
