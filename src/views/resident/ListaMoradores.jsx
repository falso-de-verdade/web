import React, { Component } from "react";

import { Modal, Table, FormControl } from "react-bootstrap";
import { Row, Col } from "reactstrap";

import Card from "components/Card/Card";

import { AvForm, AvField } from 'availity-reactstrap-validation';
import ButtonB from "components/CustomButton/CustomButton.jsx";

import api from '../../services/api';
import { Link, Redirect } from "react-router-dom";

import * as qs from 'query-string';

class ListResident extends Component {

  render() {
    return (
      <div className="content">

        <Row style={{ marginTop: '-20px' }}>

          <Col md={4} style={{ marginBottom: '5px', paddingRight: 10 }}>
            <FormControl
              type="text"
              //value={this.state.inputLocalizar}
              onChange={(e) => { this.setState({ inputLocalizar: e.target.value }) }}
              onKeyUp={(valor) => valor.key == 'Enter' ? this.localizarClientes() : ''}
              placeholder="Localizar Morador"
            />
          </Col>
          <Col md={2} style={{ marginBottom: '5px', paddingLeft: 0 }}>
            <AvForm autoComplete="off" ref="formLocalizar">
              <AvField type="select" name="select"
                //value={this.state.inputLocalizarStatus}
                onChange={(e) => { this.setState({ inputLocalizarStatus: e.target.value }) }}>
                <option value="0">Condomínio Villa Flor</option>
                <option value="1">Condomínio St Flor</option>
                <option value="2">Condomínio Maré Azul VI</option>
              </AvField>
            </AvForm>
          </Col>

          <Col md={6} style={{ marginBottom: '5px', paddingLeft: 0 }}>
            <ButtonB bsStyle="info"
              //disabled={this.state.disabledButtons}
              onClick={this.localizarClientes}>
              <span className="fa fa-search"></span>
              Localizar
              </ButtonB>
          </Col>

        </Row>

        <Row style={{ paddingTop: '0px' }}>
          <Col md={12}>
            <Card
              title="Lista de Moradores"

              ctAllIcons
              content={
                <div>
                  <Row>
                    <Table striped hover >
                      <thead>
                        <tr>
                          <th>Data de entrada</th>
                          <th>Nome</th>
                          <th>E-mail</th>
                          <th>Localização</th>
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
            onHide={this.cancelaExcluirCliente}>
            <Modal.Title>Excluir Cliente</Modal.Title>
          </Modal.Header>

          <Modal.Body>Confirma a exclusão do cliente selecionado?</Modal.Body>

          <Modal.Footer>
            <ButtonB fill bsStyle="danger" onClick={this.confirmaExcluirCliente}>Excluir</ButtonB>
            <ButtonB fill onClick={this.cancelaExcluirCliente}>Cancelar</ButtonB>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default ListResident;
