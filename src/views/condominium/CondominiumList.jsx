import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonB from "components/CustomButton/CustomButton.jsx";
import { UserAuthContext } from "contexts";
import Listing from "components/Listing/Listing";
import CondominiumDomain from "domains/condominium"
import { Modal } from "components/Modal";
import { Col } from 'reactstrap';
import Button from 'components/CustomButton/CustomButton.jsx';

const dataReducer = condo => [
    condo.name,
    condo.addres,
]

const Headers = [
    "Nome",
    "Endereço"
]

const searchOne = (query, history) => {
    console.log(`Procurando ${query}`)
}

const onView = (condo, history) => {
    history.push(CondominiumDomain.itemPath(condo));
}

const Operations = ({ item, selectItem }) => {
    const [isModal, setIsModal] = useState(false);

    const modalButtons = () =>
        <React.Fragment>
            <Col md={2}>
                <Button
                    bsStyle="primary"
                    //onClick={setResidentRole}
                    fill
                >
                    Copiar link
            </Button>{" "}
            </Col>

            <Button
                bsStyle="secondary"
                onClick={() => setIsModal(false)}
                fill
                pullRight
            >
                Cancelar
        </Button>{" "}
        </React.Fragment>

    return (
        <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
            <UserAuthContext.Consumer>
                {user => {
                    const link = CondominiumDomain.itemPath(item);

                    if (user.isManager) {
                        return <React.Fragment>
                            <Link to={link}>
                                <ButtonB
                                    bsStyle="success" bsSize="xs"
                                    simple type="button" style={{ padding: '3px' }}>
                                    <span className="fa fa-pencil"></span>
                                </ButtonB>
                            </Link>
                            {' '}
                            <ButtonB bsStyle="danger" simple type="button" bsSize="xs" style={{ padding: '3px' }}
                                onClick={selectItem}>
                                <span className="fa fa-times"></span>
                            </ButtonB>

                            <ButtonB bsStyle="warning" simple type="button" bsSize="xs" style={{ padding: '3px' }}
                                onClick={() => setIsModal(true)}>
                                <span className="fa fa-user-plus"></span>
                            </ButtonB>
                        </React.Fragment>
                    }
                    return (
                        <Link to={link}>
                            <ButtonB
                                bsStyle="success" bsSize="xs"
                                simple type="button" style={{ padding: '3px' }}>
                                <span className="fa fa-eye"></span>
                            </ButtonB>
                        </Link>
                    )
                }}
            </UserAuthContext.Consumer>

            <Modal
                show={isModal}
                title="Convidar morador"
                buttons={modalButtons()}
                bodyText="Copie o link para convidar moradores para o condomínio selecionado."
                backdrop="static"
            />
        </div>
    )
}

const CondominiumList = ({ }) => (
    <UserAuthContext.Consumer>
        {
            user => <Listing
                name="condomínio"
                title="Lista de condomínios"
                headers={Headers}
                dataReducer={dataReducer}
                searchOne={searchOne}
                onItemClick={onView}
                onItemRemoval={CondominiumDomain.remove}
                fetchItems={CondominiumDomain.list}
                OperationsComponent={Operations}
                addLink={user.isManager && CondominiumDomain.resource}
            />
        }
    </UserAuthContext.Consumer>
)

export default CondominiumList;