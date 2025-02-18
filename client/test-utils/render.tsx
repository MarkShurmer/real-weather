import { render as testingLibraryRender } from '@testing-library/react';
import { CachePolicies, IncomingOptions, Provider } from 'use-http';
import { MantineProvider } from '@mantine/core';
import { theme } from '../src/theme';

export function render(ui: React.ReactNode) {
  const httpOptions: IncomingOptions = { cachePolicy: CachePolicies.NO_CACHE };

  return testingLibraryRender(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme}>
        <Provider options={httpOptions}> {children}</Provider>
      </MantineProvider>
    ),
  });
}
