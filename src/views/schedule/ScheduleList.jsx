import React, { Component } from "react";

import { Modal, Table, FormControl } from "react-bootstrap";
import { Row, Col } from "reactstrap";

import Card from "components/Card/Card";

import ButtonB from "components/CustomButton/CustomButton.jsx";

import api from '../../services/api';
import { Link } from "react-router-dom";
import { UserAuthContext } from "contexts";

class ScheduleList extends Component {
    static contextType = UserAuthContext;

    constructor(props) {
        super(props);

        this.state = {
            isHidden: false,
            disableButtons: true,
            modalExcluir: false,
        };
    };

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

                    <Col md={8} style={{ marginBottom: '5px', paddingLeft: 0 }}>
                        <ButtonB
                            bsStyle="info"
                            //disabled={this.state.disabledButtons}
                            onClick={this.listarTransportadoras}>
                            <span className="fa fa-search"></span>Localizar
                        </ButtonB>

                        <UserAuthContext.Consumer>
                            {user => !user.isManager &&
                                <Link to={`schedule`}>
                                    <ButtonB bsStyle="info" fill pullRight style={{ marginLeft: '10px' }}>
                                        <span className="fa fa-plus"></span>
                                    </ButtonB>
                                </Link>
                            }
                        </UserAuthContext.Consumer>
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
                                                    {this.context.isManager &&
                                                        <th>Morador</th>
                                                    }
                                                    <th>Dependência</th>
                                                    <th>
                                                        Data
                                                    </th>
                                                    <th>
                                                        Horário
                                                    </th>
                                                    <th>
                                                        Qtd. de ocupantes
                                                    </th>
                                                    <th className="text-center">Operações</th>
                                                </tr></thead>
                                            <tbody>
                                                <tr>
                                                    {this.context.isManager &&
                                                        <td>Pelé</td>
                                                    }
                                                    <td>Piscina</td>
                                                    <td>19/10/2020</td>
                                                    <td>14:30 ás 15:30</td>
                                                    <td>Cheio</td>
                                                    <td className="text-center" width={140}>
                                                        {
                                                            <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>

                                                                <Link to={`schedule/teste`}>
                                                                    <ButtonB bsStyle="success" simple type="button" 
                                                                        bsSize="xs" style={{ padding: '3px' }} >
                                                                        <span className="fa fa-eye"></span>
                                                                    </ButtonB>
                                                                </Link>
                                                                {' '}
                                                                
                                                                <UserAuthContext.Consumer>
                                                                    {user => !user.isManager && 
                                                                        <React.Fragment>
                                                                            <ButtonB 
                                                                                bsStyle="danger" 
                                                                                simple 
                                                                                type="button" 
                                                                                bsSize="xs" 
                                                                                style={{ padding: '3px' }}
                                                                                onClick={this.excluirTransportadora}>
                                                                                <span className="fa fa-times"></span>
                                                                            </ButtonB>
                                                                            {' '}
                                                                        </React.Fragment>
                                                                    }
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

export default ScheduleList;