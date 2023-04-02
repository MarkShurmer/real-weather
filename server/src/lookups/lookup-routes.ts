import { Routes } from 'common/routes';
import type { FastifyInstance } from 'fastify';
import { convertPostcodeToGps } from 'lookups/lookup-service';
import { ParamsInterface, WeatherRequest } from './types';

export async function weatherHandler(request: WeatherRequest) {
  const { postcode } = request.params;

  try {
    const latLong = await convertPostcodeToGps(postcode);
    console.log(`l & l is ${latLong.latitude} ${latLong.longitude}`);
    return latLong;
  } catch (err) {
    request.log.error(err);
    return 'Unable to use that postcode';
  }
}

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 */
export async function lookupRoutes(fastify: FastifyInstance) {
  fastify.get<{ Params: ParamsInterface }>(Routes.Weather, weatherHandler);
}
