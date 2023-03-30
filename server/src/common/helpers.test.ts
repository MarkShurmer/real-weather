import { toPascalCase } from 'common/helpers';
import { describe, it } from '@jest/globals';

describe('Helpers', () => {
    describe('toPascalCase', () => {
        it('should convert all lowercase', () => {
            const result = toPascalCase('aaaa');
            expect(result).toEqual('Aaaa');
        });

        it('should convert all uppercase', () => {
            const result = toPascalCase('BBBB');
            expect(result).toEqual('Bbbb');
        });

        it('should convert mixed case', () => {
            const result = toPascalCase('PRETTy');
            expect(result).toEqual('Pretty');
        });

        it('should convert mixed case with spaces', () => {
            const result = toPascalCase('tHe PRETTy reckLESS');
            expect(result).toEqual('The Pretty Reckless');
        });

        it('should convert empty', () => {
            const result = toPascalCase('');
            expect(result).toEqual('');
        });
    });

    // describe('getContext', function () {
    //     const mockedGet = jest.fn().mockReturnValue('');
    //     let mockedGetUserFromDb = jest.mocked(getUserFromDb);
    //     let mockedGetUserFromHeader = jest.mocked(getUserFromHeader);
    //     let mockedAuthHeader = {
    //         get: mockedGet,
    //     };

    //     beforeAll(() => {
    //         jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
    //         mockedGetUserFromDb.mockResolvedValue({
    //             ...createEntityInfo('Nat Sciver', true),
    //             name: 'Nat Sciver',
    //             userId: '1234',
    //             status: UserStatusType.NEW,
    //             password: 'bbbb',
    //             _id: '56fd',
    //         } as unknown as DbUser);
    //         mockedGetUserFromHeader.mockResolvedValue({
    //             provider: 'Acme',
    //             userId: '1234',
    //         } as UserProviderInfo);
    //     });

    //     afterAll(() => {
    //         jest.useRealTimers();
    //         // Unlock Time
    //     });

    //     it('should get null when nothing in req headers', async function () {
    //         const result = await getContext({ request: { headers: mockedAuthHeader } });
    //         expect(result).toEqual({ user: null });
    //     });

    //     it('should get null when header invalid is null', async function () {
    //         mockedGetUserFromHeader.mockResolvedValue(null);
    //         const result = await getContext({ request: { headers: mockedAuthHeader } });
    //         expect(result).toEqual({ user: null });
    //     });

    //     it('should get exception when thrown', async function () {
    //         mockedGetUserFromHeader.mockRejectedValue(new Error('Zak Crawley'));
    //         const result = await getContext({ request: { headers: mockedAuthHeader } });
    //         expect(result).toEqual({ user: null });
    //     });

    //     it('should get user in context', async function () {
    //         mockedGetUserFromHeader.mockResolvedValue({
    //             provider: 'Acme',
    //             userId: '1234',
    //         });
    //         mockedGet.mockReturnValueOnce('Bearer abc123');

    //         const result = await getContext({ request: { headers: mockedAuthHeader } });
    //         expect(result).toEqual({
    //             user: {
    //                 name: 'Nat Sciver',
    //                 status: UserStatusType.NEW,
    //                 provider: 'Acme',
    //                 created: new Date(),
    //                 userId: '1234',
    //                 password: 'bbbb',
    //                 _id: '56fd',
    //                 whoChanged: 'Nat Sciver',
    //             },
    //         });
    //         expect(mockedGetUserFromDb).toHaveBeenCalledWith('1234');
    //         expect(mockedGetUserFromHeader).toHaveBeenCalledWith('Bearer abc123');
    //     });
    // });
});
