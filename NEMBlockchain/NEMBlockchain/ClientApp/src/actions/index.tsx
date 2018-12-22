import * as Types from '../contants/ActionTypes';
import * as Messages from '../contants/Messages';
import UserInfo from '../models/User/UserInfo';
import UserBlockchain from '../models/User/UserBlockchain';
import Modal from '../models/Modal';
import callApi from '../utils/apiCaller';
import * as _ from 'lodash';
import PaginationInput from '../models/PaginationInput';
import PaginationResult from '../models/PaginationResult';
import WaterConsumptionTotal from 'src/models/Water/WaterConsumptionTotal';
import WaterConsumptionDetail from 'src/models/Water/WaterConsumptionDetail';
import WaterBlockchain from 'src/models/Water/WaterBlockchain';
import WaterBuyingBlockchain from 'src/models/Water/WaterBuyingBlockchain';
import WaterBuying from 'src/models/Water/WaterBuying';
import WaterSelling from 'src/models/Water/WaterSelling';
import WaterSellingBlockchain from 'src/models/Water/WaterSellingBlockchain';

// Action for User

export const actFetchUsersSuccess = (paginationResult: PaginationResult<UserInfo>) => {
    return {
        type: Types.FETCH_USERS_SUCCESS,
        payload: paginationResult
    }
}

export const actFetchUsersFailure = (error: any) => {
    return {
        type: Types.FETCH_USERS_FAILURE,
        payload: error
    }
}

export const actFetchUsersRequest = (paginationInput: PaginationInput) => {
    return (dispatch: any) => {
        return callApi(`api/user/list?PageSize=${paginationInput.pageSize}&PageIndex=${paginationInput.pageIndex - 1}`, 'GET', null)
            .then((res: any) => {
                const paginationResult = new PaginationResult<UserInfo>(
                    res.data.data.totalCount,
                    res.data.data.items,
                    res.data.data.pageIndex,
                    res.data.data.pageSize
                );
                
                dispatch(actFetchUsersSuccess(paginationResult));
            })
            .catch((err: any) => {
                console.log(err);
                dispatch(actFetchUsersFailure(err));
            });
    }
}

export const actAddUserBlockchain = (message: string) => {
    return {
        type: Types.ADD_USER_BLOCK_CHAIN,
        payload: message
    }
}

export const actAddUserBlockchainRequest = (usersBlockchain: UserBlockchain) => {
    return (dispatch: any) => {
        return callApi('api/nem/user-transaction', 'POST', usersBlockchain)
            .then((res: any) => {
                dispatch(actAddUserBlockchain(Messages.INSERT_TRANSACTION_HASH_SUCCESS));
                dispatch(actFindUserBlockchainByIdRequest(usersBlockchain.Id));
            })
            .catch((err: any) => {
                dispatch(actAddUserBlockchain(Messages.INSERT_TRANSACTION_HASH_FAILURE));
            });
    }
}

export const actFindUserBlockchainById = (userBlockchain: UserBlockchain) => {
    return {
        type: Types.FIND_USER_BLOCK_CHAIN_BY_ID,
        payload: userBlockchain || {}
    }
}

export const actFindUserBlockchainByIdRequest = (id: string) => {
    return (dispatch: any) => {
        return callApi(`api/nem/check-exist-user/${id}`, 'GET', null).then((res: any) => {
            if (!_.isNil(res.data.data)) {
                const userBlockchain = new UserBlockchain(res.data.data.id, res.data.data.transactionHash);
                dispatch(actFindUserBlockchainById(userBlockchain));
            } else {
                dispatch(actFindUserBlockchainById(null as any));
            }
        });
    }
}

export const actCheckValidOfUserData = (message: string) => {
    return {
        type: Types.CHECK_VALID_OF_USER_DATA,
        payload: message
    }
}

export const actResetUserBlockchain = () => {
    return {
        type: Types.RESET_USERBLOCKCHAIN
    }
}

//Action for Water

export const actFetchWaterConsumptionSuccess = (paginationResult: PaginationResult<WaterConsumptionTotal>) => {
    return {
        type: Types.FETCH_WATER_CONSUMPTIONS_SUCCESS,
        payload: paginationResult
    }
}

export const actFetchWaterConsumptionFailure = (error: any) => {
    return {
        type: Types.FETCH_WATER_CONSUMPTIONS_FAILURE,
        payload: error
    }
}

export const actFetchWaterConsumptionRequest = (paginationInput: PaginationInput) => {
    return (dispatch: any) => {
        return callApi(`api/water/consumptions-list?PageSize=${paginationInput.pageSize}&PageIndex=${paginationInput.pageIndex - 1}`, 'GET', null)
            .then((res: any) => {
                const paginationResult = new PaginationResult<WaterConsumptionTotal>(
                    res.data.data.totalCount,
                    res.data.data.items,
                    res.data.data.pageIndex,
                    res.data.data.pageSize
                );
                
                dispatch(actFetchWaterConsumptionSuccess(paginationResult));
            })
            .catch((err: any) => {
                console.log(err);
                dispatch(actFetchWaterConsumptionFailure(err));
            });
    }
}

