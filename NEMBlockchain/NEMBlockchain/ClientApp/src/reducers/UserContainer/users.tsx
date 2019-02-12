import * as Types from '../../contants/ActionTypes';

const initialState = {
    paginationResult: {},
    error: null
};

const users = (state = initialState, action: any) => {
    switch (action.type) {
        case Types.FETCH_USERS_SUCCESS:
            return {
                ...state,
                paginationResult: action.payload,
                error: null
            }
        case Types.FETCH_USERS_FAILURE:
            return {
                ...state,
                paginationResult: {},
                error: action.payload
            }
        case Types.FIND_USER_BY_INFOMATION_SUCCESS:
            return {
                ...state,
                paginationResult: action.payload,
                error: null
            }
        case Types.FIND_USER_BY_INFOMATION_FAILURE:
            return {
                ...state,
                paginationResult: {},
                error: action.payload
            }
        default:
            return state;
    }
};

export default users;