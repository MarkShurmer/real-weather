import { getApiUrl } from '@/api/api';
import { Weather } from '@api/api-contracts';
import { atom, selector } from 'recoil';

export const postCodeAtom = atom<string>({
    key: 'postcode',
    default: '',
});

export const weatherState = selector<Weather | null>({
    key: 'weather',
    get: async ({ get }) => {
        const postcode = get(postCodeAtom);

        if (postcode.length >= 6) {
            const url = new URL(getApiUrl());
            url.search = new URLSearchParams({ postcode }).toString();

            const response = await fetch(url);

            if (response.ok) {
                const data = (await response.json()) as Weather;

                return data;
            }
        }

        return null;
    },
});
