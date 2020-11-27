import React from "react";

import { FindModel } from "views/common";
import OutbDomain from "domains/outbuilding";

import OutbuildingModel from "./OutbuildingModel";

// const findFunction = modelId => {
//     return {
//         name: "Salão de Jogos",
//         condominium: "1",
//         maxCapacity: 100
//     }
// }

const FindOutbuilding = props => (
    <FindModel 
        component={OutbuildingModel}
        domain={OutbDomain}
        {...props}
        />
)
  
export default FindOutbuilding;
