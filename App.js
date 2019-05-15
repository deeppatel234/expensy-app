import React, { Component } from 'react';

import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import store from 'Redux/store';

import Start from 'Src/Start';
import AppAuthentication from 'Base/AppAuthentication';

import { light } from 'Src/theme';


class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <ThemeProvider theme={light}>
          <AppAuthentication>
            <Start />
          </AppAuthentication>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
