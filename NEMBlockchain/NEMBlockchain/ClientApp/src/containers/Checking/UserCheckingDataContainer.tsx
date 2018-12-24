import React, { Component } from 'react';
import UserCheckingDataComponent from 'src/components/Main/Checking/UserCheckingDataComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'src/actions';

class UserCheckingDataContainer extends Component<any, any> {
    render() {
        return (
            <>
                <UserCheckingDataComponent
                    findUserByInfomation={this.props.findUserByInfomation}
                    findUserBlockchainById={this.props.findUserBlockchainById}
                    checkValidOfUserData={this.props.checkValidOfUserData}
                    resetUserBlockchain={this.props.resetUserBlockchain}
                    users={this.props.users}
                    userBlockchain={this.props.userBlockchain}
                />
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        users: state.users,
        userBlockchain: state.userBlockchain
    }
}

const mapDispatchToProps = (dispatch: any, props: any) => {
    return bindActionCreators({
        findUserByInfomation: Actions.actFindUserByInfomationRequest,
        findUserBlockchainById: Actions.actFindUserBlockchainByIdRequest,
        checkValidOfUserData: Actions.actCheckValidOfUserData,
        resetUserBlockchain: Actions.actResetUserBlockchain
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(UserCheckingDataContainer);