import React from 'react';

import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import store from 'Redux/store';

import Start from 'Src/Start';
import AppAuthentication from 'Base/AppAuthentication';
import ReduxLoader from 'Base/ReduxLoader';

import { light } from 'Src/theme';


const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={light}>
      <ReduxLoader models={['setting', 'network']}>
        <AppAuthentication>
          <Start />
        </AppAuthentication>
      </ReduxLoader>
    </ThemeProvider>
  </Provider>
);

export default App;
