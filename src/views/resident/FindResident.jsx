import React from "react";

import { FindModel } from "views/common";
import UserDomain from "domains/user";

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
        domain={UserDomain}
        {...props}
        />
)
  
export default FindResident;