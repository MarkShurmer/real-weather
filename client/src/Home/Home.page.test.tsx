import { render, screen } from '@test-utils';
import { describe, expect, it } from 'vitest';
import { HomePage } from './Home.page';

describe('Home page', () => {
  it('should show main content', () => {
    render(<HomePage />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
