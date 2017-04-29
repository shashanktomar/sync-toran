import fs from 'fs';
import parseDefs from './defParser';
import generator from './generator';

import type { Definations } from './types';

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

const toran = (definationsDir, outputPath) =>
  parseDefs(definationsDir)
    .then((defs: Definations) => generator(defs))
    .then(syncFunc => writeSyncFunc(syncFunc, outputPath))
    .catch(err => {
      console.log(err);
      process.exit(1);
    });

export default toran;
