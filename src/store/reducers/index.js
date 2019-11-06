import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilder';
import orderReducer from './order';

const store = combineReducers({
    burgerBuilderReducer,
    orderReducer
})

export default store;

