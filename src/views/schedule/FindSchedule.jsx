import React from "react";

import { FindModel } from "views/common";
import ScheduleDomain from "domains/user";

import ScheduleModel from "./ScheduleModel";

// const findFunction = modelId => {
//     return {
//         resident: {
//             name: "Yan"
//         },
//         outbuildingId: "1",
//         day: new Date(),
//         peopleCount: 20,
//         notes: "Várias anotações aqui!!!!!"
//     }
// }

const FindSchedule = props => (
    <FindModel 
        component={ScheduleModel}
        domain={ScheduleDomain}
        {...props}
        />
)
  
export default FindSchedule;