import { render, screen, userEvent } from '@test-utils';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { fetchGPSFromPostcode, fetchWeather } from '@/api/api';
import { mockWeather } from '@/Weather/__mocks__/weather-mocks';
import { HomePage } from './Home.page';

vi.mock('@/api/api');

describe('Home page', () => {
  beforeAll(() => {
    vi.mocked(fetchWeather).mockResolvedValue({ status: 'ok', data: mockWeather });
    vi.mocked(fetchGPSFromPostcode).mockResolvedValue({
      status: 'ok',
      data: { latitude: 2, longitude: 4 },
    });
  });

  it('should show postcode when location service is off', () => {
    render(<HomePage />);

    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('should not show postcode search when location service is on', async () => {
    render(<HomePage />);

    const selectLocationButton = screen.getByRole('checkbox');
    await userEvent.click(selectLocationButton);
    const searchElement = await screen.queryByRole('search');

    expect(searchElement).toBeNull();
  });

  it('should show weather when position changed by postcode', async () => {
    render(<HomePage />);

    const searchBox = screen.getByPlaceholderText('Enter postcode');
    await userEvent.type(searchBox, 'br2 8bp');

    const weatherElement = await screen.findByRole('contentinfo');
    expect(weatherElement).not.toBeNull();
  });

  it('should show weather when position changed by geolocation', async () => {
    render(<HomePage />);

    const selectLocationButton = screen.getByRole('checkbox');
    await userEvent.click(selectLocationButton);

    const weatherElement = await screen.findByRole('contentinfo');
    expect(weatherElement).not.toBeNull();
  });

  it('should show error when trying to use geolocation in unsupported browser', async () => {
    const oldGeoMock = navigator.geolocation;
    Object.defineProperty(window, 'navigator', { value: { geolocation: undefined } });
    render(<HomePage />);

    const selectLocationButton = screen.getByRole('checkbox');
    await userEvent.click(selectLocationButton);

    expect(screen.getByText('Geolocation is not supported by this browser.')).toBeInTheDocument();

    Object.defineProperty(window, 'navigator', { value: { geolocation: oldGeoMock } });
  });
});
