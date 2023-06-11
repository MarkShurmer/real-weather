export function toPascalCase(s: string) {
  return s.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
  });
}

/**
 * gets the context for all resolvers
 * @param req
 */
// export async function getContext({ request }): Promise<GraphQLContext | null> {
//     const authHeader = request.headers.get('authorization');

//     if (!authHeader) {
//         return { user: null };
//     }

//     // Get the user token from the headers.

//     const userInfo = await getUserFromHeader(authHeader);

//     if (!userInfo) {
//         return { user: null };
//     }
//     // get user from db
//     const userFromDb = await getUserFromDb(userInfo?.userId);
//     const user = { ...userInfo, ...userFromDb };

//     if (user) {
//         logger.info('Logged in ', userInfo.userId);
//     }

//     // add the user to the context
//     return { user };
// }

export const applyChanges = <S, K extends keyof S>(
  state: S,
  changes: Pick<S, K>
): S => Object.assign({}, state, changes);

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
