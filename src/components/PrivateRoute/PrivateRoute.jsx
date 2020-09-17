/**
 * This module provides a component for authenticated routes.
 * 
 */

import React from "react";
import { Route, Redirect } from 'react-router-dom';

import { isLoggedIn } from "services/auth";



export default ({ Component, redirectTo = "/", ...rest }) => {
    return (
      <Route {...rest} render={routeProps =>
        isLoggedIn(routeProps) ?
          <Component {...rest} {...routeProps}/>
        : <Redirect to={{
            pathname: redirectTo,
            state: { from: routeProps.location }
          }}/>
      }/>
    );
  };