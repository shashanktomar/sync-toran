// @flow

/* ----SyncFunction definations---- */
export type Channel = string;
export type User = string;
export type Role = string;
export type Type = string;

export type Doc = {
  doc: any
};

export type OldDoc = {
  oldDoc: ?any
};

export type Docs = Doc & OldDoc;

export type AuthGroups<T> = {
  read: Array<T>,
  create: Array<T>,
  update: Array<T>,
  delete: Array<T>,
  all: Array<T>
};

export type Auth = {
  users: AuthGroups<User>,
  roles: AuthGroups<Auth>
};

/* ----Defination types---- */
export type TypeFilterName = string;

export type Defination = {
  name: string,
  typeFilter: TypeFilterName
};

export type Definations = { [Type]: Defination };
export type InitialState = Docs & { defs: Definations };
export type State = Docs & { def: Defination };

export type GateKeeper = (state: State) => State;
export type TypeGateway = (state: InitialState) => State;
export type TypeFilter = (state: State) => boolean;

/* ----Other types---- */
export type SyncFunction = string;
export type DefinationsParser = (dir: string) => Promise<Definations>;
export type TemplateParser = (defs: Definations) => Promise<SyncFunction>;
export type ActionChecker = (docs: Docs) => boolean;
