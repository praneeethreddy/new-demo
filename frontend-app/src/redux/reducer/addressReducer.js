import { SET_ADDRESS, UPDATE_ADDRESS } from "../constants/addressConstants";


const initialState = {
    data: []
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case SET_ADDRESS:
            
            return {
                ...state,
                data: data["data"]
            };
    
        case UPDATE_ADDRESS:
             
            return {

            }
        default:
            return state;
    }
}
export default productsReducer;