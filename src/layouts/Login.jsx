import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';

import Logo from '../assets/img/logomarca.svg'
import Button from 'components/CustomButton/CustomButton.jsx';
import AuthRedirect from "components/AuthRedirect/AuthRedirect";
import AvField from "components/inputs/inputCustom";
import { Modal } from "components/Modal";
import { send } from "services/api";


const styleContent = {
    width: '100%',
    maxWidth: '1120px',
    height: '100vh',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const colStyleBox = {
    padding: '16px', 
    boxShadow: '0 0 100px rgba(21, 50, 90, 0.7)', 
    backgroundColor: ' #4091ff', 
    borderRadius: '6px',
}

const signin = (email, password) => {
    return send({
        method: 'post',
        url: '/signin',
        data: {
            email,
            password,
        },
    })
}

const Login = ({}) => {
    const [isLoading, setLoading] = React.useState(false);
    const [role, setRole] = React.useState(null);
    const [hasMultipleRoles, setHasMultiplesRoles] = React.useState(false);
    const [user, setUser] = React.useState(null);

    const isInvalidCreds = React.useRef(false);

    const onValidSubmit = (_, values) => {
        const {
            email,
            password,
        } = values;

        // reset invalid creds
        isInvalidCreds.current = false;

        // we are loading
        setLoading(true);

        signin(email, password).then(response => {
            // TODO handle user login
            console.log(response);
        }).catch(({ response }) => {
            // network error, or some unknow shit
            if (response === undefined) {
                return;
            }

            const status = response.status;

            if (status == 401) {
                isInvalidCreds.current = true;
            } else if (status == 422) {
                const code = response.data._error.code;
                if (code == 0) {
                    setHasMultiplesRoles(true);
                }
            }
        }).then(() => {
            setLoading(false);
        })
    }

    const setResidentRole = () => {
        setRole('resident');
    }

    const setManagerRole = () => {
        setRole('manager');
    }

    const modalButtons = () =>
        <React.Fragment>
            <Col md={2}>
                <Button
                    bsStyle="primary"
                    onClick={setResidentRole}
                    fill
                >
                    Morador
                </Button>{" "}
            </Col>

            <Button
                bsStyle="secondary"
                onClick={setManagerRole}
                fill
                pullRight
            >
                Síndico
            </Button>{" "}
        </React.Fragment>

    if (user) {
        return <AuthRedirect user={user} />
    }

    // TODO improve user experience
    if (isInvalidCreds.current) {
        alert('E-mail ou senha inválidos.')
    }

    return (
        <div disabled={isLoading} className="content" style={styleContent}>
            <Col md={8}>
                <div style={colStyleBox}>
                    <AvForm onValidSubmit={onValidSubmit}>
                        <Row>
                            <Col md={12}>
                                <AvField
                                    type="email"
                                    descricao="E-mail"
                                    name="email"
                                    id="email"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} style={{ marginTop: '-10px' }}>
                                <AvField
                                    type="password"
                                    id="password"
                                    name="password"
                                    descricao="Senha"
                                    value={isInvalidCreds.current ? "" : undefined}
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
                show={hasMultipleRoles}
                title="Perfis"
                buttons={modalButtons()}
                bodyText="Esta conta possui os perfis de síndico e morador. Escolha qual deseja usar."
                backdrop="static"
                />
        </div>
    );
}


export default Login;