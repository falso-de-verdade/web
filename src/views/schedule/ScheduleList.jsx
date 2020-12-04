import React from "react";
import { Link } from "react-router-dom";

import ButtonB from "components/CustomButton/CustomButton.jsx";
import { UserAuthContext } from "contexts";
import { Listing } from "components/Listing";
import ScheduleDomain from "domains/schedule";

const dataReducer = shedule => [
    shedule.resident,
    shedule.dependency,
    shedule.date,
    shedule.hour,
    shedule.NumOccupants,
]

const Headers = [
    "Morador",
    "dependência",
    "data",
    "horário",
    "QTD. de ocupantes"
]

const searchOne = (query, history) => {
    console.log(`Procurando ${query} ...`);
}

const onView = (outb, history) => {
    history.push(ScheduleDomain.itemPath(outb));
}

const Operations = ({ item, selectItem }) => (
    <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
        <UserAuthContext.Consumer>
            {user => {
                const link = ScheduleDomain.itemPath(item);

                if (user.isManager) {
                    return <React.Fragment>
                        <Link to={link}>
                            <ButtonB
                                bsStyle="success" bsSize="xs"
                                simple type="button" style={{ padding: '3px' }}>
                                <span className="fa fa-pencil"></span>
                            </ButtonB>
                        </Link>

                        {' '}
                        <ButtonB bsStyle="danger" simple type="button" bsSize="xs" style={{ padding: '3px' }}
                            onClick={selectItem}>
                            <span className="fa fa-times"></span>
                        </ButtonB>
                    </React.Fragment>;
                }

                return (
                    <Link to={link}>
                        <ButtonB
                            bsStyle="success" bsSize="xs"
                            simple type="button" style={{ padding: '3px' }}>
                            <span className="fa fa-eye"></span>
                        </ButtonB>
                    </Link>
                )
            }}
        </UserAuthContext.Consumer>
    </div>
)

const ScheduleList = ({ }) => (
    <UserAuthContext.Consumer>
        {
            user => <Listing
                name="agendamentos"
                title="Lista de Agendamentos"
                headers={Headers} www
                dataReducer={dataReducer}
                searchOne={searchOne}
                onItemClick={onView}
                onItemRemoval={ScheduleDomain.remove}
                fetchItems={ScheduleDomain.list}
                OperationsComponent={Operations}
                addLink={user.isManager && ScheduleDomain.resource} />
        }
    </UserAuthContext.Consumer>
)

export {
    ScheduleList,
    dataReducer,
    Headers,
};