import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('should show app', async () => {
        render(<App />);

        await waitFor(() => screen.getByRole('main'));
        expect(screen.getByRole('main')).toBeInTheDocument();
    });
});
