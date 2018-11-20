import * as Types from '../../contants/ActionTypes';
import UserInfo from '../../models/UserInfo';

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
        default:
            return state;
    }
};

export default users;