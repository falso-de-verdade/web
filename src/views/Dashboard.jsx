/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import ButtonB from "components/CustomButton/CustomButton.jsx";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

import api from '../services/api';
import formatValue from '../utils/formatValue';
import { Table } from "reactstrap";

class Dashboard extends Component {
  // createLegend(json) {
  //   var legend = [];
  //   // for (var i = 0; i < json["names"].length; i++) {
  //   //   var type = "fa fa-circle text-" + json["types"][i];
  //   //   legend.push(<i className={type} key={i} />);
  //   //   legend.push(" ");
  //   //   legend.push(json["names"][i]);
  //   // }
  //   //return legend;
  // }

  constructor(props) {
    super(props)

    this.state = {
      countNotas: 0,
      countClientes: 0,
      countProdutos: 0,
      ValorMesNotaFiscal: [],
      DashboardnotaID: 0,
      DashboardClienteID: 0,
      DashboardProdutoID: 0,
      DashboardValorTotal: 0,
      dataBar2: {},
      totalNotasEmitidas: 0
    };

  }
  componentDidMount() {
    this.dadosNotasDashboard();
    this.dadosClientesDashboard();
    this.dadosProdutosDashboard();
    this.dadosNotaValorDashboard();
    this.dadosNotasEmitidasDashboard();
  }

  dadosNotasDashboard = async () => {

    const URL = '/dados_Notas_Dashboard';
    const response = await api.get(URL);
    const { count } = response.data.rows[0]
    this.setState({ countNotas: count })
  };

  dadosClientesDashboard = async () => {

    const URL = '/dados_Clientes_Dashboard';
    const response = await api.get(URL);

    this.setState({
      countClientes: response.data.rows,
      DashboardClienteID: response.data.rows[0].count
    });
  };

  dadosProdutosDashboard = async () => {

    const URL = 'dados_Produtos_Dashbord';
    const response = await api.get(URL);

    this.setState({
      countProdutos: response.data.rows,
      DashboardProdutoID: response.data.rows[0].count
    })
  };

  dadosNotaValorDashboard = async () => {

    const URL = 'dados_NotaValor_Dashboard';
    const response = await api.get(URL);
    this.setState({
      ValorMesNotaFiscal: response.data.rows
    })
    let array1 = []
    let array2 = []
    this.state.ValorMesNotaFiscal.forEach(element => {
      array1.push(element.totalnota)
      array2.push(element.mes)
    });
    this.setState({
      dataBar2: {
        ...this.state.dataBar2,
        series: [array1],
        labels: array2
      }
    })
  };

  dadosNotasEmitidasDashboard = async () => {
    const URL = 'dados_notas_emitidas';
    const response = await api.get(URL);
    const { count } = response.data.rows[0];
    this.setState({ totalNotasEmitidas: count })
  };

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-cloud-upload text-success" />}
                statsText="Notas emitidas no mês"
                statsValue={this.state.totalNotasEmitidas}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Mês atual"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-timer text-warning" />}
                statsText="Notas aguardando emissão"
                statsValue={this.state.countNotas}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Poucos segundos atrás"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-add-user text-danger" />}
                statsText="Clientes cadastrados"
                statsValue={this.state.DashboardClienteID}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Poucos segundos atrás"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-box2 text-info" />}
                statsText="Produtos cadastrados"
                statsValue={this.state.DashboardProdutoID}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Poucos segundos atrás"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Notas emitidas"
                category="Total de notas emitidas por hora"
                //stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
              // legend={
              //   <div className="legend">{this.createLegend(legendSales)}</div>
              // }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Email Statistics"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
              // legend={
              //   <div className="legend">{this.createLegend(legendPie)}</div>
              // }
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="Notas emitidas"
                category="Valor total em R$/mês"
                stats="Valor total em R$ de notas emitidas por mês"
                statsIcon="fa fa-refresh"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.dataBar2}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
              // legend={
              //   <div className="legend">{this.createLegend(legendBar)}</div>
              // }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Informações"
                category="Atualizações do sistema e informações sobre nota fiscal eletrônica"
                //stats="Updated 3 minutes ago"
                //statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Resumo</th>
                          <th>Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        <td>Novo prazo para cancelamento de NFe</td>
                        <td>27/08/2020</td>
                        <td className="text-center" width={50}>
                          <div>
                            <ButtonB bsStyle="info" simple type="button" bsSize="sm"
                              style={{ padding: '3px' }}
                              //value={item.id_uuid}
                              //onClick={this.removeNaturezaOp}
                            >
                              <span className="fa fa-info-circle"></span>
                            </ButtonB>
                          </div>
                        </td>
                      </tbody>
                    </Table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
