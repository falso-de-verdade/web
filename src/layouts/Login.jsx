import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import Button from 'components/CustomButton/CustomButton.jsx';
import {
  Row, Col, Label, Card, CardBody
} from 'reactstrap';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';

import isLoggedIn from "variables/Variables";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      succeeded: false,
      email: '',
      password: '',
    };
  }

  /**
   * Execute the login operation after validation
   */
  handleLogin = () => {
    console.log(`email: ${this.state.email}`)
    console.log(`password: ${this.state.password}`)
    
    this.setState({ succeeded: true })
  }

  render() {
    if (this.state.succeeded) {
        return <Redirect to={ {pathname: "/admin/dashboard", state: {isAuthenticated: true}} } />
    }

    const styleInput = {
        fontSize: 12,
        height: '38px'
    }

    const styleLabel = {
        fontSize: 11
    }
    return (
          <div className="wrapper">
            <Row>
                <Col md={12}>

                    <Card>
                        <CardBody>

                            <AvForm autoComplete="off" onSubmit={this.handleLogin} ref="formLogin">
                                <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                                    <Col md={2}>
                                        <AvGroup>
                                            <Label for="email" style={styleLabel}>E-mail</Label>
                                            <AvField type="text" name="email" id="email" style={styleInput}
                                                value={this.state.email}
                                                onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                        </AvGroup>
                                    </Col>
                                </Row>
                                <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                                    <Col md={2}>
                                        <AvGroup>
                                            <Label for="password" style={styleLabel}>Password</Label>
                                            <AvField type="password" name="password" id="password" style={styleInput}
                                                onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                        </AvGroup>
                                    </Col>
                                </Row>
                            </AvForm>
                            <div className="clearfix" />
                        </CardBody>
                        <AvForm autoComplete="off" onSubmit={this.handleLogin} ref="formLoginSubmit">
                            <Button bsStyle="success" fill type="submit">
                                Sign in
                            </Button>
                        </AvForm>
                    </Card>
                </Col>
            </Row>
        </div>
    );
  }
}

export default Login;
