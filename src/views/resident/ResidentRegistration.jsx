import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";

import Subscriber from '../../assets/img/subscriber.svg'
import SignUpComponent from "components/SignUp/SignUpComponent";
import Button from "components/CustomButton/CustomButton.jsx";
import { ModalWithListing } from "components/Modal";

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

const ResidentRegistration = props => {
  const token = props.match.params.token;
  const [showCondoModal, setShowCondoModal] = React.useState(true);

  const hideCondoModal = () => setShowCondoModal(false);

  const onManagerFromAccount = (user, history) => {
    console.log(user);
    // history.push("/admin/dashboard");
  }

  const loginFromRegistered = data => {
    console.log(data);
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

  return <React.Fragment>
    <SignUpComponent
      role="resident"
      onUserFromAccount={onManagerFromAccount}
      onRegisteredAccount={loginFromRegistered}
      image={Subscriber}
    />

    <ModalWithListing
      show={showCondoModal}
      title="Condomínio"
      bodyText={modalBodyText}
      buttons={modalButtons}
      items={[targetCondominium]}
      headers={condominiumHeaders}
      dataReducer={condominiumDataReducer}
    />
  </React.Fragment>
}

export default ResidentRegistration;