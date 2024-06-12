import { call ,put } from 'redux-saga/effects'
import { requestGetProducts } from '../requests/products';
import {  setProducts } from '../../actions/productActions';


export  function* handleGetProductsRequest(action) {
    try {
        const response = yield call(requestGetProducts);
        const {data} = response;
        yield put(setProducts(data));
    } catch (error) {
        
    }
}