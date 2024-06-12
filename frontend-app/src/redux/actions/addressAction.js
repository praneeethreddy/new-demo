import {  NEW_ADDRESS, SET_ADDRESS, UPDATE_ADDRESS } from "../constants/addressConstants"


export const setAddress = (data) => ({
    type:SET_ADDRESS,
    data:data
})

export const updateAddress = (data) => ({
    type:UPDATE_ADDRESS,
    data:data
})

export const newAddress = (data) => ({
    type:NEW_ADDRESS
})


