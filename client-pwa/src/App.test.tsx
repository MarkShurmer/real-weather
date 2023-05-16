import { render, screen, waitFor } from '@test-utils/custom-render';
import { MutableSnapshot } from 'recoil';
import { postCodeAtom } from './weather/weather-atoms';
import App from './App';
import { partiallyMock } from '@test-utils/test-helpers';
import { mockWeather } from './weather/__mocks__/weather-mocks';

describe('App', () => {
    beforeAll(() => {
        global.fetch = partiallyMock<typeof global.fetch>(
            jest.fn().mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue(mockWeather) }),
        );
    });

    const initializeState = ({ set }: MutableSnapshot) => {
        set(postCodeAtom, 'sw1a 1ff');
    };

    it('should show home', async () => {
        render(<App />, {}, initializeState);

        await waitFor(() => screen.getByRole('main'));
        expect(screen.getByRole('main')).toBeInTheDocument();
    });
});
