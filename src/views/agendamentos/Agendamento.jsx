import React, { Component } from 'react';
import Button from 'components/CustomButton/CustomButton.jsx';
import api from '../../services/api';
import {
    Row, Col, Label, Card, CardBody, Nav
} from 'reactstrap';
import classnames from 'classnames';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import Select from 'react-select';
import formatCnpjCpf from '../../utils/formatCNPJ';


class Transportadora extends Component {

    notificationSystem = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            listTransportadora: [],
            dadosTransportadora: [],
            isHidden: false,
            activeTab: '1',
            titulo: '',
            tituloBotaoCadAlt: '',
            tipoCadAlt: '',
            dadosTransportadoraID_UUID: props.match.params.id,
            dadosTransportadoraCodigo: '',
            dadosTransportadoraRazao: '',
            dadosTransportadoraCNPJ: '',
            dadosTransportadoraIE: '',
            dadosTransportadoraAntt: '',
            dadosTransportadoraEndereco: '',
            dadosTransportadoraNumero: '',
            dadosTransportadoraBairro: '',
            dadosTransportadoraCep: '',
            dadosTransportadoraUf: '',
            dadosTransportadoraCidade: '',
            dadosTransportadoraComplemento: '',
            dadosTransportadoraFone1: '',
            dadosTransportadoraFone2: '',
            dadosTransportadoraObs: '',
            dadosTransportadoraPlaca: '',
            dadosTransportadoraUfPlaca: '',
            disabledButtons: false,
            modalOpen: true,
            listaUfs: []
        }
    }
    componentDidMount(prevProps) {
    };

    render() {
        const styleInput = {
            fontSize: 12,
            height: '38px'
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
                    <Col md={12}>

                        <Card>
                            <CardBody>

                                <AvForm autoComplete="off" onSubmit={this.operacaoTransportadora} ref="formAgendamento">
                                    <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                                        <Col md={2}>
                                            <AvGroup>
                                                <Label for="codigo" style={styleLabel}>Código</Label>
                                                <AvField type="text" name="codigo" id="codigo" style={styleInput}
                                                    disabled={true}
                                                    value={this.state.dadosTransportadoraCodigo}
                                                    onChange={(e) => { this.setState({ dadosTransportadoraCodigo: e.target.value }) }} />
                                            </AvGroup>
                                        </Col>
                                        <Col md={7}>
                                            <AvGroup>
                                                <Label for="dependenia" style={styleLabel}>Dependência</Label>
                                                <AvField type="text" name="dependenia" id="dependenia" style={styleInput}
                                                    //disabled={this.state.disabledButtons}
                                                    //value={this.state.dadosTransportadoraRazao}
                                                    onChange={(e) => { this.setState({ dadosTransportadoraRazao: e.target.value }) }}
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Campo "Nome" obrigatório' },
                                                    }} />
                                            </AvGroup>
                                        </Col>

                                    </Row>
                                    <Row style={{ paddingLeft: '10px', paddingRight: '10px' }} >
                                        <Col md={3} style={{ marginTop: '-10px' }}>
                                            <AvGroup>
                                                <Label for="ie" style={styleLabel}>Inscrição Estadual</Label>
                                                <AvField type="text" name="ie" id="ie" style={styleInput}
                                                    disabled={this.state.disabledButtons}
                                                    value={this.state.dadosTransportadoraIE}
                                                    onChange={(e) => { this.setState({ dadosTransportadoraIE: e.target.value }) }} />
                                            </AvGroup>
                                        </Col>
                                        <Col md={3} style={{ marginTop: '-10px' }}>
                                            <AvGroup>
                                                <Label for="antt" style={styleLabel}>Lotação máxima</Label>
                                                <AvField type="text" name="antt" id="antt" style={styleInput}
                                                    disabled={this.state.disabledButtons}
                                                    value={this.state.dadosTransportadoraAntt}
                                                    onChange={(e) => { this.setState({ dadosTransportadoraAntt: e.target.value }) }} />
                                            </AvGroup>
                                        </Col>
                                        <Col md={3} style={{ marginTop: '-10px' }}>
                                            <AvGroup>
                                                <Label for="fone1" style={styleLabel}>Telefone 1</Label>
                                                <AvField type="text" name="fone1" id="fone1" style={styleInput}
                                                    disabled={this.state.disabledButtons}
                                                    value={this.state.dadosTransportadoraFone1}
                                                    onChange={(e) => { this.setState({ dadosTransportadoraFone1: e.target.value }) }} />
                                            </AvGroup>
                                        </Col>
                                        <Col md={3} style={{ marginTop: '-10px' }}>
                                            <AvGroup>
                                                <Label for="fone2" style={styleLabel}>Telefone 2</Label>
                                                <AvField type="text" name="fone2" id="fone2" style={styleInput}
                                                    disabled={this.state.disabledButtons}
                                                    value={this.state.dadosTransportadoraFone2}
                                                    onChange={(e) => { this.setState({ dadosTransportadoraFone2: e.target.value }) }} />
                                            </AvGroup>
                                        </Col>
                                    </Row>

                                    <Row style={{ paddingLeft: '10px', paddingRight: '10px' }} >
                                        <Col md={12} style={{ marginTop: '-10px' }}>
                                            <AvGroup>
                                                <Label for="obs" style={styleLabel}>Anotações Diversas</Label>
                                                <AvField type="textarea" rows={5} name="obs" id="obs"
                                                    //disabled={this.state.disabledButtons}
                                                    //value={this.state.dadosTransportadoraObs}
                                                    onChange={(e) => { this.setState({ dadosTransportadoraObs: e.target.value }) }} />
                                            </AvGroup>
                                        </Col>
                                    </Row>
                                </AvForm>
                                <div className="clearfix" />
                            </CardBody>
                        </Card>
                        <AvForm autoComplete="off" onSubmit={this.operacaoTransportadora} ref="formNF">
                            <Button pullRight fill bsStyle="danger"
                                onClick={this.retornarListaTransportadora}>
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

export default Transportadora;