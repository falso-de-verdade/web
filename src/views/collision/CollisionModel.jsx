import React from 'react';

import { ModelComponent } from 'views/common';
import CollisionDomain from 'domains/collision';
import { TableComponent } from 'components/Listing';
import { 
    dataReducer as scheduleDataReducer, 
    Headers } from '../schedule/ScheduleList'
import ButtonB from "components/CustomButton/CustomButton";
import { ModalWithListing } from "components/Modal";


const dataReducer = ({ schedule }) =>
    scheduleDataReducer(schedule);

class CollisionModel extends ModelComponent {
    domain = CollisionDomain;

    constructor(props) {
        super(props);
        this.schedule = null;
    }

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

    resolveCollision = () => {
        this.domain.remove(this.schedule['collision'])
            .then(() => {
                this.props.history.push(`../${this.listingResource()}`);
            }).catch(error => {
                console.log(error);
            });
    }

    modalButtons = () =>
        <React.Fragment>
            <ButtonB fill bsStyle="danger" onClick={this.resolveCollision}>
                Resolver
            </ButtonB>

            <ButtonB 
                fill 
                onClick={() => this.setState({ hasSchedule: false })}
            >
                Cancelar
            </ButtonB>
        </React.Fragment>

    renderModal = () => (
        <ModalWithListing
            show={this.state.hasSchedule}
            title="Resolver ticket"
            bodyText="Confirma a resolução do ticket para o seguinte morador?"
            buttons={this.modalButtons()}
            headers={Headers}
            items={[this.schedule]}
            dataReducer={dataReducer}
            />
    )

    disableFields = () => true

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
                        items: this.mapModelData(),
                        setSelectedItem: schedule => {
                            this.schedule = schedule;
                            this.setState({ hasSchedule: true })
                        },
                        col: {
                            md: 12
                        }
                    },
                    modal: this.renderModal()
                }
            ]
        }
    }
}

export default CollisionModel;