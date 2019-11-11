import { combineReducers } from 'redux';
import burgerBuilder from './burgerBuilder';
import order from './order';

const store = combineReducers({
    burgerBuilder,
    order
})

export default store;

