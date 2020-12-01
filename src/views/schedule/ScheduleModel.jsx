import React, { Component } from 'react';
import Button from 'components/CustomButton/CustomButton.jsx';
import api from '../../services/api';
import {
    Row, Col, Label, Card, CardBody, Nav
} from 'reactstrap';
import { Modal } from "react-bootstrap";
import classnames from 'classnames';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Link } from "react-router-dom";

import { ModelComponent } from "views/common";
import { UserAuthContext } from "contexts";
import { TableComponent } from "components/Listing";
import ButtonB from "components/CustomButton/CustomButton.jsx";
import ScheduleDomain from "domains/schedule";

const scheduleHeaders = [
    "Morador",
    "Dependência",
    "Data",
    "Horário",
    "Qtd. de ocupantes"
]

const scheduleDataReducer = schedule => [
    schedule.resident.name,
    schedule.outbuilding.name,
    schedule.date,
    schedule.timeRange,
    schedule.peopleCount,
]

class ScheduleModel extends ModelComponent {
    static contextType = UserAuthContext;

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            activeTab: '1',
            modalOpen: true,
            hasCollision: false,
        }

        this.domain = ScheduleDomain;

        this.collisionedSchedule = null;
    }

    mapData = () => {
        const {
            resident,
            outbuilding,
            date,
            schedule,
            NumOccupants
        } = this.state;

        return {
            resident,
            outbuilding,
            date,
            schedule,
            NumOccupants
        }
    }

    tabs = () => {
        return this.store()
    }

    disableFields = () => this.isEditing;

    handleSubmit = e => {
        this.collisionedSchedule = {
            resident: {
                name: "Yan"
            },
            outbuilding: {
                name: "Salão de festas"
            },
            date: "19/04/2020",
            timeRange: "21:00 ás 23:00",
            peopleCount: 20,
        }

        this.setState({ hasCollision: true })
    }

    store = () => (

        <React.Fragment>
            <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                {
                    this.context.isManager && this.state.resident &&
                    <Col md={3}>
                        <AvGroup>
                            <Label for="residentName" >Morador</Label>
                            <AvField
                                type="text"
                                name="residentName"
                                id="residentName"

                                value={this.state.resident.name} />
                        </AvGroup>
                    </Col>
                }

                <Col md={3}>
                    <AvGroup>
                        <Label for="outbuildingId" >Dependência</Label>
                        <AvField type="select" name="outbuildingId" id="outbuildingId"
                            value={this.getModelAttr('outbuildingId')}
                            validate={{
                                required: { value: true, errorMessage: 'Campo "Nome" obrigatório' },
                            }} >
                            <option value="0">Salão de jogos - Bloco B</option>
                            <option value="1">Piscina</option>
                        </AvField>
                    </AvGroup>
                </Col>
                <Col md={6} >
                    <AvGroup>
                        <DayPicker
                            selectedDays={this.getModelAttr('day')}
                        //onDayClick={this.isViewing() ? null : this.setModelAttrValue('day')}
                        />
                    </AvGroup>
                </Col>
            </Row>
            <Row style={{ paddingLeft: '10px', paddingRight: '10px' }} >
                <Col style={{ marginTop: '-10px' }} md={2}>
                    <AvGroup>
                        <Label for="fromHour" >Hora início</Label>
                        <AvField type="time" name="fromHour" id="fromHour"
                            validate={{
                                required: { value: true, errorMessage: 'Campo "Hora início" obrigatório' },
                            }} />
                    </AvGroup>
                </Col>
                <Col style={{ marginTop: '-10px' }} md={2}>
                    <AvGroup>
                        <Label for="toHour">Hora fim</Label>
                        <AvField type="time" name="toHour" id="toHour"
                            validate={{
                                required: { value: true, errorMessage: 'Campo "Hora fim" obrigatório' },
                            }} />
                    </AvGroup>
                </Col>
                <Col md={3} style={{ marginTop: '-10px' }}>
                    <AvGroup>
                        <Label for="peopleCount">Quantidade de ocupantes</Label>
                        <AvField type="number" name="peopleCount" id="peopleCount"
                            min={1}
                            value={this.getModelAttr('peopleCount')}
                            placeholder="Ocupação total">
                        </AvField>
                    </AvGroup>
                </Col>
            </Row>

            <Row style={{ paddingLeft: '10px', paddingRight: '10px' }} >
                <Col md={12} style={{ marginTop: '-10px' }}>
                    <AvGroup>
                        <Label for="notes">Observações</Label>
                        <AvField type="textarea" rows={5} name="notes" id="notes"
                            value={this.getModelAttr('notes')} />
                    </AvGroup>
                </Col>
            </Row>

            < Modal
                show={this.state.hasCollision}
                aria-labelledby="contained-modal-title" >
                <Modal.Header>
                    <Modal.Title>Conflito</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="text-center">
                        Lamentamos informar mas o agendamento solicitado com um já existente.
                        Um ticket será aberto.
                    </p>
                    <TableComponent
                        headers={scheduleHeaders}
                        items={[this.collisionedSchedule]}
                        dataReducer={scheduleDataReducer} />
                </Modal.Body>

                <Modal.Footer>
                    <Row style={{ paddingLeft: '10px', paddingRight: '10px' }} >
                        <Col md={2}>
                            <Link to={"ticket/teste1"}>
                                <ButtonB pullLeft fill bsStyle="info">Ver ticket</ButtonB>
                            </Link>
                        </Col>

                        <Col md={10}>
                            <Link to={"schedule/teste1"}>
                                <ButtonB fill>Entendi</ButtonB>
                            </Link>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal >

        </React.Fragment>
    )
}

export default ScheduleModel;