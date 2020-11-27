import React from "react";

const FindModel = ({ match, domain, ...props }) => {
    const [modelData, setModelData] = React.useState(null);
    const loadingRef = React.useRef(null);

    if (loadingRef.current === null) {
        loadingRef.current = true;

        let modelId;

        try {
            modelId = match.params.id; 
        } catch (err) {   
            return (
                <div class="content">
                    <p>Page not found :(</p>
                </div>
            )
        }

        domain.find(modelId).then(data => {
            loadingRef.current = false;
            setModelData(data);
        });
    }

    if (loadingRef.current) {
        return (<div></div>)
    }
    
    return <props.component {...props} modelData={modelData} />;
}

export default FindModel;