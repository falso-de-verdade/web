import { FindModel } from "views/common";

import ResidentModel from "./ResidentModel";

const findFunction = modelId => {
    return {
        name: "José",
        email: "jose@gmail.com",
        location: null
    }
}

export default FindModel(ResidentModel, findFunction);