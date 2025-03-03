import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

const fetchMocker = createFetchMock(vi);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

// const mockGeolocation = {
//   getCurrentPosition: vi.fn().mockImplementation((callback: GeoLocationCallback) => callback),
//   watchPosition: vi.fn(),
// };

// Mock the geolocation object
const mockedGeolocation = {
  getCurrentPosition: vi.fn((success, _error, _options) => {
    success({
      coords: {
        latitude: 0,
        longitude: 0,
        accuracy: 0,
      },
    });
  }),
  watchPosition: vi.fn(),
};
//Overwrite the properties on naviagtor
Object.defineProperty(global.navigator, 'geolocation', {
  writable: true,
  value: mockedGeolocation,
});

Object.defineProperty(global.navigator, 'permissions', {
  writable: true,
  value: {
    query: vi.fn().mockImplementation(() => Promise.resolve({ state: 'granted' })),
  },
});

afterEach(() => {
  cleanup();
  fetchMocker.resetMocks();
});
