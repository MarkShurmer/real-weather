import { Routes } from '@common/routes';
import type { FastifyInstance, FastifyReply } from 'fastify';
import { convertPostcodeToGps, getWeatherFromStation } from '@lookups/lookup-service';
import {
    GpsHandlerReplyContent,
    GpsHandlerType,
    GpsRequest,
    LatLong,
    WeatherHandlerReplyContent,
    WeatherHandlerType,
    WeatherRequest,
} from './types';

export async function weatherHandler(request: WeatherRequest, reply: FastifyReply<WeatherHandlerReplyContent>) {
    const { lat, lon } = request.query;
    request.log.info(`Getting weather for latitude ${lat} longitude ${lon}`);

    const latLong = { latitude: lat, longitude: lon } as LatLong;
    if (latLong.latitude < -90 || latLong.latitude > 90) {
        request.log.error(`Incorrect latitude of ${latLong.latitude} supplied`);
        return reply.code(502).send({ error: 'Incorrect latitude supplied' });
    }
    if (latLong.longitude < -180 || latLong.longitude > 180) {
        request.log.error(`Incorrect longitude of ${latLong.longitude} supplied`);
        return reply.code(502).send({ error: 'Incorrect longitude supplied' });
    }

    return reply.send(await getWeatherFromStation(latLong));
}

export async function gpsHandler(request: GpsRequest, reply: FastifyReply<GpsHandlerReplyContent>) {
    const { postcode } = request.query;
    request.log.info(`Getting GPS for postcode ${postcode}`);

    let latLong: LatLong;

    try {
        latLong = await convertPostcodeToGps(postcode);
    } catch (err) {
        request.log.error(`Unable to use postcode ${postcode} due to ${(err as Error).message}`);
        return reply.code(502).send({ error: 'Unable to use that postcode' });
    }

    return reply.send(latLong);
}

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 */
export async function lookupRoutes(fastify: FastifyInstance) {
    fastify.get<WeatherHandlerType>(
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
    fastify.get<GpsHandlerType>(
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
}
