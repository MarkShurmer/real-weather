import {
  convertPostcodeToGps,
  getWeatherFromStation,
} from 'lookups/lookup-service';
import { beforeAll, test, vi, expect } from 'vitest';
import got, { CancelableRequest } from 'got';
import { PostCodeResponse } from './types';
import { PostCodeErrorResponse } from './types';
import { partiallyMock } from 'common/helpers';
import { weatherSites } from './__mocks__/waether-sites';
import {
  weatherObsExcellentVisibility,
  weatherObsGoodVisibility,
  weatherObsModerateVisibility,
  weatherObsPoorVisibility,
  weatherObsUnknownVisibility,
  weatherObsVeryGoodVisibility,
  weatherObsVeryPoorVisibility,
  weatherObservation,
} from './__mocks__/weather-observations';
import { Observations_Sites_Url, Observations_Url } from 'common/constants';
import { weatherResult } from './__mocks__/weather-result';

vi.mock('got');

const mockedGot = vi.mocked(got.get);
const mockResponse = vi.fn();

beforeAll(() => {
  mockedGot.mockReturnValue(
    partiallyMock<CancelableRequest>({ json: mockResponse })
  );
});

test('convertPostcodeToGps - should give gps co-ord for legit postcode', async () => {
  mockResponse.mockResolvedValue({
    status: 200,
    result: { longitude: 20, latitude: 10 },
  } as PostCodeResponse);
  const result = await convertPostcodeToGps('sw1e 1dd');
  expect(result.latitude).toBe(10);
});

test('convertPostcodeToGps - should give error for not real postcode', async () => {
  mockResponse.mockReturnValue({
    status: 404,
    error: 'Unable to use flutter',
  } as PostCodeErrorResponse);

  await expect(
    async () => await convertPostcodeToGps('sw11zz')
  ).rejects.toThrowError('Unable');
});

test('getWeatherFromStation - should get obs for nearest site to edinburgh', async () => {
  const mockedSites = vi.fn().mockResolvedValue(weatherSites);
  const mockedObservations = vi.fn().mockResolvedValue(weatherObservation);
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedSites })
  );
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedObservations })
  );

  const result = await getWeatherFromStation({
    longitude: -3.188526044893534, // edinburgh
    latitude: 55.954197513164644,
  });

  expect(result).toEqual(weatherResult);
  expect(mockedGot).toHaveBeenCalledWith(Observations_Sites_Url, {
    searchParams: 'key=',
  });
  expect(mockedGot).toHaveBeenCalledWith(
    `${Observations_Url.replace(':locationId', '3066')}`,
    {
      searchParams: new URLSearchParams({
        key: '',
        res: 'hourly',
      }),
    }
  );
});

test('getWeatherFromStation - should get obs for nearest site to surbiton', async () => {
  const mockedSites = vi.fn().mockResolvedValue(weatherSites);
  const mockedObservations = vi.fn().mockResolvedValue(weatherObservation);
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedSites })
  );
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedObservations })
  );

  const result = await getWeatherFromStation({
    longitude: -0.3037457177660413, // surbiton ,
    latitude: 51.39281460811332,
  });
  expect(result).toEqual(weatherResult);
  expect(mockedGot).toHaveBeenCalledWith(Observations_Sites_Url, {
    searchParams: 'key=',
  });
  expect(mockedGot).toHaveBeenCalledWith(
    `${Observations_Url.replace(':locationId', '3781')}`,
    {
      searchParams: new URLSearchParams({
        key: '',
        res: 'hourly',
      }),
    }
  );
});

test('getWeatherFromStation - should get obs for unknown visibility', async () => {
  const mockedSites = vi.fn().mockResolvedValue(weatherSites);
  const mockedObservations = vi
    .fn()
    .mockResolvedValue(weatherObsUnknownVisibility);
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedSites })
  );
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedObservations })
  );

  const result = await getWeatherFromStation({
    longitude: -0.3037457177660413, // surbiton ,
    latitude: 51.39281460811332,
  });

  const expectedResult = { ...weatherResult };
  expectedResult.report.visibility.from = 0;
  expectedResult.report.visibility.to = 0;
  expect(result).toEqual(expectedResult);
});

