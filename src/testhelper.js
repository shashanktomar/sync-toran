import fs from 'fs';
import _ from 'underscore'; // eslint-disable-line

let syncFunction;
const init = syncFunctionPath => {
  // eslint-disable-next-line
  eval(`syncFunction = ${fs.readFileSync(syncFunctionPath).toString()}`);
  exports.syncFunction = syncFunction;
};

const callSyncFunction = (doc, oldDoc) => syncFunction(doc, oldDoc);

export default {
  init,
  callSyncFunction
};
