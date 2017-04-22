// @flow
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const defFiles = (dir: string) =>
  new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });

const readYamlDefinations = (dir: string, files: Array<string>) =>
  new Promise((resolve, reject) => {
    try {
      const definations = _(files)
        .map(file => {
          const filePath = path.join(dir, file);
          const def = yaml.safeLoad(fs.readFileSync(filePath));
          return {
            type: _.replace(file, '.yaml', ''),
            defination: def
          };
        })
        .keyBy('type')
        .value();
      resolve(definations);
    } catch (err) {
      reject(err);
    }
  });

export default function (dir: string) {
  return defFiles(dir).then(files => readYamlDefinations(dir, files));
}
