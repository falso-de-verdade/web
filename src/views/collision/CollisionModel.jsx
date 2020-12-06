import React from 'react';

import { ModelComponent } from 'views/common';
import CollisionDomain from 'domains/collision';
import { TableComponent } from 'components/Listing'
import { dataReducer, Headers } from '../schedule/ScheduleList'
import ButtonB from "components/CustomButton/CustomButton";
import { ModalWithListing } from "components/Modal";

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

    modalButtons = () =>
        <React.Fragment>
            <ButtonB fill bsStyle="danger">Resolver</ButtonB>

            <ButtonB 
                fill 
                onClick={() => this.setState({ schedule: !this.state.schedule })}
            >
                Cancelar
            </ButtonB>
        </React.Fragment>

    renderModal = () => (
        <ModalWithListing
            show={this.state.schedule}
            title="Resolver ticket"
            bodyText="Confirma a resolução do ticket para o seguinte morador?"
            buttons={this.modalButtons()}
            headers={Headers}
            items={[this.state.schedule]}
            dataReducer={dataReducer}
            />
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