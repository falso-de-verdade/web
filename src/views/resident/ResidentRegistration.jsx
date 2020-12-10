import React from "react";
import { Col } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

import Subscriber from '../../assets/img/subscriber.svg'
import SignUpComponent from "components/SignUp/SignUpComponent";
import Button from "components/CustomButton/CustomButton.jsx";
import { ModalWithListing } from "components/Modal";
import { sendAndParse } from "services/api";

const condominiumHeaders = [
  "Nome",
  "Endereço",
]

const condominiumDataReducer = condominium => [
  condominium.name,
  condominium.address,
]

const targetCondominium = {
  name: "Condomínio Flores Flatulentas",
  address: "Avenida Não Existe, Nº 0"
}

const modalBodyText = [
  "Este é o condomínio apresentado pelo convite.",
  "Por favor confirme se é o condomínio desejado.",
]

const findInvite = token =>
  sendAndParse({
    method: 'get',
    url: `/invite/${token}`,
  }, true)

const ResidentRegistration = props => {
  const [condominium, setCondo] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [showCondoModal, setShowCondoModal] = React.useState(true);

  const hideCondoModal = () => setShowCondoModal(false);

  // grab token from url;
  const { token } = props.match.params;

  const onManagerFromAccount = (user, history) => {
    console.log(user);
    // history.push("/admin/dashboard");
  }

  const loginFromRegistered = data => {
    console.log(data);
  }

  const addToken = data => {
    data.token = token;
  }

  const modalButtons =
    <React.Fragment>
      <Col md={2}>
        <Button
          bsStyle="success"
          onClick={hideCondoModal}
          fill
          pullLeft>
          Esse é meu condomínio!
        </Button>{' '}
      </Col>

      <Link to={"/support"}>
        <Button bsStyle="danger" fill>
          Não é meu condomínio
        </Button>{' '}
      </Link>
    </React.Fragment>

  if (condominium === null) {
    findInvite(token)
      .then(response => {
        console.log(response);
        setCondo(response.condominium)
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => setLoading(false))
  }

  return <React.Fragment disabled={isLoading}>
    <SignUpComponent
      role="resident"
      onUserFromAccount={onManagerFromAccount}
      onRegisteredAccount={loginFromRegistered}
      image={Subscriber}
      withRegisterData={addToken}
    />

    <ModalWithListing
      show={showCondoModal}
      title="Condomínio"
      bodyText={modalBodyText}
      buttons={modalButtons}
      items={condominium && [condominium]}
      headers={condominiumHeaders}
      dataReducer={condominiumDataReducer}
    />
  </React.Fragment>
}

export default ResidentRegistration;