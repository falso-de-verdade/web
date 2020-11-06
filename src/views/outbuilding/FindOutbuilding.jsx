import { FindModel } from "views/common";

import OutbuildingModel from "./OutbuildingModel";

const findFunction = modelId => {
    return {
        name: "Salão de Jogos",
        condominium: "1",
        maxCapacity: 100
    }
}

export default FindModel(OutbuildingModel, findFunction);