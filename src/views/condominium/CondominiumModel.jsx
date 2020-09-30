import React, { Component } from 'react';
import Button from 'components/CustomButton/CustomButton.jsx';
import api from '../../services/api';
import {
    Row, Col, Label, Card, CardBody, TabPane, TabContent,
    Nav, NavItem, NavLink, Table
  } from "reactstrap";
import classnames from 'classnames';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { Link } from "react-router-dom";

import ButtonB from "components/CustomButton/CustomButton.jsx";
import { ModelComponent } from "views/common";

class CondominiumModel extends ModelComponent {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            activeTab: '1',
            modalOpen: true,
        }

        console.log(this.state)
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

        const styleInputUpper = {
            fontSize: 12,
            textTransform: 'uppercase'
        }

        const styleLabel = {
            fontSize: 11
        }

        let cancelLink = "condominiums";

        // back one level when editing a condominium
        if (this.state.name !== undefined) {
            cancelLink = `../${cancelLink}`;
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
{/* 
                                    <NavItem className={classnames({ active: this.state.activeTab === '2' })}>
                                        <NavLink href="#" style={{ color: '#000' }}
                                        onClick={() => { this.toggle('2'); }}>Mídia</NavLink>
                                    </NavItem> */}
                                </Nav>
                                <TabContent activeTab={this.state.activeTab} style={{ fontSize: 11 }}>
                                    <TabPane tabId="1">
                                        <AvForm autoComplete="off" onSubmit={this.operacaoTransportadora} ref="formCondominium">
                                            <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                                                <Col md={3}>
                                                    <AvGroup>
                                                        <Label for="name" style={styleLabel}>Nome do condomínio</Label>
                                                        <AvField type="text" name="name" id="name" style={styleInput}
                                                            value={this.getModelAttr('name')}
                                                            validate={{
                                                                required: { value: true, errorMessage: 'Campo "Nome" obrigatório' },
                                                            }} />
                                                    </AvGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <AvGroup>
                                                        <Label for="address" style={styleLabel}>Endereço</Label>
                                                        <AvField type="text" name="address" id="address" style={styleInput}
                                                            value={this.getModelAttr('address')} />
                                                    </AvGroup>
                                                </Col>
                                            </Row>

                                            <Row style={{ paddingLeft: '10px', paddingRight: '10px' }} >
                                                <Col md={12} style={{ marginTop: '-10px' }}>
                                                    <AvGroup>
                                                        <Label for="notes" style={styleLabel}>Observações</Label>
                                                        <AvField type="textarea" rows={5} name="notes" id="notes"
                                                            value={this.getModelAttr('notes')} />
                                                    </AvGroup>
                                                </Col>
                                            </Row>
                                            <div className="clearfix" />
                                        </AvForm>
                                    </TabPane>
                                </TabContent>

                                {/* <TabContent activeTab={this.state.activeTab} style={{ fontSize: 11 }}>
                                    <TabPane tabId="2">
                                        <AvForm autoComplete="off" onSubmit={this.operacaoProduto} ref="formOutbuilding">
                                            <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                                                <Col md={4} style={{ marginTop: '-10px' }}>
                                                <AvGroup>
                                                    <Label for="fromDay" style={styleLabel}>Documento/Imagem/Vídeo</Label>
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
                                                        <th>Preview</th>
                                                        <th className="text-center">Operações</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                        C:\Users\Yan\Documentos\meu-lindo-condominio.png
                                                        </td>
                                                        <td>
                                                        <img src="https://raw.githubusercontent.com/falso-de-verdade/requisitos/master/logo.jpg"
                                                            height={64}
                                                            width={64} />
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
                                <div className="clearfix" /> */}
                            </CardBody>
                        </Card>
                        <AvForm autoComplete="off" onSubmit={this.operacaoTransportadora} ref="formCondominium">
                            <Link to={cancelLink}>
                                <Button pullRight fill bsStyle="danger" >
                                    Cancelar
                                </Button>
                            </Link>

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

export default CondominiumModel;