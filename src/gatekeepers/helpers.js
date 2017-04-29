// @flow

import type { ActionChecker } from '../types';

const isDelete: ActionChecker = docs => docs.doc._deleted;

const isCreate: ActionChecker = docs =>
  // Checking false for the Admin UI to work
  docs.oldDoc === false || ((docs.oldDoc == null || docs.oldDoc._deleted) && !isDelete(docs));

const isUpdate: ActionChecker = docs => !isCreate(docs) && !isDelete(docs);

// eslint-disable-next-line
export const actions = {
  isDelete,
  isCreate,
  isUpdate
};
