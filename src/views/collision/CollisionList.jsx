import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Listing } from "components/Listing";
import ButtonB from "components/CustomButton/CustomButton";

const Headers = [
    "Dependência",
    "Data",
    "Horário",
    "Qtd. de ocupantes"
];

const dataReducer = collision => (
   [
       collision.outbuilding.name,
       collision.date,
       collision.time,
       collision.maxOccupation
   ] 
)

const searchOne = (query, history) => {
    console.log(`Procurando ${query} ...`);
}

const onRemoval = (collision) => {
    console.log(`Removing: ${collision.id}`);
} 

const onView = (collision, history) => {
    history.push(`/admin/collision/${collision.id}`);
}

async function fakeItems() {
    await new Promise(r => setTimeout(r, 2000));
    return [
        {
            "id": "teste1",
            "outbuilding": {
                "id": "teste",
                "name": "Piscina",
            },
            "date": "19/10/2020",
            "time": "14:30 ás 16:30",
            "maxOccupation": "Cheio"
        },
        {
            "id": "teste2",
            "outbuilding": {
                "id": "teste",
                "name": "Piscina",
            },
            "date": "19/10/2020",
            "time": "14:30 ás 16:30",
            "maxOccupation": "Cheio"
        }
    ];
}

// const Operations = ({ item, setSelectedItem }) => (
//     <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
//         <Link to={`collision/${item.id}/`}>
//             <ButtonB
//                 bsStyle="success" bsSize="xs"
//                 simple type="button" style={{ padding: '3px' }}>
//                 <span className="fa fa-pencil"></span>
//             </ButtonB>
//         </Link>

//         {' '}
//         <ButtonB bsStyle="danger" 
//             simple type="button" bsSize="xs" style={{ padding: '3px' }}
//             onClick={() => setSelectedItem(item)}>
//             <span className="fa fa-times"></span>
//         </ButtonB>                                
//     </div>
// )

const CollisionList = ({}) => {

    return <Listing 
            name="conflito" 
            title="Lista de conflitos"
            addLink="collision"
            headers={Headers}
            dataReducer={dataReducer}
            searchOne={searchOne} 
            onItemClick={onView}
            onItemRemoval={onRemoval}
            fetchItems={fakeItems} />
}

export default CollisionList;