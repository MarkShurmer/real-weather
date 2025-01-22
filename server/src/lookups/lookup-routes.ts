import { Routes } from '@common/routes';
import type { FastifyInstance, FastifyReply, RawServerBase } from 'fastify';
import { convertPostcodeToGps, getWeatherFromStation } from '@lookups/lookup-service';
import { GPS, Weather, WeatherQueryInterface, WeatherRequest } from './types';

export async function weatherHandler(request: WeatherRequest, reply: FastifyReply<WeatherHandlerReplyContent>) {
    const { postcode } = request.query;
    request.log.info(`Using postcode ${postcode}`);

    let latLong: GPS;

    try {
        latLong = await convertPostcodeToGps(postcode);
    } catch (err) {
        request.log.error(`Unable to use postcode ${postcode} due to ${(err as Error).message}`);
        return reply.code(202).send({ error: 'Unable to use that postcode' });
    }

    // if (!latLong.latitude || !latLong.longitude) {
    //     request.log.info('Unable to get lat logs for postcode ' + postcode);
    //     return reply.code(202).send({ error: 'Unable to get lat long for that postcode' });
    // }

    return reply.send(await getWeatherFromStation(latLong));
}

export type WeatherHandlerReplyContent = RawServerBase & {
    200: Weather;
    202: { error: string };
};

export type WeatherHandlerType = {
    Querystring: WeatherQueryInterface;
    Reply: WeatherHandlerReplyContent;
};

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 */
export async function lookupRoutes(fastify: FastifyInstance) {
    await fastify.get<WeatherHandlerType>(
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
