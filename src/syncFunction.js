import helpers from './gatekeepers/helpers';
import filters from './gatekeepers/typegateway/filters';
import typegateway from './gatekeepers/typegateway';
import authorizer from './gatekeepers/authorizer';

// Generated code
const defs = undefined;

// Do some actual work now
const initialState = { doc, oldDoc, defs }
const gatekeepers = _.compose(typegateway.typegateway);

gatekeepers(initialState, authorizer);
