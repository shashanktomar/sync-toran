// @flow

import { state } from './definations';
import typegateway from '../../../src/gatekeepers/typegateway';

// TODO: find a way to remove try catch for error testing

const typeErrors = typegateway.typeErrors;
const defaultFilter = typegateway.filters.defaultTypeFilter;

describe('defaultTypeFilter test', () => {
  describe('create test', () => {
    const input = state.delete('oldDoc');
    it('should match type on create operation', () => {
      expect(defaultFilter(input.toJS())).toBeTruthy();
    });

    it('should fail on create if type mismatch from def name', () => {
      const wrongTypeInput = input.setIn(['doc', 'type'], 'wrongType');
      try {
        defaultFilter(wrongTypeInput.toJS());
      } catch (e) {
        expect(e).toEqual({ forbidden: typeErrors.invalidTypeField });
      }
    });
  });

  describe('update test', () => {
    it('should match type on update operation', () => {
      expect(defaultFilter(state.toJS())).toBeTruthy();
    });

    it('should fail on update if old and new type mismatch', () => {
      const wrongTypeInput = state.setIn(['oldDoc', 'type'], 'wrongType');
      try {
        defaultFilter(wrongTypeInput.toJS());
      } catch (err) {
        expect(err).toEqual({ forbidden: typeErrors.typeFieldMismatch });
      }
    });

    it('should fail on update if type mismatch from def name', () => {
      const wrongTypeInput = state
        .setIn(['doc', 'type'], 'wrongType')
        .setIn(['oldDoc', 'type'], 'wrongType');
      try {
        defaultFilter(wrongTypeInput.toJS());
      } catch (err) {
        expect(err).toEqual({ forbidden: typeErrors.typeFieldMismatch });
      }
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
      try {
        defaultFilter(input.toJS());
      } catch (err) {
        expect(err).toEqual({ forbidden: typeErrors.invalidDeleteType });
      }
    });
  });
});
