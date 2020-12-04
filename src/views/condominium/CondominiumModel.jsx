import React from 'react';

import { ModelComponent } from "views/common";
import CondoDomain from "domains/condominium";

class CondominiumModel extends ModelComponent {
    domain = CondoDomain;

    mapData = values => {
        const {
            name,
            address,
        } = values;

        return {
            name,
            address,
        }
    }

    tabAndFields = () => {
        return [
            this.storeTab(),
        ]
    }

    storeTab = () => {
        return {
            name: "Cadastro",
            rows: [
                {
                    name: {
                        type: "text",
                        label: "Nome",
                    },
                    address: {
                        type: "text",
                        label: "Endereço",
                        helpMessage: "Estado, Cidade, Rua, Número, etc...",
                        col: {
                            md: 8,
                        },
                    },
                }
            ]
        }
    }
}

export default CondominiumModel;