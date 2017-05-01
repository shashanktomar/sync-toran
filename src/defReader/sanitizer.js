// @flow
import _ from 'lodash';
import type { Defination, InitialDefination, Sanitizer } from './types';

type DefinationValidator = (def: InitialDefination) => InitialDefination;
type ParserChain = (parsers: Array<DefinationValidator>) => (def: InitialDefination) => Defination;

const parserChain: ParserChain = parsers => _.flow(parsers);

const typeFilterValidator: DefinationValidator = def => ({
  typeFilter: def.typeFilter || 'defaultTypeFilter',
  ...def
});

const channelsValidator: DefinationValidator = def => {
  const d = def;
  d.channels = d.channels || {};
  d.channels.prefix = d.channels.prefix || '$type+$_id';
  d.channels.suffix = d.channels.suffix || 'readWrite';
  return d;
};

const defValidators = parserChain([typeFilterValidator, channelsValidator]);

const defSanitizer: Sanitizer = initialDefs => _.mapValues(initialDefs, defValidators);

export default defSanitizer;
