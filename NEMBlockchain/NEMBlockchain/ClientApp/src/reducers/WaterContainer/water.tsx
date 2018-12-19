import * as Types from '../../contants/ActionTypes';

const initialState = {
    paginationResult: {},
    detail: {},
    error: null
};

const water = (state = initialState, action: any) => {
    switch (action.type) {
        case Types.FETCH_WATER_CONSUMPTIONS_SUCCESS:
            return {
                ...state,
                paginationResult: action.payload,
                error: null
            }
        case Types.FETCH_WATER_CONSUMPTIONS_FAILURE:
            return {
                ...state,
                paginationResult: {},
                error: action.payload
            }
        case Types.FETCH_WATER_CONSUMPTION_DETAIL_SUCCESS:
            return {
                ...state,
                detail: action.payload,
                error: null
            }
        case Types.FETCH_WATER_CONSUMPTION_DETAIL_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};

export default water;