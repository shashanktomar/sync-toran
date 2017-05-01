import reader from './reader';
import sanitizer from './sanitizer';
import type { DefinationsReader } from '../types';

const defReader: DefinationsReader = dir => reader(dir).then(sanitizer);

export default defReader;
