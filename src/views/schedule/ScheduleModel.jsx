import React, { Component } from 'react';
import Button from 'components/CustomButton/CustomButton.jsx';
import api from '../../services/api';
import {
    Row, Col, Label, Card, CardBody, Nav
} from 'reactstrap';
import classnames from 'classnames';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import { ModelComponent } from "views/common";
import { UserAuthContext } from "contexts";

class ScheduleModel extends ModelComponent {
    static contextType = UserAuthContext;

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            activeTab: '1',
            modalOpen: true,
        }
    }

    // TODO use a better method to test which operation this model is in
    isViewing = () => this.state.outbuildingId !== undefined

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
                    <Col md={12}>

                        <Card>
                            <CardBody>

                                <AvForm autoComplete="off" onSubmit={this.operacaoTransportadora} ref="formSchedule">
                                    <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                                        {this.context.isManager && this.state.resident &&
                                            <Col md={3}>
                                                <AvGroup>
                                                    <Label for="residentName" style={styleLabel}>Morador</Label>
                                                    <AvField 
                                                        type="text" 
                                                        name="residentName" 
                                                        id="residentName" 
                                                        style={styleInput}
                                                        disabled={this.isViewing()}
                                                        value={this.state.resident.name} />
                                                </AvGroup>
                                            </Col>
                                        }

                                        <Col md={3}>
                                            <AvGroup>
                                                <Label for="outbuildingId" style={styleLabel}>Dependência</Label>
                                                <AvField type="select" name="outbuildingId" id="outbuildingId" style={styleInput}
                                                    value={this.getModelAttr('outbuildingId')}
                                                    disabled={this.isViewing()}
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
                                                    onDayClick={this.isViewing() ? null : this.setModelAttrValue('day')} />
                                            </AvGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingLeft: '10px', paddingRight: '10px' }} >
                                        <Col style={{ marginTop: '-10px' }} md={2}>
                                            <AvGroup>
                                                <Label for="fromHour" style={styleLabel}>Hora início</Label>
                                                <AvField type="time" name="fromHour" id="fromHour" style={styleInput}
                                                    disabled={this.isViewing()}
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Campo "Hora início" obrigatório' },
                                                    }} />
                                            </AvGroup>
                                        </Col>
                                        <Col style={{ marginTop: '-10px' }} md={2}>
                                            <AvGroup>
                                                <Label for="toHour" style={styleLabel}>Hora fim</Label>
                                                <AvField type="time" name="toHour" id="toHour" style={styleInput}
                                                    disabled={this.isViewing()}
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Campo "Hora fim" obrigatório' },
                                                    }} />
                                            </AvGroup>
                                        </Col>
                                        <Col md={3} style={{ marginTop: '-10px' }}>
                                            <AvGroup>
                                                <Label for="peopleCount" style={styleLabel}>Quantidade de ocupantes</Label>
                                                <AvField type="number" name="peopleCount" id="peopleCount" 
                                                    min={1}
                                                    style={styleInput}
                                                    disabled={this.isViewing()}
                                                    value={this.getModelAttr('peopleCount')} 
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
                                                    disabled={this.isViewing()}
                                                    value={this.getModelAttr('notes')} />
                                            </AvGroup>
                                        </Col>
                                    </Row>
                                </AvForm>
                                <div className="clearfix" />
                            </CardBody>
                        </Card>
                        <AvForm autoComplete="off" onSubmit={this.operacaoTransportadora} ref="formSchedule">
                            <Button pullRight fill bsStyle="danger"
                                onClick={this.retornarListaTransportadora}>
                                Cancelar
                            </Button>
{/* 
                            <Button bsStyle="success" fill type="submit"
                                disabled={this.state.disabledButtons}>
                                Gravar
                            </Button> */}
                        </AvForm>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default ScheduleModel;