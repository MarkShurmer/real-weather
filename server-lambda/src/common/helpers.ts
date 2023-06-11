export function toPascalCase(s: string) {
    return s.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
        return g1.toUpperCase() + g2.toLowerCase();
    });
}

// export const applyChanges = <S, K extends keyof S>(state: S, changes: Pick<S, K>): S =>
//     Object.assign({}, state, changes);

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
