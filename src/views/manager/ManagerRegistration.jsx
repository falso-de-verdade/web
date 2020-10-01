import React, { Component } from "react";
import { Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

import Subscriber from '../../assets/img/subscriber.svg'
import Button from "components/CustomButton/CustomButton.jsx";
import SignUpComponent from "components/SignUp/SignUpComponent";

const styleContent = {
  width: '100%',
  maxWidth: '1120px',
  height: '100vh',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const onResidentFromAccount = (user, history) => {
  console.log(user);
  // history.push("/admin/dashboard");
}

const onRegister = (name, email, password, history) => {
  console.log(name, email, password);
}

const BackOperations = props => {
  return (
    <Col md={10}>
      <Link to="/login">
        <Button bsStyle="warning" fill pullRight>Voltar</Button>
      </Link>
    </Col>
  )
}

const ManagerRegistration = props => {
  return (
    <div className="content" style={styleContent}>
      <SignUpComponent 
        onUserFromAccount={onResidentFromAccount} 
        onRegister={onRegister}
        image={Subscriber}
        operations={<BackOperations />}
        />
    </div>
  );
}

export default ManagerRegistration;