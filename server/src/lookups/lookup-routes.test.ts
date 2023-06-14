import { Routes } from '@common/routes';
import { lookupRoutes, weatherHandler } from '@lookups/lookup-routes';
import { convertPostcodeToGps, getWeatherFromStation } from '@lookups/lookup-service';
import { partiallyMock } from '@common/helpers';
import { GPS, Weather, WeatherRequest } from '@lookups/types';
import { FastifyInstance, FastifyReply } from 'fastify';

jest.mock('@lookups/lookup-service');

describe('Lookup routes', () => {
    let mockedConvert: jest.MockedFunction<(postcode: string) => Promise<GPS>>;
    let mockedWeather: jest.MockedFunction<typeof getWeatherFromStation>;
    const mockErrorLog = jest.fn();
    const mockStatus = jest.fn();
    const mockLog = { error: mockErrorLog };

    beforeAll(() => {
        mockedConvert = jest.mocked(convertPostcodeToGps);
        mockedWeather = jest.mocked(getWeatherFromStation);
        jest.useFakeTimers().setSystemTime(new Date('2023-04-04'));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should register weather handler', async () => {
        const mockGet = jest.fn();

        await lookupRoutes(partiallyMock<FastifyInstance>({ get: mockGet }));

        expect(mockGet).toHaveBeenCalledWith(
            Routes.Weather,
            {
                schema: {
                    querystring: {
                        type: 'object',
                        properties: {
                            postcode: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
            weatherHandler,
        );
    });

    it('should get message when error from handler', async () => {
        const error = new Error('Invalid');
        mockedConvert.mockRejectedValue(error);

        const result = await weatherHandler(
            partiallyMock<WeatherRequest>({
                query: { postcode: 'sw1e 1aa' },
                log: mockLog,
            }),
            partiallyMock<FastifyReply>({ code: mockStatus }),
        );

        expect(result).toBe('Unable to use that postcode');
        expect(mockErrorLog).toHaveBeenCalledWith(error);
        expect(mockStatus).toBeCalledWith(404);
    });

    it('should get geo position from handler', async () => {
        mockedConvert.mockResolvedValueOnce({ latitude: 4, longitude: 10.9 });
        mockedWeather.mockResolvedValueOnce({
            elevation: 1,
            date: new Date('2023-05-01'),
            latLong: { latitude: 1, longitude: 2 },
            name: 'Elysse',
        } as unknown as Weather);

        const result = await weatherHandler(
            partiallyMock<WeatherRequest>({ query: { postcode: 'sw1e 1aa' } }),
            partiallyMock<FastifyReply>({ code: mockStatus }),
        );

        expect(result).toEqual({
            date: new Date('2023-05-01'),
            elevation: 1,
            latLong: {
                latitude: 1,
                longitude: 2,
            },
            name: 'Elysse',
        });
    });
});
