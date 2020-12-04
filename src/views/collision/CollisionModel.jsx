import React from 'react';

import { ModelComponent } from 'views/common';
import CollisionDomain from 'domains/collision';
import { TableComponent } from 'components/Listing'
import { dataReducer, Headers } from '../schedule/ScheduleList'
import ButtonB from "components/CustomButton/CustomButton";
import { Modal } from 'react-bootstrap';

class CollisionModel extends ModelComponent {
    domain = CollisionDomain;

    mapData = values => {
        const {
            outbuildingId,
            day,
            ticketCount,
        } = values;

        return {
            outbuildingId,
            day,
            ticketCount
        }
    }

    tabAndFields = () => {
        return [
            this.storeTab(),
        ]
    }

    TicketOperations = (props) => (
        <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
            <ButtonB bsStyle="warning"
                simple type="button" bsSize="xs" style={{ padding: '3px' }}
                onClick={props.selectItem}>
                <span className="fa fa-check"></span>
            </ButtonB>
        </div>
    )

    renderModal = () => (
        <Modal
            show={this.state.schedule}
            aria-labelledby="contained-modal-title">
            <Modal.Header>
                <Modal.Title>Resolver ticket</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="text-center">
                    Confirma a resolução do ticket para o seguinte morador ?
            </p>
                <TableComponent
                    headers={Headers}
                    items={[this.state.schedule]}
                    dataReducer={dataReducer} />
            </Modal.Body>

            <Modal.Footer>
                <ButtonB fill bsStyle="danger">Resolver</ButtonB>

                <ButtonB fill onClick={() => this.setState({ schedule: !this.state.schedule })}>Cancelar</ButtonB>
            </Modal.Footer>
        </Modal>
    )

    storeTab = () => {
        return {
            name: "Conflito",
            rows: [
                {
                    table: {
                        as: TableComponent,
                        headers: Headers,
                        dataReducer: dataReducer,
                        OperationsComponent: this.TicketOperations,
                        items: this.originalData,
                        setSelectedItem: (schedule) => this.setState({ schedule })
                    },
                    modal: this.renderModal()
                }
            ]
        }
    }
}

export default CollisionModel;