import * as Types from '../contants/ActionTypes';
import UserInfo from '../models/UserInfo';
import Modal from '../models/Modal';
import callApi from '../utils/apiCaller';

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