import React, {ReactNode} from 'react';
import {ThemeProvider} from '@rneui/themed';
import {RenderOptions, render} from '@testing-library/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RecoilRoot} from 'recoil';

const AllTheProviders = ({children}: {children: ReactNode}) => {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
};

const customRender = (
  ui: React.ReactElement<unknown, string | React.JSXElementConstructor<any>>,
  options: RenderOptions,
) => render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
