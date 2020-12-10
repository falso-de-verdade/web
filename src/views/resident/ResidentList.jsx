import React from "react";
import { Link } from "react-router-dom";

import { Listing } from "components/Listing";
import ButtonB from "components/CustomButton/CustomButton.jsx";
import UserDomain from "domains/user";


const dataReducer = resident => [
  resident._created,
  resident.name,
  resident.email,
  resident.location,
]

const Headers = [
  "Data de Entrada", 
  "Nome", 
  "E-mail", 
  "Localizaçao",
]

const searchOne = (query, history) => {
  console.log(`Procurando ${query} ...`);
}

const onView = (resident, history) => {
  history.push(`resident/${resident._id}`);
}

const Operations = ({ item, selectItem }) => (
  <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
      <Link to={`resident/${item._id}`}>
        <ButtonB bsStyle="success" simple type="button" bsSize="xs" style={{ padding: '3px' }}>
          <span className="fa fa-pencil"></span>
        </ButtonB>
      </Link>
      {' '}
      <ButtonB bsStyle="danger" simple type="button" bsSize="xs" style={{ padding: '3px' }}
        onClick={selectItem}>
        <span className="fa fa-times"></span>
      </ButtonB>
  </div>
)

const ResidentList = ({}) => {

  return <Listing 
          name="morador" 
          title="Lista de moradores"
          headers={Headers}
          dataReducer={dataReducer}
          searchOne={searchOne} 
          onItemClick={onView}
          onItemRemoval={UserDomain.remove}
          fetchItems={UserDomain.list} 
          OperationsComponent={Operations} />
}

export default ResidentList;