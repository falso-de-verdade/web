/**
 * This module provides a component for authenticated routes.
 * 
 */

import React from "react";
import { Route, Redirect } from 'react-router-dom';

import { 
  getCurrentJWT, 
  getCurrentUser,
  setLoggedUser,
} from "services/auth";
import { UserAuthContext } from "contexts";
import UserDomain from "domains/user";

const AuthContext = props => {
  const authenticatedUser = getCurrentUser();

  return (
    <UserAuthContext.Provider value={authenticatedUser}>
      <props.component {...props} />
    </UserAuthContext.Provider>
  )
}

const isUserAuthenticated = async() => {
  if (getCurrentJWT() === null) {
    return false;
  }

  const user = await UserDomain.me();
  setLoggedUser(user);
  return true;
}

const LoginChecker = ({ redirectTo, component, ...routeProps }) => {
  const [isLoading, setLoading] = React.useState(true);
  const [isAuthenticated, setAuthenticated] = React.useState(false);

  // final state
  if (isAuthenticated) {
    return <AuthContext {...routeProps} component={component} />
  }

  // not authenticated and done loading,
  // authentication has failed
  if (!isLoading) {
    return <Redirect to={{
      pathname: redirectTo,
      state: { from: routeProps.location }
    }}/>
  }

  isUserAuthenticated()
    .then(setAuthenticated)
    .catch(error => {
      console.log(error);
      setAuthenticated(false);
    })
    .then(() => {
      setLoading(false);
    })

  return (
    <div>
      <p>
        Carregando...
      </p>
    </div>
  )
}

const checkLoginWrapper = (component, redirectTo) => {
  return props => {
    const routeProps = {
      ...props,
      redirectTo,
      component,
    }

    return <LoginChecker {...routeProps} />
  }
}

export default ({ Component, redirectTo = "/", ...rest }) => {
    return (
      <Route {...rest} render={checkLoginWrapper(Component, redirectTo)}/>
    );
  };