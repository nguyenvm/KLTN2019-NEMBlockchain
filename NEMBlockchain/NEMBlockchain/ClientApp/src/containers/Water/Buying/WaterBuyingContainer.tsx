import React, { Component } from 'react';
import PaginationInput from 'src/models/PaginationInput';
import * as Constants from 'src/contants';
import * as Actions from 'src/actions/index';
import * as Messages from 'src/contants/Messages';
import * as _ from 'lodash';
import * as Commons from 'src/utils/commons';
import * as nemTransaction from 'src/utils/NEM-infrastructure/TransactionHttp';
import * as ActionTypes from 'src/contants/ActionTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WaterBuyingComponent from 'src/components/Main/Water/Buying/WaterBuyingComponent';
import WaterBuyingItem from 'src/components/Main/Water/Buying/WaterBuyingItem';
import Modal from 'src/models/Modal';
import CommonModal from 'src/utils/commons/Modal/CommonModal';
import WaterBuying from 'src/models/Water/WaterBuying';
import WaterBuyingBlockchain from 'src/models/Water/WaterBuyingBlockchain';

class WaterBuyingContainer extends Component<any, any> {

    childWaterBuyingItems: any = [];
    childWaterBuyingComponent: any = {};

    constructor(props: any) {
        super(props);

        this.state = {
            currentPage: 1,
            isSearch: false,
            date: '',
            listBuying: [],
            isFilter: false
        }

        this.childWaterBuyingComponent = React.createRef();
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
                    fetchWaterBuyingByDate={this.props.fetchWaterBuyingByDate}
                    onSearch={this.onSearch.bind(this)}
                    message={this.props.waterBlockchain.message}
                    sendMultiToBlockchain={this.sendMultiToBlockchain.bind(this)}
                    listBuying={this.state.listBuying}
                    checkedAll={this.checkedAll.bind(this)}
                    ref={this.childWaterBuyingComponent}
                    onFilter={this.onFilter.bind(this)}
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
                        onChangedListBuying={this.onChangedListBuying.bind(this)}
                        ref={input => this.childWaterBuyingItems[index] = input}
                    />
                )
            });
        }

        return result;
    }

    async onChangedListBuying(water: WaterBuying, isAdding: boolean) {
        if (isAdding) {
            let listBuying = [...this.state.listBuying];
            let index = await this.findWaterInList(listBuying, water);

            if (index === -1) {
                await this.setState({ listBuying: [...this.state.listBuying, water] });
            }
        } else {
            let listBuying = [...this.state.listBuying];
            let index = await this.findWaterInList(listBuying, water);

            if (index !== -1) {
                listBuying.splice(index, 1);
                await this.setState({ listBuying: listBuying });
            }
        }
    }

    findWaterInList(listBuying: Array<WaterBuying>, water: WaterBuying) {
        let index = -1;

        if (listBuying.length > 0) {
            for (let i = 0; i < listBuying.length; i++) {
                if (listBuying[i].buyerId === water.buyerId && listBuying[i].buyTime === water.buyTime) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    findWaterInItems(childWaterBuyingItems: Array<any>, water: WaterBuying) {
        let index = -1;

        if (childWaterBuyingItems.length > 0) {
            for (let i = 0; i < childWaterBuyingItems.length; i++) {
                if (childWaterBuyingItems[i].props.water.buyerId === water.buyerId && childWaterBuyingItems[i].props.water.buyTime === water.buyTime) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    async sendMultiToBlockchain(listWater: Array<WaterBuying>) {
        if (listWater) {
            if (listWater.length > 0) {
                for (let i = 0; i < listWater.length; i++) {
                    await nemTransaction.submitTransaction(Commons.hashData(listWater[i]), ActionTypes.ADD_WATER_BUYING_BLOCK_CHAIN, listWater[i], this.callBackSubmitTransactionSuccess.bind(this));
                }
            } else {
                this.props.checkValidOfData(Messages.EMPTY_LIST);
            }
        } else {
            this.props.checkValidOfData(Messages.EMPTY_LIST);
        }
    }

    async onFilter(e: any) {
        if (e.target.checked) {
            await this.setState({ isFilter: true, currentPage: 1, listBuying: [] });

            if (this.state.isFilter && this.state.isSearch) {
                const paginationInput = new PaginationInput(
                    1,
                    Constants.DEFAULT_ITEMS_PER_PAGE,
                    this.state.date,
                    'Filter'
                );

                await this.props.resetWaterBuyingBlockchain();
                await this.props.fetchWaterBuyingNotExistOnBlockchainFilterByDate(paginationInput);
            } else if (this.state.isFilter && !this.state.isSearch) {
                const paginationInput = new PaginationInput(
                    1,
                    Constants.DEFAULT_ITEMS_PER_PAGE,
                    '',
                    'Filter'
                );

                await this.props.resetWaterBuyingBlockchain();
                await this.props.fetchWaterBuyingNotExistOnBlockchain(paginationInput);
            }

        } else {
            await this.setState({ isFilter: false, currentPage: 1, listBuying: [] });

            if (!this.state.isFilter && this.state.isSearch) {
                const paginationInput = new PaginationInput(
                    1,
                    Constants.DEFAULT_ITEMS_PER_PAGE,
                    this.state.date,
                    ''
                );

                await this.props.resetWaterBuyingBlockchain();
                await this.props.fetchWaterBuyingByDate(paginationInput);

            } else if (!this.state.isFilter && !this.state.isSearch) {
                const paginationInput = new PaginationInput(
                    1,
                    Constants.DEFAULT_ITEMS_PER_PAGE,
                    '',
                    ''
                );

                await this.props.resetWaterBuyingBlockchain();
                await this.props.fetchWaterBuying(paginationInput);
            }
        }
    }

    async onPageChanged(index: number, date: string) {

        await this.setState({ currentPage: index, date: date, listBuying: [] });

        if (!this.state.isSearch && !this.state.isFilter) {
            const paginationInput = new PaginationInput(
                index,
                Constants.DEFAULT_ITEMS_PER_PAGE
            );

            await this.props.resetWaterBuyingBlockchain();
            await this.props.fetchWaterBuying(paginationInput);

        } else if (this.state.isSearch && !this.state.isFilter) {
            const paginationInput = new PaginationInput(
                index,
                Constants.DEFAULT_ITEMS_PER_PAGE,
                date
            );

            await this.props.resetWaterBuyingBlockchain();
            await this.props.fetchWaterBuyingByDate(paginationInput);
        } else if (this.state.isSearch && this.state.isFilter) {
            const paginationInput = new PaginationInput(
                index,
                Constants.DEFAULT_ITEMS_PER_PAGE,
                date,
                'Filter'
            );

            await this.props.resetWaterBuyingBlockchain();
            await this.props.fetchWaterBuyingNotExistOnBlockchainFilterByDate(paginationInput);
        } else {
            const paginationInput = new PaginationInput(
                index,
                Constants.DEFAULT_ITEMS_PER_PAGE,
                '',
                'Filter'
            );

            await this.props.resetWaterBuyingBlockchain();
            await this.props.fetchWaterBuyingNotExistOnBlockchain(paginationInput);
        }

        if (this.childWaterBuyingComponent) {
            this.childWaterBuyingComponent.current.refs.checkboxAll.checked = false;
        }

        for (let i = 0; i < this.childWaterBuyingItems.length; i++) {
            if (this.childWaterBuyingItems[i]) {
                await this.childWaterBuyingItems[i].unChecked(i, true);
            }
        }
    }

    async checkedAll(e: any) {

        if (e.target.checked) {
            for (let i = 0; i < this.childWaterBuyingItems.length; i++) {
                if (this.childWaterBuyingItems[i] && !this.childWaterBuyingItems[i].props.water.isExistedOnNem) {
                    await this.childWaterBuyingItems[i].unChecked(i, false);

                    let waterBuying: WaterBuying = new WaterBuying(
                        this.childWaterBuyingItems[i].props.water.tradeId,
                        this.childWaterBuyingItems[i].props.water.buyerId,
                        this.childWaterBuyingItems[i].props.water.total,
                        this.childWaterBuyingItems[i].props.water.buyTime
                    );

                    await this.onChangedListBuying(waterBuying, true);
                }
            }
        } else {
            for (let i = 0; i < this.childWaterBuyingItems.length; i++) {
                if (this.childWaterBuyingItems[i]) {
                    await this.childWaterBuyingItems[i].unChecked(i, true);

                    let waterBuying: WaterBuying = new WaterBuying(
                        this.childWaterBuyingItems[i].props.water.tradeId,
                        this.childWaterBuyingItems[i].props.water.buyerId,
                        this.childWaterBuyingItems[i].props.water.total,
                        this.childWaterBuyingItems[i].props.water.buyTime
                    );

                    await this.onChangedListBuying(waterBuying, false);
                }
            }
        }
    }

    async onSearch(date: string) {
        if (date) {
            await this.setState({ isSearch: true, currentPage: 1, date: date });

            if (this.state.isFilter && this.state.isSearch) {
                const paginationInput = new PaginationInput(
                    1,
                    Constants.DEFAULT_ITEMS_PER_PAGE,
                    this.state.date,
                    'Filter'
                );

                await this.props.resetWaterBuyingBlockchain();
                await this.props.fetchWaterBuyingNotExistOnBlockchainFilterByDate(paginationInput);
            } else if (!this.state.isFilter && this.state.isSearch) {
                const paginationInput = new PaginationInput(
                    1,
                    Constants.DEFAULT_ITEMS_PER_PAGE,
                    this.state.date,
                    ''
                );

                await this.props.resetWaterBuyingBlockchain();
                await this.props.fetchWaterBuyingByDate(paginationInput);
            }

        } else {
            await this.setState({ isSearch: false, currentPage: 1, date: '' });

            if (this.state.isFilter && !this.state.isSearch) {
                const paginationInput = new PaginationInput(
                    1,
                    Constants.DEFAULT_ITEMS_PER_PAGE,
                    '',
                    'Filter'
                );

                await this.props.resetWaterBuyingBlockchain();
                await this.props.fetchWaterBuyingNotExistOnBlockchain(paginationInput);

            } else if (!this.state.isFilter && !this.state.isSearch) {
                const paginationInput = new PaginationInput(
                    1,
                    Constants.DEFAULT_ITEMS_PER_PAGE,
                    '',
                    ''
                );

                await this.props.resetWaterBuyingBlockchain();
                await this.props.fetchWaterBuying(paginationInput);
            }
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
        await this.props.findWaterBuyingBlockchainById(data.buyerId, data.buyTime);

        let waterBuying: WaterBuying = new WaterBuying(
            data.tradeId,
            data.buyerId,
            data.total,
            data.buyTime
        );

        let modal = new Modal(true);
        modal.data = waterBuying;
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
                    <p className="text-primary">Data is valid</p>
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
                        onClick={() => nemTransaction.submitTransaction(Commons.hashData(data), ActionTypes.ADD_WATER_BUYING_BLOCK_CHAIN, data, this.callBackSubmitTransactionSuccess.bind(this))}
                    >
                        Send To Block
                    </button>
                }
            </>
        );
    }

    async callBackSubmitTransactionSuccess(waterBuyingBlockchain: WaterBuyingBlockchain, waterBuying: WaterBuying) {

        await this.props.addWaterBuyingBlockchain(waterBuyingBlockchain);

        if (!this.state.isSearch && !this.state.isFilter) {
            const paginationInput = new PaginationInput(
                this.state.currentPage,
                Constants.DEFAULT_ITEMS_PER_PAGE
            );

            await this.props.fetchWaterBuying(paginationInput);

            let index = await this.findWaterInItems(this.childWaterBuyingItems, waterBuying);
            await this.childWaterBuyingItems[index].unChecked(index, true);

            this.onChangedListBuying(waterBuying, false);

            if (this.childWaterBuyingComponent) {
                this.childWaterBuyingComponent.current.refs.checkboxAll.checked = false;
            }

        } else if (this.state.isSearch && !this.state.isFilter) {
            const paginationInput = new PaginationInput(
                this.state.currentPage,
                Constants.DEFAULT_ITEMS_PER_PAGE,
                this.state.date
            );

            await this.props.fetchWaterBuyingByDate(paginationInput);

            let index = await this.findWaterInItems(this.childWaterBuyingItems, waterBuying);
            await this.childWaterBuyingItems[index].unChecked(index, true);

            this.onChangedListBuying(waterBuying, false);

            if (this.childWaterBuyingComponent) {
                this.childWaterBuyingComponent.current.refs.checkboxAll.checked = false;
            }

        } else if (this.state.isSearch && this.state.isFilter) {
            const paginationInput = new PaginationInput(
                this.state.currentPage,
                Constants.DEFAULT_ITEMS_PER_PAGE,
                this.state.date,
                'Filter'
            );

            for (let index = 0; index < this.props.water.paginationResult.items.length; index++) {
                await this.childWaterBuyingItems[index].unChecked(index, true);
            }

            this.onChangedListBuying(waterBuying, false);

            if (this.childWaterBuyingComponent) {
                this.childWaterBuyingComponent.current.refs.checkboxAll.checked = false;
            }

            await this.props.fetchWaterBuyingNotExistOnBlockchainFilterByDate(paginationInput);

        } else {
            const paginationInput = new PaginationInput(
                this.state.currentPage,
                Constants.DEFAULT_ITEMS_PER_PAGE,
                '',
                'Filter'
            );

            for (let index = 0; index < this.props.water.paginationResult.items.length; index++) {
                await this.childWaterBuyingItems[index].unChecked(index, true);
            }
            
            this.onChangedListBuying(waterBuying, false);

            if (this.childWaterBuyingComponent) {
                this.childWaterBuyingComponent.current.refs.checkboxAll.checked = false;
            }

            await this.props.fetchWaterBuyingNotExistOnBlockchain(paginationInput);
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
        fetchWaterBuying: Actions.actFetchWaterBuyingRequest,
        fetchWaterBuyingByDate: Actions.actFetchWaterBuyingByDateRequest,
        fetchWaterBuyingNotExistOnBlockchain: Actions.actFetchWaterBuyingNotExistOnBlockchainRequest,
        fetchWaterBuyingNotExistOnBlockchainFilterByDate: Actions.actFetchWaterBuyingNotExistOnBlockchainFilterByDateRequest,
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