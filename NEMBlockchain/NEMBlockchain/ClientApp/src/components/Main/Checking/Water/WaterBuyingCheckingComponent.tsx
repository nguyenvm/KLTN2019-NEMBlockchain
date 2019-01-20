import React, { Component } from 'react';
import * as _ from 'lodash';
import * as Commons from 'src/utils/commons';
import * as Messages from 'src/contants/Messages';
import WaterBuying from 'src/models/Water/WaterBuying';
import UserInfo from 'src/models/User/UserInfo';

class WaterBuyingCheckingComponent extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            txtBuyerId: '',
            txtTradeId: '',
            txtTotal: '',
            txtBuyTime: '',
            dataHash: ''
        }
    }

    render() {
        return (
            <div className="container">
                <div className="tab-content">
                    <div className="col-lg-12 col-md-12">
                        {/* <!--Card--> */}
                        <div className="card">
                            {/* <!--Header--> */}
                            <div className="card-header danger-color-dark white-text text-sm-center">
                                Checking Water Buying Activity Data
                            </div>
                            {/* <!--/Header--> */}
                            {/* <!--Content--> */}
                            <div className="card-block">
                                <div className="md-form mb-3">
                                    <input
                                        type="text"
                                        name="txtBuyerId"
                                        id="form1"
                                        className="form-control"
                                        onChange={() => this.onChanged(event)}
                                        onFocus={() => this.onFocused(event)}
                                    />
                                    <label htmlFor="form1" data-error="wrong" data-success="right">Type your username or email</label>
                                </div>
                                <div className="md-form mb-3">
                                    <input
                                        type="text"
                                        name="txtTradeId"
                                        id="form2"
                                        className="form-control"
                                        onChange={() => this.onChanged(event)}
                                        onFocus={() => this.onFocused(event)}
                                    />
                                    <label htmlFor="form2" data-error="wrong" data-success="right">Type your trader id</label>
                                </div>
                                <div className="md-form mb-3">
                                    <input
                                        type="number"
                                        name="txtTotal"
                                        id="form3"
                                        className="form-control validate"
                                        onChange={() => this.onChanged(event)}
                                        onFocus={() => this.onFocused(event)}
                                    />
                                    <label htmlFor="form3" data-error="wrong" data-success="right">Type your total ($SWEG)</label>
                                </div>
                                <div className="md-form mb-3">
                                    <input
                                        type="text"
                                        name="txtBuyTime"
                                        // placeholder="yyyy-MM-dd HH:mm:ss.fff"
                                        id="form4"
                                        className="form-control"
                                        onChange={() => this.onChanged(event)}
                                        onFocus={() => this.onFocused(event)}
                                    />
                                    <label htmlFor="form4" data-error="wrong" data-success="right">Buy Time: yyyy-MM-dd HH:mm:ss.fff</label>
                                </div>
                                <div className="row-fluid">
                                    {this.props.waterChecking.data && this.props.waterChecking.message === Messages.DATA_VALID &&
                                        <>
                                            <p className="text-success"><span className="text-dark">Hash of Data:</span> {this.state.dataHash}</p>
                                            <p className="text-success"><span className="text-dark">Transaction ID:</span> {this.props.waterChecking.data.transactionHash}</p>
                                        </>
                                    }
                                </div>
                                <div className="text-right">
                                    {this.props.waterChecking.data && this.props.waterChecking.message === Messages.DATA_VALID &&
                                        <p className="text-primary">Data valid</p>
                                    }
                                    {this.props.waterChecking.data && this.props.waterChecking.message === Messages.DATA_INVALID &&
                                        <p className="text-warning">Data has changed</p>
                                    }
                                    {this.props.waterChecking.data && this.props.waterChecking.message === Messages.TRANSACTION_HASH_NOT_EXIST_ON_BLOCKCHAIN &&
                                        <p className="text-warning">Transaction hash not exist on blockchain</p>
                                    }
                                    <button
                                        className="btn btn-primary waves-effect waves-light m-0"
                                        onClick={this.checkingData.bind(this)}
                                    >
                                        Checking
                                    </button>
                                </div>
                            </div>
                            {/* <!--/Content--> */}
                        </div>
                        {/* <!--/Card--> */}
                        <hr />
                    </div>
                </div>
            </div>
        );
    }

    onFocused(e: any) {
        this.props.resetWaterBlockchain();
    }

    onChanged(e: any) {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        
        this.setState({
            [name]: value
        });
    }

    async checkingData() {

        let userInfo: UserInfo = new UserInfo(
            '',
            '',
            this.state.txtBuyerId,
            this.state.txtBuyerId,
            ''
        );

        await this.props.findUserByInfomation(userInfo);

        if (!_.isNil(this.props.users.paginationResult)) {
            let waterBuying: WaterBuying = new WaterBuying(
                this.state.txtTradeId,
                this.props.users.paginationResult.id,
                Number(this.state.txtTotal),
                this.state.txtBuyTime
            );
            
            await this.setState({ dataHash: Commons.hashData(waterBuying) })
            await this.props.findWaterBuyingBlockchainById(this.props.users.paginationResult.id, this.state.txtBuyTime);
        }


        Commons.checkDataHasChanged(this.props.waterChecking.data.transactionHash, this.state.dataHash, this.callBackCheckDataHasChanged.bind(this))
    }

    callBackCheckDataHasChanged(isValid?: boolean, isExist?: boolean) {
        if (!_.isNull(isValid)) {
            if (isValid) {
                this.props.checkValidOfWaterBuyingData(Messages.DATA_VALID);
            } else {
                this.props.checkValidOfWaterBuyingData(Messages.DATA_INVALID);
            }
        } else {
            if (!isExist) {
                this.props.checkValidOfWaterBuyingData(Messages.TRANSACTION_HASH_NOT_EXIST_ON_BLOCKCHAIN);
            }
        }
    }
}

export default WaterBuyingCheckingComponent;