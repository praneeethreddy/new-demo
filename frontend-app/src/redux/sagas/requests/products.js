import axios from 'axios'

export const requestGetProducts = () => {
    return axios.request({
        method: 'get',
        baseURL: 'http://localhost:8000',
        url: '/products',

    })
}