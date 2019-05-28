import React, { useState, useCallback } from "react";

import CurrencyChoose from "./CurrencyChoose";
import WelcomeScreen from "./WelcomeScreen";
import SyncScreen from "./SyncScreen";

const screenMap = {
  welcome: WelcomeScreen,
  currency: CurrencyChoose,
  sync: SyncScreen
};

const screenSeq = {
  login: {
    start: "sync",
    sync: "app"
  },
  signup: {
    start: "welcome",
    welcome: "currency",
    currency: "sync",
    sync: "app"
  }
};

const OnBoarding = ({ type }) => {
  const [screen, setScreen] = useState(screenSeq[type].start);

  const onDone = useCallback(() => {
    setScreen(screenSeq[type][screen]);
  }, [screen]);

  const Screen = screenMap[screen];

  return <Screen onDone={onDone} />;
};

export default OnBoarding;
