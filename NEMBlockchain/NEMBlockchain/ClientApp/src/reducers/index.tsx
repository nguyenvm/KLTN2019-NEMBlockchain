import { combineReducers } from 'redux';
import users from './users';
import modal from './modal';

const appReducers = combineReducers({
    users,
    modal
});

export default appReducers;