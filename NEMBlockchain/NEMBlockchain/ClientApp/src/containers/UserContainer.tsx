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
import * as Messages from '../contants/Messages';
import { TransactionHttp } from "nem-library";
import UserBlockchain from "../models/UserBlockchain";

class UserContainer extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isValid: false
        }
    }


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

        this.props.checkExistUserBlockchain(data.id);
        this.props.findUserBlockchainById(data.id);

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
                {this.props.nemBlockchain.message === Messages.INSERT_TRANSACTION_HASH_SUCCESSUL &&
                    <p className="text-success">Data has send to block</p>
                }
                {/* {this.state.isValid && this.props.nemBlockchain.message === Messages.MSG_FIND_USER_SUCCESSFUL &&
                    <p className="text-primary">Data valid</p>
                }
                {!this.state.isValid && this.props.nemBlockchain.message === Messages.MSG_FIND_USER_SUCCESSFUL &&
                    <p className="text-warning">Data has changed</p>
                } */}
                {this.props.nemBlockchain.message === Messages.MSG_FIND_USER_SUCCESSFUL &&
                    <button className="btn btn-primary waves-effect waves-light"
                        onClick={() => this.checkDataHasChanged(this.props.nemBlockchain.data.transactionHash, Commons.hashData(data))}
                    >
                        Check Data
                    </button>
                }
                {this.props.nemBlockchain.message === Messages.MSG_NOT_FOUND_ANY_USER &&
                    <button className="btn btn-primary waves-effect waves-light"
                        onClick={() => nemTransaction.submitTransaction(Commons.hashData(data), data.id, this.callBackSubmitTransactionSuccess)}
                    >
                        Send To Block
                    </button>
                }
            </>
        );
    }

    callBackSubmitTransactionSuccess(userBlockchain: UserBlockchain) {
        this.props.addUserBlockchain(userBlockchain);
        this.props.checkExistUserBlockchain(userBlockchain.Id);
    }

    checkDataHasChanged(transactionHash: string, hexCompare: string) {
        const transactionHttp = new TransactionHttp();

        transactionHttp.getByHash(transactionHash).subscribe((transaction: any) => {
            console.log(transaction);

            let hex = Commons.decodeHexMessageTransaction((transaction as any).message.payload);

            if (hexCompare.toUpperCase() === hex.toUpperCase()) {
                this.setState({ isValid: true });
                console.log('Data Valid');
            } else {
                this.setState({ isValid: false });
                console.log('Data has changed');
            }
        });
    }
}

const mapStateToProps = (state: any) => {
    return {
        users: state.users,
        modal: state.modal,
        nemBlockchain: state.nemBlockchain
    }
}

const mapDispatchToProps = (dispatch: any, props: any) => {
    return bindActionCreators({
        fetchAllUsers: Actions.actFetchUsersRequest,
        openModal: Actions.actShowModal,
        closeModal: Actions.actHideModal,
        setDataModal: Actions.actSetDataModal,
        addUserBlockchain: Actions.actAddUserBlockchainRequest,
        checkExistUserBlockchain: Actions.actCheckExistUserBlockchainRequest,
        findUserBlockchainById: Actions.actFindUserBlockchainByIdRequest
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);