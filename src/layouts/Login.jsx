import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';

import Button from 'components/CustomButton/CustomButton.jsx';
import { Row, Col, Container } from 'reactstrap';
import { Modal } from "react-bootstrap";
import { AvForm } from 'availity-reactstrap-validation';

import isLoggedIn from "variables/Variables";

import InputPasswordCustom from '../components/inputs/inputCustom'
import InputCustom from '../components/inputs/inputCustom'
import Logo from '../assets/img/logomarca.svg'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            succeeded: false,
            email: '',
            password: '',
            lembrarDados: false,
            hasMultipleRoles: false
        };
    };

    /**
     * Execute the login operation after validation
     */
    handleLogin = () => {
        console.log(`email: ${this.state.email}`)
        console.log(`password: ${this.state.password}`)
        
        this.setState({ hasMultipleRoles: true })
        // this.setState({ succeeded: true })
    };

    toggleChangeLembrarDados = () => {
        this.setState({ lembrarDados: !this.state.lembrarDados });
    };

    handleResidentRole = () => {
        localStorage.setItem('isAuthenticated', true)
        this.setState({ succeeded: true })
    }

    handleManagerRole = () => {
        this.handleResidentRole()
    }

    render() {
        if (this.state.succeeded) {
            return <Redirect to={{ pathname: "/admin/dashboard", state: { isAuthenticated: true } }} />
        };

        const styleInput = {
            fontSize: 12,
            height: '38px'
        };

        const styleLabel = {
            fontSize: 11
        };

        const styleContent = {
            width: '100%',
            maxWidth: '1120px',
            height: '100vh',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        };

        return (
            <div className="content" style={styleContent}>
                <Col md={6}>
                    <div style={{ padding: '16px', boxShadow: '0 0 100px rgba(21, 50, 90, 0.7)', backgroundColor: ' #4091ff', borderRadius: '6px' }}>
                        <AvForm autoComplete="off" ref="formLogin" onSubmit={this.handleLogin}>
                            <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                <Col md={12}>
                                    <InputCustom
                                        type="email"
                                        descricao="E-mail"
                                        name="email"
                                        id="email"
                                        value={this.state.email}
                                        onChange={(e) => { this.setState({ email: e.target.value }) }}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                <Col md={12} style={{ marginTop: '-10px' }}>
                                    <InputPasswordCustom
                                        type="password"
                                        id="password"
                                        name="password"
                                        descricao="Senha"
                                        onChange={(e) => { this.setState({ password: e.target.value }) }}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ padding: '15px' }}>
                                <Col md={6}>
                                    <Button
                                        type="submit"
                                        bsStyle="success" fill>
                                        <span className="fa fa-sign-in"></span>
                                        {' '}Entrar
                                    </Button>
                                </Col>
                                <Col md={6}>
                                    <Link to="/manager-signup">
                                        <Button
                                            bsStyle="warning" fill pullRight>
                                            <span className="fa fa-sign-up"></span>
                                            {' '}Criar conta
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </AvForm>
                    </div>
                </Col>
                <img src={Logo} alt="logomarca"></img>

                <Modal
                    show={this.state.hasMultipleRoles}
                    aria-labelledby="contained-modal-title"
                    backdrop="static"
                >
                    <Modal.Header>
                        <Modal.Title>Perfis</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p className="text-center">
                            Esta conta possui os perfis de síndico e morador. Escolha qual deseja usar.
                        </p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Col md={2}>
                            <Button
                                bsStyle="primary"
                                onClick={this.handleResidentRole}
                                fill
                            >
                                Morador
                            </Button>{" "}
                        </Col>

                        <Button
                            bsStyle="secondary"
                            onClick={this.handleManagerRole}
                            fill
                            pullRight
                        >
                            Síndico
                        </Button>{" "}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    };
};

export default Login;