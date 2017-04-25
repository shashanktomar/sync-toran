// @flow
import { fromJS } from 'immutable';
import type { Definations } from '../../../src/types';

const doc = { type: 'task' };
const oldDoc = { type: 'task' };
const defs: Definations = {
  task: {
    name: 'task',
    typeFilter: 'defaultTypeFilter'
  }
};
export const initialState = fromJS({ doc, oldDoc, defs });
export const state = fromJS({ doc, oldDoc, def: defs.task });
