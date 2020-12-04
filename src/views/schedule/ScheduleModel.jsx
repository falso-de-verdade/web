import React from 'react';

import { ModelComponent } from 'views/common';
import ScheduleDomain from 'domains/schedule';
import DayPicker from "react-day-picker";

class ScheduleModel extends ModelComponent {
    domain = ScheduleDomain;

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