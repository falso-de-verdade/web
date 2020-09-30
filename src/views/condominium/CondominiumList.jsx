import React, { Component } from "react";
import { Modal, Table, FormControl } from "react-bootstrap";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import Card from "components/Card/Card";
import ButtonB from "components/CustomButton/CustomButton.jsx";


class CondominiumList extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
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
                            placeholder="Localizar condomínio"
                        />
                    </Col>

                    <Col md={8} style={{ marginBottom: '5px', paddingLeft: 0 }}>
                        <ButtonB
                            bsStyle="info"
                            //disabled={this.state.disabledButtons}
                            onClick={this.listarTransportadoras}>
                            <span className="fa fa-search"></span>Localizar
                        </ButtonB>

                        <Link to={`condominium`}>
                            <ButtonB bsStyle="info" fill pullRight style={{ marginLeft: '10px' }}>
                                <span className="fa fa-plus"></span>
                            </ButtonB>
                        </Link>
                    </Col>
                </Row>

                <Row style={{ paddingTop: '0px' }}>
                    <Col md={12}>
                        <Card
                            title="Lista de Condomínios"
                            ctAllIcons
                            content={
                                <div>
                                    <Row>
                                        <Table striped hover>
                                            <thead>
                                                <tr>
                                                    {/* <th>
                                                       Foto
                                                    </th> */}
                                                    <th>Nome</th>
                                                    <th>Endereço</th>
                                                    <th className="text-center">Operações</th>
                                                </tr></thead>
                                            <tbody>
                                                <tr>
                                                    {/* <td>
                                                        <img src="https://raw.githubusercontent.com/falso-de-verdade/requisitos/master/logo.jpg"
                                                            wdith={128} height={128} />
                                                    </td> */}
                                                    <td>Condomínio Villa Flor</td>
                                                    <td>Suburbio de Gotham City, nº 651</td>
                                                    <td className="text-center" width={140}>
                                                        {
                                                            <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>

                                                                <Link to={`condominium/teste`}>
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
        );
    }
}

export default CondominiumList;
