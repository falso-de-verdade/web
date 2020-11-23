import React from "react";
import { Table, Row } from "react-bootstrap";

import ItemComponent from "./ItemComponent";

const TableComponent = ({ headers,
                        items,
                        dataReducer,
                        onItemClick,
                        setSelectedItem,
                        OperationsComponent }) => (
        <div>
            <Row>
                <Table striped hover>
                    <thead>
                        <tr>
                            {headers.map(header => (
                                <th className="text-center">{header}</th>
                            ))}
                            {OperationsComponent &&
                                <th className="text-center">Operações</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map(item => (
                            <tr>
                                <ItemComponent 
                                    item={item} 
                                    onClick={onItemClick} 
                                    dataReducer={dataReducer} />
                                {OperationsComponent &&
                                    <td className="text-center" width={140}>
                                        <OperationsComponent
                                            item={item}
                                            selectItem={() => setSelectedItem(item)} />
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </div>
    );

export default TableComponent;