import React from "react";

const ItemComponent = ({ item, dataReducer, onClick }) => {
    const originalItem = item;
    item = dataReducer(item);
    const values = Object.values(item);

    return <React.Fragment>
        {values.map(value => (
            <td className="text-center" onClick={e => onClick && onClick(originalItem)}>
                {value}
            </td>
        ))}
    </React.Fragment>
}

export default ItemComponent;