import { FindModel } from "views/common";

import CondominiumModel from "./CondominiumModel";

const findFunction = modelId => {
    return {
        name: "Condomínio Villa Flow",
        notes: "Regras!!!!",
    }
}

export default FindModel(CondominiumModel, findFunction);