import type { Channels, Definations, TypeFilterName, Type } from '../types';

export type InitialDefination = {
  name: string,
  typeFilter?: TypeFilterName,
  channels?: Channels
};

export type InitialDefinations = { [Type]: InitialDefination };
export type Reader = (dir: string) => Promise<InitialDefinations>;
export type Sanitizer = (defs: InitialDefinations) => Promise<Definations>;
