import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { fetchMiddleware } from 'redux-recompose';
import createHistory from 'history/createBrowserHistory';

import { reducer as board } from './Board/reducer';

export const history = createHistory();

const reducers = combineReducers({ board });

const middlewares = [thunk, routerMiddleware(history), fetchMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = (state, action) => reducers(state, action);

const store = createStore(rootReducer, composeEnhancers(...enhancers));

export default store;
