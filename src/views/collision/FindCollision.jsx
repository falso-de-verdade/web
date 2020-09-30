import React from "react";

import { FindModel } from "views/common";

import CollisionModel from "./CollisionModel";

const findFunction = modelId => {
    return {
        outbuilding: {
            name: "Quadra de vôlei"
        },
        date: "30/09/2020",
        tickets: [
            {
                resident: {
                    name: "Yan"
                },
                timeRange: "14:30 ás 15:00",
                peopleCount: 20
            },
            {
                resident: {
                    name: "Maria"
                },
                timeRange: "14:45 ás 15:45",
                peopleCount: 8
            }
        ]
    }
}

export default FindModel(CollisionModel, findFunction);