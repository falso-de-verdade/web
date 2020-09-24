import React, { Component } from 'react';
import Button from 'components/CustomButton/CustomButton.jsx';
import api from '../../services/api';
import {
    Row, Col, Label, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Modal
} from 'reactstrap';
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

const residentDataReducer = resident => [
    resident.name,
    resident.email,
    resident.location,
    resident.schdule_creation_at
]

const residentHeaders = ["Nome", "E-mail", "Localização", "Requisição"]

class CollisionModel extends ModelComponent {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            activeTab: '1',
            modalOpen: true,
            selectedResident: null
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          })
        }
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

        if (this.state.selectedResident) {
            console.log(this.state.selectedResident); 
        }

        return (
            <div className="content">
                <Row>
                    <Col style={{ marginTop: '-10px' }} md={12}>

                        <Card>
                            <CardBody style={{ padding: '10px', fontSize: 12 }}>
                                <Nav tabs>
                                    <NavItem className={classnames({ active: this.state.activeTab === '1' })}>
                                        <NavLink href="#" style={{ color: '#000' }}
                                        onClick={() => { this.toggle('1'); }}>Tickets</NavLink>
                                    </NavItem>

                                    <NavItem className={classnames({ active: this.state.activeTab === '2' })}>
                                        <NavLink href="#" style={{ color: '#000' }}
                                        onClick={() => { this.toggle('2'); }}>Dados do agendamento</NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent activeTab={this.state.activeTab} style={{ fontSize: 11 }}>
                                    <TabPane tabId="1">
                                        <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                                            <Col md={12}>
                                                <TableComponent
                                                    headers={residentHeaders}
                                                    items={this.state.residents}
                                                    dataReducer={residentDataReducer}
                                                    setSelectedItem={item => this.setState({ selectedResident: item }) }
                                                    OperationsComponent={TicketOperations} />
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>

                                <TabContent activeTab={this.state.activeTab} style={{ fontSize: 11 }}>
                                    <TabPane tabId="2">
                                        <AvForm autoComplete="off" onSubmit={this.operacaoTransportadora} ref="formCollision">
                                            <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                                                <Col md={3}>
                                                    <AvGroup>
                                                        <Label for="outbuildingId" style={styleLabel}>Dependência</Label>
                                                        <AvField type="text" name="outbuildingId" id="outbuildingId" style={styleInput}
                                                            value={this.state.outbuilding.name}
                                                            disabled={true} />
                                                    </AvGroup>
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingLeft: '10px', paddingRight: '10px' }} >
                                                <Col style={{ marginTop: '-10px' }} md={2}>
                                                    <AvGroup>
                                                        <Label for="fromHour" style={styleLabel}>Hora início</Label>
                                                        <AvField type="time" name="fromHour" id="fromHour" style={styleInput}
                                                            disabled={true}
                                                            value={this.state.fromHour} />
                                                    </AvGroup>
                                                </Col>
                                                <Col style={{ marginTop: '-10px' }} md={2}>
                                                    <AvGroup>
                                                        <Label for="toHour" style={styleLabel}>Hora fim</Label>
                                                        <AvField type="time" name="toHour" id="toHour" style={styleInput}
                                                            disabled={true}
                                                            value={this.state.toHour} />
                                                    </AvGroup> 
                                                </Col>
                                                <Col md={3} style={{ marginTop: '-10px' }}>
                                                    <AvGroup>
                                                        <Label for="peopleCount" style={styleLabel}>Quantidade de ocupantes</Label>
                                                        <AvField type="number" name="peopleCount" id="peopleCount" 
                                                            min={1}
                                                            style={styleInput}
                                                            value={this.state.peopleCount}
                                                            disabled={true}
                                                            placeholder="Ocupação total">
                                                        </AvField>
                                                    </AvGroup>
                                                </Col>
                                            </Row>

                                            <Row style={{ paddingLeft: '10px', paddingRight: '10px' }} >
                                                <Col md={12} style={{ marginTop: '-10px' }}>
                                                    <AvGroup>
                                                        <Label for="notes" style={styleLabel}>Observações</Label>
                                                        <AvField type="textarea" rows={5} name="notes" id="notes"
                                                            disabled={true}
                                                            value={this.getModelAttr('notes')} />
                                                    </AvGroup>
                                                </Col>
                                            </Row>
                                        </AvForm>
                                        <div className="clearfix" />
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                        <Link to={`../collisions`}>
                            <Button pullLeft fill bsStyle="danger">
                                Cancelar
                            </Button>
                        </Link>
                    </Col>
                </Row>

                {/* <Modal
                    show={this.state.selectedResident}
                    aria-labelledby="contained-modal-title">
                    <Modal.Header>
                        <Modal.Title>Aceitar ticket</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p className="text-center">
                            Confirma a finalização do ticket para o seguinte morador ?
                        </p>
                        <TableComponent 
                            headers={residentHeaders}
                            items={[this.state.selectedResident]}
                            dataReducer={residentDataReducer} />
                    </Modal.Body>

                    <Modal.Footer>
                        <ButtonB fill bsStyle="danger" onClick={e => {
                            this.setState({ selectedResident: null })
                        }}>Excluir</ButtonB>

                        <ButtonB fill onClick={e => this.setState({ selectedResident: null })}>Cancelar</ButtonB>
                    </Modal.Footer>
                </Modal> */}
            </div>
        )
    }

}

export default CollisionModel;