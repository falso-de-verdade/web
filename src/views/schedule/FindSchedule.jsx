import React from "react";

import { FindModel } from "views/common";

import ScheduleModel from "./ScheduleModel";

const findFunction = modelId => {
    return {
        outbuildingId: "1",
        day: new Date(),
        peopleCount: 20,
        notes: "Várias anotações aqui!!!!!"
    }
}

export default FindModel(ScheduleModel, findFunction);