import fs from 'fs';
import synctoran from '../lib'; //eslint-disable-line

const examplesDir = './examples';

fs.readdir(examplesDir, (err, examples) => {
  console.log('\n========Building examples========\n');
  examples.forEach(example => {
    console.log(`Generating sync function for ${example}-example`);
    const inputDir = `./examples/${example}/definations`;
    const outputFile = `examples/${example}/sync-func.js`;
    console.log(inputDir);
    synctoran(inputDir, outputFile);
  });
});
