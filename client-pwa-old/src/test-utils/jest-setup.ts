
import { expect, afterEach, jest } from '@jest/globals';
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  jest.useRealTimers();
});