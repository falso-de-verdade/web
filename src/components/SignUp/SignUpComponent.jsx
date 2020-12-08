import React from "react";
import { Row, Col, Container } from "reactstrap";
import { useHistory } from "react-router-dom";
import { AvForm } from 'availity-reactstrap-validation';
import { Modal } from "react-bootstrap";

import SignInComponent from "components/SignIn/SignInComponent";
import Button from "components/CustomButton/CustomButton.jsx";
import InputCustom from '../../components/inputs/inputCustom';

const styleContent = {
  width: '100%',
  maxWidth: '1120px',
  height: '100vh',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const handleLogin = (email, password) => {
  return {
    name: "Usuário"
  }
}

const SignUpComponent = props => {
  const [showSignInModal, setShowSignInModal] = React.useState(false);

  const history = useHistory();

  const onInternalSubmit = (email, password) => {
    const user = handleLogin(email, password);

    if (user !== false) {
      props.onUserFromAccount(user, history);
    }
  }

  const hideSignInModal = () => setShowSignInModal(false);

  return (
    <div className="content" style={styleContent}>
      <Col md={6}>
        <div style={{ padding: '16px', boxShadow: '0 0 100px rgba(21, 50, 90, 0.7)', backgroundColor: ' #4091ff', borderRadius: '6px' }}>
          <AvForm autoComplete="off" onSubmit={e => props.onRegister("Yan", "teste@teste", "1234", history)}>

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

            <Row style={{ padding: '10px' }}>
              <Col md={6} style={{ marginTop: '-10px' }}>
                <Button type="submit" bsStyle="success" fill>Salvar</Button>
              </Col>
              {props.operations && props.operations}
            </Row>

            <Row style={{ padding: '10px' }}>
              <Col md={12} style={{ marginTop: '-10px' }}>
                <Button bsStyle="info" fill
                  onClick={() => setShowSignInModal(true)}>
                  Usar conta existente
                </Button>
              </Col>
            </Row>
          </AvForm>
        </div>
      </Col>

      <Modal
        show={showSignInModal}
        aria-labelledby="contained-modal-title"
        onHide={hideSignInModal}
      >
        <Modal.Header>
          <Modal.Title>
            Login
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row style={{ marginLeft: "-30px" }}>
              <SignInComponent
                colSize={6}
                onSubmit={onInternalSubmit}
                operations={
                  <Button
                    fill
                    pullRight
                    bsStyle="danger"
                    onClick={hideSignInModal}>
                    Cancelar
                      </Button>
                } />
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      <img src={props.image} />
    </div>
  );
}

export default SignUpComponent;