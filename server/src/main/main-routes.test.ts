import { partiallyMock } from 'common/helpers';
import { Routes } from 'common/routes';
import { FastifyInstance } from 'fastify';
import { mainRoutes } from 'main/main-routes';
import { describe, it, expect, vi } from 'vitest';

describe('Main routes', () => {
  it('should register root routes', async () => {
    const mockGet = vi.fn();

    await mainRoutes(partiallyMock<FastifyInstance>({ get: mockGet }));

    expect(mockGet).toHaveBeenCalledWith(Routes.Root, expect.any(Function));
    expect(mockGet).toHaveBeenCalledWith(Routes.Health, expect.any(Function));
  });
});
