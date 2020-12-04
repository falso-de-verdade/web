import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from "reactstrap";
import { Modal } from "react-bootstrap";

import { 
    dataReducer as scheduleDataReducer,
    Headers as scheduleHeaders,
} from "./ScheduleList";
import Button from "components/CustomButton/CustomButton";
import { ModelComponent } from 'views/common';
import ScheduleDomain from 'domains/schedule';
import { TableComponent } from "components/Listing";
import DayPicker from "react-day-picker";

class ScheduleModel extends ModelComponent {
    domain = ScheduleDomain;

    onModelResponse = (response, formValues) => {
        if (response && !this.isEditing) {
            const scheduleCollision = {
                resident: 'João José',
                dependency: 'Piscina Bloco A',
                date: '02/13/2020',
                hour: '25:01',
                NumOccupants: 3,
            }
            return {
                collision: scheduleCollision
            }
        }
    }

    mapData = values => {
        const {
            outbuildingId,
            day,
            occupants,
            fromHour,
            toHour,
            notes
        } = values;

        return {
            outbuildingId,
            day,
            occupants,
            fromHour,
            toHour,
            notes
        }
    }

    tabAndFields = () => {
        return [
            this.storeTab(),
        ]
    }

    renderModal = () => (
        <Modal
            show={!!this.state.collision}
            aria-labelledby="contained-modal-title">
            <Modal.Header>
                <Modal.Title>Conflito</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="text-center">
                    Lamentamos informar mas o agendamento solicitado com um já existente.
                    Dados do agendamento existente.
                </p>
                <TableComponent
                    headers={scheduleHeaders}
                    items={[this.state.collision]}
                    dataReducer={scheduleDataReducer} />
            </Modal.Body>

            <Modal.Footer>
                <Row style={{ paddingLeft: '10px', paddingRight: '10px' }} >
                    <Col md={2}>
                        <Button pullLeft fill bsStyle="info">Não quero continuar com esse agendamento</Button>
                    </Col>

                    <Col md={10}>
                        <Button fill onClick={this.dispatchModelRedirect}>
                            Entendi
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )

    storeTab = () => {
        return {
            name: "Cadastro",
            rows: [
                {
                    outbuildingId: {
                        type: "select",
                        label: "Dependência",
                        children:
                            <React.Fragment>
                                <option>Selecionar</option>
                                <option value="0">São joao</option>
                            </React.Fragment>
                    },
                    date: {
                        type: "date",
                        label: "Dia do agendamento"
                    },

                    /*day: {
                        as: DayPicker,
                        label: "dia",
                        required: false,
                        col: {
                            md: 8
                        }
                        selectedDays={this.getModelAttr('day')},
                        onDayClick={this.isViewing() ? null : this.setModelAttrValue('day')}
                    } */
                },
                {
                    fromHour: {
                        type: "time",
                        label: "Hora início"
                    },
                    toHour: {
                        type: "time",
                        label: "Hora fim"
                    },
                    occupants: {
                        type: "text",
                        label: "Quantidade de ocupantes"
                    }
                },
                {
                    notes: {
                        type: "textarea",
                        label: "Observações"
                    }
                },
                {
                    modal: this.renderModal()
                }
            ]
        }
    }
}

export default ScheduleModel;