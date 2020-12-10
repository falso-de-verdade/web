import React from "react";

import Button from "components/CustomButton/CustomButton";
import { ModelComponent } from "views/common";
import OutbDomain from "domains/outbuilding";
import CondoDomain from "domains/condominium";
import SelectOptions from "components/SelectOptions/SelectOptions";

const DAYS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
]

class OutbuildingModel extends ModelComponent {
  domain = OutbDomain;

  disableFields = () => !this.context.isManager

  mapData = values => {
    const {
      name,
      description,
      capacity,
      condominium,
      availabilities,
    } = values;

    return {
      name,
      description,
      capacity,
      condominium,
      availabilities,
    }
  }

  tabAndFields = () => {
    return [
      this.storeTab(),
      this.availabilityTab(),
      this.mediaTab(),
    ]
  }

  disableFields = () => this.isEditing;

  storeTab = () => {
    const data = this.mapModelData()

    return {
      name: "Cadastro",
      rows: [
        {
          name: {
            type: "text",
            label: "Nome",
          },
          condominium: {
            type: "select",
            label: "Condomínio",
            required: false,
            children:
              <React.Fragment>
                <SelectOptions
                  domain={CondoDomain}
                  nameResolver={({ condominium }) => condominium.name}
                  idResolver={({ condominium }) => condominium._id }
                  selected={data && data.condominium}
                />
              </React.Fragment>
          },
          capacity: {
            type: "number",
            label: "Lotação máxima",
            helpMessage: "Número máximo de pessoas no ambiente",
            min: 1,
            col: {
              xs: 4,
            }
          },
        },
        {
          description: {
            type: "textarea",
            label: "Descrição",
            col: {
              xs: 16,
              md: 12,
              sm: 8,
            }
          },
        }
      ]
    }
  }

  selectDayComponent = props => (
    <React.Fragment>
      <option value="">Não selecionado</option>
      {DAYS.map((day, idx) => (
        <option value={idx}>{day}</option>
      ))}
    </React.Fragment>
  )

  availabilityTab = () => {
    const headers = ["Dia(s) da semana", "Das", "Até"]

    const dataReducer = availability => [
      `${DAYS[availability.fromDay] || "Ausente"} - ${DAYS[availability.toDay] || "Ausente"}`,
      availability.fromHour,
      availability.toHour,
    ]

    const mapValues = values => {
      const {
        fromDay,
        toDay,
        fromHour,
        toHour,
      } = values;

      return {
        toDay: toDay || undefined,
        fromDay,
        fromHour,
        toHour,
      }
    }

    const col = {
      md: 2,
      sm: 6,
    }

    const tabCfg = {
      fromDay: {
        type: "select",
        children: this.selectDayComponent(),
        col
      },
      toDay: {
        type: "select",
        required: false,
        children: this.selectDayComponent(),
        col
      },
      fromHour: {
        type: "time",
        col
      },
      toHour: {
        type: "time",
        col
      },
      addbutton: {
        as: Button,
        required: false,
        bsStyle: "info",
        type: "submit",
        fill: true,
        children: <React.Fragment>
          <span className="fa fa-plus"></span>
            Adicionar
        </React.Fragment>,
      }
    }

    return {
      name: "Horários disponíveis",
      provides: "availabilities",
      isVirtual: true,
      validate: values => values.length != 0,
      rows: [
        this.context.isManager && tabCfg
      ],
      hideOperations: this.disableFields(),
      mapValues,
      headers,
      dataReducer,
    }
  }

  mediaTab = () => {
    const headers = ["Nome"]
    const dataReducer = media => [
      media.name
    ]

    const tabCfg = {
      selectedMedia: {
        type: "file",
        multiple: true,
        required: false,
        onChange: async (e) => {
          // get current form reference
          const currentForm = this.currentForm();

          // get a copy of the FileList
          const files = e.target.files;

          // patch input with files
          currentForm._inputs.selectedMedia.getValue = () => files;

          // submit form
          await currentForm.submit();
        }
      }
    }

    const mapValues = values => {
      return [...values.selectedMedia];
    }

    return {
      name: "Mídias",
      provides: "medias",
      isVirtual: true,
      validate: values => true,
      rows: [
        this.context.isManager && tabCfg
      ],
      mapValues,
      headers,
      dataReducer,
    }
  }
}

export default OutbuildingModel;
