import { partiallyMock } from '@test-utils/test-helpers';
import { getWeatherHandler } from './get-weather';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { logger } from '@common/logger';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { getSettings } from '@settings/settings';
import { weatherSites } from '@lookups/__mocks__/weather-sites';
import { weatherObservation, weatherResult } from '@lookups/__mocks__';
import { Weather } from '@/lookups/types';

jest.mock('@common/date-service', () => ({
    getDateNow: jest.fn().mockReturnValue(new Date('25-may-2023 11:00:00')),
}));
jest.mock('@common/logger');

const axiosMock = new MockAdapter(axios, { onNoMatch: 'throwException' });
const settings = getSettings();
const url = new RegExp(`${settings.postCodeInfoUrl}/*`);

describe('Get weather', () => {
    beforeAll(() => {
        axiosMock.onGet(settings.observationsSitesUrl).reply(200, weatherSites);
        axiosMock.onGet(settings.observationsUrl).reply(200, weatherObservation);
    });

    it('should give error with post', async () => {
        axiosMock.onGet(url).reply(200, { result: { longitude: 20, latitude: 30 } });
        await expect(
            async () => await getWeatherHandler(partiallyMock<APIGatewayProxyEvent>({ httpMethod: 'POST' })),
        ).rejects.toThrowError('getWeatherHandler only accepts GET method, you tried: POST');
    });

    it('should give error when postcode not specified', async () => {
        axiosMock.onGet(url).reply(200, { result: { longitude: 20, latitude: 30 } });
        await expect(
            async () => await getWeatherHandler(partiallyMock<APIGatewayProxyEvent>({ httpMethod: 'GET' })),
        ).rejects.toThrowError('postcode needs to be supplied as a parameter');
    });

    it('should give error when postcode lookup fails', async () => {
        axiosMock.onGet(url).reply(500, 'Server failure');
        const result = await getWeatherHandler(
            partiallyMock<APIGatewayProxyEvent>({ httpMethod: 'GET', queryStringParameters: { postcode: 'SW11ED' } }),
        );

        expect(result.statusCode).toBe(404);
        expect(result.body).toBe('Unable to use that postcode');
    });

    it('should give result', async () => {
        axiosMock.onGet(url).reply(200, { result: { longitude: 20, latitude: 30 } });
        const result = await getWeatherHandler(
            partiallyMock<APIGatewayProxyEvent>({ httpMethod: 'GET', queryStringParameters: { postcode: 'SW11ED' } }),
        );
        const resultsBody = JSON.parse(result.body) as Weather;
        resultsBody.date = new Date(resultsBody.date);

        expect(result.statusCode).toBe(200);
        expect(resultsBody).toEqual(weatherResult);
        expect(logger.info).toHaveBeenCalledWith('received:', {
            httpMethod: 'GET',
            queryStringParameters: { postcode: 'SW11ED' },
        });
        expect(logger.info).toHaveBeenCalledWith('Using postcode SW11ED');
        expect(logger.info).toHaveBeenCalledWith('Getting weather observations using url obs_url');
    });
});
