// @flow

export type Type = string;
export type TypeFilter = (state: State) => boolean;

export type DefProducer = (state: State) => string | Array<string>;
export type DefValue = string | Array<String> | DefProducer;

export type Doc = {
  doc: any
};

export type OldDoc = {
  oldDoc?: any
};

export type Docs = Doc & OldDoc;

export type Channels = {
  prefix: string | DefProducer,
  suffix: 'readWrite' | 'all' | DefProducer,
  scope?: ChannelScope
};

export type read = ?DefValue;
export type Scope = {
  create?: DefValue,
  update?: DefValue,
  delete?: DefValue,
  write?: DefValue
};

export type ChannelScope = read & Scope;

export type Scopes = {
  users?: Scope,
  roles?: Scope
};

export type TypeFilterName = string;

export type Defination = {
  name: string,
  typeFilter: TypeFilterName,
  channels: Channels,
  auth?: Scopes,
  assign?: Scopes
};

export type InitialDefination = {
  name: string,
  typeFilter?: TypeFilterName,
  channels?: Channels
};

export type Definations = { [Type]: Defination };
export type InitialDefinations = { [Type]: InitialDefination };
export type InitialState = Docs & { defs: Definations };
export type State = Docs & { def: Defination };

export type GateKeeper = (state: State) => State;
export type TypeGateway = (state: InitialState) => State;

/* ----Other types---- */
export type SyncFunction = string;
export type DefinationsReader = (dir: string) => Promise<InitialDefinations>;
export type DefinationsSanitizer = (defs: InitialDefinations) => Promise<Definations>;
export type SyncFunctionGenerator = (defs: Definations) => Promise<SyncFunction>;
export type ActionChecker = (docs: Docs) => boolean;
