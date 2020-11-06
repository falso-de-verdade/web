import React from "react";

import { FindModel } from "views/common";

import { ScheduleModel } from "views/schedule";

const findFunction = modelId => {
    return {
        outbuildingId: "2",
        day: new Date(),
        peopleCount: 15,
        fromHour: "10:30",
        toHour: "11:15",
        notes: "Várias anotações do ticket aqui!!!!!"
    }
}

export default FindModel(ScheduleModel, findFunction);