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

// export const applyChanges = <S, K extends keyof S>(state: S, changes: Pick<S, K>): S =>
//     Object.assign({}, state, changes);
