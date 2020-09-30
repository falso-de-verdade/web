import React, { Component } from "react";
//import { Modal } from "react-bootstrap";

//import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import api from '../../services/api';

import {
  Row, Col, Label, Card, CardBody, TabPane, TabContent,
  Nav, NavItem, NavLink, Table
} from "reactstrap";
import classnames from 'classnames';

import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import InputCustom from '../../components/inputs/inputCustom';
import ButtonB from "components/CustomButton/CustomButton.jsx";

import { ModelComponent } from "views/common";
import { UserAuthContext } from "contexts";

class OutbuildingModel extends ModelComponent {

  notificationSystem = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      activeTab: '1',
      modalOpen: true,
      outbuilding: { ...props.outbuilding }
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {
    const styleInputVlr = {
      height: '40px',
      borderStyle: 'solid',
      borderColor: '#d9d9d9',
      borderRadius: '3px',
      borderWidth: '1px',
      textAlign: 'right',
      fontSize: 13,
      color: '#000',
      paddingRight: '10px',
      width: '100%'
    }

    const styleInput = {
      fontSize: 12
    }

    const styleInputUpper = {
      fontSize: 12,
      textTransform: 'uppercase'
    }

    const styleLabel = {
      fontSize: 11
    }

    return (
      <div className="content">

        <Row>
          <Col style={{ marginTop: '-10px' }} md={12}>
            <Card>
              <CardBody style={{ padding: '10px', fontSize: 12 }}>
                <Nav tabs>
                  <NavItem className={classnames({ active: this.state.activeTab === '1' })}>
                    <NavLink href="#" style={{ color: '#000' }}
                      onClick={() => { this.toggle('1'); }}>Dados Cadastrais</NavLink>
                  </NavItem>

                  <NavItem className={classnames({ active: this.state.activeTab === '2' })}>
                    <NavLink href="#" style={{ color: '#000' }}
                      onClick={() => { this.toggle('2'); }}>Horários disponíveis</NavLink>
                  </NavItem>
                  <NavItem className={classnames({ active: this.state.activeTab === '3' })}>
                    <NavLink href="#" style={{ color: '#000' }}
                      onClick={() => { this.toggle('3'); }}>Mídia</NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab} style={{ fontSize: 11 }}>
                  <TabPane tabId="1">
                    <AvForm autoComplete="off" onSubmit={this.operacaoProduto} ref="formOutbuilding">
                      <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col style={{ marginTop: '-10px' }} md={4}>
                          <AvGroup>
                            <Label for="name" style={styleLabel}>Nome</Label>
                            <AvField type="text" name="nome" style={styleInput}
                              value={this.getModelAttr('name')}
                              validate={{
                                required: { value: true, errorMessage: 'Nome é obrigatório' }
                              }}
                            />
                          </AvGroup>
                        </Col>
                        <Col style={{ marginTop: '-10px' }} md={4}>
                          <AvGroup>
                            <Label for="condominium" style={styleLabel}>Condomínio</Label>
                            <AvField type="select" name="condominium" style={styleInput}
                              value={this.getModelAttr('condominium')} >
                              <option value="0">Condomínio Rio de Pedra</option>
                              <option value="1">Condomínio da Roçinha</option>
                            </AvField>
                          </AvGroup>
                        </Col>
                      </Row>
                      <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col style={{ marginTop: '-10px' }} md={2}>
                          <AvGroup>
                            <Label for="maxCapacity" style={styleLabel}>Lotação Máxima</Label>
                            <AvField type="number" name="maxCapacity" id="maxCapacity" min="1"
                              style={styleInput}
                              value={this.getModelAttr('maxCapacity')} />
                          </AvGroup>
                        </Col>

                        <Col style={{ marginTop: '-10px' }} md={4}>
                          <AvGroup>
                            <Label for="location" style={styleLabel}>Localização</Label>
                            <AvField type="text" name="location" id="location" style={styleInput}
                              onChange={this.setModelAttr('location')}
                              value={this.state.outbuilding.location}
                              placeholder="Ex.: Bloco B" />
                          </AvGroup>
                        </Col>
                      </Row>
                    </AvForm>
                  </TabPane>
                </TabContent>


                <TabContent activeTab={this.state.activeTab} style={{ fontSize: 11 }}>
                  <TabPane tabId="2">
                    <AvForm autoComplete="off" onSubmit={this.operacaoProduto} ref="formOutbuilding">
                      <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col md={2} style={{ marginTop: '-10px' }}>
                          <AvGroup>
                            <Label for="fromDay" style={styleLabel}>De</Label>
                            <AvField type="select" name="fromDay" style={styleInput}
                                value={this.getModelAttr('fromDay')} >
                              <option value="0">Domingo</option>
                              <option value="1">Segunda-feira</option>
                              <option value="2">Terça-feira</option>
                              <option value="3">Quarta-feira</option>
                              <option value="4">Quinta-feira</option>
                              <option value="5">Sexta-feira</option>
                              <option value="6">Sábado</option>
                            </AvField>
                          </AvGroup>
                        </Col>
                        <Col md={2} style={{ marginTop: '-10px' }}>
                          <AvGroup>
                            <Label for="toDay" style={styleLabel}>Até</Label>
                            <AvField type="select" name="toDay" style={styleInput}
                                value={this.getModelAttr('toDay')} >
                              <option value="-1">Não selecionado</option>
                              <option value="0">Domingo</option>
                              <option value="1">Segunda-feira</option>
                              <option value="2">Terça-feira</option>
                              <option value="3">Quarta-feira</option>
                              <option value="4">Quinta-feira</option>
                              <option value="5">Sexta-feira</option>
                              <option value="6">Sábado</option>
                            </AvField>
                          </AvGroup>
                        </Col>
                        <Col style={{ marginTop: '-10px' }} md={2}>
                          <AvGroup>
                            <Label for="fromHour" style={styleLabel}>Hora início</Label>
                            <AvField type="time" name="fromHour" id="fromHour" style={styleInput}
                              value={this.getModelAttr('fromHour')}
                              validate={{
                                required: { value: true, errorMessage: 'Campo "Hora início" obrigatório' },
                              }} />
                          </AvGroup>
                        </Col>
                        <Col style={{ marginTop: '-10px' }} md={2}>
                          <AvGroup>
                            <Label for="toHour" style={styleLabel}>Hora fim</Label>
                            <AvField type="time" name="toHour" id="toHour" style={styleInput}
                              value={this.getModelAttr('toHour')}
                              validate={{
                                required: { value: true, errorMessage: 'Campo "Hora fim" obrigatório' },
                              }} />
                          </AvGroup>
                        </Col>

                        <ButtonB onClick={() => this.setState({ isDisabledCFOP: false })} bsStyle="info" fill
                          style={{ margin: '15px' }}>
                          <span className="fa fa-plus"></span>
                          {' '}Adicionar
                        </ButtonB>
                      </Row>
                      <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col style={{ marginTop: '-10px' }} md={6}>
                          <Table stiped hover>
                            <thead>
                              <tr>
                                <th>Dia(s) da semana</th>
                                <th>Das</th>
                                <th>Até</th>
                                <th className="text-center">Operações</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  Segunda - Sexta
                                </td>
                                <td>
                                  14:00
                                </td>
                                <td>
                                  20:00
                                </td>
                                <td className="text-center" width={140}>
                                  {
                                    <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>

                                      <ButtonB bsStyle="success" simple type="button" bsSize="xs" style={{ padding: '3px' }}
                                      >
                                        <span className="fa fa-pencil"></span>
                                      </ButtonB>

                                      {' '}
                                      <ButtonB bsStyle="danger" simple type="button" bsSize="xs" style={{ padding: '3px' }}
                                        onClick={this.excluirCliente}>
                                        <span className="fa fa-times"></span>
                                      </ButtonB>

                                    </div>
                                  }
                                </td>
                              </tr>

                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                      <div className="clearfix" />
                    </AvForm>
                  </TabPane>
                </TabContent>

                <TabContent activeTab={this.state.activeTab} style={{ fontSize: 11 }}>
                  <TabPane tabId="3">
                    <AvForm autoComplete="off" onSubmit={this.operacaoProduto} ref="formOutbuilding">
                      <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col md={4} style={{ marginTop: '-10px' }}>
                          <AvGroup>
                            <Label for="fromDay" style={styleLabel}>Documentos</Label>
                            <AvField type="file" name="fromDay" style={styleInput}
                              //value={this.state.dadosClienteStatus}
                              //disabled={this.state.disabledButtons}
                              onChange={(e) => { this.setState({ dadosClienteStatus: e.target.value }) }}>
                            </AvField>
                          </AvGroup>
                        </Col>
                      </Row>
                      <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col style={{ marginTop: '-10px' }} md={10}>
                          <Table stiped hover>
                            <thead>
                              <tr>
                                <th>Arquivo</th>
                                <th className="text-center">Operações</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  C:\Users\Yan\Documentos\regras.pdf
                                </td>
                                <td className="text-center" width={140}>
                                  {
                                    <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
                                      {' '}
                                      <ButtonB bsStyle="danger" simple type="button" bsSize="xs" style={{ padding: '3px' }}
                                        onClick={this.excluirCliente}>
                                        <span className="fa fa-times"></span>
                                      </ButtonB>

                                    </div>
                                  }
                                </td>
                              </tr>

                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                      <div className="clearfix" />
                    </AvForm>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
            <AvForm autoComplete="off" onSubmit={this.operacaoProduto} ref="formNF">
              <Button pullRight fill bsStyle="danger"
                onClick={this.retornarListaProdutos}>
                Cancelar
              </Button>

              <UserAuthContext.Consumer>
                    {user => user.isManager && 
                        <Button bsStyle="success" fill type="submit"
                            disabled={this.state.disabledButtons}>
                            Gravar
                        </Button>
                    }
                </UserAuthContext.Consumer>
            </AvForm>
          </Col>
        </Row>
      </div>
    )
  }

}
export default OutbuildingModel;
