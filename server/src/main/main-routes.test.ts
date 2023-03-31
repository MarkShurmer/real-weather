import { Routes } from 'common/routes';
import { mainRoutes } from 'main/main-routes';
import { describe, it, expect, vi } from 'vitest';

describe('Main routes', () => {
  it('should register root routes', () => {
    const mockGet = vi.fn();

    // @ts-expect-error
    mainRoutes({ get: mockGet });

    expect(mockGet).toHaveBeenCalledWith(Routes.Root, expect.any(Function));
    expect(mockGet).toHaveBeenCalledWith(Routes.Health, expect.any(Function));
  });
});
