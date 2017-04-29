// @flow
import { actions } from '../helpers';
import type { TypeFilter } from '../../types';

const defaultTypeFilter: TypeFilter = state => {
  const { doc, oldDoc, def } = state;
  if (actions.isCreate(state)) {
    return doc.type === def.name;
  } else if (actions.isUpdate(state)) {
    return oldDoc != null && doc.type === oldDoc.type && doc.type === def.name;
  } else if (actions.isDelete(state)) {
    return oldDoc != null && oldDoc.type === def.name;
  }
  return false;
};

const filters: { [string]: TypeFilter } = {
  defaultTypeFilter
};

export default filters;
