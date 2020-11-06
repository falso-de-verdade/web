import React from "react";
import { Col } from "reactstrap";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import Subscriber from '../../assets/img/subscriber.svg'
import SignUpComponent from "components/SignUp/SignUpComponent";
import { TableComponent } from "components/Listing";
import Button from "components/CustomButton/CustomButton.jsx";

const onManagerFromAccount = (user, history) => {
  console.log(user);
  // history.push("/admin/dashboard");
}

const onRegister = (name, email, password, history) => {
  console.log(name, email, password);
}

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

const ResidentRegistration = props => {
  const [showCondoModal, setShowCondoModal] = React.useState(true);

  const hideCondoModal = () => setShowCondoModal(false);

  return <React.Fragment>
      <SignUpComponent 
          onUserFromAccount={onManagerFromAccount} 
          onRegister={onRegister}
          image={Subscriber}
          />

      <Modal
        show={showCondoModal}
        aria-labelledby="contained-modal-title">
        <Modal.Header>
          <Modal.Title>Condomínio</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="text-center">
            Este é o condomínio apresentado pelo convite.
          </p>
          <p className="text-center">
            Por favor confirme se é o condomínio desejado.
          </p>
          <TableComponent 
            items={[targetCondominium]}
            headers={condominiumHeaders}
            dataReducer={condominiumDataReducer}
            />
        </Modal.Body>

        <Modal.Footer>
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
        </Modal.Footer>
      </Modal>
    </React.Fragment>
}

export default ResidentRegistration;