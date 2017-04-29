// @flow

import { state } from './definations';
import typegateway from '../../../src/gatekeepers/typegateway';

const defaultFilter = typegateway.filters.defaultTypeFilter;

describe('defaultTypeFilter test', () => {
  describe('create test', () => {
    const input = state.delete('oldDoc');
    it('should match type on create operation', () => {
      expect(defaultFilter(input.toJS())).toBeTruthy();
    });

    it('should fail on create if type mismatch from def name', () => {
      const wrongTypeInput = input.setIn(['doc', 'type'], 'wrongType');
      expect(defaultFilter(wrongTypeInput.toJS())).toBeFalsy();
    });

    it('should fail on create if type is missing', () => {
      const withoutType = input.deleteIn(['doc', 'type']);
      expect(defaultFilter(withoutType.toJS())).toBeFalsy();
    });
  });

  describe('update test', () => {
    it('should match type on update operation', () => {
      expect(defaultFilter(state.toJS())).toBeTruthy();
    });

    it('should fail on update if old and new type mismatch', () => {
      const wrongTypeInput = state.setIn(['oldDoc', 'type'], 'wrongType');
      expect(defaultFilter(wrongTypeInput.toJS())).toBeFalsy();
    });

    it('should fail on update if type mismatch from def name', () => {
      const wrongTypeInput = state
        .setIn(['doc', 'type'], 'wrongType')
        .setIn(['oldDoc', 'type'], 'wrongType');
      expect(defaultFilter(wrongTypeInput.toJS())).toBeFalsy();
    });
  });

  describe('delete test', () => {
    it('should match type on delete operation', () => {
      const input = state.deleteIn(['doc', 'type']).setIn(['doc', '_deleted'], true);
      expect(defaultFilter(input.toJS())).toBeTruthy();
    });

    it('should fail on delete if old doc does not have type', () => {
      const input = state
        .deleteIn(['doc', 'type'])
        .setIn(['doc', '_deleted'], true)
        .deleteIn(['oldDoc', 'type']);
      expect(defaultFilter(input.toJS())).toBeFalsy();
    });
  });
});
