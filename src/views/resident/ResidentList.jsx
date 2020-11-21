import React from "react";
import { Link } from "react-router-dom";

import { Listing } from "components/Listing";
import ButtonB from "components/CustomButton/CustomButton.jsx";
import { list } from "domains/user";


const dataReducer = resident => [
  resident.name,
  resident.email,
]

const Headers = [
  // "Data de Entrada", 
  "Nome", 
  "E-mail", 
  // "Localizaçao",
]

const searchOne = (query, history) => {
  console.log(`Procurando ${query} ...`);
}

const onRemoval = resident => {
  console.log(`Removing: ${resident.id}`);
} 

const onView = (resident, history) => {
  history.push(`resident/${resident._id}`);
}

async function fakeItems() {
  const response = await list();
  return response.data._items;
}

const Operations = ({ item, setSelectedItem }) => (
  <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
      <Link to={`resident/${item._id}`}>
        <ButtonB bsStyle="success" simple type="button" bsSize="xs" style={{ padding: '3px' }}>
          <span className="fa fa-pencil"></span>
        </ButtonB>
      </Link>
      {' '}
      <ButtonB bsStyle="danger" simple type="button" bsSize="xs" style={{ padding: '3px' }}>
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
          onItemRemoval={onRemoval}
          fetchItems={fakeItems} 
          OperationsComponent={Operations} />
}

export default ResidentList;