import { render, screen } from '@test-utils';
import { describe, expect, it, vi } from 'vitest';
import { fetchWeather } from '@/api/api';
import { mockWeather } from './__mocks__/weather-mocks';
import CurrentWeather from './CurrentWeather';

vi.mock('@/api/api');

describe('CurrentWeather component', () => {
  it('should give no data message when weather state is loading', async () => {
    // vi.mocked(fetchWeather).mockResolvedValue({ status: 'ok', data: undefined });
    render(<CurrentWeather latLong={undefined} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show weather section when weather has been set', async () => {
    vi.mocked(fetchWeather).mockResolvedValue({ status: 'ok', data: mockWeather });

    render(<CurrentWeather latLong={{ latitude: 2, longitude: 4 }} />);

    const element = await screen.findByRole('contentinfo');
    expect(element).not.toBeNull();
    expect(screen.getByText('Temperature')).toBeInTheDocument();
  });

  it('should give error when api call fails', async () => {
    vi.mocked(fetchWeather).mockResolvedValue({ status: 'error', message: 'Service unavailable' });

    render(<CurrentWeather latLong={{ latitude: 2, longitude: 4 }} />);

    const element = await screen.findByRole('alert');
    expect(element).not.toBeNull();
  });
});
