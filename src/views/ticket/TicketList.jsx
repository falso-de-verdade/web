import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Listing } from "components/Listing";
import ButtonB from "components/CustomButton/CustomButton";

const dataReducer = ticket => [
    ticket.outbuilding.name,
    ticket.date,
    ticket.timeRange,
    ticket.peopleCount,
    ticket.isClosed ? 
        (ticket.wasAccepted ? "Aceito" : "Fechado") : 
        "Pendente"
]

const Headers = [
    "Dependência", 
    "Data", 
    "Horário", 
    "Qtd. de ocupantes",
    "Status",
]

const searchOne = (query, history) => {
    console.log(`Procurando ${query} ...`);
}

const onRemoval = ticket => {
    console.log(`Removing: ${ticket.id}`);
} 

const onView = (ticket, history) => {
    history.push(`ticket/${ticket.id}`);
}

async function fakeItems() {
    // await new Promise(r => setTimeout(r, 2000));
    return [
        {
            id: "teste1",
            outbuilding: {
                name: "Piscina",
            },
            date: "15/09/2020",
            timeRange: "16:20 ás 19:00",
            peopleCount: 3,
            isClosed: true,
            wasAccepted: true
        },
        {
            id: "teste1",
            outbuilding: {
                name: "Salão de jogos",
            },
            date: "30/09/2020",
            timeRange: "15:45 ás 16:30",
            peopleCount: 6,
            isClosed: false,
            wasAccepted: false
        },
        {
            id: "teste1",
            outbuilding: {
                name: "Piscina",
            },
            date: "11/09/2020",
            timeRange: "12:30 ás 13:20",
            peopleCount: 10,
            isClosed: true,
            wasAccepted: false
        },
    ];
}

const Operations = ({ item, setSelectedItem }) => (
    <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
        <Link to={`ticket/${item.id}/`}>
            <ButtonB
                bsStyle="success" bsSize="xs"
                simple type="button" style={{ padding: '3px' }}>
                <span className="fa fa-eye"></span>
            </ButtonB>
        </Link>

        <ButtonB
            bsStyle="danger" bsSize="xs"
            onClick={e => setSelectedItem(item)}
            simple type="button" style={{ padding: '3px' }}>
            <span className="fa fa-times"></span>
        </ButtonB>                    
    </div>
)

const TicketList = ({}) => {

    return <Listing 
            name="ticket" 
            title="Lista de tickets"
            headers={Headers}
            dataReducer={dataReducer}
            searchOne={searchOne} 
            onItemClick={onView}
            onItemRemoval={onRemoval}
            fetchItems={fakeItems} 
            OperationsComponent={Operations} />
}

export default TicketList;