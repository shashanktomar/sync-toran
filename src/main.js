import minimist from 'minimist';
import fs from 'fs';
import prettier from 'prettier';
import parseDefs from './defParser';
import parseTemplate from './templateParser';
import prettierConfig from './config/prettier.json';

import type { Definations } from './types';

const args = minimist(process.argv.slice(2));

function writeSyncFunc(syncFunc: string) {
  return new Promise((resolve, reject) => {
    try {
      const prettySyncFunc = prettier.format(syncFunc, prettierConfig);
      fs.writeFileSync(args.o, prettySyncFunc);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

parseDefs(args.i)
  .then((defs: Definations) => parseTemplate(defs))
  .then(syncFunc => writeSyncFunc(syncFunc))
  .catch(err => {
    console.log(err);
    process.exit(err);
  });
