/* @flow */
import _ from 'underscore';
import reader from '../../src/defReader/reader';

describe('defReader test', () => {
  describe('yaml reader', () => {
    it('should append or change doc name to defination file name if name is missing or name is already present', () => {
      const defPromise = reader('test/testDefs/minimalDefs');
      return defPromise.then(defs => {
        expect(_.keys(defs).length).toEqual(2);
        expect(defs.task.name).toEqual('task');
        expect(defs['task-list'].name).toEqual('task-list');
        return true;
      });
    });
  });
});
