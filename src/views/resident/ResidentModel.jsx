import React, { Component } from "react";
import { Row, Col, CardBody, Card, Label } from "reactstrap";
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';

import { ModelComponent } from '../common';
import Button from "components/CustomButton/CustomButton.jsx";

class ResidentModel extends ModelComponent {
  componentDidMount() { };

  componentDidUpdate(prevProps) { };

  returnResidentList = (event) => {
    event.preventDefault();
    this.props.history.push('/admin/residents')
  };

  render() {
    const styleInput = {
      fontSize: 12
    }

    const styleLabel = {
      fontSize: 11
    }

    return (
      <div className="content">
        <Row>
          <Col md={12}>
            <div style={{ marginTop: '-50px' }}>
              <h4>Atualização de cadastro</h4>
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
          <Col style={{ marginTop: '-10px' }} md={12}>
            <Card>
              <CardBody>
                <AvForm autoComplete="off" ref="formUpdateResident" /* onSubmit={} */>
                  <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                      <Col style={{ marginTop: '-10px' }} md={8}>
                        <AvGroup>
                          <Label for="name" style={styleLabel}>Nome completo</Label>
                          <AvField type="text" name="nome" style={styleInput}
                            value={this.state.name} disabled
                          />
                        </AvGroup>
                        <AvGroup>
                          <Label for="email" style={styleLabel}>E-mail</Label>
                          <AvField type="text" name="email" style={styleInput}
                            value={this.state.email} disabled
                          />
                        </AvGroup>
                      </Col>
                  </Row>
                  <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                      <Col style={{ marginTop: '-10px' }} md={8}>
                        <AvGroup>
                          <Label for="location" style={styleLabel}>Localização</Label>
                          <AvField type="text" name="location" style={styleInput}
                            value={this.state.location}
                          />
                        </AvGroup>
                      </Col>
                  </Row>
                </AvForm>
              </CardBody>
            </Card>
            <AvForm autoComplete="off" ref="formUpdateResident" /* onSubmit={} */>
              <Button pullRight fill bsStyle="danger"
                onClick={this.returnResidentList}>
                Cancelar
              </Button>

              <Button bsStyle="success" fill type="submit"
                disabled={this.state.disabledButtons}>
                Gravar
              </Button>
            </AvForm>
          </Col>
        </Row>
      </div>
    );
  };
};

export default ResidentModel;