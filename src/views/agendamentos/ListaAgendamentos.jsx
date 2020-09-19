import React, { Component } from "react";

import { Modal, Table, FormControl } from "react-bootstrap";
import { Row, Col } from "reactstrap";

import Card from "components/Card/Card";

import { AvForm, AvField } from 'availity-reactstrap-validation';
import ButtonB from "components/CustomButton/CustomButton.jsx";

import api from '../../services/api';
import { Link, Redirect } from "react-router-dom";

import * as qs from 'query-string';

class ListaTransportadora extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listTransportadoras: [],
            totTransportadoras: 0,
            stotTransportadoras: "Total de Registros: 0",
            inputLocalizar: '',
            isHidden: false,
            disableButtons: true,
            modalExcluir: false,
            idTransportadoraExcluir: 0,
            nPage: 1,
            disableButtonAnterior: true,
            disableButtonProximo: true
        };
    };

    componentDidMount() {

    }

    render() {
        return (
            <div className="content">

                <Row style={{ marginTop: '-20px' }}>

                    <Col md={4} style={{ marginBottom: '5px', paddingRight: 10 }}>
                        <FormControl
                            style={{ marginBottom: '15px' }}
                            type="text"
                            //value={this.state.inputLocalizar}
                            onChange={(e) => { this.setState({ inputLocalizar: e.target.value }) }}
                            onKeyUp={(valor) => valor.key == 'Enter' ? this.listarTransportadoras() : ''}
                            placeholder="Localizar Agendamento"
                        />
                    </Col>

                    <Col md={4} style={{ marginBottom: '5px', paddingLeft: 0 }}>
                        <ButtonB
                            bsStyle="info"
                            //disabled={this.state.disabledButtons}
                            onClick={this.listarTransportadoras}>
                            <span className="fa fa-search"></span>Localizar
                        </ButtonB>

                        <Link to={`agendamento`}>
                            <ButtonB bsStyle="info" fill pullRight style={{ marginLeft: '10px' }}>
                                <span className="fa fa-plus"></span>
                                {' '}Agendamento
                            </ButtonB>
                        </Link>
                    </Col>
                </Row>

                <Row style={{ paddingTop: '0px' }}>
                    <Col md={12}>
                        <Card
                            title="Lista de Agendamentos"
                            ctAllIcons
                            content={
                                <div>
                                    <Row>
                                        <Table striped hover>
                                            <thead>
                                                <tr>
                                                    <th>Código</th>
                                                    <th>Dependência</th>
                                                    <th className="text-center">Operações</th>
                                                </tr></thead>
                                            <tbody>
                                                <tr>
                                                    <td>Código</td>
                                                    <td>Piscina</td>
                                                    <td className="text-center" width={140}>
                                                        {
                                                            <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>

                                                                <ButtonB bsStyle="success" simple type="button" bsSize="xs" style={{ padding: '3px' }}
                                                                >
                                                                    <span className="fa fa-pencil"></span>
                                                                </ButtonB>

                                                                {' '}
                                                                <ButtonB bsStyle="danger" simple type="button" bsSize="xs" style={{ padding: '3px' }}

                                                                    onClick={this.excluirTransportadora}>
                                                                    <span className="fa fa-times"></span>
                                                                </ButtonB>
                                                                {' '}
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
                    Anterior
                    <span className="fa fa-caret-left"></span>
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
                    show={this.state.modalExcluir}
                    aria-labelledby="contained-modal-title">
                    <Modal.Header closeButton={true}
                        onHide={this.cancelaexcluirTransportadora}>
                        <Modal.Title>Excluir Agendamento</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Confirma a exclusão da transportadora selecionada ?</Modal.Body>

                    <Modal.Footer>
                        <ButtonB fill bsStyle="danger" onClick={this.confirmaexcluirTransportadora}>Excluir</ButtonB>
                        <ButtonB fill onClick={this.cancelaexcluirTransportadora}>Cancelar</ButtonB>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

export default ListaTransportadora;