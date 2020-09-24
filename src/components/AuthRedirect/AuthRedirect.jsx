import React from "react";
import { Redirect } from "react-router-dom";

import { setLoggedUser } from "services/auth";

const AuthRedirect = ({ user }) => {
    setLoggedUser(user);
    return <Redirect to={{ pathname: "/admin/dashboard", state: { user } }} />
}

export default AuthRedirect;