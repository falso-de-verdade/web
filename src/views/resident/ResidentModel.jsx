import React, { Component } from "react";
import { Row, Col, CardBody, Card } from "reactstrap";
import { AvForm } from 'availity-reactstrap-validation';
import InputCustom from '../../components/inputs/inputCustom';
import Button from "components/CustomButton/CustomButton.jsx";

class ResidentModel extends Component {
  notificationSystem = React.createRef();
  constructor(props) {
    super(props);

    this.state = {};
  };

  componentDidMount() { };

  componentDidUpdate(prevProps) { };

  returnResidentList = (event) => {
    event.preventDefault();
    this.props.history.push('/admin/residents')
  };

  render() {
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
                    <Col style={{ marginTop: '-10px' }} md={4}>
                      <InputCustom
                        descricao="Nome completo"
                        id="nameResident"
                        name="nameResident"
                        type="text" />
                    </Col>
                    <Col style={{ marginTop: '-10px' }} md={4}>
                      <InputCustom
                        descricao="E-mail"
                        id="emailResident"
                        name="emailResident"
                        type="email" />
                    </Col>
                    <Col style={{ marginTop: '-10px' }} md={4}>
                      <InputCustom
                        descricao="Localização"
                        id="locationResident"
                        name="locationResident"
                        type="text" />
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