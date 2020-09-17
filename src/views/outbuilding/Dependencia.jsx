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

class Dependencia extends Component {

  notificationSystem = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      modalOpen: true
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
                      onClick={() => { this.toggle('2'); }}>Outros Dados</NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab} style={{ fontSize: 11 }}>
                  <TabPane tabId="1">
                    <AvForm autoComplete="off" onSubmit={this.operacaoProduto} ref="formProduto">
                      <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col style={{ marginTop: '-10px' }} md={2}>
                          <AvGroup>
                            <Label for="codigo" style={styleLabel}>Código</Label>
                            <AvField type="text" name="codigo" id="codigo"
                              disabled={true} style={styleInput}
                              value={this.state.dadosProdutoCodigo}
                              onChange={(e) => { this.setState({ dadosProdutoCodigo: e.target.value }) }} />
                          </AvGroup>
                        </Col>
                        <Col style={{ marginTop: '-10px' }} md={8}>
                          <AvGroup>
                            <Label for="descricao" style={styleLabel}>Descrição</Label>
                            <AvField type="text" name="descricao" id="descricao" style={styleInput}
                              disabled={this.state.disabledButtons}
                              value={this.state.dadosProdutoDescricao}
                              onChange={(e) => { this.setState({ dadosProdutoDescricao: e.target.value }) }}
                              validate={{
                                required: { value: true, errorMessage: 'Campo "DESCRIÇÃO" obrigatório' },
                              }} />
                          </AvGroup>
                        </Col>
                        <Col style={{ marginTop: '-10px' }} md={2}>
                          <AvGroup>
                            <Label for="lotacaomax" style={styleLabel}>Lotação Máxima/m²</Label>
                            <AvField type="number" name="lotacaomax" id="lotacaomax" min="1"
                              style={styleInput}
                            //value={this.state.dadosProdutoCodigo}
                            //onChange={(e) => { this.setState({ dadosProdutoCodigo: e.target.value }) }}
                            />
                          </AvGroup>
                        </Col>
                      </Row>
                      <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col style={{ marginTop: '-10px' }} md={2}>
                          <AvGroup>
                            <Label for="horaIni" style={styleLabel}>Hora início</Label>
                            <AvField type="time" name="horaIni" id="horaIni" style={styleInput}
                              //disabled={this.state.disabledButtons}
                              //value={this.state.dadosProdutoDescricao}
                              onChange={(e) => { this.setState({ dadosProdutoDescricao: e.target.value }) }}
                              validate={{
                                required: { value: true, errorMessage: 'Campo "Hora início" obrigatório' },
                              }} />
                          </AvGroup>
                        </Col>
                        <Col style={{ marginTop: '-10px' }} md={2}>
                          <AvGroup>
                            <Label for="horaFim" style={styleLabel}>Hora fim</Label>
                            <AvField type="time" name="horaFim" id="horaFim" style={styleInput}
                              //disabled={this.state.disabledButtons}
                              //value={this.state.dadosProdutoDescricao}
                              onChange={(e) => { this.setState({ dadosProdutoDescricao: e.target.value }) }}
                              validate={{
                                required: { value: true, errorMessage: 'Campo "Hora fim" obrigatório' },
                              }} />
                          </AvGroup>
                        </Col>
                        <Col md={2} style={{ marginTop: '-10px' }}>
                          <AvGroup>
                            <Label for="diaDaSemana" style={styleLabel}>Dia da semana</Label>
                            <AvField type="select" name="diaDaSemana" style={styleInput}
                              //value={this.state.dadosClienteStatus}
                              //disabled={this.state.disabledButtons}
                              onChange={(e) => { this.setState({ dadosClienteStatus: e.target.value }) }}>
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
                        <ButtonB onClick={() => this.setState({ isDisabledCFOP: false })} bsStyle="info" fill
                          style={{ margin: '15px' }}>
                          <span className="fa fa-plus"></span>
                          {' '}Horário
                        </ButtonB>
                      </Row>
                      <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col style={{ marginTop: '-10px' }} md={6}>
                          <Table stiped hover>
                            <thead>
                              <tr>
                                <th>Dia da semana</th>
                                <th>Das</th>
                                <th>Até</th>
                                <th className="text-center">Operações</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
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


                    </AvForm>
                  </TabPane>
                </TabContent>


                <TabContent activeTab={this.state.activeTab} style={{ fontSize: 11 }}>
                  <TabPane tabId="2">
                    <AvForm autoComplete="off" onSubmit={this.operacaoProduto} ref="formProduto">
                      <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col style={{ marginTop: '-10px' }}>
                          <InputCustom
                            id="nomeDepen"
                            name="nomeDepen"
                            descricao="Nome da dependência" />
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

              <Button bsStyle="success" fill type="submit"
                disabled={this.state.disabledButtons}>
                Gravar
              </Button>
            </AvForm>
          </Col>
        </Row>
      </div>
    )
  }

}
export default Dependencia;
