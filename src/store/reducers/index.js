import { combineReducers } from 'redux';
import burgerBuilder from './burgerBuilder';
import order from './order';
import auth from './auth';

const store = combineReducers({
    burgerBuilder,
    order,
    auth
})

export default store;

