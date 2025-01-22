import { screen } from '@test-utils/custom-render';
import CurrentWeather from './CurrentWeather';
import { Suspense } from 'react';
import { flushPromisesAndTimers, partiallyMock } from '@test-utils/test-helpers';
import { weatherState } from '@weather/weather-atoms';
import { mockWeather } from './__mocks__/weather-mocks';
import Loading from '@/loading/Loading';
import { createRecoilMockWrapper } from 'recoil-mock';
import { render } from '@testing-library/react';

// const initializeState = ({ set }: MutableSnapshot) => {
//     set(postCodeAtom, 'sw1a 1ff');
// };

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

    it('should give no data message when weather state is loading', async () => {
        // const initializeState = ({ set }: MutableSnapshot) => {
        //     set(postCodeAtom, 'abc');
        // };
        const { context, wrapper } = createRecoilMockWrapper();
        context.set(weatherState, {
            type: 'loading',
        });

        render(
            <Suspense fallback={<Loading />}>
                <CurrentWeather />
            </Suspense>,
            { wrapper },
        );
        await flushPromisesAndTimers();

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should show weather section when weather has been set', async () => {
        const { context, wrapper } = createRecoilMockWrapper();

        // const initializeState = ({ set }: MutableSnapshot) => {
        //     set(weatherState, {
        //         type: 'succeeded',
        //         weather: mockWeather,
        //     });
        // };
        context.set(weatherState, {
            type: 'succeeded',
            weather: mockWeather,
        });

        render(
            <Suspense fallback={<Loading />}>
                <CurrentWeather />
            </Suspense>,
            { wrapper },
        );
        await flushPromisesAndTimers();

        const elements = await screen.queryByRole('contentinfo');

        expect(elements).not.toBeNull();
    });
});
