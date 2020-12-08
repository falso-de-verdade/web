import React from "react";
import { Redirect } from "react-router-dom";

import { setJWTCreds } from "services/auth";

const AuthRedirect = ({ jwt }) => {
    // save jwt credentials
    setJWTCreds(jwt);

    return <Redirect to="/admin/dashboard" />
}

export default AuthRedirect;