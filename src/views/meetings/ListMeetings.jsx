import React, { Component } from "react";
import { Table, Grid, Row, Col, FormControl } from "react-bootstrap";
import Card from "components/Card/Card";
import Button from "components/CustomButton/CustomButton";
import ButtonB from "components/CustomButton/CustomButton";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom'

class ListaCondominios extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listEmissores: [],
      isHidden: false,
      disabledButtons: true
    }
  }

  componentDidMount() {
    //this.listarEmissores();
  }

  render() {


    return (
      <div className="content">
        <Row style={{ marginTop: '-20px' }}>
          <Col md={4} style={{ marginBottom: '5px', paddingRight: 10 }}>
            <FormControl
              type="text"
              //value={this.state.inputLocalizar}
              onChange={(e) => { this.setState({ inputLocalizar: e.target.value }) }}
              onKeyUp={(valor) => valor.key == 'Enter' ? this.localizarDependencias() : ''}
              placeholder="Localizar reunião"
            />
          </Col>
          <Col md={2} style={{ marginBottom: '5px', paddingLeft: 0 }}>
            <ButtonB bsStyle="info"
              //disabled={this.state.disabledButtons}
              onClick={this.listarProdutos}>
              <span className="fa fa-search"></span>
              Localizar
            </ButtonB>
          </Col>
          <Col md={2} style={{ marginBottom: '5px', paddingLeft: 0 }}>
            <AvForm autoComplete="off" ref="formLocalizar">
              <AvField type="select" name="select"
                value={this.state.inputLocalizarStatus}
                onChange={(e) => { this.setState({ inputLocalizarStatus: e.target.value }) }}>
                <option value="pendentes">Pendentes</option>
                <option value="realizada">Realizadas</option>
              </AvField>
            </AvForm>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card
              title="Reuniões"
              ctTableResponsive
              ctTableFullWidth
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Data</th>
                      <th>Inicio</th>
                      <th>Duração prevista</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis totam repudiandae vero explicabo magnam quidem, sequi nisi facilis blanditiis? Distinctio repellendus eius ex vel deleniti dolorum, optio saepe omnis nihil?</td>
                      <td>30/09/2020</td>
                      <td>19h30</td>
                      <td>1h30</td>
                      <td>
                        <Link to="/admin/meeting/updatemeeting">
                          <ButtonB
                            bsStyle="success" bsSize="xs"
                            simple type="button" style={{ padding: '3px' }}>
                            <span className="fa fa-pencil"></span>
                          </ButtonB>
                        </Link>
                      </td>
                      <td><ButtonB
                        bsStyle="danger" bsSize="xs"
                        simple type="button" style={{ padding: '3px' }}>
                        <span className="fa fa-times"></span>
                      </ButtonB></td>
                    </tr>
                  </tbody>
                </Table>
              }
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ListaCondominios;
