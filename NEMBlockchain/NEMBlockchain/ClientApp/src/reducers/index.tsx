import { combineReducers } from 'redux';
import users from './UserContainer/users';
import modal from './modal';
import nemBlockchain from './UserContainer/nemBlockchain';

const appReducers = combineReducers({
    users,
    modal,
    nemBlockchain
});

export default appReducers;