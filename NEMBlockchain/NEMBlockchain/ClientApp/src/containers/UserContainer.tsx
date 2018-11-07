import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserComponent from '../components/Main/User/UserComponent';
import * as Actions from '../actions/index';
import UserItem from '../components/Main/User/UserItem';
import ModalCommon from '../utils/commons/Modal/ModalCommon';
import Modal from '../models/Modal';
import UserInfo from '../models/UserInfo';

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
                <ModalCommon
                    show={this.props.modal.isShow}
                    handleClose={this.closeModal.bind(this)}
                    data={this.props.modal.data}
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
        setDataModal: Actions.actSetDataModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);