export const actGetWaterConsumptionDetailSuccess = (waterConsumptionDetail: Array<WaterConsumptionDetail>) => {
    return {
        type: Types.FETCH_WATER_CONSUMPTION_DETAIL_SUCCESS,
        payload: waterConsumptionDetail
    }
}

export const actGetWaterConsumptionDetailFailure = (error: any) => {
    return {
        type: Types.FETCH_WATER_CONSUMPTION_DETAIL_FAILURE,
        payload: error
    }
}

export const actGetWaterConsumptionDetailRequest = (userId: string, logTime: string) => {
    return (dispatch: any) => {
        return callApi(`api/water/consumption-detail/${userId}/${logTime}`, 'GET', null)
            .then((res: any) => {
                dispatch(actGetWaterConsumptionDetailSuccess(res.data.data));
            })
            .catch((err: any) => {
                console.log(err);
                dispatch(actGetWaterConsumptionDetailFailure(err));
            });
    }
}

export const actAddWaterBlockchain = (message: string) => {
    return {
        type: Types.ADD_WATER_CONSUMPTION_BLOCK_CHAIN,
        payload: message
    }
}

export const actAddWaterBlockchainRequest = (waterBlockchain: WaterBlockchain) => {
    return (dispatch: any) => {
        return callApi('api/nem/water-transaction', 'POST', waterBlockchain)
            .then((res: any) => {
                dispatch(actAddWaterBlockchain(Messages.INSERT_TRANSACTION_HASH_SUCCESS));
                dispatch(actFindWaterBlockchainByIdRequest(waterBlockchain.Id));
            })
            .catch((err: any) => {
                dispatch(actAddWaterBlockchain(Messages.INSERT_TRANSACTION_HASH_FAILURE));
            });
    }
}

export const actFindWaterBlockchainById = (waterBlockchain: WaterBlockchain) => {
    return {
        type: Types.FIND_WATER_CONSUMPTION_BLOCK_CHAIN_BY_ID,
        payload: waterBlockchain || {}
    }
}

export const actFindWaterBlockchainByIdRequest = (id: string) => {
    return (dispatch: any) => {
        return callApi(`api/nem/check-exist-water/${id}`, 'GET', null).then((res: any) => {
            if (!_.isNil(res.data.data)) {
                const waterBlockchain = new WaterBlockchain(res.data.data.id, res.data.data.logTime,res.data.data.transactionHash);
                dispatch(actFindWaterBlockchainById(waterBlockchain));
            } else {
                dispatch(actFindWaterBlockchainById(null as any));
            }
        });
    }
}

export const actCheckValidOfWaterData = (message: string) => {
    return {
        type: Types.CHECK_VALID_OF_WATER_CONSUMPTION_DATA,
        payload: message
    }
}

export const actResetWaterBlockchain = () => {
    return {
        type: Types.RESET_WATERBLOCKCHAIN
    }
}

// Water Selling

export const actFetchWaterSellingSuccess = (paginationResult: PaginationResult<WaterBuying>) => {
    return {
        type: Types.FETCH_WATER_SELLING_SUCCESS,
        payload: paginationResult
    }
}

export const actFetchWaterSellingFailure = (error: any) => {
    return {
        type: Types.FETCH_WATER_SELLING_FAILURE,
        payload: error
    }
}

export const actFetchWaterSellingRequest = (paginationInput: PaginationInput) => {
    return (dispatch: any) => {
        return callApi(`api/water/selling?PageSize=${paginationInput.pageSize}&PageIndex=${paginationInput.pageIndex - 1}`, 'GET', null)
            .then((res: any) => {
                const paginationResult = new PaginationResult<WaterBuying>(
                    res.data.data.totalCount,
                    res.data.data.items,
                    res.data.data.pageIndex,
                    res.data.data.pageSize
                );
                
                dispatch(actFetchWaterSellingSuccess(paginationResult));
            })
            .catch((err: any) => {
                console.log(err);
                dispatch(actFetchWaterSellingFailure(err));
            });
    }
}

export const actAddWaterSellingBlockchain = (message: string) => {
    return {
        type: Types.ADD_WATER_SELLING_BLOCK_CHAIN,
        payload: message
    }
}

export const actAddWaterSellingBlockchainRequest = (waterSellingBlockchain: WaterSellingBlockchain) => {
    return (dispatch: any) => {
        return callApi('api/nem/water-Selling-transaction', 'POST', waterSellingBlockchain)
            .then((res: any) => {
                dispatch(actAddWaterSellingBlockchain(Messages.INSERT_TRANSACTION_HASH_SUCCESS));
                dispatch(actFindWaterSellingBlockchainByIdRequest(waterSellingBlockchain.id, waterSellingBlockchain.sellTime));
            })
            .catch((err: any) => {
                dispatch(actAddWaterSellingBlockchain(Messages.INSERT_TRANSACTION_HASH_FAILURE));
            });
    }
}

