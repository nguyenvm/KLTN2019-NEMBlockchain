import React, { Component } from 'react';
import PaginationInput from 'src/models/PaginationInput';
import * as Constants from '../../../contants';
import * as Actions from '../../../actions/index';
import * as Messages from '../../../contants/Messages';
import * as _ from 'lodash';
import * as Commons from '../../../utils/commons';
import * as nemTransaction from '../../../utils/NEM-infrastructure/TransactionHttp';
import * as ActionTypes from 'src/contants/ActionTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WaterSellingComponent from 'src/components/Main/Water/Selling/WaterSellingComponent';
import WaterSellingItem from 'src/components/Main/Water/Selling/WaterSellingItem';
import Modal from 'src/models/Modal';
import CommonModal from '../../../utils/commons/Modal/CommonModal';
import WaterSelling from 'src/models/Water/WaterSelling';
import WaterSellingBlockchain from 'src/models/Water/WaterSellingBlockchain';

class WaterSellingContainer extends Component<any, any> {

    childWaterSellingItems: any = [];
    childWaterSellingComponent: any = {};

    constructor(props: any) {
        super(props);

        this.state = {
            currentPage: 1,
            isSearch: false,
            date: '',
            listSelling: []
        }

        this.childWaterSellingComponent = React.createRef();
    }

    componentDidMount() {
        const paginationInput = new PaginationInput(
            Constants.DEFAULT_PAGE_INDEX,
            Constants.DEFAULT_ITEMS_PER_PAGE
        );

        this.props.fetchWaterSelling(paginationInput);
    }

