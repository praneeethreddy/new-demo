import {takeLatest} from 'redux-saga/effects'
import { handleGetProductsRequest } from './handlers/products'
import { GET_PRODUCTS } from '../constants/productConstants'


//watcherSaga

export function* watcherSaga() {
    yield takeLatest(GET_PRODUCTS, handleGetProductsRequest)
}