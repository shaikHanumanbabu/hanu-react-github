import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({children, ...rest}) => {
  const {isAuthenticated, loginWithRedirect, logout, user, isLoading} = useAuth0()
  return <Route {...rest} render={() => {
    return isAuthenticated && user ? children : <Redirect to='login' />
  }}></Route>;
};
export default PrivateRoute;
