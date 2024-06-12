import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { watcherSaga } from './sagas/rootSaga';
import productsReducer from './reducer/productReducer';

const reducer = combineReducers({
    products : productsReducer
})

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]

const store = createStore(reducer,{},applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga)

export default store;