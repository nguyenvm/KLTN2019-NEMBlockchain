import * as Types from '../../contants/ActionTypes';

const initalState = {
    message: '',
    data: {}
};

const nemBlockchain = (state = initalState, action: any) => {
    switch (action.type) {
        case Types.ADD_USER_BLOCK_CHAIN:
            return {
                ...state,
                message: action.payload,
                data: {}
            };
        case Types.CHECK_EXIST_USER_BLOCK_CHAIN:
            return {
                ...state,
                message: action.payload,
                data: {}
            };
        case Types.FIND_USER_BLOCK_CHAIN_BY_ID:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
};

export default nemBlockchain;