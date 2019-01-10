import React, { Component } from 'react';
import PaginationInput from 'src/models/PaginationInput';
import * as Constants from '../../contants';
import * as Actions from '../../actions/index';
import * as Messages from '../../contants/Messages';
import * as _ from 'lodash';
import * as Commons from '../../utils/commons';
import * as nemTransaction from '../../utils/NEM-infrastructure/TransactionHttp';
import * as ActionTypes from 'src/contants/ActionTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WaterComponent from 'src/components/Main/Water/WaterComponent';
import WaterItem from 'src/components/Main/Water/WaterItem';
import WaterConsumptionTotal from 'src/models/Water/WaterConsumptionTotal';
import Modal from 'src/models/Modal';
import CommonModal from '../../utils/commons/Modal/CommonModal';
import WaterConsumptionDetail from 'src/models/Water/WaterConsumptionDetail';
import WaterBlockchain from 'src/models/Water/WaterBlockchain';

class WaterContainer extends Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            currentPage: 1,
            isSearch: false,
            date: ''
        }
    }

    componentDidMount() {
        const paginationInput = new PaginationInput(
            Constants.DEFAULT_PAGE_INDEX,
            Constants.DEFAULT_ITEMS_PER_PAGE
        );

        this.props.fetchWaterConsumption(paginationInput);
    }

    render() {
        var { items } = this.props.water.paginationResult;
        return (
            <>
                <WaterComponent
                    paginationResult={this.props.water.paginationResult}
                    onPageChange={this.onPageChanged.bind(this)}
                    showPageIndex={this.showPageIndex.bind(this)}
                    fetchWaterConsumptionByDate={this.props.fetchWaterConsumptionByDate}
                    onSearch={this.onSearch.bind(this)}
                >
                    {items && this.showWaterConsumption(items)}
                </WaterComponent>
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

    showWaterConsumption(waterConsumptions: WaterConsumptionTotal[]): Array<any> {

        let result: any = null;

        if (waterConsumptions.length > 0) {
            result = waterConsumptions.map((water, index) => {
                return (
                    <WaterItem
                        key={index}
                        index={index}
                        water={water}
                        openModal={this.openModal.bind(this)}
                    />
                )
            });
        }

        return result;
    }

    onPageChanged(index: number, date: string) {
        
        this.setState({ currentPage: index, date: date });

        if (!this.state.isSearch) {
            const paginationInput = new PaginationInput(
                index,
                Constants.DEFAULT_ITEMS_PER_PAGE
            );

            this.props.fetchWaterConsumption(paginationInput);
        } else {
            const paginationInput = new PaginationInput(
                index,
                Constants.DEFAULT_ITEMS_PER_PAGE,
                date
            );

            this.props.fetchWaterConsumptionByDate(paginationInput);
        }
    }

    onSearch(date: string) {
        if (date) {
            this.setState({ isSearch: true, currentPage: 1, date: date });
        } else {
            this.setState({ isSearch: false, currentPage: 1, date: '' });
        }
    }

    showPageIndex(totalCount: number, date: string) {
        
        let totalPage = Math.ceil(totalCount / Constants.DEFAULT_ITEMS_PER_PAGE);

        let renderIndex = [];

        for (let index = 1; index <= totalPage; index++) {
            renderIndex.push(
                <li key={index} className={'page-item' + (this.state.currentPage === index ? ' active' : '')}>
                    <a className="page-link"
                        onClick={() => this.onPageChanged(index, date)}
                    >
                        {index}
                    </a>
                </li>
            )
        }

        return renderIndex;
    }

    async openModal(data: any): Promise<void> {
        await this.props.findWaterBlockchainById(data.userId, data.logTime);
        await this.props.getConsumptionDetail(data.userId, data.logTime);

        let modal = new Modal(true);
        modal.data = this.props.water.detail;
        this.props.setDataModal(modal);
        this.props.openModal(modal);
    }

    closeModal(): void {
        this.props.resetWaterBlockchain();

        let modal = new Modal(false);
        this.props.closeModal(modal);
    }

    dataHeader(): string {
        return 'Water Consumption Detail';
    }

    dataBody() {
        let data: Array<WaterConsumptionDetail> = this.props.modal.data;

        return (
            <>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User ID</th>
                            <th>Funiture Name</th>
                            <th>Volume (L)</th>
                            <th>Log Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (data.length > 0) && data.map((detail: WaterConsumptionDetail, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td scope="row">{index + 1}</td>
                                        <td>{detail.userId}</td>
                                        <td>{detail.funitureName}</td>
                                        <td>{detail.volume}</td>
                                        <td>{detail.logTime}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </>
        );
    }

    dataFooter() {
        let { data } = this.props.modal;
        
        return (
            <>
                {this.props.waterBlockchain.message === Messages.INSERT_TRANSACTION_HASH_SUCCESS &&
                    <p className="text-success">Data has sent to block</p>
                }
                {this.props.waterBlockchain.message === Messages.INSERT_TRANSACTION_HASH_FAILURE &&
                    <p className="text-warning">Insert failure</p>
                }
                {this.props.waterBlockchain.data && this.props.waterBlockchain.message === Messages.DATA_VALID &&
                    <p className="text-primary">Data valid</p>
                }
                {this.props.waterBlockchain.data && this.props.waterBlockchain.message === Messages.DATA_INVALID &&
                    <p className="text-warning">Data has changed</p>
                }
                {this.props.waterBlockchain.data && this.props.waterBlockchain.message === Messages.TRANSACTION_HASH_NOT_EXIST_ON_BLOCKCHAIN &&
                    <p className="text-warning">Transaction hash not exist on blockchain</p>
                }
                {!_.isNil(this.props.waterBlockchain.data) && !_.isEmpty(this.props.waterBlockchain.data) &&
                    <button className="btn btn-primary waves-effect waves-light"
                        onClick={() => Commons.checkDataHasChanged(this.props.waterBlockchain.data.TransactionHash, Commons.hashData(data), this.callBackCheckDataHasChanged.bind(this))}
                    >
                        Check Data
                    </button>
                }
                {_.isNil(this.props.waterBlockchain.data) || _.isEmpty(this.props.waterBlockchain.data) &&
                    <button className="btn btn-primary waves-effect waves-light"
                        onClick={() => nemTransaction.submitTransaction(Commons.hashData(data), ActionTypes.ADD_WATER_CONSUMPTION_BLOCK_CHAIN, data, this.callBackSubmitTransactionSuccess.bind(this))}
                    >
                        Send To Block
                    </button>
                }
            </>
        );
    }

    async callBackSubmitTransactionSuccess(waterBlockchain: WaterBlockchain) {
        
        await this.props.addWaterBlockchain(waterBlockchain);
        
        if (!this.state.isSearch) {
            const paginationInput = new PaginationInput(
                this.state.currentPage,
                Constants.DEFAULT_ITEMS_PER_PAGE
            );

            this.props.fetchWaterConsumption(paginationInput);
        } else {
            const paginationInput = new PaginationInput(
                this.state.currentPage,
                Constants.DEFAULT_ITEMS_PER_PAGE,
                this.state.date
            );

            this.props.fetchWaterConsumptionByDate(paginationInput);
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
        water: state.water,
        modal: state.modal,
        waterBlockchain: state.waterBlockchain
    }
}

const mapDispatchToProps = (dispatch: any, props: any) => {
    return bindActionCreators({
        fetchWaterConsumption: Actions.actFetchWaterConsumptionRequest,
        fetchWaterConsumptionByDate: Actions.actFetchWaterConsumptionByDateRequest,
        getConsumptionDetail: Actions.actGetWaterConsumptionDetailRequest,
        openModal: Actions.actShowModal,
        closeModal: Actions.actHideModal,
        setDataModal: Actions.actSetDataModal,
        addWaterBlockchain: Actions.actAddWaterBlockchainRequest,
        findWaterBlockchainById: Actions.actFindWaterBlockchainByIdRequest,
        checkValidOfData: Actions.actCheckValidOfWaterData,
        resetWaterBlockchain: Actions.actResetWaterBlockchain
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WaterContainer);