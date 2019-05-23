import React, { useState, useEffect } from "react";

import SQLLite from "Src/sql/sqllite";
import DBConfig from "Src/sql/DBConfig";
import SplashLoading from "Screens/splash/SplashLoading";

const InitDatabase = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("Connecting to database");

  useEffect(() => {
    SQLLite.connect()
      .then(() => {
        DBConfig.init()
          .then(() => setIsLoading(false))
          .catch(() => setMessage("Error in database"));
      })
      .catch(() => setMessage("Error in database"));
  }, []);

  return isLoading ? <SplashLoading message={message} /> : children;
};

export default InitDatabase;
