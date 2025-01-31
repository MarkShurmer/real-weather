import { createFetchResponse } from '@test-utils';
import { partialMock } from 'partial-mock';
import { mockWeather } from '@/Weather/__mocks__/weather-mocks';
import { fetchWeather } from './api';

describe('API proxies', () => {
  describe('FetchWeather', () => {
    it('should fetch weather data from the API', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(createFetchResponse(mockWeather));

      const weather = await fetchWeather('br2 8pp');

      expect(weather).toEqual(mockWeather);
    });

    it('should throw error when non 200 status', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(partialMock<Response>({ status: 401 }));

      await expect(async () => {
        await fetchWeather('br2 8pp');
      }).rejects.toThrow('Service unavailable');
    });

    it('should throw error when non 200 status', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(partialMock<Response>({ status: 502 }));

      await expect(async () => {
        await fetchWeather('br2 8qq');
      }).rejects.toThrow('Unknown postcode');
    });
  });
});
