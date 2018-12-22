import * as Types from '../../contants/ActionTypes';

const initalState = {
    message: '',
    data: {}
};

const waterBlockchain = (state = initalState, action: any) => {
    switch (action.type) {
        case Types.ADD_WATER_CONSUMPTION_BLOCK_CHAIN:
            return {
                ...state,
                message: action.payload
            };
        case Types.FIND_WATER_CONSUMPTION_BLOCK_CHAIN_BY_ID:
            return {
                ...state,
                data: action.payload
            };
        case Types.CHECK_VALID_OF_WATER_CONSUMPTION_DATA:
            return {
                ...state,
                message: action.payload
            };
        case Types.RESET_WATERBLOCKCHAIN:
            return {
                ...state,
                message: ''
            };
        case Types.ADD_WATER_BUYING_BLOCK_CHAIN:
            return {
                ...state,
                message: action.payload
            };
        case Types.FIND_WATER_BUYING_BLOCK_CHAIN_BY_ID:
            return {
                ...state,
                data: action.payload
            };
        case Types.CHECK_VALID_OF_WATER_BUYING_DATA:
            return {
                ...state,
                message: action.payload
            };
        case Types.RESET_WATER_BUYING_BLOCKCHAIN:
            return {
                ...state,
                message: ''
            };
        case Types.ADD_WATER_SELLING_BLOCK_CHAIN:
            return {
                ...state,
                message: action.payload
            };
        case Types.FIND_WATER_SELLING_BLOCK_CHAIN_BY_ID:
            return {
                ...state,
                data: action.payload
            };
        case Types.CHECK_VALID_OF_WATER_SELLING_DATA:
            return {
                ...state,
                message: action.payload
            };
        case Types.RESET_WATER_SELLING_BLOCKCHAIN:
            return {
                ...state,
                message: ''
            };
        default:
            return state;
    }
};

export default waterBlockchain;