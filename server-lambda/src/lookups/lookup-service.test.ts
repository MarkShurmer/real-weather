import { convertPostcodeToGps, getWeatherFromStation } from '@lookups/lookup-service';
import { weatherSites } from '@lookups/__mocks__/weather-sites';
import {
    weatherObsExcellentVisibility,
    weatherObsGoodVisibility,
    weatherObsModerateVisibility,
    weatherObsNoParam,
    weatherObsPoorVisibility,
    weatherObsUnknownVisibility,
    weatherObsVeryGoodVisibility,
    weatherObsVeryPoorVisibility,
    weatherObservation,
} from '@lookups/__mocks__/weather-observations';
import { weatherResult, weatherResultHighVis } from './__mocks__/weather-result';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { getSettings } from '@settings/settings';
import { logger } from '@common/logger';
import { getDistance } from 'geolib';

jest.mock('@common/date-service', () => ({
    getDateNow: jest.fn().mockReturnValue(new Date('25-may-2023 11:00:00')),
}));
jest.mock('@common/logger');
jest.mock('geolib');

describe('Lookup service', () => {
    const axiosMock = new MockAdapter(axios, { onNoMatch: 'throwException' });
    const settings = getSettings();
    const postCodeUrl = new RegExp(`${settings.postCodeInfoUrl}/*`);

    beforeAll(() => {
        (getDistance as jest.Mock).mockReturnValueOnce(10).mockReturnValueOnce(50).mockReturnValueOnce(100);
    });

    afterEach(() => {
        axiosMock.reset();
    });

    describe('covertPostcodeToGps', () => {
        it('convertPostcodeToGps - should give gps co-ord for legit postcode', async () => {
            axiosMock.onGet(postCodeUrl).reply(200, { result: { longitude: 20, latitude: 10 } });
            const result = await convertPostcodeToGps('sw1e 1dd');
            expect(result.latitude).toBe(10);
        });

        it('convertPostcodeToGps - should give error for not real postcode', async () => {
            axiosMock.onGet(postCodeUrl).reply(404, 'Unable to use flutter');

            await expect(async () => {
                await convertPostcodeToGps('sw11zz');
            }).rejects.toThrowError('Request failed with status code 404');
        });
    });

    describe('getWeatherFromStation', () => {
        // beforeAll(() => {
        //     axiosMock.onGet(settings.observationsSitesUrl).reply(200, weatherSites);
        //     axiosMock.onGet(settings.observationsUrl).reply(200, weatherObservation);
        // });

        it('should get obs for nearest site to edinburgh', async () => {
            axiosMock.onGet(settings.observationsSitesUrl).reply(200, weatherSites);
            axiosMock.onGet(settings.observationsUrl).reply(200, weatherObservation);
            const result = await getWeatherFromStation({
                longitude: -3.188526044893534, // edinburgh
                latitude: 55.954197513164644,
            });

            expect(result).toEqual(weatherResult);
            expect(logger.info).toHaveBeenCalledWith('Getting weather observations using url obs_url');
        });

        it('should get obs for nearest site to surbiton', async () => {
            axiosMock.onGet(settings.observationsSitesUrl).reply(200, weatherSites);
            axiosMock.onGet(settings.observationsUrl).reply(200, weatherObservation);
            const result = await getWeatherFromStation({
                longitude: -0.3037457177660413, // surbiton ,
                latitude: 51.39281460811332,
            });
            expect(result).toEqual(weatherResult);
        });

        it('should get obs for unknown visibility', async () => {
            axiosMock.onGet(settings.observationsSitesUrl).reply(200, weatherSites);
            axiosMock.onGet(settings.observationsUrl).reply(200, weatherObsUnknownVisibility);

            const result = await getWeatherFromStation({
                longitude: -0.3037457177660413, // surbiton ,
                latitude: 51.39281460811332,
            });

            const expectedResult = { ...weatherResult };
            expectedResult.report.visibility.from = 0;
            expectedResult.report.visibility.to = 0;
            expect(result).toEqual(expectedResult);
        });

        it('should get obs for very poor visibility', async () => {
            axiosMock.onGet(settings.observationsSitesUrl).reply(200, weatherSites);
            axiosMock.onGet(settings.observationsUrl).reply(200, weatherObsVeryPoorVisibility);

            const result = await getWeatherFromStation({
                longitude: -0.3037457177660413, // surbiton ,
                latitude: 51.39281460811332,
            });

            const expectedResult = { ...weatherResult };
            expectedResult.report.visibility.from = 0;
            expectedResult.report.visibility.to = 1;
            expect(result).toEqual(expectedResult);
        });

        it('should get obs for poor visibility', async () => {
            axiosMock.onGet(settings.observationsSitesUrl).reply(200, weatherSites);
            axiosMock.onGet(settings.observationsUrl).reply(200, weatherObsPoorVisibility);

            const result = await getWeatherFromStation({
                longitude: -0.3037457177660413, // surbiton ,
                latitude: 51.39281460811332,
            });

            const expectedResult = { ...weatherResult };
            expectedResult.report.visibility.from = 1;
            expectedResult.report.visibility.to = 4;
            expect(result).toEqual(expectedResult);
        });

        it('should get obs for moderate visibility', async () => {
            axiosMock.onGet(settings.observationsSitesUrl).reply(200, weatherSites);
            axiosMock.onGet(settings.observationsUrl).reply(200, weatherObsModerateVisibility);

            const result = await getWeatherFromStation({
                longitude: -0.3037457177660413, // surbiton ,
                latitude: 51.39281460811332,
            });

            const expectedResult = { ...weatherResult };
            expectedResult.report.visibility.from = 4;
            expectedResult.report.visibility.to = 10;
            expect(result).toEqual(expectedResult);
        });

        it('should get obs for good visibility', async () => {
            axiosMock.onGet(settings.observationsSitesUrl).reply(200, weatherSites);
            axiosMock.onGet(settings.observationsUrl).reply(200, weatherObsGoodVisibility);

            const result = await getWeatherFromStation({
                longitude: -0.3037457177660413, // surbiton ,
                latitude: 51.39281460811332,
            });

            const expectedResult = { ...weatherResult };
            expectedResult.report.visibility.from = 10;
            expectedResult.report.visibility.to = 20;
            expect(result).toEqual(expectedResult);
        });

        it('should get obs for very good visibility', async () => {
            axiosMock.onGet(settings.observationsSitesUrl).reply(200, weatherSites);
            axiosMock.onGet(settings.observationsUrl).reply(200, weatherObsVeryGoodVisibility);

            const result = await getWeatherFromStation({
                longitude: -0.3037457177660413, // surbiton ,
                latitude: 51.39281460811332,
            });

            const expectedResult = { ...weatherResult };
            expectedResult.report.visibility.from = 20;
            expectedResult.report.visibility.to = 40;
            expect(result).toEqual(expectedResult);
        });

        it('should get obs for excellent visibility', async () => {
            axiosMock.onGet(settings.observationsSitesUrl).reply(200, weatherSites);
            axiosMock.onGet(settings.observationsUrl).reply(200, weatherObsExcellentVisibility);

            const result = await getWeatherFromStation({
                longitude: -0.3037457177660413, // surbiton ,
                latitude: 51.39281460811332,
            });

            expect(result).toEqual(weatherResultHighVis);
        });

        it('should get obs even when params not set', async () => {
            axiosMock.onGet(settings.observationsSitesUrl).reply(200, weatherSites);
            axiosMock.onGet(settings.observationsUrl).reply(200, weatherObsNoParam);

            const result = await getWeatherFromStation({
                longitude: -0.3037457177660413, // surbiton ,
                latitude: 51.39281460811332,
            });

            expect(result).toEqual(weatherResultHighVis);
        });

        it('should error when obs api call fails', async () => {
            axiosMock.onGet(settings.observationsUrl).reply(500, weatherObservation);
            axiosMock.onGet(settings.observationsSitesUrl).reply(200, weatherSites);

            await expect(async () => {
                await getWeatherFromStation({
                    longitude: -0.3037457177660413, // surbiton ,
                    latitude: 51.39281460811332,
                });
            }).rejects.toThrowError('Request failed with status code 500');
        });

        it('should error when obs api call fails to find site', async () => {
            axiosMock.onGet(settings.observationsUrl).reply(404);
            axiosMock.onGet(settings.observationsSitesUrl).reply(200, weatherSites);

            await expect(async () => {
                await getWeatherFromStation({
                    longitude: -0.3037457177660413, // surbiton ,
                    latitude: 51.39281460811332,
                });
            }).rejects.toThrowError('Unable to get observers for site 0 as site not found');
        });

        it('should error when obs sites api call fails', async () => {
            axiosMock.onGet(settings.observationsUrl).reply(200, weatherObservation);
            axiosMock.onGet(settings.observationsSitesUrl).reply(500);

            await expect(async () => {
                await getWeatherFromStation({
                    longitude: -0.3037457177660413, // surbiton ,
                    latitude: 51.39281460811332,
                });
            }).rejects.toThrowError('Request failed with status code 500');
        });
    });
});
