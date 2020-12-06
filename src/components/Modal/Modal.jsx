import React from 'react';

import { Modal } from 'react-bootstrap';


const ModalComponent = ({ show, 
                          title, 
                          bodyText, 
                          buttons, 
                          children, 
                          ...props }) => {
    if (bodyText.constructor != Array) {
        bodyText = [bodyText];
    }

    return (
        <Modal
            show={show}
            aria-labelledby="contained-modal-title"
            {...props}
        >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
                {bodyText.map(text => (
                    <p className="text-center">
                        {text}
                    </p>
                ))}
                {children && children}
            </Modal.Body>
    
            <Modal.Footer>
                {buttons}
            </Modal.Footer>
        </Modal>
    )
}

export default ModalComponent;