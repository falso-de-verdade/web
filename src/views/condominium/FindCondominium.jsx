import React from "react";

import { FindModel } from "views/common";

import CondominiumModel from "./CondominiumModel";
import CondoDomain from "domains/condominium";

// const findFunction = modelId => {
//     return {
//         name: "Condomínio Villa Flow",
//         address: "Centro do Mundo",
//         notes: "Regras!!!!",
//         _id: "5fc0721b962b3a6d2a2987e3",
//         _etag: "f099f9d16029c7a71c51eaa8b7fe72c2b46c0b48"
//     }
// }

const FindCondominium = props => (
    <FindModel 
        component={CondominiumModel} 
        domain={CondoDomain} 
        {...props} />
)

export default FindCondominium;