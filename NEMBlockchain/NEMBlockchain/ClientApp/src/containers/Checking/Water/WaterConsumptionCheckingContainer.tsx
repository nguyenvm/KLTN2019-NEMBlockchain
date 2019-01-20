import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'src/actions';
import WaterConsumptionCheckingComponent from 'src/components/Main/Checking/Water/WaterConsumptionCheckingComponent';

class WaterConsumptionCheckingContainer extends Component<any, any> {
    render() {
        return (
            <>
                <WaterConsumptionCheckingComponent
                    findUserByInfomation={this.props.findUserByInfomation}
                    findWaterBlockchainById={this.props.findWaterBlockchainById}
                    checkValidOfWaterData={this.props.checkValidOfWaterData}
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
        findWaterBlockchainById: Actions.actFindWaterBlockchainByIdRequest,
        checkValidOfWaterData: Actions.actCheckValidOfWaterData,
        resetWaterBlockchain: Actions.actResetWaterBlockchain
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(WaterConsumptionCheckingContainer);