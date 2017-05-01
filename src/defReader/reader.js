// @flow
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import type { Reader } from './types';

const fetchDefFiles = (dir: string) =>
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
          const def = yaml.safeLoad(fs.readFileSync(filePath)) || {};
          def.name = _.replace(file, '.yaml', '');
          return def;
        })
        .keyBy('name')
        .value();
      resolve(definations);
    } catch (err) {
      reject(err);
    }
  });

const defParser: Reader = dir => fetchDefFiles(dir).then(files => readYamlDefinations(dir, files));

export default defParser;
