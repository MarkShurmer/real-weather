import { getDateNow } from '@common/date-service';
import { sleep } from '@common/helpers';

describe('Date service', () => {
    it('should create a new date with specified time', () => {
        jest.useFakeTimers().setSystemTime(new Date('01-may-2023 11:00'));
        const result = getDateNow();

        expect(result.toISOString()).toBe('2023-05-01T10:00:00.000Z');
        jest.useRealTimers(); // BST
    });

    it('should just get current date', async () => {
        const dateNow = new Date().getTime();
        await sleep(5);
        const result = getDateNow().getTime();

        const diff = result - dateNow;
        expect(diff).toBeGreaterThan(0);
        expect(diff).toBeLessThan(100);
    });
});
