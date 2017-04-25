// @flow
import { actions } from '../../src/gatekeepers/helpers';

describe('helpers test', () => {
  describe('action test', () => {
    describe('isDelete test', () => {
      it('should identify a delete operation', () => {
        const doc = {
          _deleted: true
        };
        const oldDoc = {};
        const docs = {
          doc,
          oldDoc
        };
        expect(actions.isDelete(docs)).toBeTruthy();
      });

      it('should identify a delete operation even if oldDoc is missing', () => {
        const doc = {
          _deleted: true
        };
        const docs = {
          doc,
          oldDoc: undefined
        };
        expect(actions.isDelete(docs)).toBeTruthy();
      });

      it('should identify a delete operation if oldDoc was also deleted', () => {
        const doc = {
          _deleted: true
        };
        const docs = {
          doc,
          oldDoc: doc
        };
        expect(actions.isDelete(docs)).toBeTruthy();
      });

      it('should reject a delete operation if newDoc does not have deleted marked', () => {
        const doc = {};
        const docs = {
          doc,
          oldDoc: doc
        };
        expect(actions.isDelete(docs)).toBeFalsy();
      });
    });

    describe('isCreate test', () => {
      it('should identify a create operation if oldDoc is false', () => {
        const doc = {};
        const docs = {
          doc,
          oldDoc: false
        };
        expect(actions.isCreate(docs)).toBeTruthy();
      });

      it('should identify a create operation if oldDoc is null', () => {
        const doc = {};
        const docs = {
          doc,
          oldDoc: null
        };
        expect(actions.isCreate(docs)).toBeTruthy();
      });

      it('should identify a create operation if oldDoc is undefined', () => {
        const doc = {};
        const docs = {
          doc,
          oldDoc: undefined
        };
        expect(actions.isCreate(docs)).toBeTruthy();
      });

      it('should identify a create operation if oldDoc is deleted', () => {
        const doc = {};
        const oldDoc = {
          _deleted: true
        };
        const docs = {
          doc,
          oldDoc
        };
        expect(actions.isCreate(docs)).toBeTruthy();
      });

      it('should reject a create operation if new doc is also deleted', () => {
        const doc = {
          _deleted: true
        };
        const oldDoc = {
          _deleted: true
        };
        const docs = {
          doc,
          oldDoc
        };
        expect(actions.isCreate(docs)).toBeFalsy();
      });
    });

    describe('isUpdate test', () => {
      it('should identify an update operation if it is neither create nor delete', () => {
        const doc = {};
        const oldDoc = {};
        const docs = {
          doc,
          oldDoc
        };
        expect(actions.isUpdate(docs)).toBeTruthy();
      });

      it('should reject an update operation if it is delete', () => {
        const doc = {
          _deleted: true
        };
        const docs = {
          doc,
          oldDoc: null
        };
        expect(actions.isUpdate(docs)).toBeFalsy();
      });

      it('should reject an update operation if it is create', () => {
        const doc = {};
        const docs = {
          doc,
          oldDoc: null
        };
        expect(actions.isUpdate(docs)).toBeFalsy();
      });
    });
  });
});
