import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-native";

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

const AuthWrapper = ({ children, location }) => {
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth()
      .then(() => {
        setAuthenticated(true);
        setLoading(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setLoading(false);
      });
  });

  if (isLoading) {
    return <SplashLoading message="Authenticating User" />;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
};

export default AuthWrapper;
