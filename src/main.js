import minimist from 'minimist';
import fs from 'fs';
import parseDefs from './defParser';
import generator from './generator';

import type { Definations } from './types';

const args = minimist(process.argv.slice(2));

function writeSyncFunc(syncFunc: string, file: string) {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(file, syncFunc);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
const inputDir = args.i;
const outputFile = args.o;

parseDefs(inputDir)
  .then((defs: Definations) => generator(defs))
  .then(syncFunc => writeSyncFunc(syncFunc, outputFile))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

export default parseDefs;
