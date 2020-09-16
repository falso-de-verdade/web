import React, { Component } from "react";
import {
    Row, Col, Card, CardBody, TabPane, TabContent,
    Nav, NavItem, NavLink, Label, Table
} from "reactstrap";
import classnames from 'classnames';
import AvForm from "availity-reactstrap-validation/lib/AvForm";
import InputCustom from "components/inputs/inputCustom";
import AvGroup from "availity-reactstrap-validation/lib/AvGroup";
import AvField from "availity-reactstrap-validation/lib/AvField";
import Button from "components/CustomButton/CustomButton.jsx";
import api from "services/api";
import ButtonB from "components/CustomButton/CustomButton.jsx";

class Diversos extends Component {
    notificationSystem = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',
            cfopDentro: '',
            cfopFora: '',
            naturezaOp: '',
            anotacoesnfe: '',
            nome: '',
            mensagem: '',
            listaNaturezaOp: [],
            listaInformacoes: [],
            isDisabledCFOP: true,
            isDisabledInfoNF: true
        }
    }

    componentDidMount() {
        //this.listarNaturezaOp();
        //this.listarInformacoes();
    };

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        };
    };


    render() {


        return (
            <div className="content" >
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardBody style={{ padding: '10px', fontSize: 12 }}>
                                <Nav tabs>
                                    <NavItem className={classnames({ active: this.state.activeTab === '1' })}>
                                        <NavLink href="#" style={{ color: '#000' }}
                                            onClick={() => { this.toggle('1'); }}>Aba 1</NavLink>
                                    </NavItem>

                                    <NavItem className={classnames({ active: this.state.activeTab === '2' })}>
                                        <NavLink href="#" style={{ color: '#000' }}
                                            onClick={() => { this.toggle('2'); }}>Aba 2</NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent activeTab={this.state.activeTab} style={{ fontSize: 11 }}>
                                    <TabPane tabId="1">
                                        <AvForm autoComplete="off" ref="formCliente">
                                            <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                                                <ButtonB onClick={() => this.setState({ isDisabledCFOP: false })} bsStyle="info" fill
                                                    style={{ marginLeft: '20px', marginBottom: '8px' }}>
                                                    <span className="fa fa-plus"></span>
                                                    {' '}Opção
                                                </ButtonB>
                                            </Row>
                                            <Col md={6}>
                                                <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                                    <Col md={4} style={{ marginTop: '-10px' }}>
                                                        <InputCustom
                                                            disabledButtons={this.state.isDisabledCFOP}
                                                            descricao="Bla bla bla"
                                                            name="blabla"
                                                            id="blabla"
                                                            value={this.state.cfopDentro}
                                                            onChange={(e) => { this.setState({ cfopDentro: e.target.value }) }}
                                                        />
                                                    </Col>
                                                    <Col md={1} style={{ marginTop: '-10px' }}></Col>
                                                    <Col md={4} style={{ marginTop: '-10px' }}>
                                                        <InputCustom
                                                            disabledButtons={this.state.isDisabledCFOP}
                                                            descricao="lerolero"
                                                            name="lerolero"
                                                            id="lerolero"
                                                            value={this.state.cfopFora}
                                                            onChange={(e) => { this.setState({ cfopFora: e.target.value }) }}
                                                        />
                                                    </Col>
                                                    <Col md={1} style={{ marginTop: '-10px' }}></Col>
                                                    <Col md={1} style={{ marginTop: '-10px' }}>
                                                        <Button
                                                            disabled={this.state.isDisabledCFOP}
                                                            onClick={this.addCfop}
                                                            bsSize="sm" bsStyle="info" fill style={{ marginTop: '23px' }}>
                                                            <span className="fa fa-plus"></span>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                                    <Col md={12} style={{ marginTop: '-10px' }}>
                                                        <InputCustom
                                                            disabledButtons={this.state.isDisabledCFOP}
                                                            descricao="Descrição"
                                                            name="descricao"
                                                            id="descricao"
                                                            value={this.state.naturezaOp}
                                                            onChange={(e) => { this.setState({ naturezaOp: e.target.value }) }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col md={6}>
                                                <Row style={{ paddingLeft: '10px', paddingRight: '10px' }} >
                                                    <Col md={6}>
                                                        <AvGroup>
                                                            <Label style={{ fontSize: 12, color: '#000' }} for="obs" >Informações Complementares</Label>
                                                            <AvField
                                                                disabled={this.state.isDisabledCFOP}
                                                                style={{ resize: 'none', width: 500, height: 102 }}
                                                                type="textarea"
                                                                name="obs"
                                                                id="obs"
                                                                value={this.state.anotacoesnfe}
                                                                onChange={(e) => { this.setState({ anotacoesnfe: e.target.value }) }}
                                                            />
                                                        </AvGroup>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Row style={{ paddingLeft: '25px', paddingRight: '25px' }}>
                                                <Table striped hover>
                                                    <thead>
                                                        <tr>
                                                            <th>opação 1</th>
                                                            <th>Informações</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        <tr>
                                                            <td>opcção 1</td>
                                                            <td>info</td>
                                                            <td className="text-center" width={50}>
                                                                <div>
                                                                    <ButtonB bsStyle="danger" simple type="button" bsSize="xs"
                                                                        style={{ padding: '3px' }}
                                                                        onClick={this.removeNaturezaOp}
                                                                    >
                                                                        <span className="fa fa-times"></span>
                                                                    </ButtonB>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </Table>
                                            </Row>
                                            <div className="clearfix" />
                                        </AvForm>
                                    </TabPane>

                                    <TabPane tabId="2">
                                        <AvForm autoComplete="off" ref="formCliente">
                                            <Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                                                <ButtonB onClick={() => this.setState({ isDisabledInfoNF: false })} bsStyle="info" fill
                                                    style={{ marginLeft: '20px', marginBottom: '8px' }}>
                                                    <span className="fa fa-plus"></span>
                                                    {' '}INFO.
                                                </ButtonB>
                                            </Row>
                                            <Col md={6}>
                                                <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                                    <Col md={11} style={{ marginTop: '-10px' }}>
                                                        <InputCustom
                                                            disabledButtons={this.state.isDisabledInfoNF}
                                                            descricao="Descricao"
                                                            name="descricao"
                                                            id="descricao"
                                                            value={this.state.nome}
                                                            onChange={(e) => { this.setState({ nome: e.target.value }) }}
                                                        />
                                                        <AvGroup>
                                                            <Label style={{ fontSize: 12, color: '#000' }} for="obs" >Informações Complementares</Label>
                                                            <AvField
                                                                disabled={this.state.isDisabledInfoNF}
                                                                style={{ resize: 'none', width: 500, height: 112 }}
                                                                type="textarea"
                                                                name="obs"
                                                                id="obs"
                                                                value={this.state.mensagem}
                                                                onChange={(e) => { this.setState({ mensagem: e.target.value }) }}
                                                            />
                                                        </AvGroup>
                                                    </Col>
                                                    <Col md={1} style={{ marginTop: '-10px' }}>
                                                        <Button
                                                            disabled={this.state.isDisabledInfoNF}
                                                            onClick={this.addInfoNf}
                                                            bsSize="sm" bsStyle="info" fill style={{ marginTop: '23px' }}>
                                                            <span className="fa fa-plus"></span>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Row style={{ paddingLeft: '25px', paddingRight: '25px' }}>
                                                <Table striped hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Descrição</th>
                                                            <th>Informações</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        <tr>
                                                            <td>Desc</td>
                                                            <td>Mensagem</td>
                                                            <td className="text-center" width={50}>
                                                                <div>
                                                                    <ButtonB bsStyle="danger" simple type="button" bsSize="xs" style={{ padding: '3px' }}

                                                                        onClick={this.removeInfoNf}
                                                                    >
                                                                        <span className="fa fa-times"></span>
                                                                    </ButtonB>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </Table>
                                            </Row>
                                            <div className="clearfix" />
                                        </AvForm>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };
};

export default Diversos;
