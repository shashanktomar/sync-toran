import fs from 'fs';
import defReader from './defReader';
import defSanitizer from './defSanitizer';
import generator from './generator';

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
  defReader(definationsDir)
    .then(defSanitizer)
    .then(generator)
    .then(syncFunc => writeSyncFunc(syncFunc, outputPath))
    .catch(err => {
      console.log(err);
      process.exit(1);
    });

export default toran;
