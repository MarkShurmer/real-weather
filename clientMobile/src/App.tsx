import React from 'react';
import {ThemeProvider} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Home} from './Home';
import {RecoilRoot} from 'recoil';

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <SafeAreaProvider>
          <Home />
        </SafeAreaProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
