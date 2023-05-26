import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { logger } from '@common/logger';
import { convertPostcodeToGps, getWeatherFromStation } from '@lookups/lookup-service';

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
export const getWeatherHandler = async (event: APIGatewayProxyEvent) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getWeatherHandler only accepts GET method, you tried: ${event.httpMethod}`);
    }

    if (!event.queryStringParameters || !event.queryStringParameters.postcode) {
        throw new Error('postcode needs to be supplied as a parameter');
    }

    logger.info('received:', event);

    const postcode = event.queryStringParameters.postcode;
    logger.info(`Using postcode ${postcode}`);

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(null),
    };

    try {
        const latLong = await convertPostcodeToGps(postcode);
        response.body = JSON.stringify(await getWeatherFromStation(latLong));
    } catch (err) {
        logger.error(err);
        response.statusCode = 404;
        response.body = 'Unable to use that postcode';
    }

    logger.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
