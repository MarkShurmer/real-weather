import { convertPostcodeToGps, getWeatherFromStation } from '@lookups/lookup-service';
import { weatherSites } from './__mocks__/waether-sites';
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
} from './__mocks__/weather-observations';
import { Observations_Sites_Url, Observations_Url, Postcode_Info_Url } from '@common/constants';
import { weatherResult, weatherResultHighVis } from './__mocks__/weather-result';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

jest.mock('@common/date-service', () => ({
    getDateNow: jest.fn().mockReturnValue(new Date()),
}));

describe('Lookup service', () => {
    let axiosMock: MockAdapter;

    beforeAll(() => {
        axiosMock = new MockAdapter(axios);
    });

    describe('convertPostcodeToGps', () => {
        it('Gives gps co-ord for legit postcode', async () => {
            axiosMock.onGet(`${Postcode_Info_Url}/sw1e1dd`).replyOnce(200, { result: { longitude: 20, latitude: 10 } });

            const result = await convertPostcodeToGps('sw1e1dd');
            expect(result.latitude).toBe(10);
            expect(result.longitude).toBe(20);
        });

        it('Gives error for not real postcode', async () => {
            axiosMock.onGet(`${Postcode_Info_Url}/sw11zz`).replyOnce(404);

            await expect(async () => await convertPostcodeToGps('sw11zz')).rejects.toThrowError(
                'Request failed with status code 404',
            );
        });
    });

    describe('getWeatherFromStation', () => {
        const surreySiteUrl = Observations_Url.replace(':locationId', '3781');

        it('get obs for nearest site to edinburgh', async () => {
            axiosMock.onGet(Observations_Sites_Url).replyOnce(200, weatherSites);
            axiosMock.onGet(Observations_Url.replace(':locationId', '3066')).replyOnce(200, weatherObservation);

            const result = await getWeatherFromStation({
                longitude: -3.188526044893534, // edinburgh
                latitude: 55.954197513164644,
            });

            expect(result).toEqual(weatherResult);
        });

        it('get obs for nearest site to surbiton', async () => {
            axiosMock.onGet(Observations_Sites_Url).replyOnce(200, weatherSites);
            axiosMock.onGet(surreySiteUrl).replyOnce(200, weatherObservation);

            const result = await getWeatherFromStation({
                longitude: -0.3037457177660413, // surbiton ,
                latitude: 51.39281460811332,
            });
            expect(result).toEqual(weatherResult);
        });

        it('should get obs for unknown visibility', async () => {
            axiosMock.onGet(Observations_Sites_Url).replyOnce(200, weatherSites);
            axiosMock.onGet(surreySiteUrl).replyOnce(200, weatherObsUnknownVisibility);

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
            axiosMock.onGet(Observations_Sites_Url).replyOnce(200, weatherSites);
            axiosMock.onGet(surreySiteUrl).replyOnce(200, weatherObsVeryPoorVisibility);

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
            axiosMock.onGet(Observations_Sites_Url).replyOnce(200, weatherSites);
            axiosMock.onGet(surreySiteUrl).replyOnce(200, weatherObsPoorVisibility);

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
            axiosMock.onGet(Observations_Sites_Url).replyOnce(200, weatherSites);
            axiosMock.onGet(surreySiteUrl).replyOnce(200, weatherObsModerateVisibility);

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
            axiosMock.onGet(Observations_Sites_Url).replyOnce(200, weatherSites);
            axiosMock.onGet(surreySiteUrl).replyOnce(200, weatherObsGoodVisibility);

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
            axiosMock.onGet(Observations_Sites_Url).replyOnce(200, weatherSites);
            axiosMock.onGet(surreySiteUrl).replyOnce(200, weatherObsVeryGoodVisibility);

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
            axiosMock.onGet(Observations_Sites_Url).replyOnce(200, weatherSites);
            axiosMock.onGet(surreySiteUrl).replyOnce(200, weatherObsExcellentVisibility);

            const result = await getWeatherFromStation({
                longitude: -0.3037457177660413, // surbiton ,
                latitude: 51.39281460811332,
            });

            const expectedResult = { ...weatherResult };
            expectedResult.report.visibility.from = 40;
            expectedResult.report.visibility.to = 100;
            expect(result).toEqual(expectedResult);
        });

        it('should get obs even when params not set', async () => {
            axiosMock.onGet(Observations_Sites_Url).replyOnce(200, weatherSites);
            axiosMock.onGet(surreySiteUrl).replyOnce(200, weatherObsNoParam);

            const result = await getWeatherFromStation({
                longitude: -0.3037457177660413, // surbiton ,
                latitude: 51.39281460811332,
            });

            expect(result).toEqual(weatherResultHighVis);
        });

        it('should error when api call fails', async () => {
            axiosMock.onGet(Observations_Sites_Url).replyOnce(500);

            await expect(
                async () =>
                    await getWeatherFromStation({
                        longitude: -0.3037457177660413, // surbiton ,
                        latitude: 51.39281460811332,
                    }),
            ).rejects.toThrowError('Request failed with status code 500');
        });
    });
});
