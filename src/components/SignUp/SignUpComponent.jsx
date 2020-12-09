import React from "react";
import { Row, Col, Container, FormGroup, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import { AvForm } from 'availity-reactstrap-validation';

import { 
  SignInComponent, 
  signIn,
} from "components/SignIn";
import Button from "components/CustomButton/CustomButton.jsx";
import InputCustom from '../../components/inputs/inputCustom';
import { Modal } from "components/Modal";
import { send } from "services/api";
import AuthRedirect from "components/AuthRedirect/AuthRedirect";


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

const SignUpComponent = ({ onUserFromAccount,
                            operations,
                            image,
                            onRegisteredAccount,
                            role }) => {
  const [showSignInModal, setShowSignInModal] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isLoggingIn, setLoggingIn] = React.useState(false);
  const [jwt, setJWT] = React.useState(null);
  const [registeredData, setRegisteredData] = React.useState(null);

  const history = useHistory();

  const onSigninSubmit = (email, password) => {
      const user = handleLogin(email, password);

      if (user !== false) {
          onUserFromAccount(user, history);
      }
  }

  const handleRegisteredUser = () => {
    onRegisteredAccount(registeredData);
    
    // parse data
    const {
      email,
      password,
    } = registeredData;

    setLoggingIn(true);
    signIn({ email, password, role })
      .then(response => {
        setJWT(response.data);
      })
      .catch(response => {
        console.log(response);
      })
      .then(() => setLoggingIn(false));
  }

  const onRegisterSubmit = (_, values) => {
    setLoading(true);
    
    const {
      name,
      email,
      password,
    } = values;

    const data = {
      name,
      email,
      password,
    }

    send({
      data,
      method: "post",
      url: `/signup/${role}`,
    }).then(response => {
      console.log(response);
      setRegisteredData(data);
    }).catch(({ response }) => {
      // network error or similar
      if (response === undefined) {
        return;
      }
  
      if (response.status == 422) {
        alert('Dados inválidos');
      }
    }).then(() => {
      setLoading(false);
    })

  }

  const hideSignInModal = () => setShowSignInModal(false);

  if (isLoggingIn) {
    return (
      <div>
        Logando...
      </div>
    )
  }

  // log user in
  if (jwt) {
    return <AuthRedirect jwt={jwt} />
  }

  return (
    <div className="content" style={styleContent}>
      <Col md={6}>
        <div style={{ padding: '16px', boxShadow: '0 0 100px rgba(21, 50, 90, 0.7)', backgroundColor: ' #4091ff', borderRadius: '6px' }}>
          <AvForm onValidSubmit={onRegisterSubmit}>
            <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
              <Col md={12} style={{ marginTop: '-10px' }}>
                <InputCustom
                  id="name"
                  name="name"
                  type="text"
                  descricao="Nome completo"
                  required />
              </Col>
              <Col md={12} style={{ marginTop: '-10px' }}>
                <InputCustom
                  id="email"
                  name="email"
                  type="email"
                  descricao="E-mail"
                  required />
              </Col>
            </Row>

            <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
              <Col md={12} style={{ marginTop: '-10px' }}>
                <InputCustom
                  id="password"
                  name="password"
                  type="password"
                  descricao="Senha"
                  required />
              </Col>
              <Col md={12} style={{ marginTop: '-10px' }}>
                <InputCustom
                  id="confirmedPassword"
                  name="confirmedPassword"
                  type="password"
                  descricao="Confirma senha"
                  required />
              </Col>
            </Row>
            <Row style={{ padding: '15px' }}>
              <FormGroup>
                  <Button type="submit" bsStyle="success" fill>
                    Salvar
                  </Button>
                  {operations && operations}
              </FormGroup>
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
        show={registeredData}
        title="Muito bem..."
        bodyText="Sua conta já foi criada. Aproveite!"
        buttons={
          <Button bsStyle="success" fill onClick={handleRegisteredUser}>
            Continuar
          </Button>
        }
        />

      <Modal
          show={showSignInModal}
          title="Login"
          bodyText=""
          onHide={hideSignInModal}
      >
        <Container>
          <Row style={{ marginLeft: "-30px" }}>
            <SignInComponent
              colSize={6}
              onSubmit={onSigninSubmit} 
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
      </Modal>

      <img src={image} />
    </div>
  );
}

export default SignUpComponent;