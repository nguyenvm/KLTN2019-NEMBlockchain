import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'src/actions';
import WaterSellingCheckingComponent from 'src/components/Main/Checking/Water/WaterSellingCheckingComponent';

class WaterSellingCheckingContainer extends Component<any, any> {
    render() {
        return (
            <>
                <WaterSellingCheckingComponent
                    findUserByInfomation={this.props.findUserByInfomation}
                    findWaterSellingBlockchainById={this.props.findWaterSellingBlockchainById}
                    checkValidOfWaterSellingData={this.props.checkValidOfWaterSellingData}
                    resetWaterBlockchain={this.props.resetWaterBlockchain}
                    users={this.props.users}
                    water={this.props.water}
                    waterChecking={this.props.waterChecking}
                />
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        users: state.users,
        water: state.water,
        waterChecking: state.waterChecking
    }
}

const mapDispatchToProps = (dispatch: any, props: any) => {
    return bindActionCreators({
        findUserByInfomation: Actions.actFindUserByInfomationRequest,
        findWaterSellingBlockchainById: Actions.actFindWaterSellingBlockchainByIdRequest,
        checkValidOfWaterSellingData: Actions.actCheckValidOfWaterSellingData,
        resetWaterBlockchain: Actions.actResetWaterBlockchain
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(WaterSellingCheckingContainer);