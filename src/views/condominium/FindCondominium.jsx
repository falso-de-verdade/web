import { FindModel } from "views/common";

import CondominiumModel from "./CondominiumModel";

const findFunction = modelId => {
    return {
        name: "Condomínio Villa Flow",
        address: "Centro do Mundo",
        notes: "Regras!!!!",
    }
}

export default FindModel(CondominiumModel, findFunction);