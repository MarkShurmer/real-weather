import { Guid } from 'common/guid';

export interface LooseObject {
  [key: string]: unknown;
}

export type ObjectValues<T> = T[keyof T];

export type EnumType<T> = [keyof T];

export type InputBase = object;

export type UpdateBase = InputBase & {
  id: Guid;
};
