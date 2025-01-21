import { getApiUrl } from '@/api/api';
import { Weather } from '@api/api-contracts';
import { atom, selector } from 'recoil';

export const postCodeAtom = atom<string>({
    key: 'postcode',
    default: '',
});

export type WeatherState = { type: 'errored'; error: string } | { type: 'succeeded'; weather: Weather };

export const weatherState = selector<WeatherState>({
    key: 'weather',
    get: async ({ get }) => {
        const postcode = get(postCodeAtom);

        if (postcode.length >= 6) {
            const url = new URL(getApiUrl());
            url.search = new URLSearchParams({ postcode }).toString();

            const response = await fetch(url);

            if (response.status === 200) {
                const data = (await response.json()) as Weather;

                return { type: 'succeeded', weather: data };
            } else {
                const errorResp = (await response.json()) as { error: string };
                return { type: 'errored', error: errorResp.error };
            }
        }

        return { type: 'errored', error: 'Postcode was too short' };
    },
});
