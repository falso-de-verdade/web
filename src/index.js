/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";
import LoginLayout from "layouts/Login.jsx";
import LogoutLayout from "layouts/Logout.jsx";
import ResidentRegistration from '../src/views/resident/ResidentRegistration.jsx';
import ManagerRegistration from 'views/manager/ManagerRegistration';

import PrivateRoute from "components/PrivateRoute/PrivateRoute.jsx";

// make sure http api is configured
import { configure as configureApi } from "services/api";

const App = () => {
  const configuredRef = React.useRef(false);
  const alert = null;

  if (!configuredRef.current) {
    configureApi(alert);
    configuredRef.current = true;
  }

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/admin" Component={AdminLayout} />

        <Route path="/logout" render={props => <LogoutLayout {...props} />} />
        <Route path="/login" render={props => <LoginLayout {...props} />} />
        <Route path="/manager-signup" render={props => <ManagerRegistration {...props} />} />
        <Route path="/ResidentRegistration" render={props => <ResidentRegistration {...props} />} />

        <Redirect exact from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
