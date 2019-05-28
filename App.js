import React from "react";

import { Provider } from "react-redux";
import store from "Redux/store";

import App from "Src/App";
import ReduxLoader from "Base/ReduxLoader";

const MainApp = () => (
  <Provider store={store}>
    <ReduxLoader models={["network", "sync"]}>
      <App />
    </ReduxLoader>
  </Provider>
);

export default MainApp;
