import { fireEvent, render, screen, waitFor } from '@test-utils/custom-render';
import { Home } from '@/home/Home';
import { MutableSnapshot } from 'recoil';
import { postCodeAtom } from '@weather/weather-atoms';
import { mockWeather } from '@/weather/__mocks__/weather-mocks';
import { partiallyMock } from '@test-utils/test-helpers';

const initializeState = ({ set }: MutableSnapshot) => {
    set(postCodeAtom, 'sw1a 1ff');
};

describe('Home page', () => {
    beforeAll(() => {
        global.fetch = partiallyMock<typeof global.fetch>(
            jest.fn().mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue(mockWeather) }),
        );
    });

    it('should update postcode', async () => {
        render(<Home />, {}, initializeState);

        const postCodeInput = screen.getByRole('textbox');
        const cta = screen.getByRole('button');

        fireEvent.change(postCodeInput, { target: { value: 'br28pp' } });
        fireEvent.click(cta);

        await waitFor(() => screen.getByRole('main'));
        expect(screen.getByRole('main')).toBeInTheDocument();
    });
});
