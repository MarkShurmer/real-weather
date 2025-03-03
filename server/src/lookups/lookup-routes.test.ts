import { Routes } from '@common/routes';
import { lookupRoutes, weatherHandler, gpsHandler } from '@lookups/lookup-routes';
import { convertPostcodeToGps, getWeatherFromStation } from '@lookups/lookup-service';
import { partiallyMock } from '@common/helpers';
import { GpsRequest, LatLong, Weather, WeatherRequest } from '@lookups/types';
import { FastifyInstance, FastifyReply } from 'fastify';
import { AxiosError } from 'axios';

jest.mock('@lookups/lookup-service');

describe('Lookup routes', () => {
    let mockedConvert: jest.MockedFunction<(postcode: string) => Promise<LatLong>>;
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

    describe('Weather handler', () => {
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
                                lat: {
                                    type: 'number',
                                },
                                lon: {
                                    type: 'number',
                                },
                            },
                            required: ['lat', 'lon'],
                        },
                    },
                },
                weatherHandler,
            );
        });

        it('should get message when lat is too low', async () => {
            await weatherHandler(
                partiallyMock<WeatherRequest>({
                    query: { lat: -91, lon: 1 },
                    log: mockLog,
                }),
                partiallyMock<FastifyReply>({ code: mockStatus, send: mockSend }),
            );

            expect(mockLog.error).toHaveBeenCalledWith('Incorrect latitude of -91 supplied');
            expect(mockStatus).toBeCalledWith(502);
            expect(mockSend).toHaveBeenCalledWith({ error: 'Incorrect latitude supplied' });
        });

        it('should get message when lat is too high', async () => {
            await weatherHandler(
                partiallyMock<WeatherRequest>({
                    query: { lat: 108, lon: 1 },
                    log: mockLog,
                }),
                partiallyMock<FastifyReply>({ code: mockStatus, send: mockSend }),
            );

            expect(mockLog.error).toHaveBeenCalledWith('Incorrect latitude of 108 supplied');
            expect(mockStatus).toBeCalledWith(502);
            expect(mockSend).toHaveBeenCalledWith({ error: 'Incorrect latitude supplied' });
        });

        it('should get message when longitude is too low', async () => {
            await weatherHandler(
                partiallyMock<WeatherRequest>({
                    query: { lat: 12, lon: -181 },
                    log: mockLog,
                }),
                partiallyMock<FastifyReply>({ code: mockStatus, send: mockSend }),
            );

            expect(mockLog.error).toHaveBeenCalledWith('Incorrect longitude of -181 supplied');
            expect(mockStatus).toBeCalledWith(502);
            expect(mockSend).toHaveBeenCalledWith({ error: 'Incorrect longitude supplied' });
        });

        it('should get message when longitude is too high', async () => {
            await weatherHandler(
                partiallyMock<WeatherRequest>({
                    query: { lat: 10, lon: 199 },
                    log: mockLog,
                }),
                partiallyMock<FastifyReply>({ code: mockStatus, send: mockSend }),
            );

            expect(mockLog.error).toHaveBeenCalledWith('Incorrect longitude of 199 supplied');
            expect(mockStatus).toBeCalledWith(502);
            expect(mockSend).toHaveBeenCalledWith({ error: 'Incorrect longitude supplied' });
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
                partiallyMock<WeatherRequest>({ query: { lat: 29.3, lon: 12 }, log: mockLog }),
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

    describe('Gps handler', () => {
        beforeAll(() => {
            mockedConvert.mockReset();
        });

        it('should register gps handler', async () => {
            const mockGet = jest.fn();

            await lookupRoutes(partiallyMock<FastifyInstance>({ get: mockGet, log: mockLog }));

            expect(mockGet).toHaveBeenCalledWith(
                Routes.Gps,
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
                gpsHandler,
            );
        });

        it('should get message when error from handler', async () => {
            mockedConvert.mockRejectedValueOnce(new AxiosError('Invalid'));

            await gpsHandler(
                partiallyMock<GpsRequest>({ query: { postcode: 'sw1e 1aa' }, log: mockLog }),
                partiallyMock<FastifyReply>({ code: mockStatus, send: mockSend }),
            );

            expect(mockLog.error).toHaveBeenCalledWith('Unable to use postcode sw1e 1aa due to Invalid');
            expect(mockStatus).toBeCalledWith(502);
            expect(mockSend).toHaveBeenCalledWith({ error: 'Unable to use that postcode' });
        });

        it('should get geo position from handler', async () => {
            mockedConvert.mockResolvedValueOnce({ latitude: 4, longitude: 10.9 });

            await gpsHandler(
                partiallyMock<GpsRequest>({ query: { postcode: 'sw1e 1aa' }, log: mockLog }),
                partiallyMock<FastifyReply>({ code: mockStatus, send: mockSend }),
            );

            expect(mockSend).toHaveBeenCalledWith({
                latitude: 4,
                longitude: 10.9,
            });
        });
    });
});
