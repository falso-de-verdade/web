import React, { Component } from "react";
import { Table, Grid, Row, Col, FormControl } from "react-bootstrap";
import Card from "components/Card/Card";
import Button from "components/CustomButton/CustomButton";
import ButtonB from "components/CustomButton/CustomButton";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom'
import { UserAuthContext } from "contexts";

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

          <Col md={2}>
            <UserAuthContext.Consumer>
              {user => user.isManager &&
                <Link to={`meeting`}>
                  <ButtonB bsStyle="info" fill pullRight style={{ marginLeft: '10px' }}>
                    <span className="fa fa-plus"></span>
                    {' '}Nova reunião
                  </ButtonB>
                </Link>
              }
            </UserAuthContext.Consumer>
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
                      <td className="text-center" width={140}>
                        <UserAuthContext.Consumer>
                          {user =>
                            <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
                              {
                                user.isManager &&
                                <React.Fragment>
                                  <Link to={`/admin/meeting/teste`}>
                                    <ButtonB bsStyle="success" simple type="button"
                                      bsSize="xs" style={{ padding: '3px' }} >
                                      <span className="fa fa-pencil"></span>
                                    </ButtonB>
                                  </Link>

                                  {' '}
                                  <ButtonB bsStyle="danger" simple type="button" bsSize="xs" style={{ padding: '3px' }}
                                    onClick={this.excluirTransportadora}>
                                    <span className="fa fa-times"></span>
                                  </ButtonB>
                                  {' '}
                                </React.Fragment> ||
                                <Link to={`/admin/meeting/teste`}>
                                  <ButtonB bsStyle="success" simple type="button"
                                    bsSize="xs" style={{ padding: '3px' }} >
                                    <span className="fa fa-eye"></span>
                                  </ButtonB>
                                </Link>
                              }
                            </div>
                          }
                        </UserAuthContext.Consumer>
                      </td>
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
