import React, { useState, useEffect } from "react";

import SplashLoading from "Screens/splash/SplashLoading";
import Redux from "Redux/ReduxRegistry";

const ReduxLoader = ({ children, models }) => {
  const [isLoading, setLoading] = useState(true);
  const [error, serError] = useState(false);

  useEffect(() => {
    Promise.all(models.map(model => Redux.get(model, "fetch")()))
      .then(() => setLoading(false))
      .catch(err => serError(err));
  }, []);

  return isLoading ? <SplashLoading message={error} /> : children;
};

export default ReduxLoader;
