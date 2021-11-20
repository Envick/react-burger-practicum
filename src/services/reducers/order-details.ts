import {SET_ACTIVE_ORDER_DETAILS} from "../actions/order-details";

const initialState = {
    orderDetails: {}
}
export const orderDetailsReducer = (state = initialState, action:any) => {
    switch(action.type){
        case SET_ACTIVE_ORDER_DETAILS :{
            return {
                ...state,
                orderDetails: action.payload
            }
        }
        default:{
            return state
        }
    }
}
