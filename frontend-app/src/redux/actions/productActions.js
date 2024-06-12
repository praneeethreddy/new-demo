import { GET_PRODUCTS, SET_PRODUCTS } from "../constants/productConstants"



export const getProducts = () => ({
    type:GET_PRODUCTS
})


export const setProducts = (data) => ({
    type:SET_PRODUCTS,
    data:data
})


