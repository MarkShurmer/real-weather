import { v4 } from 'uuid';

export function createGuid(): Guid {
    return v4();
}

export type Guid = string;
