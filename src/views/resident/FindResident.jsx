import React from "react";

import { FindModel } from "views/common";
import ResidentDomain from "domains/resident";

import ResidentModel from "./ResidentModel";

// const findFunction = modelId => {
//     return {
//         name: "José",
//         email: "jose@gmail.com",
//         location: null
//     }
// }

const FindResident = props => (
    <FindModel 
        component={ResidentModel}
        domain={ResidentDomain}
        {...props}
        />
)
  
export default FindResident;