import { render, screen } from '@testing-library/react';
import { Visibility } from '@weather/Visibility';

describe('Visibility component', () => {
    it('should show both from and to when different', () => {
        render(<Visibility visibility={{ from: 5, to: 10, units: 'miles' }} />);

        expect(screen.getByRole('banner')).toHaveTextContent('5 - 10 miles');
    });

    it('should show one from and to when same', () => {
        render(<Visibility visibility={{ from: 10, to: 10, units: 'miles' }} />);

        expect(screen.getByRole('banner')).toHaveTextContent('10 miles');
    });
});
