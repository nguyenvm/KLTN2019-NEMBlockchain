import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class ModalCommon extends Component<any, any> {
    render() {
        var { dataHeader, dataBody, dataFooter } = this.props;
        return (
            <>
                <Modal
                    show={this.props.show || false}
                    onHide={this.props.handleClose}
                    bsSize="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{dataHeader()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {dataBody()}
                    </Modal.Body>
                    <Modal.Footer>
                        {dataFooter()}
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ModalCommon;