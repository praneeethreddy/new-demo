import { SET_PRODUCTS } from "../constants/productConstants";

const initialState = {
    data: []
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            const { data } = action
            return {
                ...state,
                data: data["data"]
            };

        default:
            return state;
    }
}
export default productsReducer;