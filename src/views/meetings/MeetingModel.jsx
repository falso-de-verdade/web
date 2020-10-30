import React, { Component } from 'react';
import InputCustom from '../../components/inputs/inputCustom';
import { Table, Grid, Row, Col, Label } from "reactstrap";
import Card from "components/Card/Card";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import ButtonB from "components/CustomButton/CustomButton.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import { ModelComponent } from "views/common";

class MeetingModel extends ModelComponent {

  constructor(props) {
    super(props);

    this.state = {
      ...this.state
    };
  };

  componentDidMount() { };

  componentDidUpdate(prevProps) { };

  render() {
    return (
      <div className="content">
        <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
          <Col md={12}>
            <Card
              title="Agendar uma reunião"
              ctTableResponsive
              ctTableFullWidth
              content={
                <AvForm>
                  <div>
                    <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                      <Col md={12}>
                        <Label style={{ fontSize: 12, color: '#000' }} for="descriptionMeeting" >Descrição/tópicos da reunião</Label>
                        <AvField
                          rows={10}
                          value={this.getModelAttr('description')}
                          disabled={this.state.isDisabledCFOP}
                          style={{ resize: 'none' }}
                          type="textarea"
                          name="descriptionMeeting"
                          id="descriptionMeeting" />
                      </Col>
                    </Row>
                    <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                      <Col md={4}>
                        <InputCustom
                          value={this.getModelAttr('schedule')}
                          type="date"
                          id="dateMeeting"
                          name="dateMeeting"
                          descricao="Dia da reunião" />
                      </Col>
                      <Col md={4}>
                        <InputCustom
                          value={this.getModelAttr('start')}
                          type="time"
                          id="timeMeeting"
                          name="timeMeeting"
                          descricao="Início" />
                      </Col>
                      <Col md={3}>
                        <InputCustom
                          value={this.getModelAttr('duration')}
                          type="text"
                          id="timeDuraction"
                          name="timeDuraction"
                          descricao="Duração" />
                      </Col>
                      <Col md={1}>
                        <Button
                          disabled={this.state.isDisabledCFOP}
                          onClick={this.addCfop}
                          bsSize="sm" bsStyle="success" fill style={{ marginTop: '25px' }}>
                          <span className="fa fa-plus"></span>
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </AvForm>
              }
            />
          </Col>
        </Row>
        <AvForm autoComplete="off" ref="formNF">
          <Button pullRight fill bsStyle="danger"
            onClick={this.retornarListaProdutos}>
            Cancelar
              </Button>

          <Button bsStyle="success" fill type="submit"
            disabled={this.state.disabledButtons}>
            Gravar
              </Button>
        </AvForm>
      </div>
    );
  };
};

export default MeetingModel