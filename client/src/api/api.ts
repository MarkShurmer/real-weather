import { Weather } from './api-types';

export async function fetchWeather(postcode: string): Promise<Weather> {
  const url = new URL('weather', import.meta.env.VITE_API_URL);
  url.search = new URLSearchParams({ postcode }).toString();

  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(response.status === 502 ? 'Unknown postcode' : 'Service unavailable');
  }

  return response.json();
}
