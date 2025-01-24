import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { createRecoilMockWrapper } from 'recoil-mock';

describe('App', () => {
    // beforeAll(() => {
    //     global.fetch = partiallyMock<typeof global.fetch>(
    //         jest.fn().mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue(mockWeather) }),
    //     );
    // });

    // const initializeState = ({ set }: MutableSnapshot) => {
    //     set(postCodeAtom, 'sw1a 1ff');
    // };

    it('should show home', async () => {
        const { wrapper } = createRecoilMockWrapper();

        render(<App />, { wrapper });

        await waitFor(() => screen.getByRole('main'));
        expect(screen.getByRole('main')).toBeInTheDocument();
    });
});
