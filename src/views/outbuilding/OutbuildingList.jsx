import React, { Component } from "react";

import { Modal, Table, FormControl } from "react-bootstrap";
import { Row, Col, Button } from "reactstrap";

import Card from "components/Card/Card";

import { AvForm, AvField } from 'availity-reactstrap-validation';
import ButtonB from "components/CustomButton/CustomButton.jsx";

import api from '../../services/api';
import { Link } from "react-router-dom";
import { UserAuthContext } from "contexts";
import * as qs from 'query-string';

class OutbuildingList extends Component {

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
              placeholder="Localizar Dependência"
            />
          </Col>

          <Col md={4} style={{ marginBottom: '5px', paddingLeft: 0 }}>
            <ButtonB bsStyle="info"
              //disabled={this.state.disabledButtons}
              onClick={this.listarProdutos}>
              <span className="fa fa-search"></span>
              Localizar
              </ButtonB>

            <UserAuthContext.Consumer>
              {user => {
                if (user.isManager) {
                  return (
                    <Link to={`outbuilding`}>
                      <ButtonB bsStyle="info" fill pullRight style={{ marginLeft: '10px' }}>
                        <span className="fa fa-plus"></span>
                        {' '}Nova dependência
                        </ButtonB>
                    </Link>
                  )
                }                
              }}
            </UserAuthContext.Consumer>
          </Col>

        </Row>

        <Row style={{ paddingTop: '0px' }}>
          <Col md={12}>
            <Card
              title="Lista de Dependências"
              ctAllIcons
              content={
                <div>
                  <Row>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Disponibilidade</th>
                          <th>Limite de pessoas</th>
                          <th>Localização</th>
                          <th className="text-center">Operações</th>
                        </tr>
                      </thead>
                      <tbody>


                        <tr>
                          <td>
                            Salão de Jogos
                          </td>
                          <td>
                            Segunda a Sexta - 14:00 ás 20:00
                          </td>
                          <td>
                            20
                          </td>
                          <td>
                            Bloco A
                          </td>

                          <td className="text-center" width={90}>
                            {
                              <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
                                <UserAuthContext.Consumer>
                                  {user => {
                                    if (user.isManager) {
                                      return <React.Fragment>
                                        <Link to="outbuilding/teste">
                                          <ButtonB 
                                            bsStyle="success" bsSize="xs"
                                            simple type="button" style={{ padding: '3px' }}>
                                            <span className="fa fa-pencil"></span>
                                          </ButtonB>
                                        </Link>

                                        {' '}
                                        <ButtonB bsStyle="danger" simple type="button" bsSize="xs" style={{ padding: '3px' }}

                                          onClick={this.excluirProduto}>
                                          <span className="fa fa-times"></span>
                                        </ButtonB>
                                      </React.Fragment>;
                                    }

                                    return (
                                      <Link to="outbuilding/teste">
                                        <ButtonB 
                                          bsStyle="success" bsSize="xs"
                                          simple type="button" style={{ padding: '3px' }}>
                                          <span className="fa fa-eye"></span>
                                        </ButtonB>
                                      </Link>
                                    )
                                  }}
                                </UserAuthContext.Consumer>
                              </div>
                            }
                          </td>
                        </tr>

                      </tbody>
                    </Table>
                  </Row>
                </div>
              }
            />
          </Col>
        </Row>

        <ButtonB
          //disabled={this.state.disabledButtons || this.state.disabledButtonAnterior}
          onClick={this.paginaAnterior}>
          <span className="fa fa-caret-left"></span>
            Anterior
          </ButtonB>
        {' '}
        <ButtonB
          //disabled={this.state.disabledButtons || this.state.disabledButtonProximo}
          onClick={this.paginaProxima}>
          Próximo
          <span className="fa fa-caret-right"></span>
        </ButtonB>

        {/**confirma exclusao */}
        <Modal
          show={false}
          aria-labelledby="contained-modal-title">
          <Modal.Header closeButton={true}
            onHide={this.cancelaExcluirProduto}>
            <Modal.Title>Excluir Produto</Modal.Title>
          </Modal.Header>

          <Modal.Body>Confirma a exclusão do produto selecionado?</Modal.Body>

          <Modal.Footer>
            <ButtonB fill bsStyle="danger" onClick={this.confirmaExcluirProduto}>Excluir</ButtonB>
            <ButtonB fill onClick={this.cancelaExcluirProduto}>Cancelar</ButtonB>
          </Modal.Footer>
        </Modal>


      </div>
    );
  }
}

export default OutbuildingList;
