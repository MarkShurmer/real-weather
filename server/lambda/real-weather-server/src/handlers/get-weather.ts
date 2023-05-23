import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { logger } from 'common/logger';

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
export const getWeatherHandler = async (event: APIGatewayProxyEvent) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }

    logger.info('received:', event);

    const { postcode } = event.query;
    logger.info(`Using postcode ${postcode}`);

    try {
        const latLong = await convertPostcodeToGps(postcode);
        return await getWeatherFromStation(latLong);
    } catch (err) {
        request.log.error(err);
        reply.code(404);
        return 'Unable to use that postcode';
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(items),
    };

    logger.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
