import { Routes } from '@common/routes';
import { lookupRoutes, weatherHandler } from '@lookups/lookup-routes';
import { convertPostcodeToGps, getWeatherFromStation } from '@lookups/lookup-service';
import { partiallyMock } from '@common/helpers';
import { GPS, Weather, WeatherRequest } from '@lookups/types';
import { FastifyInstance, FastifyReply } from 'fastify';
import { AxiosError } from 'axios';

jest.mock('@lookups/lookup-service');

describe('Lookup routes', () => {
    let mockedConvert: jest.MockedFunction<(postcode: string) => Promise<GPS>>;
    let mockedWeather: jest.MockedFunction<typeof getWeatherFromStation>;
    const mockSend = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ send: mockSend });
    const mockLog = { error: jest.fn(), info: jest.fn() };
    const baseDate = new Date();

    beforeAll(() => {
        mockedConvert = jest.mocked(convertPostcodeToGps);
        mockedWeather = jest.mocked(getWeatherFromStation);
    });

    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(baseDate);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should register weather handler', async () => {
        const mockGet = jest.fn();

        await lookupRoutes(partiallyMock<FastifyInstance>({ get: mockGet, log: mockLog }));

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
        mockedConvert.mockRejectedValue(new AxiosError('Invalid'));

        await weatherHandler(
            partiallyMock<WeatherRequest>({
                query: { postcode: 'sw1e 1aa' },
                log: mockLog,
            }),
            partiallyMock<FastifyReply>({ code: mockStatus }),
        );

        expect(mockLog.error).toHaveBeenCalledWith('Unable to use postcode sw1e 1aa due to Invalid');
        expect(mockStatus).toBeCalledWith(502);
        expect(mockSend).toHaveBeenCalledWith({ error: 'Unable to use that postcode' });
    });

    it('should get geo position from handler', async () => {
        mockedConvert.mockResolvedValueOnce({ latitude: 4, longitude: 10.9 });
        mockedWeather.mockResolvedValueOnce({
            elevation: 1,
            date: baseDate,
            latLong: { latitude: 1, longitude: 2 },
            name: 'Elysse',
        } as unknown as Weather);

        await weatherHandler(
            partiallyMock<WeatherRequest>({ query: { postcode: 'sw1e 1aa' }, log: mockLog }),
            partiallyMock<FastifyReply>({ code: mockStatus, send: mockSend }),
        );

        expect(mockSend).toHaveBeenCalledWith({
            date: baseDate,
            elevation: 1,
            latLong: {
                latitude: 1,
                longitude: 2,
            },
            name: 'Elysse',
        });
    });
});
