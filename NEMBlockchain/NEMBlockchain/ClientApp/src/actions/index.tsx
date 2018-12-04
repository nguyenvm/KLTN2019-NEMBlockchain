import * as Types from '../contants/ActionTypes';
import * as Messages from '../contants/Messages';
import UserInfo from '../models/UserInfo';
import UserBlockchain from '../models/UserBlockchain';
import Modal from '../models/Modal';
import callApi from '../utils/apiCaller';
import * as _ from 'lodash';

// Action for User

export const actFetchUsers = (users: Array<UserInfo>) => {
    return {
        type: Types.FETCH_USERS,
        users
    }
}

export const actFetchUsersRequest = () => {
    return (dispatch: any) => {
        return callApi('api/user/list', 'GET', null).then((res: any) => {
            dispatch(actFetchUsers(res.data.data));
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

export const actCheckValidOfData = (message: string) => {
    return {
        type: Types.CHECK_VALID_OF_DATA,
        payload: message
    }
}

export const actResetNemBlockchain = () => {
    return {
        type: Types.RESET_NEMBLOCKCHAIN
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