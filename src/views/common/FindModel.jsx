import React from "react";

const FindModel = (Component, findFunction) => props => {
    let modelId;

    try {
        modelId = props.match.id; 
    } catch (err) {   
        return (
            <div class="content">
                <p>Page not found :(</p>
            </div>
        )
    }

    const modelData = findFunction(modelId);

    return <Component {...props} modelData={modelData} />;
}

export default FindModel;