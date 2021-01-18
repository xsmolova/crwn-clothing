import {createStore, appyMiddleware, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import {fetchCollectionsStart} from './shop/shop.sagas'

import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// Logger only in development, not in production
if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//adding sagas
sagaMiddleware.run(fetchCollectionsStart);

//persisted version of our store
export const persistor = persistStore(store);
