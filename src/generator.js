// @flow

import browserify from 'browserify';
import path from 'path';
import replace from 'stream-replace';
import fileReplace from 'replace-in-file';
import type { SyncFunctionGenerator } from './types';

const syncFuncFilePath = path.join(__dirname, './syncFunction.js');
const options = {
  builtins: false,
  commondir: false,
  insertGlobalVars: ['__filename', '__dirname']
};

function stringify(obj) {
  return JSON.stringify(
    obj,
    (key, value) => (typeof value === 'function' ? value.toString() : value),
    2
  );
}

function replaceInFile(defs) {
  try {
    fileReplace.sync({
      files: syncFuncFilePath,
      from: /var defs = undefined/g,
      to: `var defs = ${stringify(defs)}`
    });
  } catch (error) {
    console.error('File replace error:', error);
  }
}

const generator: SyncFunctionGenerator = defs =>
  new Promise((resolve, reject) => {
    replaceInFile(defs);
    let syncFuncString = 'function(doc, oldDoc){\n\n';
    browserify(syncFuncFilePath, options)
      .transform('babelify')
      .exclude('underscore')
      .bundle()
      .pipe(replace(/var _underscore.*/g, ''))
      .pipe(replace(/_underscore2.default/g, '_'))
      .on('data', chunk => {
        syncFuncString += chunk;
      })
      .on('end', () => {
        syncFuncString += '\n\n}';
        resolve(syncFuncString);
      })
      .on('error', err => {
        reject(err);
      });
  });

export default generator;
