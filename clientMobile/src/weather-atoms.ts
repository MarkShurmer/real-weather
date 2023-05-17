import {atom} from 'recoil';
import {Weather} from './api-contracts';

export const weatherState = atom<Weather>({
  key: 'weather',
  default: undefined,
});
