// @flow

import fs from 'fs';
import path from 'path';
import typeFilter from './gatekeepers/typeFilter';

export default function (defs: any) {
  return new Promise(resolve => {
    const templatePath = path.join(__dirname, 'template.js');
    const syncFunTemplate = fs.readFileSync(templatePath, 'utf8');
    const syncFunc = syncFunTemplate
      .replace('%DEFINATIONS%', () => JSON.stringify(defs))
      .replace('%TYPE_FILTER%', typeFilter.toString());
    resolve(syncFunc);
  });
}
