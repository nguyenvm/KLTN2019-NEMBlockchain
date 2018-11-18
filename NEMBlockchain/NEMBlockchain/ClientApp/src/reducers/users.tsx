import * as Types from '../contants/ActionTypes';
import UserInfo from '../models/UserInfo';

const users = (state = {}, action: any) => {
    switch (action.type) {
        case Types.FETCH_USERS:
            return {
                ...state,
                ...action.users.reduce((obj: any, user: UserInfo, index: number) => {
                    obj[index] = user;
                    return obj;
                }, {})
            }
        case Types.ADD_USERS:
            return action.message;
        
        default:
            return state;
    }
};

export default users;