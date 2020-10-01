import React, { Component } from "react";

import Subscriber from '../../assets/img/subscriber.svg'
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

const onManagerFromAccount = (user, history) => {
  console.log(user);
  // history.push("/admin/dashboard");
}

const onRegister = (name, email, password, history) => {
  console.log(name, email, password);
}

const ResidentRegistration = props => {
  return (
    <div className="content" style={styleContent}>
      <SignUpComponent 
        onUserFromAccount={onManagerFromAccount} 
        onRegister={onRegister}
        image={Subscriber}
        />
    </div>
  );
}

export default ResidentRegistration;