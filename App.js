import React from "react";

import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import store from "Redux/store";

import App from "Src/App";
import getTheme from "Src/theme";
import ReduxLoader from "Base/ReduxLoader";

const MainApp = () => (
  <ThemeProvider theme={getTheme(true, 'BLUE')}>
    <Provider store={store}>
      <ReduxLoader models={["network", "sync"]}>
        <App />
      </ReduxLoader>
    </Provider>
  </ThemeProvider>
);

export default MainApp;
