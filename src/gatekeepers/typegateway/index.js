// @flow

import _ from 'underscore';
import type { Defination, TypeGateway } from '../../types';
import filters from './filters';

export const defaultTypeFilterName = 'defaultTypeFilter';
const missingTypeField = 'Type field validation failed';

const typegateway: TypeGateway = initialState => {
  // eslint-disable-next-line no-unused-vars
  const typeFilter = def =>
    filters[def.typeFilter]({ doc: initialState.doc, oldDoc: initialState.oldDoc, def });
  const matchedDef: ?Defination = _.find(_.values(initialState.defs), typeFilter);
  if (!matchedDef) {
    throw { forbidden: missingTypeField };
  }
  return {
    doc: initialState.doc,
    oldDoc: initialState.oldDoc,
    def: matchedDef
  };
};

export default {
  typegateway,
  filters
};
