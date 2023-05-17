import { render, screen } from '@test-utils/custom-render';
import CurrentWeather from './CurrentWeather';
import { Suspense } from 'react';
import { flushPromisesAndTimers, partiallyMock } from '@test-utils/test-helpers';
import { MutableSnapshot } from 'recoil';
import { postCodeAtom } from '@weather/weather-atoms';
import { mockWeather } from './__mocks__/weather-mocks';
import Loading from '@/loading/Loading';

const initializeState = ({ set }: MutableSnapshot) => {
    set(postCodeAtom, 'sw1a 1ff');
};

describe('CurrentWeather component', () => {
    beforeAll(() => {
        global.fetch = partiallyMock<typeof global.fetch>(
            jest.fn().mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue(mockWeather) }),
        );
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should give no data message when weather state is null, due to invalid postcode', async () => {
        const initializeState = ({ set }: MutableSnapshot) => {
            set(postCodeAtom, 'abc');
        };
        render(
            <Suspense fallback={<Loading />}>
                <CurrentWeather />
            </Suspense>,
            {},
            initializeState,
        );
        await flushPromisesAndTimers();

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should show weather section when weather has been set', async () => {
        render(
            <Suspense fallback={<Loading />}>
                <CurrentWeather />
            </Suspense>,
            {},
            initializeState,
        );
        await flushPromisesAndTimers();

        const loadingElements = await screen.queryByText('Loading...');

        expect(screen.getByRole('main')).toBeInTheDocument();
        expect(loadingElements).toBeNull();
    });
});
