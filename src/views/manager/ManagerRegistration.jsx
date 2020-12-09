import React from "react";
import { Link, useHistory } from "react-router-dom";

import Subscriber from '../../assets/img/subscriber.svg'
import Button from "components/CustomButton/CustomButton.jsx";
import SignUpComponent from "components/SignUp/SignUpComponent";
import { Modal } from "components/Modal";
import { Col } from "react-bootstrap";

const BackOperations = props => {
  return (
    <Col md={6} style={{ marginTop: '-10px' }}>
      <Link to="/login">
        <Button bsStyle="warning" fill pullRight>Voltar</Button>
      </Link>
    </Col>
  )
}

const ManagerRegistration = props => {
  const history = useHistory();

  const onResidentFromAccount = user => {
    console.log(user);
    // history.push("/admin/dashboard");
  }

  const loginFromRegistered = data => {
    // TODO login user after registered
    console.log(data);
  }

  return <React.Fragment>
    <SignUpComponent 
      role={"manager"}
      onUserFromAccount={onResidentFromAccount} 
      onRegisteredAccount={loginFromRegistered}
      image={Subscriber}
      operations={<BackOperations />}
      />
  </React.Fragment>
}

export default ManagerRegistration;