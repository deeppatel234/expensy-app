import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router-native";

import SplashLoading from "Screens/splash/SplashLoading";
import Redux from "Redux/ReduxRegistry";

const SyncScreen = ({ startInitSync, initSyncComplete }) => {

  useEffect(() => {
    startInitSync()
  }, []);

  if (initSyncComplete) {
    return <Redirect to="/" />;
  }

  return <SplashLoading message="Preparing your Account" />;
};

const mapStateToProps = state => {
  return {
    initSyncComplete: state.sync.initSyncComplete,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startInitSync: () =>
      dispatch(Redux.get("sync", "startInitSync")())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SyncScreen);