    render() {
        var { items } = this.props.water.paginationResult;
        return (
            <>
                <WaterSellingComponent
                    paginationResult={this.props.water.paginationResult}
                    onPageChange={this.onPageChanged.bind(this)}
                    showPageIndex={this.showPageIndex.bind(this)}
                    fetchWaterSellingByDate={this.props.fetchWaterSellingByDate}
                    onSearch={this.onSearch.bind(this)}
                    message={this.props.waterBlockchain.message}
                    sendMultiToBlockchain={this.sendMultiToBlockchain.bind(this)}
                    listSelling={this.state.listSelling}
                    checkedAll={this.checkedAll.bind(this)}
                    ref={this.childWaterSellingComponent}
                >
                    {items && this.showWaterSelling(items)}
                </WaterSellingComponent>
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

    showWaterSelling(waterSellings: WaterSelling[]): Array<any> {

        let result: any = null;

        if (waterSellings.length > 0) {
            result = waterSellings.map((water, index) => {
                return (
                    <WaterSellingItem
                        key={index}
                        index={index}
                        water={water}
                        openModal={this.openModal.bind(this)}
                        onChangedListSelling={this.onChangedListSelling.bind(this)}
                        ref={input => this.childWaterSellingItems[index] = input}
                    />
                )
            });
        }

        return result;
    }

    async onChangedListSelling(water: WaterSelling, isAdding: boolean) {
        if (isAdding) {
            let listSelling = [...this.state.listSelling];
            let index = await this.findWaterInList(listSelling, water);

            if (index === -1) {
                await this.setState({ listSelling: [...this.state.listSelling, water] });
            }
        } else {
            let listSelling = [...this.state.listSelling];
            let index = await this.findWaterInList(listSelling, water);

            if (index !== -1) {
                listSelling.splice(index, 1);
                await this.setState({ listSelling: listSelling });
            }
        }
    }

    findWaterInList(listSelling: Array<WaterSelling>, water: WaterSelling) {
        let index = -1;

        if (listSelling.length > 0) {
            for (let i = 0; i < listSelling.length; i++) {
                if (listSelling[i].sellerId === water.sellerId && listSelling[i].sellTime === water.sellTime) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    findWaterInItems(childWaterSellingItems: Array<any>, water: WaterSelling) {
        let index = -1;

        if (childWaterSellingItems.length > 0) {
            for (let i = 0; i < childWaterSellingItems.length; i++) {
                if (childWaterSellingItems[i].props.water.sellerId === water.sellerId && childWaterSellingItems[i].props.water.sellTime === water.sellTime) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    async sendMultiToBlockchain(listWater: Array<WaterSelling>) {
        if (listWater) {
            if (listWater.length > 0) {
                for (let i = 0; i < listWater.length; i++) {
                    await nemTransaction.submitTransaction(Commons.hashData(listWater[i]), ActionTypes.ADD_WATER_SELLING_BLOCK_CHAIN, listWater[i], this.callBackSubmitTransactionSuccess.bind(this));
                }
            } else {
                this.props.checkValidOfData(Messages.EMPTY_LIST);
            }
        } else {
            this.props.checkValidOfData(Messages.EMPTY_LIST);
        }
    }

    async onPageChanged(index: number, date: string) {

        this.setState({ currentPage: index, date: date, listSelling: [] });

        if (!this.state.isSearch) {
            const paginationInput = new PaginationInput(
                index,
                Constants.DEFAULT_ITEMS_PER_PAGE
            );

            await this.props.fetchWaterSelling(paginationInput);
        } else {
            const paginationInput = new PaginationInput(
                index,
                Constants.DEFAULT_ITEMS_PER_PAGE,
                date
            );

            await this.props.fetchWaterSellingByDate(paginationInput);
        }

        if (this.childWaterSellingComponent) {
            this.childWaterSellingComponent.current.refs.checkboxAll.checked = false;
        }

        for (let i = 0; i < this.childWaterSellingItems.length; i++) {
            if (this.childWaterSellingItems[i]) {
                await this.childWaterSellingItems[i].unChecked(i, true);
            }
        }
    }

    async checkedAll(e: any) {

        if (e.target.checked) {
            for (let i = 0; i < this.childWaterSellingItems.length; i++) {
                if (this.childWaterSellingItems[i] && !this.childWaterSellingItems[i].props.water.isExistedOnNem) {
                    await this.childWaterSellingItems[i].unChecked(i, false);

                    let waterSelling: WaterSelling = new WaterSelling(
                        this.childWaterSellingItems[i].props.water.sellerId,
                        this.childWaterSellingItems[i].props.water.amount,
                        this.childWaterSellingItems[i].props.water.total,
                        this.childWaterSellingItems[i].props.water.sellTime
                    );

                    await this.onChangedListSelling(waterSelling, true);
                }
            }
        } else {
            for (let i = 0; i < this.childWaterSellingItems.length; i++) {
                if (this.childWaterSellingItems[i]) {
                    await this.childWaterSellingItems[i].unChecked(i, true);

                    let waterSelling: WaterSelling = new WaterSelling(
                        this.childWaterSellingItems[i].props.water.sellerId,
                        this.childWaterSellingItems[i].props.water.amount,
                        this.childWaterSellingItems[i].props.water.total,
                        this.childWaterSellingItems[i].props.water.sellTime
                    );

                    await this.onChangedListSelling(waterSelling, false);
                }
            }
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
        await this.props.findWaterSellingBlockchainById(data.sellerId, data.sellTime);

        let waterSelling: WaterSelling = new WaterSelling(
            data.sellerId,
            data.amount,
            data.total,
            data.sellTime
        );

        let modal = new Modal(true);
        modal.data = waterSelling;
        this.props.setDataModal(modal);
        this.props.openModal(modal);
    }

    closeModal(): void {
        this.props.resetWaterSellingBlockchain();

        let modal = new Modal(false);
        this.props.closeModal(modal);
    }

    dataHeader(): string {
        return 'Water Selling Detail';
    }

    dataBody() {
        let data: WaterSelling = this.props.modal.data;

        return (
            <>
                <div className="mb-1">
                    <strong>Seller ID:</strong>
                    <div className="d-inline ml-1">{data.sellerId}</div>
                </div>
                <div className="mb-1">
                    <strong>Amount:</strong>
                    <div className="d-inline ml-1">{data.amount}</div>
                </div>
                <div className="mb-1">
                    <strong>Total ($SWEG):</strong>
                    <div className="d-inline ml-1">{data.total}</div>
                </div>
                <div className="mb-1">
                    <strong>Sell Time:</strong>
                    <div className="d-inline ml-1">{data.sellTime}</div>
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
                    <button className="btn btn-primary waves-effect waves-light m-0"
                        onClick={() => Commons.checkDataHasChanged(this.props.waterBlockchain.data.transactionHash, Commons.hashData(data), this.callBackCheckDataHasChanged.bind(this))}
                    >
                        Check Data
                    </button>
                }
                {_.isNil(this.props.waterBlockchain.data) || _.isEmpty(this.props.waterBlockchain.data) &&
                    <button className="btn btn-primary waves-effect waves-light m-0"
                        onClick={() => nemTransaction.submitTransaction(Commons.hashData(data), ActionTypes.ADD_WATER_SELLING_BLOCK_CHAIN, data, this.callBackSubmitTransactionSuccess.bind(this))}
                    >
                        Send To Block
                    </button>
                }
            </>
        );
    }

    async callBackSubmitTransactionSuccess(waterSellingBlockchain: WaterSellingBlockchain, waterSelling: WaterSelling) {
        await this.props.addWaterSellingBlockchain(waterSellingBlockchain);

        if (!this.state.isSearch) {
            const paginationInput = new PaginationInput(
                this.state.currentPage,
                Constants.DEFAULT_ITEMS_PER_PAGE
            );

            await this.props.fetchWaterSelling(paginationInput);
        } else {
            const paginationInput = new PaginationInput(
                this.state.currentPage,
                Constants.DEFAULT_ITEMS_PER_PAGE,
                this.state.date
            );

            await this.props.fetchWaterSellingByDate(paginationInput);
        }

        let index = await this.findWaterInItems(this.childWaterSellingItems, waterSelling);
        await this.childWaterSellingItems[index].unChecked(index, true);

        this.onChangedListSelling(waterSelling, false);

        if (this.childWaterSellingComponent) {
            this.childWaterSellingComponent.current.refs.checkboxAll.checked = false;
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
        fetchWaterSelling: Actions.actFetchWaterSellingRequest,
        fetchWaterSellingByDate: Actions.actFetchWaterSellingByDateRequest,
        openModal: Actions.actShowModal,
        closeModal: Actions.actHideModal,
        setDataModal: Actions.actSetDataModal,
        addWaterSellingBlockchain: Actions.actAddWaterSellingBlockchainRequest,
        findWaterSellingBlockchainById: Actions.actFindWaterSellingBlockchainByIdRequest,
        checkValidOfData: Actions.actCheckValidOfWaterSellingData,
        resetWaterSellingBlockchain: Actions.actResetWaterSellingBlockchain
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WaterSellingContainer);