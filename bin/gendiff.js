#! /usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/genDiff.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filePath1, filePath2, { format }) => {
    console.log(genDiff(filePath1, filePath2, format));
  });

program.parse();
