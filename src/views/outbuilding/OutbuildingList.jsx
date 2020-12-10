import React from "react";
import { Link } from "react-router-dom";

import ButtonB from "components/CustomButton/CustomButton.jsx";
import { UserAuthContext } from "contexts";
import { Listing } from "components/Listing";
import OutbuildingDomain from "domains/outbuilding";

const dataReducer = outb => [
  outb.name,
  outb.capacity,
  outb.condominium.name
]

const Headers = [
  "Nome",
  // "Disponibilidade", 
  "Capacidade",
  // "Local",
  "Condomínio"
]

const searchOne = (query, history) => {
  console.log(`Procurando ${query} ...`);
}

const onView = (outb, history) => {
  history.push(OutbuildingDomain.itemPath(outb));
}

const Operations = ({ item, selectItem }) => (
  <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
    <UserAuthContext.Consumer>
      {user => {
        const link = OutbuildingDomain.itemPath(item);

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

const fetchItems = (config) =>
  OutbuildingDomain.list({
    ...config,
    params: {
      embedded: '{"condominium":1}',
      ...config.params,
    }
  })

const OutbuildingList = ({ }) => (
  <UserAuthContext.Consumer>
    {
      user => <Listing
        name="dependência"
        title="Lista de dependências"
        headers={Headers}
        dataReducer={dataReducer}
        searchOne={searchOne}
        onItemClick={onView}
        onItemRemoval={OutbuildingDomain.remove}
        fetchItems={fetchItems}
        OperationsComponent={Operations}
        addLink={user.isManager && OutbuildingDomain.resource} />
    }
  </UserAuthContext.Consumer>
)

export default OutbuildingList;
