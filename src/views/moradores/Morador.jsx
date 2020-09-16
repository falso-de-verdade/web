import React, { Component } from "react";
import Button from "components/CustomButton/CustomButton.jsx";
import {
  Row, Col, Label, Card, CardBody, TabPane, TabContent,
  Nav, NavItem, NavLink,
} from "reactstrap";
import classnames from 'classnames';

import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';

class Morador extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: '1'
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

    const styleInput = {
      fontSize: 12,
      height: '38px'
    }

    const styleLabel = {
      fontSize: 11
    }

    return (
      <div className="content">


        <Row>
          <Col md={12}>
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
                    <AvForm autoComplete="off" onSubmit={this.operacaoCliente} ref="formCliente">
                      <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col md={2}>
                          <AvGroup>
                            <Label for="codigo" style={styleLabel}>Código</Label>
                            <AvField type="text" name="codigo" id="codigo" style={styleInput}
                              disabled={true}
                              //value={this.state.dadosClienteCodigo}
                              onChange={(e) => { this.setState({ dadosClienteCodigo: e.target.value }) }} />
                          </AvGroup>
                        </Col>
                        <Col md={6}>
                          <AvGroup>
                            <Label for="nomecompleto" style={styleLabel}>Nome Completo</Label>
                            <AvField type="text" name="nomecompleto" id="nomecompleto" style={styleInput}
                              //disabled={this.state.disabledButtons}
                              //value={this.state.dadosClienteRazao}
                              onChange={(e) => { this.setState({ dadosClienteRazao: e.target.value }) }}
                              validate={{
                                required: { value: true, errorMessage: 'Campo "Nome completo" obrigatório' },
                              }} />
                          </AvGroup>
                        </Col>
                        <Col md={2}>
                          <AvGroup>
                            <Label for="cpf" style={styleLabel}>CPF</Label>
                            <AvField type="text" name="cpf" id="cpf" style={styleInput}
                              //disabled={this.state.disabledButtons}
                              //value={this.state.dadosClienteCNPJ}
                              onChange={(e) => { this.setState({ dadosClienteCNPJ: e.target.value }) }} />
                          </AvGroup>
                        </Col>
                        <Col md={2}>
                          <AvGroup>
                            <Label for="rg" style={styleLabel}>RG</Label>
                            <AvField type="text" name="rg" id="cpf" style={styleInput}
                              //disabled={this.state.disabledButtons}
                              //value={this.state.dadosClienteCNPJ}
                              onChange={(e) => { this.setState({ dadosClienteCNPJ: e.target.value }) }} />
                          </AvGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col md={2} style={{ marginTop: '-10px' }}>
                          <AvGroup>
                            <Label for="telefone" style={styleLabel}>Telefone 01</Label>
                            <AvField type="text" name="telefone" id="telefone" style={styleInput}
                              //disabled={this.state.disabledButtons}
                              //value={this.state.dadosClienteTelefone}
                              onChange={(e) => { this.setState({ dadosClienteTelefone: e.target.value }) }} />
                          </AvGroup>
                        </Col>
                        <Col md={2} style={{ marginTop: '-10px' }}>
                          <AvGroup>
                            <Label for="telefone2" style={styleLabel}>Telefone 02</Label>
                            <AvField type="text" name="telefone2" id="telefone2" style={styleInput}
                              disabled={this.state.disabledButtons}
                              //value={this.state.dadosClienteTelefone2}
                              onChange={(e) => { this.setState({ dadosClienteTelefone2: e.target.value }) }} />
                          </AvGroup>
                        </Col>
                        <Col md={3} style={{ marginTop: '-10px' }}>
                          <AvGroup>
                            <Label for="email1" style={styleLabel}>E-mail 01</Label>
                            <AvField type="text" name="email1" id="email1" style={styleInput}
                              //disabled={this.state.disabledButtons}
                              //value={this.state.dadosClienteEmail1}
                              onChange={(e) => { this.setState({ dadosClienteEmail1: e.target.value }) }} />
                          </AvGroup>
                        </Col>
                        <Col md={3} style={{ marginTop: '-10px' }}>
                          <AvGroup>
                            <Label for="email2" style={styleLabel}>E - mail 02</Label>
                            <AvField type="text" name="email2" id="email2" style={styleInput}
                              disabled={this.state.disabledButtons}
                              //value={this.state.dadosClienteEmail2}
                              onChange={(e) => { this.setState({ dadosClienteEmail2: e.target.value }) }} />
                          </AvGroup>
                        </Col>
                        <Col md={2} style={{ marginTop: '-10px' }}>
                          <AvGroup>
                            <Label for="status" style={styleLabel}>Status</Label>
                            <AvField type="select" name="status" style={styleInput}
                              //value={this.state.dadosClienteStatus}
                              //disabled={this.state.disabledButtons}
                              onChange={(e) => { this.setState({ dadosClienteStatus: e.target.value }) }}>
                              <option value="Ativo">Ativo</option>
                              <option value="Inativo">Inativo</option>
                            </AvField>
                          </AvGroup>
                        </Col>
                      </Row>
                    </AvForm>
                  </TabPane>

                  {/* aba de anotacoes diversas */}
                  <TabPane tabId="2">
                    <AvForm autoComplete="off" onSubmit={this.operacaoCliente} ref="formCliente">
                      <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <Col md={12}>
                          <AvGroup>
                            <Label for="obs" style={styleLabel}>Anotações Diversas</Label>
                            <AvField type="textarea" rows={20} name="obs" id="obs"
                              //disabled={this.state.disabledButtons}
                              //value={this.state.dadosClienteObs}
                              onChange={(e) => { this.setState({ dadosClienteObs: e.target.value }) }} />
                          </AvGroup>
                        </Col>
                      </Row>

                      <div className="clearfix" />
                    </AvForm>
                  </TabPane>
                </TabContent>

              </CardBody>
            </Card>

            <AvForm autoComplete="off" onSubmit={this.operacaoCliente} ref="formNF">
              <Button pullRight fill bsStyle="danger"
                onClick={this.retornarListaClientes}>
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
export default Morador;