// @flow
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { defaultTypeFilterName } from './gatekeepers/typegateway';
import type { Defination, TypeFilterName, Auth, DefinationsParser } from './types';

type InitialDefination = {
  name: string,
  typeFilter: ?TypeFilterName,
  auth: ?Auth
};
type DefinationValidator = (def: InitialDefination) => InitialDefination;
type ParserChain = (parsers: Array<DefinationValidator>) => (def: InitialDefination) => Defination;
const parserChain: ParserChain = parsers => _.flow(parsers);

const typeFilterValidator: DefinationValidator = def => ({
  typeFilter: def.typeFilter ? def.typeFilter : defaultTypeFilterName,
  ...def
});
// Add types should be unique validator
const defValidators = parserChain([typeFilterValidator]);

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
          const def = yaml.safeLoad(fs.readFileSync(filePath));
          def.name = _.replace(file, '.yaml', '');
          return defValidators(def);
        })
        .keyBy('name')
        .value();
      resolve(definations);
    } catch (err) {
      reject(err);
    }
  });

const defParser: DefinationsParser = dir =>
  fetchDefFiles(dir).then(files => readYamlDefinations(dir, files));

export default defParser;
