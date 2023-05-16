import { WEATHER_API } from '@api/api-constants';
import { Weather } from '@api/api-contracts';
import { atom, selector } from 'recoil';

export const postCodeAtom = atom<string>({
    key: 'postcode',
    default: '',
});

export const weatherState = selector<Weather | null>({
    key: 'weather',
    get: async ({ get }) => {
        const postCode = get(postCodeAtom);

        if (postCode.length >= 6) {
            const url = WEATHER_API.replace('${postCode}', postCode);
            const response = await fetch(url);

            if (response.ok) {
                const data = (await response.json()) as Weather;

                return data;
            }
        }

        return null;
    },
});
