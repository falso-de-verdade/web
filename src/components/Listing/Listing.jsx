import React from "react";

import { FormControl } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Spinner } from "reactstrap";

import ButtonB from "components/CustomButton/CustomButton.jsx";
import Card from "components/Card/Card";
import { ModalWithListing } from "components/Modal";
import TableComponent from "./TableComponent";

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
    const [lastError, setLastError] = React.useState(null);
    let [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);

    const itemsRef = React.useRef(null);
    const selectedItemRef = React.useRef(null);

    const onError = action => {
        return error => {
            // got an error
            setLastError(error);

            // not longer waiting for something
            setLoading(false);
        }
    }

    if (loading && itemsRef.current === null) {
        fetchItems({ params: { max_results: 10, page: page }, noparse: true }).then(results => {
            const data = results.data;
            itemsRef.current = data._items;
            setLoading(false);
        }).catch(onError('fetching'));
    }

    const refresh = () => {
        // force re-fetching
        itemsRef.current = null;

        setLoading(true);
    }

    const removeItem = () => {
        // we are waiting
        setLoading(true);

        // try:
        onItemRemoval(selectedItemRef.current)
            .then(refresh)
            .catch(onError('removing'))
            .then(() => {
                // reset selected item
                setHasSelectedItem(false);
            });
    }

    const nextPage = () => {
        setPage(page + 1);
        refresh();
    }

    const prevPage = () => {
        setPage(page - 1);
        refresh();
    }

    const modalButtons =
        <React.Fragment>
            <ButtonB fill bsStyle="danger" onClick={removeItem}>
                Excluir
            </ButtonB>

            <ButtonB fill onClick={e => setHasSelectedItem(false)}>
                Cancelar
            </ButtonB>
        </React.Fragment>

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

                <Col md={8} style={{ marginBottom: '5px', paddingLeft: 0, marginTop: '-15px' }}>
                    <ButtonB
                        bsStyle="info"
                        onClick={() => searchOne(searchQuery, history)} >
                        <span className="fa fa-search"></span>Localizar
                    </ButtonB>

                    <ButtonB
                        bsStyle="info"
                        fill
                        style={{ margin: "15px" }}
                        onClick={refresh}>
                        <i class="fa fa-refresh"></i>
                    </ButtonB>

                    {addLink &&
                        <Link to={`${addLink}`}>
                            <ButtonB bsStyle="info" fill pullRight style={{ margin: "15px" }}>
                                <span className="fa fa-plus"></span>
                            </ButtonB>
                        </Link>
                    }
                </Col>

            </Row>

            <Row style={{ paddingTop: '0px' }}>
                <Col md={12}>
                    <Card
                        title={title}
                        ctAllIcons
                        content={<TableComponent
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

            <ButtonB
                disabled={page == 1}
                onClick={prevPage}>
                Anterior
                <span className="fa fa-caret-left"></span>
            </ButtonB>
            {' '}
            <ButtonB
                onClick={nextPage}>
                Próximo
                <span className="fa fa-caret-right"></span>
            </ButtonB>

            <ModalWithListing
                show={isItemSelected}
                title={`Excluir ${name}`}
                bodyText="Confirma a exclusão do item selecionado?"
                buttons={modalButtons}
                headers={headers}
                items={[selectedItemRef.current]}
                dataReducer={dataReducer}
            />
        </div>
    </React.Fragment>
}

export default Listing;