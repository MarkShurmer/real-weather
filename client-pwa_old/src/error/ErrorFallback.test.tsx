import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

const ComponentWithError = () => {
    throw new Error('💥 CABOOM 💥');
};

describe('ErrorFallback', () => {
    beforeEach(() => {
        // Don't clutter the console with expected error text
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should show error fallback when error happens', async () => {
        // global.fetch = partiallyMock<typeof global.fetch>(jest.fn().mockRejectedValue('This is my error'));

        render(
            <ErrorBoundary fallback={<ErrorFallback />}>
                <ComponentWithError />
            </ErrorBoundary>,
        );

        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('An error has occurred');
    });
});
