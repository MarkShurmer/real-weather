import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Home } from '@/home/Home';
import { createRecoilMockWrapper } from 'recoil-mock';
import { weatherSelector } from '@/weather/weather-atoms';

// const initializeState = ({ set }: MutableSnapshot) => {
//     set(postCodeAtom, 'sw1a 1ff');
// };

describe('Home page', () => {
    // beforeAll(() => {
    //     global.fetch = partiallyMock<typeof global.fetch>(
    //         jest.fn().mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue(mockWeather) }),
    //     );
    // });

    it('should update postcode', async () => {
        const { context, wrapper } = createRecoilMockWrapper();
        context.set(weatherSelector, {
            type: 'loading',
        });

        render(<Home />, { wrapper });

        const postCodeInput = screen.getByRole('textbox');
        const cta = screen.getByRole('button');

        fireEvent.change(postCodeInput, { target: { value: 'br28pp' } });
        fireEvent.click(cta);

        await waitFor(() => screen.getByTestId('home'));
        expect(screen.getByTestId('home')).toBeInTheDocument();
    });
});
