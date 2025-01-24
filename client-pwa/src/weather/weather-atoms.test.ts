import { snapshot_UNSTABLE } from 'recoil';
import { postCodeAtom, weatherSelector } from './weather-atoms';
import { mockWeather } from './__mocks__/weather-mocks';

describe('Weather atoms', () => {
    it('should be defined', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockWeather), { status: 200 });

        const initialSnapshot = snapshot_UNSTABLE();
        const release = initialSnapshot.retain();

        try {
            const testSnapshot = snapshot_UNSTABLE(({ set }) => set(postCodeAtom, 'br2 8pp'));
            await expect(testSnapshot.getLoadable(weatherSelector).valueOrThrow()).toEqual({});
        } finally {
            release();
        }
    });
});
