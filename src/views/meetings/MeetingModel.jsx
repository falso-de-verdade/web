import React from 'react';

import { ModelComponent } from "views/common";
import MeetingDomain from "domains/meetings";

class MeetingModel extends ModelComponent {
  domain = MeetingDomain;

  mapData = values => {
    const {
      date,
      fromHour,
      toHour,
      description,
    } = values;

    return {
      date,
      fromHour,
      toHour,
      description,
    }
  }

  tabAndFields = () => [
    this.storeTab(),
  ]

  storeTab = () => {
    return {
      name: "Cadastro",
      rows: [
        {
          date: {
            type: "date",
            label: "Dia da reunião",
          },
          fromHour: {
            type: "time",
            label: "Início",
          },
          toHour: {
            type: "time",
            label: "Fim",
          }
        },
        {
          description: {
            type: "textarea",
            label: "Descrição/tópicos da reunião",
          },
        },
      ]
    }
  }
}

export default MeetingModel