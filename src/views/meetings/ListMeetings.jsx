import React, { Component } from "react";
import { Table, Grid, Row, Col, FormControl } from "react-bootstrap";
import Card from "components/Card/Card";
import Button from "components/CustomButton/CustomButton";
import ButtonB from "components/CustomButton/CustomButton";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom'
import { UserAuthContext } from "contexts";
import MeetingsDomain from "domains/meetings"
import { Listing } from "components/Listing";

const dataReducer = meet => [
  meet.description,
  meet.date,
  meet.start,
  meet.duration,
]

const Headers = [
  "Descrição",
  "Data",
  "Inicio",
  "Duração Prevista"
]

const searchOne = (query, history) => {
  console.log(`Procurando ${query} ...`);
}

const onView = (meet, history) => {
  history.push(MeetingsDomain.itemPath(meet));
}

const Operations = ({ item, selectItem }) => (
  <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
    <UserAuthContext.Consumer>
      {user => {
        const link = MeetingsDomain.itemPath(item);

        if (user.isManager) {
          return <React.Fragment>
            <Link to={link}>,
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
          </React.Fragment>
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

const MeetingsList = ({ }) => (
  <UserAuthContext.Consumer>
    {
      user => <Listing
        name="reunião"
        title="Quadro de Reuniões"
        headers={Headers}
        dataReducer={dataReducer}
        searchOne={searchOne}
        onItemClick={onView}
        onItemRemoval={MeetingsDomain.remove}
        fetchItems={MeetingsDomain.list}
        OperationsComponent={Operations}
        addLink={user.isManager && MeetingsDomain.resource} />
    }
  </UserAuthContext.Consumer>
)

export default MeetingsList;