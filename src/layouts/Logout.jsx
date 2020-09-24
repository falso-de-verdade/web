import React from "react";
import { Redirect } from "react-router-dom";

import { removeLoggedUser } from "services/auth";

const Logout = ({}) => {
    removeLoggedUser();
    return <Redirect to="/" />
}

export default Logout;