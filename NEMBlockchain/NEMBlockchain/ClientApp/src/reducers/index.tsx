import { combineReducers } from 'redux';
import users from './UserContainer/users';
import modal from './modal';
import userBlockchain from './UserContainer/userBlockchain';
import water from './WaterContainer/water';
import waterBlockchain from './WaterContainer/waterBlockchain';
import userChecking from './CheckingContainer/User/UserChecking';
import waterChecking from './CheckingContainer/Water/waterChecking';

const appReducers = combineReducers({
    users,
    modal,
    userBlockchain,
    water,
    waterBlockchain,
    userChecking,
    waterChecking
});

export default appReducers;