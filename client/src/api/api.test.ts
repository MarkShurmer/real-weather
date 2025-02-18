import { describe, expect, it } from 'vitest';
import { mockWeather } from '@/Weather/__mocks__/weather-mocks';
import { fetchGPSFromPostcode, fetchWeather } from './api';

describe('API proxies', () => {
  describe('FetchWeather', () => {
    it('should fetch weather data from the API', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockWeather));

      const weather = await fetchWeather({ latitude: 20, longitude: 4 });

      expect(weather).toEqual({ status: 'ok', data: mockWeather });
    });

    it('should return error when non 200 status', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 505 });

      const weather = await fetchWeather({ latitude: 20, longitude: 4 });

      expect(weather).toEqual({ status: 'error', message: 'Service unavailable' });
    });

    it('should return error about lat long when 502 status', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 502 });

      const weather = await fetchWeather({ latitude: 20, longitude: 4 });

      expect(weather).toEqual({ status: 'error', message: 'Problem with lat long' });
    });
  });

  describe('Fetch GPS co-ordinates', () => {
    it('should fetch valid GPS coordinates', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ latitude: 2, longitude: 4 }));

      const response = await fetchGPSFromPostcode('br2 8bp');
      expect(response).toEqual({ status: 'ok', data: { latitude: 2, longitude: 4 } });
    });

    it('should return error when non 200 status', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 505 });

      const response = await fetchGPSFromPostcode('br2 8bp');
      expect(response).toEqual({ status: 'error', message: 'Service unavailable' });
    });

    it('should return error about postcode when 502 status', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 502 });

      const response = await fetchGPSFromPostcode('br2 8bp');
      expect(response).toEqual({ status: 'error', message: 'Unknown postcode' });
    });
  });
});
