import { MutableSnapshot, RecoilValue, useRecoilValue } from 'recoil';
import { act } from './custom-render';
import { jest } from '@jest/globals';
import { useEffect } from 'react';

// act and advance jest timers
export function flushPromisesAndTimers(): Promise<unknown> {
    return act(
        () =>
            new Promise((resolve) => {
                setTimeout(resolve, 100);
                jest.runAllTimers();
            }),
    );
}

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
export type RecoilInitatior = (mutableSnapshot: MutableSnapshot) => void;
export type RecoilChangeEvent<T> = (value: T) => void;

export type RecoilObserverProps<T> = {
    node: RecoilValue<T>;
    onChange: RecoilChangeEvent<T>;
};

export const RecoilObserver = (props: RecoilObserverProps<unknown>) => {
    const { node, onChange } = props;
    const value = useRecoilValue(node);
    useEffect(() => onChange(value), [onChange, value]);
    return null;
};
