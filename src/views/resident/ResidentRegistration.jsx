import React, { Component } from "react";
import Button from "components/CustomButton/CustomButton.jsx";
import {
  Row, Col, Label, Card, CardBody, TabPane, TabContent,
  Nav, NavItem, NavLink,
} from "reactstrap";
import classnames from 'classnames';

import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import InputCustom from '../../components/inputs/inputCustom';
import Subscriber from '../../assets/img/subscriber.svg'

class ResidentRegistration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: '1'
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {

    const styleContent = {
      width: '100%',
      maxWidth: '1120px',
      height: '100vh',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    };

    return (
      <div className="content" style={styleContent}>
        <Col md={6}>
          <div style={{ padding: '16px', boxShadow: '0 0 100px rgba(21, 50, 90, 0.7)', backgroundColor: ' #4091ff', borderRadius: '6px' }}>
            <AvForm autoComplete="off" onSubmit={this.operacaoCliente} ref="formCliente">
              <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                <Col md={12} style={{ marginTop: '-10px' }}>
                  <InputCustom
                    id="name"
                    name="name"
                    type="text"
                    descricao="Nome completo" />
                </Col>
                <Col md={12} style={{ marginTop: '-10px' }}>
                  <InputCustom
                    id="email"
                    name="email"
                    type="email"
                    descricao="E-mail" />
                </Col>
              </Row>
              <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <Col md={12} style={{ marginTop: '-10px' }}>
                  <InputCustom
                    id="password"
                    name="password"
                    type="password"
                    descricao="Senha" />
                </Col>
                <Col md={12} style={{ marginTop: '-10px' }}>
                  <InputCustom
                    id="confirmedPassword"
                    name="confirmedPassword"
                    type="password"
                    descricao="Confirma senha" />
                </Col>
              </Row>
              <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <Col md={12}>
                  <Button type="submit" bsStyle="success" fill pullRight>Gravar</Button>
                </Col>
              </Row>
            </AvForm>
          </div>
        </Col>
        <img src={Subscriber} alt="Inscreva-se" />
      </div>
    );
  };
};

export default ResidentRegistration;