import { WEATHER_API_URL } from './api-constants';
import { GpsApiResponse, LatLong, WeatherApiResponse } from './api-types';

// export function latLongToString(latLong: LatLong): string {
//   return `${latLong.latitude},${latLong.longitude}`;
// }

export function getWeatherUrl(latLong: LatLong): string {
  const url = new URL(WEATHER_API_URL);
  url.search = new URLSearchParams({
    lat: latLong.latitude.toString(),
    lon: latLong.longitude.toString(),
  }).toString();
  return url.toString();
}

export async function fetchWeather(latLong: LatLong): Promise<WeatherApiResponse> {
  const response = await fetch(getWeatherUrl(latLong), {
    headers: { 'x-api-key': import.meta.env.VITE_API_KEY },
  });
  if (response.status !== 200) {
    const errorMsg = response.status === 502 ? 'Problem with lat long' : 'Service unavailable';
    return { status: 'error', message: errorMsg };
  }

  return { status: 'ok', data: await response.json() };
}

// export function getGPSUrl(postcode: string): string {
//   const url = new URL('gps', import.meta.env.VITE_API_URL);
//   url.search = new URLSearchParams({ postcode }).toString();
//   return url.toString();
// }

export async function fetchGPSFromPostcode(postcode: string): Promise<GpsApiResponse> {
  const url = new URL('gps', import.meta.env.VITE_API_URL);
  url.search = new URLSearchParams({ postcode }).toString();

  const response = await fetch(url, {
    headers: { 'x-api-key': import.meta.env.VITE_API_KEY },
  });

  if (response.status !== 200) {
    const errorMsg = response.status === 502 ? 'Unknown postcode' : 'Service unavailable';
    return { status: 'error', message: errorMsg };
  }

  return { status: 'ok', data: await response.json() };
}
