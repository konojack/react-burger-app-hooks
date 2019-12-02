import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watchAuth } from './store/sagas'
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom';
import reducer from './store/reducers';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const logger = state => next => action => {
    console.log("DISPATCHING", action);
    const result = next(action);
    console.log(state.getState());
    return result;
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, logger, sagaMiddleware)));

sagaMiddleware.run(watchAuth);


ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
