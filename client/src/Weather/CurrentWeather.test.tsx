import { render, screen } from '@test-utils';
import { fetchWeather } from '@/api/api';
import { mockWeather } from './__mocks__/weather-mocks';
import CurrentWeather from './CurrentWeather';

vi.mock('@/api/api');

describe('CurrentWeather component', () => {
  it('should give no data message when weather state is loading', async () => {
    render(<CurrentWeather postcode={undefined} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show weather section when weather has been set', async () => {
    vi.mocked(fetchWeather).mockResolvedValueOnce(mockWeather);
    render(<CurrentWeather postcode="br2 8pp" />);

    const element = await screen.findByRole('contentinfo');

    expect(element).not.toBeNull();
  });

  it('should give error when api call fails', async () => {
    vi.mocked(fetchWeather).mockRejectedValueOnce(new Error('Service unavailable'));

    render(<CurrentWeather postcode="br2 8pq" />);

    const element = await screen.findByRole('alert');
    expect(element).not.toBeNull();
  });
});
