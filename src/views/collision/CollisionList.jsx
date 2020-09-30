import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Listing } from "components/Listing";
import ButtonB from "components/CustomButton/CustomButton";

const Headers = [
    "Dependência",
    "Data",
    "Qtd. de tickets"
];

const dataReducer = collision => (
   [
       collision.outbuilding.name,
       collision.date,
       collision.tickets.length
   ] 
)

const searchOne = (query, history) => {
    console.log(`Procurando ${query} ...`);
}

const onRemoval = (collision) => {
    console.log(`Removing: ${collision.id}`);
} 

const onView = (collision, history) => {
    history.push(`collision/${collision.id}`);
}

async function fakeItems() {
    // await new Promise(r => setTimeout(r, 2000));
    return [
        {
            id: "teste1",
            outbuilding: {
                id: "teste",
                name: "Piscina",
            },
            date: "30/09/2020",
            tickets: [
                {
                    resident: {
                        name: "Yan"
                    },
                    timeRange: "14:30 ás 15:00",
                    peopleCount: 20
                },
                {
                    resident: {
                        name: "Maria"
                    },
                    timeRange: "14:45 ás 15:45",
                    peopleCount: 8
                },
                {
                    resident: {
                        name: "Maria"
                    },
                    timeRange: "14:45 ás 15:45",
                    peopleCount: 8
                }
            ]
        },
        
    ];
}

const Operations = ({ item, setSelectedItem }) => (
    <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
        <Link to={`collision/${item.id}/`}>
            <ButtonB
                bsStyle="success" bsSize="xs"
                simple type="button" style={{ padding: '3px' }}>
                <span className="fa fa-eye"></span>
            </ButtonB>
        </Link>                            
    </div>
)

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
            fetchItems={fakeItems} 
            OperationsComponent={Operations} />
}

export default CollisionList;