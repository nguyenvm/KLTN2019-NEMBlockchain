import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserComponent from '../components/Main/User/UserComponent';
import * as Actions from '../actions/index';
import UserItem from '../components/Main/User/UserItem';
import CommonModal from '../utils/commons/Modal/CommonModal';
import Modal from '../models/Modal';
import UserInfo from '../models/User/UserInfo';
import * as Commons from '../utils/commons/index';
import * as nemTransaction from '../utils/NEM-infrastructure/TransactionHttp';
import * as Messages from '../contants/Messages';
import * as _ from 'lodash';
import UserBlockchain from '../models/User/UserBlockchain';
import PaginationInput from '../models/PaginationInput';
import * as Constants from '../contants';
import * as ActionTypes from 'src/contants/ActionTypes';

class UserContainer extends Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            currentPage: 1
        }
    }


    componentDidMount() {
        const paginationInput = new PaginationInput(
            Constants.DEFAULT_PAGE_INDEX,
            Constants.DEFAULT_ITEMS_PER_PAGE
        );

        this.props.fetchAllUsers(paginationInput);
    }

    render() {
        var { items } = this.props.users.paginationResult;
        return (
            <>
                <UserComponent
                    paginationResult={this.props.users.paginationResult}
                    onPageChange={this.onPageChanged.bind(this)}
                    showPageIndex={this.showPageIndex.bind(this)}
                >
                    {items && this.showUsers(items)}
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

    showUsers(users: UserInfo[]): Array<any> {

        let result: any = null;

        if (users.length > 0) {
            result = users.map((user, index) => {
                return (
                    <UserItem
                        key={index}
                        index={index}
                        user={user}
                        openModal={this.openModal.bind(this)}
                    />
                )
            });
        }
        
        return result;
    }

    onPageChanged(index: number) {
        this.setState({ currentPage: index });

        const paginationInput = new PaginationInput(
            index,
            Constants.DEFAULT_ITEMS_PER_PAGE
        );

        this.props.fetchAllUsers(paginationInput);
    }

    showPageIndex(totalCount: number) {
        let totalPage = Math.ceil(totalCount / Constants.DEFAULT_ITEMS_PER_PAGE);

        let renderIndex = [];

        for (let index = 1; index <= totalPage; index++) {
            renderIndex.push(
                <li key={index} className={'page-item' + (this.state.currentPage === index ? ' active' : '')}>
                    <a className="page-link"
                        onClick={() => this.onPageChanged(index)}
                    >
                        {index}
                    </a>
                </li>
            )
        }

        return renderIndex;
    }

    async openModal(data: any): Promise<void> {
        await this.props.findUserBlockchainById(data.id);

        let modal = new Modal(true);
        modal.data = data;
        this.props.setDataModal(modal);
        this.props.openModal(modal);
    }

    closeModal(): void {
        this.props.resetUserBlockchain();

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
                {this.props.userBlockchain.message === Messages.INSERT_TRANSACTION_HASH_SUCCESS &&
                    <p className="text-success">Data has sent to block</p>
                }
                {this.props.userBlockchain.message === Messages.INSERT_TRANSACTION_HASH_FAILURE &&
                    <p className="text-warning">Insert failure</p>
                }
                {this.props.userBlockchain.data && this.props.userBlockchain.message === Messages.DATA_VALID &&
                    <p className="text-primary">Data valid</p>
                }
                {this.props.userBlockchain.data && this.props.userBlockchain.message === Messages.DATA_INVALID &&
                    <p className="text-warning">Data has changed</p>
                }
                {this.props.userBlockchain.data && this.props.userBlockchain.message === Messages.TRANSACTION_HASH_NOT_EXIST_ON_BLOCKCHAIN &&
                    <p className="text-warning">Transaction hash not exist on blockchain</p>
                }
                {!_.isNil(this.props.userBlockchain.data) && !_.isEmpty(this.props.userBlockchain.data) &&
                    <button className="btn btn-primary waves-effect waves-light"
                    onClick={() => Commons.checkDataHasChanged(this.props.userBlockchain.data.TransactionHash, Commons.hashData(data), this.callBackCheckDataHasChanged.bind(this))}
                    >
                        Check Data
                    </button>
                }
                {_.isNil(this.props.userBlockchain.data) || _.isEmpty(this.props.userBlockchain.data) &&
                    <button className="btn btn-primary waves-effect waves-light"
                        onClick={() => nemTransaction.submitTransaction(Commons.hashData(data), ActionTypes.ADD_USER_BLOCK_CHAIN, data, this.callBackSubmitTransactionSuccess.bind(this))}
                    >
                        Send To Block
                        </button>
                }
            </>
        );
    }

    callBackSubmitTransactionSuccess(userBlockchain: UserBlockchain) {
        this.props.addUserBlockchain(userBlockchain);
    }

    callBackCheckDataHasChanged(isValid?: boolean, isExist?: boolean) {
        if (!_.isNull(isValid)) {
            if (isValid) {
                this.props.checkValidOfData(Messages.DATA_VALID);
            } else {
                this.props.checkValidOfData(Messages.DATA_INVALID);
            }
        } else {
            if (!isExist) {
                this.props.checkValidOfData(Messages.TRANSACTION_HASH_NOT_EXIST_ON_BLOCKCHAIN);
            }
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        users: state.users,
        modal: state.modal,
        userBlockchain: state.userBlockchain
    }
}

const mapDispatchToProps = (dispatch: any, props: any) => {
    return bindActionCreators({
        fetchAllUsers: Actions.actFetchUsersRequest,
        openModal: Actions.actShowModal,
        closeModal: Actions.actHideModal,
        setDataModal: Actions.actSetDataModal,
        addUserBlockchain: Actions.actAddUserBlockchainRequest,
        findUserBlockchainById: Actions.actFindUserBlockchainByIdRequest,
        checkValidOfData: Actions.actCheckValidOfUserData,
        resetUserBlockchain: Actions.actResetUserBlockchain
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);