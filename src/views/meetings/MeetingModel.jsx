import React, { Component } from 'react';
import InputCustom from '../../components/inputs/inputCustom';
import { Table, Grid, Row, Col, Label } from "reactstrap";
import Card from "components/Card/Card";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import ButtonB from "components/CustomButton/CustomButton.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import { ModelComponent } from "views/common";

import { UserAuthContext } from "contexts";

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
    const isDisabled = !this.context.isManager;
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
                        <Label style={{ fontSize: 12, color: '#000' }} for="descriptionMeeting">Descrição/tópicos da reunião</Label>
                        <AvField
                          disabled={isDisabled}
                          rows={10}
                          value={this.getModelAttr('description')}
                          style={{ resize: 'none' }}
                          type="textarea"
                          name="descriptionMeeting"
                          id="descriptionMeeting" />
                      </Col>
                    </Row>
                    <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                      <Col md={4}>
                        <Label style={{ fontSize: 12, color: '#000' }} for="dateMeeting">Dia da reunião</Label>
                        <AvField
                          disabled={isDisabled}
                          value={this.getModelAttr('schedule')}
                          type="date"
                          id="dateMeeting"
                          name="dateMeeting"
                        />
                      </Col>
                      <Col md={4}>
                        <Label style={{ fontSize: 12, color: '#000' }} for="timeMeeting">Início</Label>
                        <AvField
                          disabled={isDisabled}
                          value={this.getModelAttr('start')}
                          type="time"
                          id="timeMeeting"
                          name="timeMeeting"
                        />
                      </Col>
                      <Col md={3}>
                        <Label style={{ fontSize: 12, color: '#000' }} for="timeDuraction">Duração</Label>
                        <AvField
                          disabled={true}
                          value={this.getModelAttr('duration')}
                          type="text"
                          id="timeDuraction"
                          name="timeDuraction"
                        />
                      </Col>
                      <Col md={1}>
                        <Button
                          disabled={isDisabled}
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

          {this.context.isManager &&
            <Button bsStyle="success" fill type="submit"
              disabled={this.state.disabledButtons}>
              Gravar
            </Button>
          }
        </AvForm>
      </div>
    );
  };
};

MeetingModel.contextType = UserAuthContext;

export default MeetingModel