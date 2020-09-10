import React from 'react';
import { Link } from 'react-router-dom';
//import { FiLogIn } from 'react-icons/fi';

import Logo from '../../assets/images/authentication.svg';
import Input from '../../components/Input';

import './styles.css';

function Login() {
    return (
        <div className="logon-container">
            <section className="form">

                <form action="">
                    <h1>Faça seu Login</h1>

                    <Input
                        type="email"
                        name="email"
                        label="E-mail"
                    />

                    <Input
                        type="password"
                        name="password"
                        label="Senha"
                    />

                    <Link to="/landing">
                        <button className="button" type="submit">Entrar</button>
                    </Link>

                    <Link to="/register">
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={Logo} alt="login" className="image" />
        </div>
    );
};

export default Login;