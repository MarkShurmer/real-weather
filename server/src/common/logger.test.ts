import pino from 'pino';

jest.mock('pino', () => ({
    ...jest.requireActual('pino'),
    __esModule: true,
    default: jest.fn().mockReturnValue({ info: jest.fn() }),
}));

describe('Logger', () => {
    it('should create logger correctly', async () => {
        const logger = await (await import('@common/logger')).logger;
        logger.info('ggggggg');

        expect(pino).toHaveBeenCalledWith({
            name: 'Real weather',
            level: 'debug',
        });
    });
});
