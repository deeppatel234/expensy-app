import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-native";

import SplashLoading from "Screens/splash/SplashLoading";
import MemoryStorage from "Base/MemoryStorage";
import LocalStorage from "Base/LocalStorage";

/**
 * use to redirect to app if not authenticated otherwise open given component
 *
 * <AuthWrapper>
 *  This is rendered if authenticated
 * </AuthWrapper>
 */

const checkAuth = async () => {
  if (MemoryStorage.get("token")) {
    return Promise.resolve();
  }

  const authToken = await LocalStorage.getToken();
  if (!authToken) {
    return Promise.reject();
  }

  MemoryStorage.set("token", authToken);
  return Promise.resolve();
};

const AuthWrapper = ({ children, history }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth()
      .then(() => setAuthenticated(true))
      .catch(() => history.push("/login"));
  });

  if (isAuthenticated) {
    return children;
  }

  return <SplashLoading message="Authenticating User" />;
};

export default withRouter(AuthWrapper);
