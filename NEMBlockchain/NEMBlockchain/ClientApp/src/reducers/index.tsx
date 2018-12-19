import { combineReducers } from 'redux';
import users from './UserContainer/users';
import modal from './modal';
import userBlockchain from './UserContainer/userBlockchain';
import water from './WaterContainer/water';
import waterBlockchain from './WaterContainer/waterBlockchain';

const appReducers = combineReducers({
    users,
    modal,
    userBlockchain,
    water,
    waterBlockchain
});

export default appReducers;