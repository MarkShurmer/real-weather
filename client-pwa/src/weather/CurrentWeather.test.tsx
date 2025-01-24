import { screen } from '@test-utils/custom-render';
import CurrentWeather from './CurrentWeather';
import { flushPromisesAndTimers } from '@test-utils/test-helpers';
import { postCodeAtom, weatherSelector } from '@weather/weather-atoms';
import { mockWeather } from './__mocks__/weather-mocks';
import { createRecoilMockWrapper } from 'recoil-mock';
import { render } from '@testing-library/react';

describe('CurrentWeather component', () => {
    // global.fetch = jest
    //     .fn()
    //     .mockResolvedValue(
    //         partiallyMock<Response>({ ok: true, status: 200, json: jest.fn().mockResolvedValue(mockWeather) }),
    //     );

    beforeEach(async () => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should give no data message when weather state is loading', async () => {
        //fetchMock.mockResponseOnce(JSON.stringify(mockWeather), { status: 200 });
        const { context, wrapper } = createRecoilMockWrapper();

        context.set(postCodeAtom, 'br28pp');
        context.set(weatherSelector, {
            type: 'loading',
        });

        render(<CurrentWeather />, { wrapper });
        //await flushPromisesAndTimers();

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should show weather section when weather has been set', async () => {
        const { context, wrapper } = createRecoilMockWrapper();

        context.set(weatherSelector, {
            type: 'succeeded',
            weather: mockWeather,
        });

        render(<CurrentWeather />, { wrapper });
        await flushPromisesAndTimers();

        const elements = await screen.queryByRole('contentinfo');

        expect(elements).not.toBeNull();
    });

    it('should give error when postcode is too short', async () => {
        const { context, wrapper } = createRecoilMockWrapper();
        context.set(weatherSelector, {
            type: 'errored',
            error: 'Postcode was too short',
        });

        render(<CurrentWeather />, { wrapper });
        await flushPromisesAndTimers();

        expect(screen.getByRole('alert')).toBeInTheDocument();
    });
});
