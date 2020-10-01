import React, { Component } from "react";

import Subscriber from '../../assets/img/subscriber.svg'
import SignUpComponent from "components/SignUp/SignUpComponent";

const onManagerFromAccount = (user, history) => {
  console.log(user);
  // history.push("/admin/dashboard");
}

const onRegister = (name, email, password, history) => {
  console.log(name, email, password);
}

const ResidentRegistration = props => {
  return (
    <SignUpComponent 
      onUserFromAccount={onManagerFromAccount} 
      onRegister={onRegister}
      image={Subscriber}
      />
  );
}

export default ResidentRegistration;