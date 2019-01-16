import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserComponent from '../../components/Main/User/UserComponent';
import * as Actions from '../../actions/index';
import UserItem from '../../components/Main/User/UserItem';
import CommonModal from '../../utils/commons/Modal/CommonModal';
import Modal from '../../models/Modal';
import UserInfo from '../../models/User/UserInfo';
import * as Commons from '../../utils/commons/index';
import * as nemTransaction from '../../utils/NEM-infrastructure/TransactionHttp';
import * as Messages from '../../contants/Messages';
import * as _ from 'lodash';
import UserBlockchain from '../../models/User/UserBlockchain';
import PaginationInput from '../../models/PaginationInput';
import * as Constants from '../../contants';
import * as ActionTypes from 'src/contants/ActionTypes';

class UserContainer extends Component<any, any> {

    childUserItems: any = [];
    childUserComponent: any = {};

    constructor(props: any) {
        super(props);

        this.state = {
            currentPage: 1,
            listUser: []
        }

        this.childUserComponent = React.createRef();
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
                    message={this.props.userBlockchain.message}
                    sendMultiToBlockchain={this.sendMultiToBlockchain.bind(this)}
                    listUser={this.state.listUser}
                    checkedAll={this.checkedAll.bind(this)}
                    ref={this.childUserComponent}
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
                        findUserBlockchainById={this.props.findUserBlockchainById}
                        userBlockchain={this.props.userBlockchain}
                        openModal={this.openModal.bind(this)}
                        onChangedListUser={this.onChangedListUser.bind(this)}
                        ref={input => this.childUserItems[index] = input}
                    />
                )
            });
        }

        return result;
    }

    async onChangedListUser(user: UserInfo, isAdding: boolean) {
        if (isAdding) {
            let listUser = [...this.state.listUser];
            let index = await this.findUserInList(listUser, user);

            if (index === -1) {
                await this.setState({ listUser: [...this.state.listUser, user] });
            }
        } else {
            let listUser = [...this.state.listUser];
            let index = await this.findUserInList(listUser, user);

            if (index !== -1) {
                listUser.splice(index, 1);
                await this.setState({ listUser: listUser });
            }
        }
    }

    findUserInList(listUser: Array<UserInfo>, user: UserInfo) {
        let index = -1;

        if (listUser.length > 0) {
            for (let i = 0; i < listUser.length; i++) {
                if (listUser[i].id === user.id) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    findUserInItems(childUserItems: Array<any>, user: UserInfo) {
        let index = -1;

        if (childUserItems.length > 0) {
            for (let i = 0; i < childUserItems.length; i++) {
                if (childUserItems[i].props.user.id === user.id) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    async sendMultiToBlockchain(listUser: Array<UserInfo>) {
        if (listUser) {
            if (listUser.length > 0) {
                for (let i = 0; i < listUser.length; i++) {
                    await nemTransaction.submitTransaction(Commons.hashData(listUser[i]), ActionTypes.ADD_USER_BLOCK_CHAIN, listUser[i], this.callBackSubmitTransactionSuccess.bind(this));
                }
            } else {
                this.props.checkValidOfData(Messages.EMPTY_LIST);
            }
        } else {
            this.props.checkValidOfData(Messages.EMPTY_LIST);
        }
    }

    async onPageChanged(index: number) {
        const paginationInput = new PaginationInput(
            index,
            Constants.DEFAULT_ITEMS_PER_PAGE
        );

        this.props.resetUserBlockchain();
        await this.props.fetchAllUsers(paginationInput);

        if (this.childUserComponent) {
            this.childUserComponent.current.refs.checkboxAll.checked = false;
        }

        for (let i = 0; i < this.childUserItems.length; i++) {
            if (this.childUserItems[i]) {
                await this.childUserItems[i].unChecked(i, true);
            }
        }

        await this.setState({ currentPage: index, listUser: [] });
    }

    async checkedAll(e: any) {

        if (e.target.checked) {
            for (let i = 0; i < this.childUserItems.length; i++) {
                if (this.childUserItems[i] && !this.childUserItems[i].props.user.isExistedOnNem) {
                    await this.childUserItems[i].unChecked(i, false);

                    let userInfo: UserInfo = new UserInfo(
                        this.childUserItems[i].props.user.id,
                        this.childUserItems[i].props.user.fullName,
                        this.childUserItems[i].props.user.userName,
                        this.childUserItems[i].props.user.email,
                        this.childUserItems[i].props.user.address
                    );

                    await this.onChangedListUser(userInfo, true);
                }
            }
        } else {
            for (let i = 0; i < this.childUserItems.length; i++) {
                if (this.childUserItems[i]) {
                    await this.childUserItems[i].unChecked(i, true);

                    let userInfo: UserInfo = new UserInfo(
                        this.childUserItems[i].props.user.id,
                        this.childUserItems[i].props.user.fullName,
                        this.childUserItems[i].props.user.userName,
                        this.childUserItems[i].props.user.email,
                        this.childUserItems[i].props.user.address
                    );

                    await this.onChangedListUser(userInfo, false);
                }
            }
        }
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

        let userInfo: UserInfo = new UserInfo(
            data.id,
            data.fullName,
            data.userName,
            data.email,
            data.address
        );

        let modal = new Modal(true);
        modal.data = userInfo;
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
                {/* <div className="mb-1">
                    <strong>Longitude:</strong>
                    <div className="d-inline ml-1">{data.longitude}</div>
                </div>
                <div className="mb-1">
                    <strong>Latitude:</strong>
                    <div className="d-inline ml-1">{data.latitude}</div>
                </div> */}
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
                    <button className="btn btn-primary waves-effect waves-light m-0"
                        onClick={() => Commons.checkDataHasChanged(this.props.userBlockchain.data.TransactionHash, Commons.hashData(data), this.callBackCheckDataHasChanged.bind(this))}
                    >
                        Check Data
                    </button>
                }
                {_.isNil(this.props.userBlockchain.data) || _.isEmpty(this.props.userBlockchain.data) &&
                    <button className="btn btn-primary waves-effect waves-light m-0"
                        onClick={() => nemTransaction.submitTransaction(Commons.hashData(data), ActionTypes.ADD_USER_BLOCK_CHAIN, data, this.callBackSubmitTransactionSuccess.bind(this))}
                    >
                        Send To Block
                    </button>
                }
            </>
        );
    }

    async callBackSubmitTransactionSuccess(userBlockchain: UserBlockchain, userInfo: UserInfo) {

        await this.props.addUserBlockchain(userBlockchain);

        const paginationInput = new PaginationInput(
            this.state.currentPage,
            Constants.DEFAULT_ITEMS_PER_PAGE
        );

        await this.props.fetchAllUsers(paginationInput);

        let index = await this.findUserInItems(this.childUserItems, userInfo);
        await this.childUserItems[index].unChecked(index, true);

        this.onChangedListUser(userInfo, false);

        if (this.childUserComponent) {
            this.childUserComponent.current.refs.checkboxAll.checked = false;
        }
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