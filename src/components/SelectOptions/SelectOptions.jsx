import React from "react";

const SelectOptions = ({ domain, nameResolver, defaultOptions }) => {
    const [listing, setListing] = React.useState(null);

    if (defaultOptions === undefined) {
        defaultOptions = [
            {
                text: "Selecionar"
            }
        ]
    }

    if (listing) {
        return <React.Fragment>
            {defaultOptions.map(({ text, ...props }, idx) =>
                <option key={idx} {...props}>{text}</option>
            )}
            {listing.map((item, idx) =>
                <option key={idx} value={item._id}>{nameResolver(item)}</option>
            )}
        </React.Fragment>
    }

    // fetch listing
    domain.list()
        .then(setListing)
        .catch(error => {
            console.log(error);
        });

    return <React.Fragment>
        <option>Carregando...</option>
    </React.Fragment>
}

export default SelectOptions;