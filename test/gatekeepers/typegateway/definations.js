// @flow
import { fromJS } from 'immutable';
import type { Definations } from '../../../src/types';

const doc = { type: 'user' };
const oldDoc = { type: 'user' };
const defs: Definations = {
  user: {
    name: 'user',
    typeFilter: 'defaultTypeFilter'
  }
};
export const initialState = fromJS({ doc, oldDoc, defs });
export const state = fromJS({ doc, oldDoc, def: defs.user });
