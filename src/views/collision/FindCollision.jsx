import React from "react";

import { FindModel } from "views/common";

import CollisionModel from "./CollisionModel";

const findFunction = modelId => {
    return {
        outbuildingId: "1",
        outbuilding: {
            name: "Salão de jogos"
        },
        day: new Date(),
        fromHour: '14:30',
        toHour: '16:30',
        peopleCount: 20,
        notes: "Várias anotações aqui!!!!!",
        residents: [
            {
                name: "Zé Pequeno",
                email: "example@ze.com",
                location: "Bloco F",
                schdule_creation_at: "19/10/2020 ás 19:20:01",
            },
            {
                name: "Teste 12",
                email: "example@ze111.com",
                location: "Bloco Z",
                schdule_creation_at: "19/10/2020 ás 19:20:01",
            }
        ]
    }
}

export default FindModel(CollisionModel, findFunction);