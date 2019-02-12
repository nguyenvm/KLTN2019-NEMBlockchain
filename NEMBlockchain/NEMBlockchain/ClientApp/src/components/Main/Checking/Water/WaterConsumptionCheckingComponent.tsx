import React, { Component } from 'react';
import * as Messages from 'src/contants/Messages';
import * as Commons from 'src/utils/commons';
import * as _ from 'lodash'
import UserInfo from 'src/models/User/UserInfo';
import WaterConsumptionDetail from 'src/models/Water/WaterConsumptionDetail';

class WaterConsumptionCheckingComponent extends Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            txtUser: '',
            txtVolume: '',
            txtDate: '',
            dataHash: '',
            selectOptions: [],
            key: 0,
            valueSelectOptions: []
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
                                Checking Water Consumption
                            </div>
                            {/* <!--/Header--> */}
                            {/* <!--Content--> */}
                            <div className="card-block">
                                <div className="md-form mb-3">
                                    <input
                                        type="text"
                                        name="txtUser"
                                        id="form1"
                                        className="form-control"
                                        onChange={() => this.onChanged(event)}
                                        onFocus={() => this.onFocused()}
                                    />
                                    <label htmlFor="form1" data-error="wrong" data-success="right">Type your user name or email</label>
                                </div>

                                {this.showSelectOption(0, true)}
                                {this.state.selectOptions}

                                <div className="mb-3">
                                    <input
                                        placeholder="yyyy-MM-dd"
                                        type="date"
                                        name="txtDate"
                                        id="form3"
                                        className="form-control validate"
                                        onChange={() => this.onChanged(event)}
                                        onFocus={() => this.onFocused()}
                                    />
                                </div>
                                <div className="row-fluid">
                                    {this.props.waterChecking.data && this.props.waterChecking.message === Messages.DATA_VALID &&
                                        <>
                                            <p className="text-success"><span className="text-dark">Hash of Data:</span> {this.state.dataHash}</p>
                                            <p className="text-success"><span className="text-dark">Transaction ID:</span> {this.props.waterChecking.data.TransactionHash}</p>
                                        </>
                                    }
                                </div>
                                <div className="text-right">
                                    {this.props.waterChecking.data && this.props.waterChecking.message === Messages.DATA_VALID &&
                                        <p className="text-primary">Data is valid</p>
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

    showSelectOption(e: number, hidden: boolean) {
        return (
            <div className="md-form mb-4 row-fluid" key={e}>
                <select className="browser-default custom-select col-md-4 mt-1 mr-2" onChange={() => this.handleChange(e, event)}>
                    <option value="">Open this select funiture name</option>
                    <option value="Shower">Shower</option>
                    <option value="Tap">Tap</option>
                    <option value="Clothes washer">Clothes washer</option>
                    <option value="Dishwasher">Dishwasher</option>
                    <option value="Toilet">Toilet</option>
                    <option value="Bathtub">Bathtub</option>
                    <option value="Irrigation">Irrigation</option>
                    <option value="Evap cooler">Evap cooler</option>
                    <option value="Leak">Leak</option>
                    <option value="Other">Other</option>
                </select>
                <div className="col-md-6 p-0 mr-2">
                    <input
                        type="number"
                        step="any"
                        name="txtVolume"
                        id={`form${e + 4}`}
                        className="form-control validate"
                        onChange={() => this.onSelectOptionInputChanged(e, event)}
                        onFocus={() => this.onFocused()}
                    />
                    <label htmlFor={`form${e + 4}`} data-error="wrong" data-success="right">Type your total volume (L) of date</label>
                </div>
                <i className="fa fa-plus-circle fa-2x mr-1 mt-1" aria-hidden="true" onClick={() => this.addSelectOptions()}></i>
                <i className="fa fa-minus-circle fa-2x" aria-hidden="true" hidden={hidden} onClick={() => this.removeSelectOptions(e)}></i>
            </div>
        );
    }

    async handleChange(e: number, event: any) {
        let elementSelectOption = this.state.valueSelectOptions.filter((valueSelectOption: any) => valueSelectOption.key == e);

        if (_.isEmpty(elementSelectOption)) {
            await this.setState({ valueSelectOptions: [...this.state.valueSelectOptions, { key: `${e}`, txtSelectOption: `${event.target.value}`, txtInput: '' }] });
        } else {
            elementSelectOption[0].txtSelectOption = event.target.value;
        }
    }

    async onSelectOptionInputChanged(e: number, event: any) {
        let elementInput = this.state.valueSelectOptions.filter((valueSelectOption: any) => valueSelectOption.key == e);

        if (_.isEmpty(elementInput)) {
            await this.setState({ valueSelectOptions: [...this.state.valueSelectOptions, { key: `${e}`, txtSelectOption: '', txtInput: `${event.target.value}` }] });
        } else {
            elementInput[0].txtInput = event.target.value;
        }
    }

    async addSelectOptions() {
        await this.setState({ key: this.state.key + 1 });
        await this.setState({ selectOptions: [...this.state.selectOptions, this.showSelectOption(this.state.key, false)] });
    }

    async removeSelectOptions(e: number) {

        let filterSelectOptions = await this.state.selectOptions.filter((selectOption: JSX.Element) => {
            return selectOption.key != e;
        });

        await this.setState({ selectOptions: [...filterSelectOptions] });

        let arrSelectOption = await this.state.valueSelectOptions.filter((valueSelectOption: any) => valueSelectOption.key != e);
        await this.setState({ valueSelectOptions: [...arrSelectOption] });
    }

    onFocused() {
        this.props.resetWaterBlockchain();
    }

    onChanged(event: any) {

        let target = event.target;
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
            this.state.txtUser,
            this.state.txtUser,
            ''
        );

        await this.props.findUserByInfomation(userInfo);

        if (!_.isNil(this.props.users.paginationResult)) {
            await this.props.findWaterBlockchainById(this.props.users.paginationResult.id, this.state.txtDate);

            let waterConsumptionDetails: Array<WaterConsumptionDetail> = [];
            
            this.state.valueSelectOptions.forEach((valueSelectOption: any) => {
                let waterConsumptionDetail: WaterConsumptionDetail = new WaterConsumptionDetail(
                    this.props.users.paginationResult.id,
                    valueSelectOption.txtSelectOption,
                    Number(valueSelectOption.txtInput),
                    this.state.txtDate
                );

                waterConsumptionDetails.push(waterConsumptionDetail);
            });

            await this.setState({ dataHash: Commons.hashData(waterConsumptionDetails) })
        }

        Commons.checkDataHasChanged(this.props.waterChecking.data.TransactionHash, this.state.dataHash, this.callBackCheckDataHasChanged.bind(this));
    }

    callBackCheckDataHasChanged(isValid?: boolean, isExist?: boolean) {
        if (!_.isNull(isValid)) {
            if (isValid) {
                this.props.checkValidOfWaterData(Messages.DATA_VALID);
            } else {
                this.props.checkValidOfWaterData(Messages.DATA_INVALID);
            }
        } else {
            if (!isExist) {
                this.props.checkValidOfWaterData(Messages.TRANSACTION_HASH_NOT_EXIST_ON_BLOCKCHAIN);
            }
        }
    }
}

export default WaterConsumptionCheckingComponent;