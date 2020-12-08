import React from "react";
import { Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';

import Button from 'components/CustomButton/CustomButton.jsx';
import AvField from "components/inputs/inputCustom";
import { send } from "services/api";

const colStyleBox = {
    padding: '16px', 
    boxShadow: '0 0 100px rgba(21, 50, 90, 0.7)', 
    backgroundColor: ' #4091ff', 
    borderRadius: '6px',
}

const signin = data => {
    return send({
        method: 'post',
        url: '/signin',
        data,
    })
}

const SignInComponent = ({ withRole, 
                            onSigninSuccess, 
                            onSigninError,
                            buttons,
                            colSize,
                        }) => {
    const [isLoading, setLoading] = React.useState(false);

    const isInvalidCreds = React.useRef(false);

    const onValidSubmit = (_, values) => {
        const {
            email,
            password,
        } = values;
        
        // signin data
        const data = { email, password, role: withRole() };

        // reset invalid creds
        isInvalidCreds.current = false;

        // we are loading
        setLoading(true);

        signin(data).then(response => {
            onSigninSuccess(data, response);
        }).catch(({ response }) => {
            // network error, or some unknow shit
            if (response === undefined) {
                return;
            }

            const status = response.status;

            if (status == 401) {
                isInvalidCreds.current = true;
            } else {
                const submitHelper = () => onValidSubmit(_, values);
                onSigninError(response, submitHelper);
            }
        }).then(() => {
            setLoading(false);
        })
    }

    // TODO improve user experience
    if (isInvalidCreds.current) {
        alert('E-mail ou senha inválidos.')
    }

    return (
        <Col md={colSize || 8}>
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
                        <Button
                            type="submit"
                            bsStyle="success" fill>
                            <span className="fa fa-sign-in"></span>
                            {' '}Entrar
                        </Button>
                        {buttons && buttons}
                    </Row>
                </AvForm>
            </div>
        </Col>
    )
}

export default SignInComponent;