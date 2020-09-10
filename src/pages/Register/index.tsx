import React from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import './styles.css';
import Select from '../../components/Select';

function Register() {
    return (
        <div id="page-register-form" className="container">
            <PageHeader
                title="Seja bem vindo"
                description="Faça seu registro"
            />

            <main>
                <form>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                        />

                        <Input
                            name="email"
                            label="E-mail"
                        />

                        <Input
                            name="senha"
                            label="Senha"
                            type="password"
                        />

                        {/*                         <Select
                            name="type-dweller"
                            label="Eu sou"
                            options={[
                                { value: 'Síndico', label: 'Síndico' },
                                { value: 'Morador', label: 'Morador' },
                            ]}
                        /> */}
                    </fieldset>
                </form>
            </main>
        </div>
    );
};

export default Register;