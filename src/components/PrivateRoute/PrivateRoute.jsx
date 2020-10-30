/**
 * This module provides a component for authenticated routes.
 * 
 */

import React from "react";
import { Route, Redirect } from 'react-router-dom';

import { isLoggedIn, getCurrentUser } from "services/auth";
import { UserAuthContext } from "contexts";

const AuthContext = props => {
  const authenticatedUser = getCurrentUser();

  return (
    <UserAuthContext.Provider value={authenticatedUser}>
      <props.component {...props} />
    </UserAuthContext.Provider>
  )
}

export default ({ Component, redirectTo = "/", ...rest }) => {
    return (
      <Route {...rest} render={routeProps =>
        isLoggedIn(routeProps) ?
          <AuthContext {...rest} {...routeProps} component={Component} />
        : <Redirect to={{
            pathname: redirectTo,
            state: { from: routeProps.location }
          }}/>
      }/>
    );
  };