test('getWeatherFromStation - should get obs for very poor visibility', async () => {
  const mockedSites = vi.fn().mockResolvedValue(weatherSites);
  const mockedObservations = vi
    .fn()
    .mockResolvedValue(weatherObsVeryPoorVisibility);
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedSites })
  );
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedObservations })
  );

  const result = await getWeatherFromStation({
    longitude: -0.3037457177660413, // surbiton ,
    latitude: 51.39281460811332,
  });

  const expectedResult = { ...weatherResult };
  expectedResult.report.visibility.from = 0;
  expectedResult.report.visibility.to = 1;
  expect(result).toEqual(expectedResult);
});

test('getWeatherFromStation - should get obs for poor visibility', async () => {
  const mockedSites = vi.fn().mockResolvedValue(weatherSites);
  const mockedObservations = vi
    .fn()
    .mockResolvedValue(weatherObsPoorVisibility);
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedSites })
  );
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedObservations })
  );

  const result = await getWeatherFromStation({
    longitude: -0.3037457177660413, // surbiton ,
    latitude: 51.39281460811332,
  });

  const expectedResult = { ...weatherResult };
  expectedResult.report.visibility.from = 1;
  expectedResult.report.visibility.to = 4;
  expect(result).toEqual(expectedResult);
});

test('getWeatherFromStation - should get obs for moderate visibility', async () => {
  const mockedSites = vi.fn().mockResolvedValue(weatherSites);
  const mockedObservations = vi
    .fn()
    .mockResolvedValue(weatherObsModerateVisibility);
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedSites })
  );
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedObservations })
  );

  const result = await getWeatherFromStation({
    longitude: -0.3037457177660413, // surbiton ,
    latitude: 51.39281460811332,
  });

  const expectedResult = { ...weatherResult };
  expectedResult.report.visibility.from = 4;
  expectedResult.report.visibility.to = 10;
  expect(result).toEqual(expectedResult);
});

test('getWeatherFromStation - should get obs for good visibility', async () => {
  const mockedSites = vi.fn().mockResolvedValue(weatherSites);
  const mockedObservations = vi
    .fn()
    .mockResolvedValue(weatherObsGoodVisibility);
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedSites })
  );
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedObservations })
  );

  const result = await getWeatherFromStation({
    longitude: -0.3037457177660413, // surbiton ,
    latitude: 51.39281460811332,
  });

  const expectedResult = { ...weatherResult };
  expectedResult.report.visibility.from = 10;
  expectedResult.report.visibility.to = 20;
  expect(result).toEqual(expectedResult);
});

test('getWeatherFromStation - should get obs for very good visibility', async () => {
  const mockedSites = vi.fn().mockResolvedValue(weatherSites);
  const mockedObservations = vi
    .fn()
    .mockResolvedValue(weatherObsVeryGoodVisibility);
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedSites })
  );
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedObservations })
  );

  const result = await getWeatherFromStation({
    longitude: -0.3037457177660413, // surbiton ,
    latitude: 51.39281460811332,
  });

  const expectedResult = { ...weatherResult };
  expectedResult.report.visibility.from = 20;
  expectedResult.report.visibility.to = 40;
  expect(result).toEqual(expectedResult);
});

test('getWeatherFromStation - should get obs for excellent visibility', async () => {
  const mockedSites = vi.fn().mockResolvedValue(weatherSites);
  const mockedObservations = vi
    .fn()
    .mockResolvedValue(weatherObsExcellentVisibility);
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedSites })
  );
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedObservations })
  );

  const result = await getWeatherFromStation({
    longitude: -0.3037457177660413, // surbiton ,
    latitude: 51.39281460811332,
  });

  const expectedResult = { ...weatherResult };
  expectedResult.report.visibility.from = 40;
  expectedResult.report.visibility.to = 100;
  expect(result).toEqual(expectedResult);
});

test('getWeatherFromStation - should error when api call fails', async () => {
  const mockedSites = vi.fn().mockRejectedValue('Failed');
  // const mockedObservations = vi.fn().mockResolvedValue(weatherObservation);
  mockedGot.mockReturnValueOnce(
    partiallyMock<CancelableRequest>({ json: mockedSites })
  );
  // mockedGot.mockReturnValueOnce(
  //   partiallyMock<CancelableRequest>({ json: mockedObservations })
  // );

  await expect(
    async () =>
      await getWeatherFromStation({
        longitude: -0.3037457177660413, // surbiton ,
        latitude: 51.39281460811332,
      })
  ).rejects.toThrowError('Failed');
});
