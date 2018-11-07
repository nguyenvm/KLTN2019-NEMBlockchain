import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class ModalCommon extends Component<any, any> {
    render() {
        var { data } = this.props;
        
        return (
            <>
                <Modal
                    show={this.props.show || false}
                    onHide={this.props.handleClose}
                    bsSize="small"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>User Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-1">
                            <strong>ID:</strong>
                            <div className="d-inline ml-1">{data.id}</div>
                        </div>
                        <div className="mb-1">
                            <strong>Full Name:</strong>
                            <div className="d-inline ml-1">{data.fullName}</div>
                        </div>
                        <div className="mb-1">
                            <strong>Address:</strong>
                            <div className="d-inline ml-1">{data.address}</div>
                        </div>
                        <div className="mb-1">
                            <strong>Water SupplierID:</strong>
                            <div className="d-inline ml-1">{data.waterSupplierId}</div>
                        </div>
                        <div className="mb-1">
                            <strong>Create Date:</strong>
                            <div className="d-inline ml-1">{data.createDate}</div>
                        </div>
                        <div className="mb-1">
                            <strong>Latitude:</strong>
                            <div className="d-inline ml-1">{data.latitude}</div>
                        </div>
                        <div className="mb-1">
                            <strong>Longitude:</strong>
                            <div className="d-inline ml-1">{data.longitude}</div>
                        </div>
                        <div className="mb-1">
                            <strong>Gender:</strong>
                            <div className="d-inline ml-1">{data.gender || 'null'}</div>
                        </div>
                        <div className="mb-1">
                            <strong>Phone Number:</strong>
                            <div className="d-inline ml-1">{data.phoneNumber || 'null'}</div>
                        </div>
                        <div className="mb-1">
                            <strong>Coin:</strong>
                            <div className="d-inline ml-1">{data.coin}</div>
                        </div>
                        <div className="mb-1">
                            <strong>Account Type:</strong>
                            <div className="d-inline ml-1">{data.accountType || 'null'}</div>
                        </div>
                        <div className="mb-1">
                            <strong>Is Active:</strong>
                            <div className="d-inline ml-1">{data.isActive || 'false'}</div>
                        </div>
                        <div className="mb-1">
                            <strong>Pending Status:</strong>
                            <div className="d-inline ml-1">{data.pendingStatus || 'false'}</div>
                        </div>
                        <div className="mb-1">
                            <strong>Serial Number:</strong>
                            <div className="d-inline ml-1">{data.serialNumber || 'null'}</div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary waves-effect waves-light" onClick={this.props.handleClose}>
                            Close
                        </button>
                        <button className="btn btn-primary waves-effect waves-light" onClick={this.props.handleClose}>
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ModalCommon;