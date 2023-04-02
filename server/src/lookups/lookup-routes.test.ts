import { Routes } from 'common/routes';
import { lookupRoutes, weatherHandler } from 'lookups/lookup-routes';
import { describe, it, expect, vi, beforeAll, MockedFunction } from 'vitest';
import { convertPostcodeToGps } from 'lookups/lookup-service';
import { partiallyMock } from 'common/helpers';
import { GPS, WeatherRequest } from 'lookups/types';

vi.mock('lookups/lookup-service');

describe('Lookup routes', () => {
  let mockedConvert: MockedFunction<(postcode: string) => Promise<GPS>>;
  const mockErrorLog = vi.fn();
  const mockLog = { error: mockErrorLog };

  beforeAll(() => {
    mockedConvert = vi.mocked(convertPostcodeToGps);
  });

  it('should register weather handler', async () => {
    const mockGet = vi.fn();

    // @ts-expect-error: partial type
    await lookupRoutes({ get: mockGet });

    expect(mockGet).toHaveBeenCalledWith(Routes.Weather, weatherHandler);
  });

  it('should get message when error from handler', async () => {
    console.log('+= ', mockedConvert);
    const error = new Error('Invalid');
    mockedConvert.mockRejectedValue(error);

    const result = await weatherHandler(
      partiallyMock<WeatherRequest>({
        params: { postcode: 'sw1e 1aa' },
        log: mockLog,
      })
    );

    expect(result).toBe('Unable to use that postcode');
    expect(mockErrorLog).toHaveBeenCalledWith(error);
  });

  it('should get geo position from handler', async () => {
    mockedConvert.mockResolvedValueOnce({ latitude: 4, longitude: 10.9 });

    const result = await weatherHandler(
      partiallyMock<WeatherRequest>({ params: { postcode: 'sw1e 1aa' } })
    );

    expect(result).toEqual({ latitude: 4, longitude: 10.9 });
  });
});
