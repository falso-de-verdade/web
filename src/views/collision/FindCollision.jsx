import React from "react";

import { FindModel } from "views/common";

import CollisionModel from "./CollisionModel";

const findFunction = modelId => {
    return {
        outbuilding: {
            name: "Quadra de vôlei"
        },
        collisions: [
            {
                resident: {
                    name: "Yan"
                },
                date: "30/09/2020",
                timeRange: "14:30 ás 15:00",
                peopleCount: 20
            },
            {
                resident: {
                    name: "Maria"
                },
                date: "30/09/2020",
                timeRange: "14:45 ás 15:45",
                peopleCount: 8
            }
        ]
    }
}

export default FindModel(CollisionModel, findFunction);