import React from "react";

import { Modal, Table, FormControl } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Spinner } from "reactstrap";

import ButtonB from "components/CustomButton/CustomButton.jsx";
import Card from "components/Card/Card";
import ItemComponent from "./ItemComponent";

const TableContent = ({ headers, 
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
                            <ItemComponent item={item} onClick={onItemClick} dataReducer={dataReducer} />
                            {OperationsComponent && 
                                <td className="text-center" width={140}>
                                    <OperationsComponent 
                                            item={item} 
                                            setSelectedItem={setSelectedItem} />
                                </td>
                            } 
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Row>
    </div>
);

const Listing = ({ name, 
                   title, 
                   addLink, 
                   searchOne, 
                   headers,
                   onItemClick,
                   onItemRemoval,
                   fetchItems, 
                   dataReducer,
                   OperationsComponent }) => {
    let history = useHistory();

    let [searchQuery, setSearchQuery] = React.useState('');
    let [isItemSelected, setHasSelectedItem] = React.useState(false);
    let [loading, setLoading] = React.useState(true);

    const itemsRef = React.useRef(null);
    const selectedItemRef = React.useRef(null);
    
    if (loading && itemsRef.current === null) {
        fetchItems().then(results => {
            itemsRef.current = results;
            setLoading(false);
        });
    }

    return <React.Fragment>
        <div style={{ display: loading ? "block" : "none" }}>
            <Spinner animation="border">
                <span className="sr-only">Carregando</span>
            </Spinner>
        </div>
        <div style={{ display: loading ? "none" : "block" }} className="content">

            <Row style={{ marginTop: '-20px' }}>

                <Col md={4} style={{ marginBottom: '5px', paddingRight: 10 }}>
                    <FormControl
                        style={{ marginBottom: '15px' }}
                        type="text"
                        onChange={e => setSearchQuery(e.target.value)}
                        onKeyUp={(stroke) => stroke.key == 'Enter' ? 
                                searchOne(searchQuery, history) : ''}
                        placeholder={`Localizar ${name}`}
                    />
                </Col>

                <Col md={8} style={{ marginBottom: '5px', paddingLeft: 0 }}>
                    <ButtonB
                        bsStyle="info"
                        onClick={() => searchOne(searchQuery, history)} >
                        <span className="fa fa-search"></span>Localizar
                    </ButtonB>

                    <Link to={`${addLink}`}>
                        <ButtonB bsStyle="info" fill pullRight style={{ marginLeft: '10px' }}>
                            <span className="fa fa-plus"></span>
                        </ButtonB>
                    </Link>
                </Col>
            </Row>

            <Row style={{ paddingTop: '0px' }}>
                <Col md={12}>
                <Card
                    title={title}
                    ctAllIcons
                    content={<TableContent 
                                headers={headers}
                                items={itemsRef.current}
                                onItemClick={values => onItemClick(values, history)}
                                dataReducer={dataReducer}
                                setSelectedItem={item => {
                                    selectedItemRef.current = item;
                                    setHasSelectedItem(true);
                                }}
                                OperationsComponent={OperationsComponent} />} />
                </Col>
            </Row>

            <ButtonB>
                Anterior
                <span className="fa fa-caret-left"></span>
            </ButtonB>
            {' '}
            <ButtonB>
                Próximo
                <span className="fa fa-caret-right"></span>
            </ButtonB>

            {/**confirma exclusao */}
            <Modal
                show={isItemSelected}
                aria-labelledby="contained-modal-title">
                <Modal.Header>
                    <Modal.Title>Excluir {name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="text-center">
                        Confirma a exclusão do item selecionado ?
                    </p>
                    <TableContent 
                        headers={headers}
                        items={[selectedItemRef.current]}
                        dataReducer={dataReducer} />
                </Modal.Body>

                <Modal.Footer>
                    <ButtonB fill bsStyle="danger" onClick={e => {
                        onItemRemoval(selectedItemRef.current);

                        // force re-fetching
                        itemsRef.current = null;
                        setLoading(true);
                            
                        // reset selected item
                        selectedItemRef.current = null;
                        setHasSelectedItem(false);
                     }}>Excluir</ButtonB>

                    <ButtonB fill onClick={e => setHasSelectedItem(false)}>Cancelar</ButtonB>
                </Modal.Footer>
            </Modal>

        </div>
    </React.Fragment>
}

export default Listing;