export const actFindWaterSellingBlockchainById = (waterSellingBlockchain: WaterSellingBlockchain) => {
    return {
        type: Types.FIND_WATER_SELLING_BLOCK_CHAIN_BY_ID,
        payload: waterSellingBlockchain || {}
    }
}

export const actFindWaterSellingBlockchainByIdRequest = (id: string, sellTime: string) => {
    return (dispatch: any) => {
        return callApi(`api/nem/check-exist-water-Selling/${id}/${sellTime}`, 'GET', null).then((res: any) => {
            if (!_.isNil(res.data.data)) {
                const waterSellingBlockchain = new WaterSellingBlockchain(res.data.data.id, res.data.data.sellTime, res.data.data.transactionHash);
                dispatch(actFindWaterSellingBlockchainById(waterSellingBlockchain));
            } else {
                dispatch(actFindWaterSellingBlockchainById(null as any));
            }
        });
    }
}

export const actCheckValidOfWaterSellingData = (message: string) => {
    return {
        type: Types.CHECK_VALID_OF_WATER_SELLING_DATA,
        payload: message
    }
}

export const actResetWaterSellingBlockchain = () => {
    return {
        type: Types.RESET_WATER_SELLING_BLOCKCHAIN
    }
}

//Water Buying

export const actFetchWaterBuyingSuccess = (paginationResult: PaginationResult<WaterBuying>) => {
    return {
        type: Types.FETCH_WATER_BUYING_SUCCESS,
        payload: paginationResult
    }
}

export const actFetchWaterBuyingFailure = (error: any) => {
    return {
        type: Types.FETCH_WATER_BUYING_FAILURE,
        payload: error
    }
}

export const actFetchWaterBuyingRequest = (paginationInput: PaginationInput) => {
    return (dispatch: any) => {
        return callApi(`api/water/buying?PageSize=${paginationInput.pageSize}&PageIndex=${paginationInput.pageIndex - 1}`, 'GET', null)
            .then((res: any) => {
                const paginationResult = new PaginationResult<WaterBuying>(
                    res.data.data.totalCount,
                    res.data.data.items,
                    res.data.data.pageIndex,
                    res.data.data.pageSize
                );
                
                dispatch(actFetchWaterBuyingSuccess(paginationResult));
            })
            .catch((err: any) => {
                console.log(err);
                dispatch(actFetchWaterBuyingFailure(err));
            });
    }
}

export const actAddWaterBuyingBlockchain = (message: string) => {
    return {
        type: Types.ADD_WATER_BUYING_BLOCK_CHAIN,
        payload: message
    }
}

export const actAddWaterBuyingBlockchainRequest = (waterBuyingBlockchain: WaterBuyingBlockchain) => {
    return (dispatch: any) => {
        return callApi('api/nem/water-buying-transaction', 'POST', waterBuyingBlockchain)
            .then((res: any) => {
                dispatch(actAddWaterBuyingBlockchain(Messages.INSERT_TRANSACTION_HASH_SUCCESS));
                dispatch(actFindWaterBuyingBlockchainByIdRequest(waterBuyingBlockchain.id, waterBuyingBlockchain.buyTime));
            })
            .catch((err: any) => {
                dispatch(actAddWaterBuyingBlockchain(Messages.INSERT_TRANSACTION_HASH_FAILURE));
            });
    }
}

export const actFindWaterBuyingBlockchainById = (waterBuyingBlockchain: WaterBuyingBlockchain) => {
    return {
        type: Types.FIND_WATER_BUYING_BLOCK_CHAIN_BY_ID,
        payload: waterBuyingBlockchain || {}
    }
}

export const actFindWaterBuyingBlockchainByIdRequest = (id: string, buyTime: string) => {
    return (dispatch: any) => {
        return callApi(`api/nem/check-exist-water-buying/${id}/${buyTime}`, 'GET', null).then((res: any) => {
            if (!_.isNil(res.data.data)) {
                const waterBuyingBlockchain = new WaterBuyingBlockchain(res.data.data.id, res.data.data.buyTime, res.data.data.transactionHash);
                dispatch(actFindWaterBuyingBlockchainById(waterBuyingBlockchain));
            } else {
                dispatch(actFindWaterBuyingBlockchainById(null as any));
            }
        });
    }
}

export const actCheckValidOfWaterBuyingData = (message: string) => {
    return {
        type: Types.CHECK_VALID_OF_WATER_BUYING_DATA,
        payload: message
    }
}

export const actResetWaterBuyingBlockchain = () => {
    return {
        type: Types.RESET_WATER_BUYING_BLOCKCHAIN
    }
}

//Action for Modal

export const actShowModal = (modal: Modal) => {
    return {
        type: Types.SHOW_MODAL,
        payload: modal
    }
}

export const actHideModal = (modal: Modal) => {
    return {
        type: Types.HIDE_MODAL,
        payload: modal
    }
}

export const actSetDataModal = (modal: Modal) => {
    return {
        type: Types.SET_DATA_MODAL,
        payload: modal
    }
}