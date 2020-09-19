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
import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Button } from "reactstrap";

class AdminNavbarLinks extends Component {

  constructor(props) {
    super(props);
  };

  logOut() {
    localStorage.clear();
  };

  render() {
    return (
      <div>
        <Nav pullRight>
          <NavItem>
            <Col md={12} style={{ marginBottom: '5px', paddingLeft: 0 }}>
              <AvForm autoComplete="off" ref="formLocalizar">
                <AvField type="select" name="select"
                  //value={this.state.inputLocalizarStatus}
                  onChange={(e) => { this.setState({ inputLocalizarStatus: e.target.value }) }}>
                  <option value="">Selecione o condomínio</option>
                  <optgroup label="Condomínios"></optgroup>
                  <option value="1">Condomínio Villa Flor</option>
                  <option value="2">Condomínio St Flor</option>
                  <option value="3">Condomínio Maré Azul VI</option>
                </AvField>
              </AvForm>
            </Col>
          </NavItem>
          <NavItem
            href="/login"
            onClick={() => this.logOut()}>
            <span className="fa fa-sign-out"></span>
            {' '}Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
