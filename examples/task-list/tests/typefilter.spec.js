// @flow

import testhelper from '../../../lib/testhelper';

describe('task list type filter tests', () => {
  beforeEach(() => {
    testhelper.init('examples/task-list/sync-func.js');
  });

  describe('should create a doc', () => {
    it('should not throw error if type is task', () => {
      const doc = { type: 'task' };
      testhelper.callSyncFunction(doc);
    });

    it('should fail if type is missing', () => {
      const doc = {};
      try {
        testhelper.callSyncFunction(doc);
      } catch (e) {
        expect(e).toEqual({ forbidden: 'Type field validation failed' });
      }
    });

    it('should fail if type is wrong', () => {
      const doc = { type: 'someType' };
      try {
        testhelper.callSyncFunction(doc);
      } catch (e) {
        expect(e).toEqual({ forbidden: 'Type field validation failed' });
      }
    });
  });
});
