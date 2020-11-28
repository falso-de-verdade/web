import React from "react";
import { AvField, AvGroup } from 'availity-reactstrap-validation';
import {
  Row, Col, Label, Table
} from "reactstrap";

import Button from "components/CustomButton/CustomButton";
import { TableComponent } from "components/Listing";
import { ModelComponent } from "views/common";
import { UserAuthContext } from "contexts";
import OutbDomain from "domains/outbuilding";

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
  constructor(props) {
    super(props);
    this.state = {
      _tmpAvailabilities: [],
      _tmpMedias: [],
      ...this.state,
    }

    this.domain = OutbDomain;
  }

  mapData = () => {
    const {
      name,
      description,
      capacity,
      availabilities,
      medias,
    } = this.state;

    return {
      name,
      description,
      capacity,
      availabilities,
      medias,
    }
  }

  tabs = () => [
    {
      name: 'Cadastro',
      component: this.storeTab() 
    },
    {
      name: 'Horários disponíveis',
      component: this.availabilityTab()
    },
    {
      name: 'Mídia',
      component: this.mediaTab()
    }
  ]

  disableFields = () => !this.context.isManager

  removeObjFrom = (key, item) => {
    return () => {
      try {
        const index = this.state[key].indexOf(item);
        delete this.state[key][index];
        this.setState({ [key]: this.state[key] })
      } catch (error) {
        console.log(error)
      }
    }
  }

  storeTab = () => (
    <React.Fragment>
      <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
        <Col style={{ marginTop: '-10px' }} md={4}>
          <AvGroup>
            <Label for="name">Nome</Label>
            {this.field({
              name: "name",
              type: "text"
            })}
          </AvGroup>
        </Col>
        <Col style={{ marginTop: '-10px' }} md={4}>
          <AvGroup>
            <Label for="condominiumId" >Condomínio</Label>
            {this.field({
              name: "condominiumId",
              children: <React.Fragment>
                <option value="0">Condomínio Rio de Pedra</option>
                <option value="1">Condomínio da Roçinha</option>
              </React.Fragment>
            })}
          </AvGroup>
        </Col>
      </Row>
      <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
        <Col style={{ marginTop: '-10px' }} md={2}>
          <AvGroup>
            <Label for="capacity" >Lotação Máxima</Label>
            {this.field({
              name: "capacity",
              type: "number",
              min: "1"
            })}
          </AvGroup>
        </Col>

        {/* <Col style={{ marginTop: '-10px' }} md={4}>
          <AvGroup>
            <Label for="location" >Localização</Label>
            <AvField type="text" name="location" id="location" 
              onChange={this.setModelAttr('location')}
              disabled={isDisabled}
              value={this.state.outbuilding.location}
              placeholder="Ex.: Bloco B" />
          </AvGroup>
        </Col> */}
      </Row>
    </React.Fragment>
  )

  availabilityTab = isDisabled => {
    const headers = ["Dia(s) da semana", "Das", "Até"]

    const dataReducer = availability => [
      `${DAYS[availability.fromDay] || "Ausente"} - ${DAYS[availability.toDay] || "Ausente"}`,
      availability.fromHour,
      availability.toHour,
    ]

    const operations = props => (
      <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
        <Button bsStyle="danger" simple type="button" bsSize="xs" style={{ padding: '3px' }}
          onClick={this.removeObjFrom('_tmpAvailabilities', props.item)}>
          <span className="fa fa-times"></span>
        </Button>
      </div>
    )

    return <React.Fragment>
      {this.context.isManager &&
        <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
          <Col md={2} style={{ marginTop: '-10px' }}>
            <AvGroup>
              <Label for="fromDay" >De</Label>
              {this.field({
                type: "select",
                name: "fromDay",
                children: <React.Fragment>
                  <option>Selecionar</option>
                  {DAYS.map((day, idx) => (
                    <option value={idx}>{day}</option>
                  ))}
                </React.Fragment>
              })}
            </AvGroup>
          </Col>
          <Col md={2} style={{ marginTop: '-10px' }}>
            <AvGroup>
              <Label for="toDay" >Até</Label>
              {this.field({
                type: 'select',
                name: 'toDay',
                children: <React.Fragment>
                  <option>Selecionar</option>
                  {DAYS.map((day, idx) => (
                    <option value={idx}>{day}</option>
                  ))}
                </React.Fragment>
              })}
            </AvGroup>
          </Col>
          <Col style={{ marginTop: '-10px' }} md={2}>
            <AvGroup>
              <Label for="fromHour" >Hora início</Label>
              {this.field({
                  type: "time",
                  name: "fromHour",
                })}
            </AvGroup>
          </Col>
          <Col style={{ marginTop: '-10px' }} md={2}>
            <AvGroup>
              <Label for="toHour" >Hora fim</Label>
              {this.field({
                type: "time",
                name: "toHour",
              })}
            </AvGroup>
          </Col>

          <Button bsStyle="info" fill
            style={{ margin: '15px' }}
            onClick={() => {
              const {
                fromDay,
                toDay,
                fromHour,
                toHour,
              } = this.state;

              const availability = {
                fromDay,
                toDay,
                fromHour,
                toHour,
              }
              this.state._tmpAvailabilities.push(availability)
              this.setState({ _tmpAvailabilities: this.state._tmpAvailabilities })
            }}>
            <span className="fa fa-plus"></span>
            {' '}Adicionar
          </Button>
        </Row>
      }
      <Row style={{ paddingLeft: '15px', paddingRight: '15px' }}>
        <Col style={{ marginTop: '-10px' }} md={8}>
          <TableComponent
              items={this.state._tmpAvailabilities.concat(...this.state.availabilities || [])}
              headers={headers}
              dataReducer={dataReducer}
              OperationsComponent={this.context.isManager && operations} />
        </Col>
      </Row>
    </React.Fragment>
  }

  mediaTab = () => {
    const headers = ["Nome"]
    const dataReducer = media => [
      media.name
    ]

    const operations = props => this.context.isManager &&
      <React.Fragment>
        {' '}
        <Button bsStyle="danger" simple type="button" bsSize="xs"
            onClick={this.removeObjFrom('_tmpMedias', props.item)}>
          <span className="fa fa-times"></span>
        </Button>
      </React.Fragment> || 
      <React.Fragment>
        {' '}
        <Button bsStyle="success" simple type="button" bsSize="xs">
          <span className="fa fa-eye"></span>
        </Button>
      </React.Fragment> 

    return <React.Fragment>
      {this.context.isManager &&
        <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
          <Col md={4} style={{ marginTop: '-10px' }}>
            <AvGroup>
              <Label for="document" >Documentos</Label>
              {this.field({
                type: "file",
                name: "file",
                multiple: true,
                onChange: e => {
                  const newMedias = this.state._tmpMedias.concat(...e.target.files);
                  this.setState({ _tmpMedias: newMedias })
                }
              })}
            </AvGroup>
          </Col>
        </Row>
      }
      <Row style={{ paddingLeft: '15px', paddingRight: '10px' }}>
        <Col style={{ marginTop: '-10px' }} md={8}>
          <TableComponent 
            items={this.state._tmpMedias.concat(...this.state.medias || [])}
            headers={headers}
            dataReducer={dataReducer}
            OperationsComponent={operations}
            />
        </Col>
      </Row>
    </React.Fragment>
  }
}

OutbuildingModel.contextType = UserAuthContext;

export default OutbuildingModel;
