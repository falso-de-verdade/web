/**
 * This module provide High Order Components for authenticated routes.
 * 
 */

import React from "react";
import { Redirect } from 'react-router-dom'


/**
 * Component wrapper
 * 
 * @param Component object to wrap 
 */
const withAuth = Component => {
    const authenticate = props => {
        const isAuthenticated = hasAuth(props);

        if (isAuthenticated) {
            return <Component {...props}/>
        }

        return <Redirect to="/login" />;
    }

    return authenticate;
}

/**
 * Main function for determining wheter an user is logged in.
 */
const hasAuth = props => {
    try {
        return props.location.state.isAuthenticated;
    } catch {
        return false;
    }
}

export default withAuth;