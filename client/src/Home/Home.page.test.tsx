import { render, screen, userEvent } from '@test-utils';
import { describe, expect, it, vi } from 'vitest';
import { fetchWeather } from '@/api/api';
import { mockWeather } from '@/Weather/__mocks__/weather-mocks';
import { HomePage } from './Home.page';

vi.mock('@/api/api');

describe('Home page', () => {
  it('should show main content', () => {
    render(<HomePage />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should show an error if postcode entered is too short', async () => {
    render(<HomePage />);

    const searchBox = screen.getByPlaceholderText('Enter postcode');
    await userEvent.type(searchBox, 'br2');

    expect(screen.getByText('The post code needs to be a valid UK postcode')).toBeInTheDocument();
  });

  it('should show an error if postcode entered is wrong format', async () => {
    render(<HomePage />);

    const searchBox = screen.getByPlaceholderText('Enter postcode');
    await userEvent.type(searchBox, 'br2 grt');

    expect(screen.getByText('The post code needs to be a valid UK postcode')).toBeInTheDocument();
  });

  it('should show current weather panel if postcode entered is valid', async () => {
    vi.mocked(fetchWeather).mockResolvedValueOnce(mockWeather);
    render(<HomePage />);

    const searchBox = screen.getByPlaceholderText('Enter postcode');
    await userEvent.type(searchBox, 'br2 8bp');

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
