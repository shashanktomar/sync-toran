import { actions } from '../helpers';
import errors from './errors';
import type { TypeFilter } from '../../types';

const defaultTypeFilter: TypeFilter = state => {
  const { doc, oldDoc, def } = state;
  if (actions.isCreate(state)) {
    if (doc.type !== def.name) {
      throw { forbidden: errors.invalidTypeField };
    }
  } else if (actions.isUpdate(state)) {
    if (oldDoc == null || doc.type !== oldDoc.type || doc.type !== def.name) {
      throw { forbidden: errors.typeFieldMismatch };
    }
  } else if (actions.isDelete(state)) {
    if (oldDoc == null || oldDoc.type !== def.name) {
      throw { forbidden: errors.invalidDeleteType };
    }
  }
  return true;
};

const filters: { [string]: TypeFilter } = {
  defaultTypeFilter
};

export default filters;
