import { Routes } from '@common/routes';
import type { FastifyInstance, FastifyReply } from 'fastify';
import { convertPostcodeToGps, getWeatherFromStation } from '@lookups/lookup-service';
import { WeatherQueryInterface, WeatherRequest } from './types';
import { logger } from '@common/logger';

export async function weatherHandler(request: WeatherRequest, reply: FastifyReply) {
    const { postcode } = request.query;
    logger.info(`Using postcode ${postcode}`);

    try {
        const latLong = await convertPostcodeToGps(postcode);
        return await getWeatherFromStation(latLong);
    } catch (err) {
        request.log.error(err);
        reply.code(404);
        return 'Unable to use that postcode';
    }
}

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 */
export async function lookupRoutes(fastify: FastifyInstance) {
    await fastify.get<{ Querystring: WeatherQueryInterface }>(
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
}
