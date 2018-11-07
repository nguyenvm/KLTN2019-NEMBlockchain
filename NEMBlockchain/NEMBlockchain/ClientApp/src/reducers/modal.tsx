import * as Types from '../contants/ActionTypes';
import Modal from '../models/Modal';

const initModal = new Modal(false);
const initalState = {
    isShow: initModal.isShow,
    data: initModal.data
};

const modal = (state = initalState, action: any) => {
    switch (action.type) {
        case Types.SHOW_MODAL:
            return {
                ...state,
                ...action.payload
            };
        case Types.HIDE_MODAL:
            return {
                ...state,
                ...action.payload
            };
        case Types.SET_DATA_MODAL:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default modal;