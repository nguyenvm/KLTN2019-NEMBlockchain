import * as Types from '../../contants/ActionTypes';

const initalState = {
    message: '',
    data: {}
};

const userBlockchain = (state = initalState, action: any) => {
    switch (action.type) {
        case Types.ADD_USER_BLOCK_CHAIN:
            return {
                ...state,
                message: action.payload
            };
        case Types.FIND_USER_BLOCK_CHAIN_BY_ID:
            return {
                ...state,
                data: action.payload
            };
        case Types.CHECK_VALID_OF_USER_DATA:
            return {
                ...state,
                message: action.payload
            };
        case Types.RESET_USERBLOCKCHAIN:
            return {
                ...state,
                message: '',
                data: {}
            };
        default:
            return state;
    }
};

export default userBlockchain;