import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'src/actions';
import WaterBuyingCheckingComponent from 'src/components/Main/Checking/Water/WaterBuyingCheckingComponent';

class WaterBuyingCheckingContainer extends Component<any, any> {
    render() {
        return (
            <>
                <WaterBuyingCheckingComponent
                    findUserByInfomation={this.props.findUserByInfomation}
                    findWaterBuyingBlockchainById={this.props.findWaterBuyingBlockchainById}
                    checkValidOfWaterBuyingData={this.props.checkValidOfWaterBuyingData}
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
        findWaterBuyingBlockchainById: Actions.actFindWaterBuyingBlockchainByIdRequest,
        checkValidOfWaterBuyingData: Actions.actCheckValidOfWaterBuyingData,
        resetWaterBlockchain: Actions.actResetWaterBlockchain
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(WaterBuyingCheckingContainer);