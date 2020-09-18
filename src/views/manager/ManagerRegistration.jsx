import React, { Component } from "react";
import Button from "components/CustomButton/CustomButton.jsx";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import { AvForm } from 'availity-reactstrap-validation';
import InputCustom from '../../components/inputs/inputCustom';
import Subscriber from '../../assets/img/subscriber.svg'

class ManagerRegistration extends Component {

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
              <Row style={{ padding: '15px' }}>
                <Col md={6}>
                  <Link to="/login">
                    <Button bsStyle="warning" fill>Voltar</Button>
                  </Link>
                </Col>
                <Col md={6}>
                  <Button type="submit" bsStyle="success" fill pullRight>Salvar</Button>
                </Col>
              </Row>
            </AvForm>
          </div>
        </Col>

        {/* TODO change a nice picture */}
        <img src={Subscriber} alt="Inscreva-se" />
      </div>
    );
  };
};

export default ManagerRegistration;