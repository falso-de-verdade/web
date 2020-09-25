import React, { Component } from 'react';
import InputCustom from '../../components/inputs/inputCustom';
import { Table, Grid, Row, Col, Label } from "reactstrap";
import Card from "components/Card/Card";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import ButtonB from "components/CustomButton/CustomButton.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class MeetingModel extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
                          disabled={this.state.isDisabledCFOP}
                          style={{ resize: 'none', width: 500, height: 300 }}
                          type="textarea"
                          name="descriptionMeeting"
                          id="descriptionMeeting" />
                      </Col>
                    </Row>
                    <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                      <Col md={4}>
                        <InputCustom
                          type="date"
                          id="dateMeeting"
                          name="dateMeeting"
                          descricao="Dia da reunião" />
                      </Col>
                      <Col md={4}>
                        <InputCustom
                          type="time"
                          id="timeMeeting"
                          name="timeMeeting"
                          descricao="Início" />
                      </Col>
                    </Row>
                    <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                      <Col md={4}>
                        <InputCustom
                          type="text"
                          id="timeDuraction"
                          name="timeDuraction"
                          descricao="Duração" />
                      </Col>
                      <Col md={6}>
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
      </div>
    );
  };
};

export default MeetingModel