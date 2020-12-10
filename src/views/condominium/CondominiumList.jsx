import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonB from "components/CustomButton/CustomButton.jsx";
import { UserAuthContext } from "contexts";
import Listing from "components/Listing/Listing";
import CondominiumDomain from "domains/condominium"
import { ModalWithListing } from "components/Modal";
import Button from 'components/CustomButton/CustomButton.jsx';
import { sendAndParse } from "services/api";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const dataReducer = ({ condominium }) => [
    condominium.name,
    condominium.address,
]

const Headers = [
    "Nome",
    "Endereço"
]

const searchOne = (query, history) => {
    console.log(`Procurando ${query}`)
}

const onView = (condorole, history) => {
    history.push(CondominiumDomain.itemPath(condorole));
}

const generateInviteLink = condominium =>
    sendAndParse({
        method: 'post',
        url: '/invite',
        data: { condominium },
    }, true)

const Operations = ({ item, selectItem }) => {
    const [isModal, setIsModal] = useState(false);
    const [invite, setInvite] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const hideModal = () => setIsModal(false);
    const showModal = () => setIsModal(true);

    const { condominium } = item;

    const createInvite = () => {
        generateInviteLink(condominium['_id'])
            .then(result => {
                setInvite(result.link);
            })
            .catch(error => {
                console.log(error);
            })
            .then(() => setLoading(false));
        showModal();
        setLoading(true);
    }

    const modalButtons = () =>
        <CopyToClipboard text={invite} onCopy={hideModal}>
            <Button
                bsStyle="primary"
                fill>
                Copiar link
            </Button>
        </CopyToClipboard>

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
                                onClick={createInvite}>
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

            <ModalWithListing
                show={isModal}
                title="Convidar morador"
                buttons={modalButtons()}
                bodyText="Copie o link para convidar moradores para o condomínio selecionado."
                dataReducer={dataReducer}
                headers={Headers}
                items={[item]}
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