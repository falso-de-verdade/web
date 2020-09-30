import React, { Component } from 'react';
import Button from 'components/CustomButton/CustomButton.jsx';
import api from '../../services/api';
import {
    Row, Col, Label, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane
} from 'reactstrap';
import { Modal } from "react-bootstrap";
import classnames from 'classnames';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { Link } from "react-router-dom";

import ButtonB from "components/CustomButton/CustomButton";
import { ModelComponent } from "views/common";
import { TableComponent } from "components/Listing";

const TicketOperations = ({ item, setSelectedItem }) => (
    <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
        <ButtonB bsStyle="warning" 
            simple type="button" bsSize="xs" style={{ padding: '3px' }}
            onClick={() => setSelectedItem(item)}>
            <span className="fa fa-check"></span>
        </ButtonB>                                
    </div>
)

const collisionDataReducer = collision => [
    collision.resident.name,
    collision.date,
    collision.timeRange,
    collision.peopleCount,
]

const collisionHeaders = ["Morador", "Data", "Horário", "Qtd. de ocupantes"]

class CollisionModel extends ModelComponent {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            activeTab: '1',
            modalOpen: true,
            hasSelectedResident: false
        }

        this.selectedResident = null;
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          })
        }
      }

    toggleModal = () => {
        this.setState({ hasSelectedResident: !this.state.hasSelectedResident })
    }

    resolveCollision = () => {
        console.log(`Resolvendo conflito para ${this.selectedResident.name}`);
        this.toggleModal();
    }

    render() {
        const styleInput = {
            fontSize: 12,
            height: '38px'
        }

        const styleInputUpper = {
            fontSize: 12,
            textTransform: 'uppercase'
        }

        const styleLabel = {
            fontSize: 11
        }

        return (
            <div className="content">
                <Row>
                    <Col style={{ marginTop: '-10px' }} md={12}>

                        <Card>
                            <CardBody style={{ padding: '10px', fontSize: 12 }}>
                                <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                                    <Col md={12}>
                                        <TableComponent
                                            headers={collisionHeaders}
                                            items={this.state.collisions}
                                            dataReducer={collisionDataReducer}
                                            setSelectedItem={item => {
                                                this.selectedResident = item;
                                                this.toggleModal(); 
                                            }}
                                            OperationsComponent={TicketOperations} />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Link to={`../collisions`}>
                            <Button pullLeft fill bsStyle="danger">
                                Cancelar
                            </Button>
                        </Link>
                    </Col>
                </Row>

                <Modal
                    show={this.state.hasSelectedResident}
                    aria-labelledby="contained-modal-title">
                    <Modal.Header>
                        <Modal.Title>Resolver ticket</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p className="text-center">
                            Confirma a resolução do ticket para o seguinte morador ?
                        </p>
                        <TableComponent 
                            headers={collisionHeaders}
                            items={[this.selectedResident]}
                            dataReducer={collisionDataReducer} />
                    </Modal.Body>

                    <Modal.Footer>
                        <ButtonB fill bsStyle="danger" onClick={this.resolveCollision}>Resolver</ButtonB>

                        <ButtonB fill onClick={this.toggleModal}>Cancelar</ButtonB>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default CollisionModel;