// @flow

import fs from 'fs';
import path from 'path';
import { pretty } from 'js-object-pretty-print';
import typegateway from './gatekeepers/typegateway';
import { actions } from './gatekeepers/helpers';

import type { TemplateParser } from './types';

function stringify(obj) {
  return JSON.stringify(
    obj,
    (key, value) => (typeof value === 'function' ? value.toString() : value),
    2
  );
}

const templateParser: TemplateParser = defs =>
  new Promise(resolve => {
    const templatePath = path.join(__dirname, 'template.js');
    const syncFunTemplate = fs.readFileSync(templatePath, 'utf8');
    const syncFunc = syncFunTemplate
      .replace('%DEFINATIONS%', () => stringify(defs))
      .replace('%HELPERS%', () => pretty(actions, 4, 'PRINT', true))
      .replace('%FILTERS%', () => pretty(typegateway.filters, 4, 'PRINT', true))
      .replace('%TYPE_FILTER%', typegateway.typegateway.toString());
    resolve(syncFunc);
  });

export default templateParser;
