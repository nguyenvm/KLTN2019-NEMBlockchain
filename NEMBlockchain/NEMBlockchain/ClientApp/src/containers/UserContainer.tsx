import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserComponent from '../components/Main/User/UserComponent';
import * as Actions from '../actions/index';
import UserItem from '../components/Main/User/UserItem';
import CommonModal from '../utils/commons/Modal/CommonModal';
import Modal from '../models/Modal';
import UserInfo from '../models/UserInfo';
import * as Commons from '../utils/commons/index';
import * as nemTransaction from '../utils/NEM-infrastructure/TransactionHttp';
import { TransactionHttp, Account, Transaction, TransferTransaction, TimeWindow, Address, XEM, HexMessage } from "nem-library";
class UserContainer extends Component<any, any> {

    componentDidMount() {
        this.props.fetchAllUsers();
    }

    render() {
        var { users } = this.props;
        return (
            <>
                <UserComponent>
                    {this.showUsers(users)}
                </UserComponent>
                <CommonModal
                    show={this.props.modal.isShow}
                    handleClose={this.closeModal.bind(this)}
                    dataHeader={this.dataHeader.bind(this)}
                    dataBody={this.dataBody.bind(this)}
                    dataFooter={this.dataFooter.bind(this)}
                />
            </>
        );
    }

    showUsers(users: UserInfo): Array<any> {
        let result: any = null;
        result = Object.keys(users).map((key, index) => {
            return (
                <UserItem
                    key={index}
                    index={index}
                    users={users[key]}
                    openModal={this.openModal.bind(this)}
                />
            )
        });
        return result;
    }

    openModal(data: any): void {
        let modal = new Modal(true);
        modal.data = data;
        this.props.setDataModal(modal);
        this.props.openModal(modal);
    }

    closeModal(): void {
        let modal = new Modal(false);
        this.props.closeModal(modal);
    }

    dataHeader(): string {
        return 'User Detail';
    }

    dataBody() {
        let { data } = this.props.modal;
        return (
            <>
                <div className="mb-1">
                    <strong>ID:</strong>
                    <div className="d-inline ml-1">{data.id}</div>
                </div>
                <div className="mb-1">
                    <strong>Full Name:</strong>
                    <div className="d-inline ml-1">{data.fullName}</div>
                </div>
                <div className="mb-1">
                    <strong>User Name:</strong>
                    <div className="d-inline ml-1">{data.userName}</div>
                </div>
                <div className="mb-1">
                    <strong>Email:</strong>
                    <div className="d-inline ml-1">{data.email}</div>
                </div>
                <div className="mb-1">
                    <strong>Address:</strong>
                    <div className="d-inline ml-1">{data.address}</div>
                </div>
                <div className="mb-1">
                    <strong>Longitude:</strong>
                    <div className="d-inline ml-1">{data.longitude}</div>
                </div>
                <div className="mb-1">
                    <strong>Latitude:</strong>
                    <div className="d-inline ml-1">{data.latitude}</div>
                </div>
            </>
        );
    }

    dataFooter() {
        let { data } = this.props.modal;
        return (
            <>
                <button className="btn btn-primary waves-effect waves-light" onClick={() => this.checkDataHasChanged('847e37504b89ea3e9cfee70b1d3ab795b1c0550c1fd054a1fe0110d612a33160', Commons.hashData(data))}>
                    Check Data
                </button>
                <button className="btn btn-primary waves-effect waves-light" onClick={() => nemTransaction.submitTransaction(Commons.hashData(data), data.id, this.props.addUserBlockchain)}>
                    Send To Block
                </button>
            </>
        );
    }

    checkDataHasChanged(transactionHash: string, hexCompare: string) {
        const transactionHttp = new TransactionHttp();
        transactionHttp.getByHash(transactionHash).subscribe(transaction => {
            console.log(transaction);
            let hex = Commons.decodeHexMessageTransaction((transaction as any).message.payload);
            if (hexCompare.toUpperCase() === hex.toUpperCase()) {
                console.log('Data Valid');
            } else {
                console.log('Data has changed');
            }
        });
    }
}

const mapStateToProps = (state: any) => {
    return {
        users: state.users,
        modal: state.modal
    }
}

const mapDispatchToProps = (dispatch: any, props: any) => {
    return bindActionCreators({
        fetchAllUsers: Actions.actFetchUsersRequest,
        openModal: Actions.actShowModal,
        closeModal: Actions.actHideModal,
        setDataModal: Actions.actSetDataModal,
        addUserBlockchain: Actions.actAddUserBlockchainRequest
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);