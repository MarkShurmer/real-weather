import { fireEvent, render, screen, waitFor } from '@test-utils/custom-render';
import { Home } from '@/home/Home';
import { useSuspenseQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query');

describe('Home page', () => {
    it('should update postcode', async () => {
        render(<Home />);
        console.log('>>> ', screen.debug());

        const postCodeInput = screen.getByRole('textbox');
        const cta = screen.getByRole('button');

        fireEvent.change(postCodeInput, { target: { value: 'br28pp' } });
        fireEvent.click(cta);

        await waitFor(() => screen.getByTestId('home'));
        expect(screen.getByTestId('home')).toBeInTheDocument();
    });
});
