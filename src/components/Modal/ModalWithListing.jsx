import React from 'react';

import Modal from "./Modal";
import { TableComponent } from "components/Listing";

const ModalWithListing = props => (
    <Modal {...props}>
        <TableComponent {...props} />
    </Modal>
)

export default ModalWithListing;