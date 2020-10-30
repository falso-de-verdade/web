import React from "react";
import { Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';

import Button from 'components/CustomButton/CustomButton.jsx';
import InputCustom from 'components/inputs/inputCustom';

const SignInComponent = props => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <Col md={props.colSize || 8}>
            <div style={{ padding: '16px', boxShadow: '0 0 100px rgba(21, 50, 90, 0.7)', backgroundColor: ' #4091ff', borderRadius: '6px' }}>
                <AvForm autoComplete="off" onSubmit={() => props.onSubmit(email, password)}>
                    <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col md={12}>
                            <InputCustom
                                type="email"
                                descricao="E-mail"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </Col>
                    </Row>
                    <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col md={12} style={{ marginTop: '-10px' }}>
                            <InputCustom
                                type="password"
                                id="password"
                                name="password"
                                descricao="Senha"
                                onChange={(e) => { setPassword(e.target.value) }}
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
                        {props.operations && props.operations}
                    </Row>
                </AvForm>
            </div>
        </Col>
    )
}

export default SignInComponent;