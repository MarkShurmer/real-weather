import { partialMock } from 'partial-mock';

export function createFetchResponse<TData>(data: TData): Response {
  return partialMock({
    json: () => new Promise((resolve) => resolve(data)),
    ok: true,
    status: 200,
  });
}

export type GeoLocationCallback = (position: GeolocationPosition) => void;
