import React from "react";
import { Link } from "react-router-dom";
import { Listing } from "components/Listing";
import ButtonB from "components/CustomButton/CustomButton";
import CollisionDomain from "domains/collision";
import { 
    dataReducer as scheduleDataReducer, 
    Headers } from "views/schedule/ScheduleList";


const dataReducer = ({ schedule }) => 
    scheduleDataReducer(schedule)

const searchOne = (query, history) => {
    console.log(`Procurando ${query} ...`);
}

const onView = (collision, history) => {
    history.push(CollisionDomain.itemPath(collision));
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

const CollisionList = ({ }) => {

    return <Listing
        name="conflito"
        title="Lista de conflitos"
        headers={Headers}
        dataReducer={dataReducer}
        searchOne={searchOne}
        onItemClick={onView}
        onItemRemoval={CollisionDomain.remove}
        fetchItems={CollisionDomain.list}
        OperationsComponent={Operations}
    />
}

export default CollisionList;