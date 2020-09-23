import React, { Component } from "react";
import { Table, Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card";
import Button from "components/CustomButton/CustomButton";

class CondominiumList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listEmissores: [],
            isHidden: false,
            disabledButtons: true
        }
    }


    render() {


        return (
            <div className="content">

                <Row>
                    <Col md={12}>
                        <Card
                            title="Condomínios"
                            ctTableResponsive
                            ctTableFullWidth
                            content={

                                <Table striped hover>
                                    <thead>
                                        <tr>
                                            <th>Razão Social</th>
                                            <th>Fantasia</th>
                                            <th>CNPJ</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <tr>
                                            <td>Razao Social</td>
                                            <td>
                                                {<div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
                                                    <Button bsStyle="info" fill style={{ padding: '3px' }}
                                                    >
                                                        Editar
                                                            </Button>
                                                    {' '}
                                                    <Button bsStyle="success" fill style={{ padding: '3px' }}
                                                    >
                                                        Selecionar Condomínio
                                                            </Button>
                                                </div>
                                                }
                                            </td>
                                        </tr>

                                    </tbody>
                                </Table>
                            }
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CondominiumList;
