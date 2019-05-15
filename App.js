import React, { Component } from 'react';

import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import store from 'Redux/store';

import Start from 'Src/Start';
import AppAuthentication from 'Base/AppAuthentication';

import theme from 'Src/theme';


class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppAuthentication>
            <Start />
          </AppAuthentication>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
