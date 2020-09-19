import React from "react";

import OutbuildingModel from "./OutbuildingModel";

const FindOutbuilding = props => {
    try {
        const outbuildingId = props.match.id; 
    } catch (err) {   
        return (
            <div class="content">
                <p>Page not found :(</p>
            </div>
        )
    }

    const fake_outbuilding = {
        name: "Salão de Jogos",
        condominium: "1",
        maxCapacity: 100
    }

    return <OutbuildingModel {...props} outbuilding={fake_outbuilding} />;
}

export default FindOutbuilding;