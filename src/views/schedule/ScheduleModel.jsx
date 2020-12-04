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
                }
            ]
        }
    }
}

export default ScheduleModel;