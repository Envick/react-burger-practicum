import {ORDER_FAILED, ORDER_SUCCESS, TAKE_ORDER} from "../actions/order-details";

const initialState = {
    orderDetailsRequest: false,
    orderDetailsFailed: false,
    orderDetails: null
}
export const orderDetailsReducer = (state = initialState, action:any) => {
    switch(action.type){
        case TAKE_ORDER :{
            return {
                ...state,
                orderDetailsRequest: true,
                orderDetailsFailed: false
            }
        }
        case ORDER_SUCCESS :{
            return {
                ...state,
                orderDetailsRequest: false,
                orderDetails: action.payload
            }
        }
        case ORDER_FAILED :{
            return {
                ...initialState,
                orderDetailsRequest: false,
                orderDetailsFailed: true,
            }
        }
        default:{
            return state
        }
    }
}
