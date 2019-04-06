import React from 'react';
import { Route } from "react-router-native";
import AuthWrapper from './AuthWrapper';

/**
 * Private Route
 *
 * @param {Obect} props
 * @param {String} props.component
 * @param {any} props.any
 */
const PrivateRoute = ({ component: Comp, ...rest }) => {
  return (
    <Route {...rest} render={() => <AuthWrapper><Comp /></AuthWrapper>} />
  );
}

export default PrivateRoute;
