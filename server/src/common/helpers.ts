export function toPascalCase(s: string) {
    return s.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
        return g1.toUpperCase() + g2.toLowerCase();
    });
}

// export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// export const applyChanges = <S, K extends keyof S>(state: S, changes: Pick<S, K>): S =>
//     Object.assign({}, state, changes);

/** Simple mocking inspired by https://www.npmjs.com/package/jest-mock-extended
 * which has mockDeep<T>() for excellent autocompletion support but had other issues. */

/* atomic values (not made Partial when mocking) */
type Atomic = boolean | string | number | symbol | Date;

/** Mocks an indexed type (e.g. Object or Array), making it recursively Partial - note question mark  */
type PartialMockIndexed<T> = {
    [P in keyof T]?: PartialMock<T[P]>;
};

/** Mock any T */
export type PartialMock<T> = T extends Atomic ? T : PartialMockIndexed<T>;

/** Utility method for autocompleting a PartialMock<T> and returning it as a T */
export function partiallyMock<T>(mock: PartialMock<T>) {
    return mock as T;
}
