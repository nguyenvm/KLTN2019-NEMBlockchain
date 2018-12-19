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