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
import { NavItem, Nav, NavDropdown, MenuItem, ModalHeader, ModalBody, Modal } from "react-bootstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";

import { UserAuthContext } from "contexts";
import Button from "components/CustomButton/CustomButton.jsx";
import InputCustom from "components/inputs/inputCustom";


class AdminNavbarLinks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isModal: false,
    }
  };

  toggleModal = () => {
    this.setState({ isModal: !this.state.isModal })
  }

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
          <NavItem>
            <UserAuthContext.Consumer>
              {user => (
                <p>
                  {user.name}
                </p>
              )}
            </UserAuthContext.Consumer>
          </NavItem>
          <NavItem
            onSelect={() => this.toggleModal()}>
            <span className="fa fa-cog fa-spin"></span>
            {' '}Minha conta
          </NavItem>
          <NavLink
            to="/logout" >
            <span className="fa fa-sign-out"></span>
            {' '}Log out
          </NavLink>
        </Nav>

        <Modal show={this.state.isModal} >
          <ModalHeader>
            <h4>Alteração de dados pessoais</h4>
          </ModalHeader>
          <ModalBody>
            <AvForm>
              <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                <Col md={12}>
                  <InputCustom
                    id="name"
                    name="name"
                    descricao="Nome"
                  />
                </Col>
              </Row>
              <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                <Col md={12}>
                  <InputCustom
                    id="email"
                    name="email"
                    descricao="E-mail"
                  />
                </Col>
              </Row>
              <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                <Col md={12}>
                  <InputCustom
                    type="password"
                    id="password"
                    name="password"
                    descricao="Senha"
                  />
                </Col>
              </Row>
              <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                <Col md={12}>
                  <InputCustom
                    required
                    type="password"
                    id="password"
                    name="password"
                    descricao="Confirmação de senha"
                  />
                </Col>
              </Row>
            </AvForm>
          </ModalBody>
          <Modal.Footer>
            <Button fill onClick={() => this.toggleModal()} bsStyle="danger">Fechar</Button>
            <Button fill onClick={this.handleAlterarDadosConta} bsStyle="success">Gravar</Button>
          </Modal.Footer>
        </Modal >
      </div >

    )
  }
}

export default AdminNavbarLinks;
