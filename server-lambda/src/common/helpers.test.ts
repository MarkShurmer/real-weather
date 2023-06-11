import { toPascalCase } from '@common/helpers';

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
});
