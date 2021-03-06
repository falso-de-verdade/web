import React from "react";
import { Link } from "react-router-dom";
import { Col } from 'reactstrap';

import Logo from '../assets/img/logomarca.svg'
import Button from 'components/CustomButton/CustomButton.jsx';
import AuthRedirect from "components/AuthRedirect/AuthRedirect";
import { Modal } from "components/Modal";
import { SignInComponent } from "components/SignIn";

const styleContent = {
    width: '100%',
    maxWidth: '1120px',
    height: '100vh',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const signupButton = props =>
    <Link to="/manager-signup">
        <Button bsStyle="warning" fill pullRight>
            <span className="fa fa-user-plus"></span>
            {' '}Criar conta
        </Button>
    </Link>

const Login = ({ }) => {
    const [hasMultipleRoles, setHasMultiplesRoles] = React.useState(false);
    const [jwt, setJWT] = React.useState(null);

    const reuseSubmitRef = React.useRef(null);
    const roleRef = React.useRef(undefined);

    const onError = (response, submit) => {
        if (response.status == 422) {
            const code = response.data._error.code;
            if (code == 0) {
                reuseSubmitRef.current = submit;
                setHasMultiplesRoles(true);
            }
        }
    }

    const onSuccess = (data, response) => {
        console.log(response, data);

        // the response payload contains jwt credentials
        setJWT(response.data);
    }

    const submitWithRole = role => {
        roleRef.current = role;

        const submitFunction = reuseSubmitRef.current;
        if (!submitFunction) {
            throw Error("Unable to complete login with multiple roles.");
        }

        // try submit again
        submitFunction()
    }

    const setResidentRole = () => {
        submitWithRole('resident')
    }

    const setManagerRole = () => {
        submitWithRole('manager');
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

    if (jwt) {
        return <AuthRedirect jwt={jwt} />
    }

    return (
        <div className="content" style={styleContent}>
            <SignInComponent
                withRole={() => roleRef.current}
                onSigninSuccess={onSuccess}
                onSigninError={onError}
                buttons={signupButton()}
            />

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