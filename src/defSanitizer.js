// @flow
import _ from 'lodash';
import { defaultTypeFilterName } from './gatekeepers/typegateway';
import type { Defination, InitialDefination, DefinationsSanitizer } from './types';

type DefinationValidator = (def: InitialDefination) => InitialDefination;
type ParserChain = (parsers: Array<DefinationValidator>) => (def: InitialDefination) => Defination;

const parserChain: ParserChain = parsers => _.flow(parsers);

const typeFilterValidator: DefinationValidator = def => ({
  typeFilter: def.typeFilter || defaultTypeFilterName,
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

const defSanitizer: DefinationsSanitizer = initialDefs => _.mapValues(initialDefs, defValidators);

export default defSanitizer;
