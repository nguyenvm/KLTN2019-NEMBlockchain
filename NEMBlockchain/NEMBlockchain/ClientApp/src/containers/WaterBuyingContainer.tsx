import React, { Component } from 'react';
import PaginationInput from 'src/models/PaginationInput';
import * as Constants from '../contants';
import * as Actions from '../actions/index';
import * as Messages from '../contants/Messages';
import * as _ from 'lodash';
import * as Commons from '../utils/commons';
import * as nemTransaction from '../utils/NEM-infrastructure/TransactionHttp';
import * as ActionTypes from 'src/contants/ActionTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WaterBuyingComponent from 'src/components/Main/Water/WaterBuyingComponent';
import WaterBuyingItem from 'src/components/Main/Water/WaterBuyingItem';
import Modal from 'src/models/Modal';
import CommonModal from '../utils/commons/Modal/CommonModal';
import WaterBuying from 'src/models/Water/WaterBuying';
import WaterBuyingBlockchain from 'src/models/Water/WaterBuyingBlockchain';

class WaterBuyingContainer extends Component<any, any> {

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

        this.props.fetchWaterBuying(paginationInput);
    }

    render() {
        var { items } = this.props.water.paginationResult;
        return (
            <>
                <WaterBuyingComponent
                    paginationResult={this.props.water.paginationResult}
                    onPageChange={this.onPageChanged.bind(this)}
                    showPageIndex={this.showPageIndex.bind(this)}
                >
                    {items && this.showWaterBuying(items)}
                </WaterBuyingComponent>
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

    showWaterBuying(waterBuyings: WaterBuying[]): Array<any> {

        let result: any = null;

        if (waterBuyings.length > 0) {
            result = waterBuyings.map((water, index) => {
                return (
                    <WaterBuyingItem
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

    onPageChanged(index: number) {
        this.setState({ currentPage: index });

        const paginationInput = new PaginationInput(
            index,
            Constants.DEFAULT_ITEMS_PER_PAGE
        );

        this.props.fetchWaterBuying(paginationInput);
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
        await this.props.findWaterBuyingBlockchainById(data.buyerId, data.buyTime);

        let modal = new Modal(true);
        modal.data = data;
        this.props.setDataModal(modal);
        this.props.openModal(modal);
    }

    closeModal(): void {
        this.props.resetWaterBuyingBlockchain();

        let modal = new Modal(false);
        this.props.closeModal(modal);
    }

    dataHeader(): string {
        return 'Water Buying Detail';
    }

    dataBody() {
        let data: WaterBuying = this.props.modal.data;
        
        return (
            <>
                <div className="mb-1">
                    <strong>Trade ID:</strong>
                    <div className="d-inline ml-1">{data.tradeId}</div>
                </div>
                <div className="mb-1">
                    <strong>Buyer ID:</strong>
                    <div className="d-inline ml-1">{data.buyerId}</div>
                </div>
                <div className="mb-1">
                    <strong>Total ($SWEG):</strong>
                    <div className="d-inline ml-1">{data.total}</div>
                </div>
                <div className="mb-1">
                    <strong>Buy Time:</strong>
                    <div className="d-inline ml-1">{data.buyTime}</div>
                </div>
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
                        onClick={() => Commons.checkDataHasChanged(this.props.waterBlockchain.data.transactionHash, Commons.hashData(data), this.callBackCheckDataHasChanged.bind(this))}
                    >
                        Check Data
                    </button>
                }
                {_.isNil(this.props.waterBlockchain.data) || _.isEmpty(this.props.waterBlockchain.data) &&
                    <button className="btn btn-primary waves-effect waves-light"
                        onClick={() => nemTransaction.submitTransaction(Commons.hashData(data), ActionTypes.ADD_WATER_BUYING_BLOCK_CHAIN, data, this.callBackSubmitTransactionSuccess.bind(this))}
                    >
                        Send To Block
                    </button>
                }
            </>
        );
    }

    callBackSubmitTransactionSuccess(waterBuyingBlockchain: WaterBuyingBlockchain) {
        this.props.addWaterBuyingBlockchain(waterBuyingBlockchain);
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
        fetchWaterBuying: Actions.actFetchWaterBuyingRequest,
        openModal: Actions.actShowModal,
        closeModal: Actions.actHideModal,
        setDataModal: Actions.actSetDataModal,
        addWaterBuyingBlockchain: Actions.actAddWaterBuyingBlockchainRequest,
        findWaterBuyingBlockchainById: Actions.actFindWaterBuyingBlockchainByIdRequest,
        checkValidOfData: Actions.actCheckValidOfWaterBuyingData,
        resetWaterBuyingBlockchain: Actions.actResetWaterBuyingBlockchain
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WaterBuyingContainer);