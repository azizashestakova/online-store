import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/reducers';

import { localStorageMiddleware } from './middleware/local-storage';

const allReducers = combineReducers(reducers);

const middleware = [thunk, localStorageMiddleware];

const store = createStore(allReducers, applyMiddleware(...middleware));

export default store;
