import React from 'react';

import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

import AppAuthentication from 'Base/AppAuthentication';
import Start from 'Src/Start';

import { light, dark } from 'Src/theme';


const App = ({ isLightTheme }) => (
  <ThemeProvider theme={isLightTheme ? light : dark}>
    <AppAuthentication>
      <Start />
    </AppAuthentication>
  </ThemeProvider>
);

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    isLightTheme: state.setting.isLightTheme,
  };
};

export default connect(mapStateToProps, null)(App);

