import { screen } from '@test-utils/custom-render';
import CurrentWeather from './CurrentWeather';
import { flushPromisesAndTimers } from '@test-utils/test-helpers';
import { render } from '@test-utils/custom-render';
import { useSuspenseQuery } from '@tanstack/react-query';
import { mockWeather } from './__mocks__/weather-mocks';

jest.mock('@tanstack/react-query');

describe('CurrentWeather component', () => {
    beforeEach(async () => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should give no data message when weather state is loading', async () => {
        //fetchMock.mockResponseOnce(JSON.stringify(mockWeather), { status: 200 });

        (useSuspenseQuery as jest.Mock).mockReturnValue({
            isLoading: true,
            isError: false,
            data: undefined,
        });

        render(<CurrentWeather postcode={'br2 8pq'} />);

        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should show weather section when weather has been set', async () => {
        (useSuspenseQuery as jest.Mock).mockReturnValue({
            isLoading: true,
            isError: false,
            data: mockWeather,
        });
        render(<CurrentWeather postcode={'br2 8pp'} />);
        await flushPromisesAndTimers();

        const elements = await screen.queryByRole('contentinfo');

        expect(elements).not.toBeNull();
    });

    // it('should give error when postcode is too short', async () => {
    //     render(<CurrentWeather postcode={'br2'} />);
    //     await flushPromisesAndTimers();

    //     expect(screen.getByRole('alert')).toBeInTheDocument();
    // });
});
