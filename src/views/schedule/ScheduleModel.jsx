import React from 'react';
import { Row, Col } from "reactstrap";

import { 
    dataReducer as scheduleDataReducer,
    Headers as scheduleHeaders,
} from "./ScheduleList";
import Button from "components/CustomButton/CustomButton";
import { ModelComponent } from 'views/common';
import ScheduleDomain from 'domains/schedule';
import { ModalWithListing } from "components/Modal";
import SelectOptions from "components/SelectOptions/SelectOptions";
import OutbDomain from "domains/outbuilding";
import DayPicker from "react-day-picker";

class ScheduleModel extends ModelComponent {
    domain = ScheduleDomain;

    onModelResponse = (response, formValues) => {
        if (response && !this.isEditing) {
            // const scheduleCollision = {
            //     resident: 'João José',
            //     dependency: 'Piscina Bloco A',
            //     date: '02/13/2020',
            //     hour: '25:01',
            //     NumOccupants: 3,
            // }
            // return {
            //     collision: scheduleCollision
            // }
        }
    }

    disableFields = () => this.context.isManager;

    mapData = values => {
        const {
            outbuilding,
            day,
            occupants,
            fromHour,
            toHour,
            notes
        } = values;

        return {
            day,
            outbuilding,
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
        <ModalWithListing
            show={this.state.collision}
            title="Conflito"
            bodyText={[
                "Lamentamos informar mas o agendamento solicitado com um já existente.",
                "Dados do agendamento existente.",
            ]}
            buttons={this.modalButtons()}
            headers={scheduleHeaders}
            items={[this.state.collision]}
            dataReducer={scheduleDataReducer}
            />
    )

    modalButtons = () =>
        <Row>
            <Col md={2}>
                <Button pullLeft fill bsStyle="info">Não quero continuar com esse agendamento</Button>
            </Col>

            <Col md={10}>
                <Button fill onClick={this.dispatchModelRedirect}>
                    Entendi
                </Button>
            </Col>
        </Row>

    storeTab = () => {
        return {
            name: "Cadastro",
            rows: [
                {
                    outbuilding: {
                        type: "select",
                        label: "Dependência",
                        children:
                            <SelectOptions 
                                domain={OutbDomain}
                                nameResolver={outb => outb.name}
                                selected={this.isEditing && this.originalData['outbuilding']}
                            />
                    },
                    day: {
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
                        type: "number",
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