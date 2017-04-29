// @flow

import testhelper from '../../../lib/testhelper';

describe('simple example test', () => {
  beforeEach(() => {
    testhelper.init('examples/simple/sync-func.js');
  });

  describe('create test', () => {
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
