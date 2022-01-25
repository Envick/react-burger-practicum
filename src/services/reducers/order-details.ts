import {ORDER_FAILED, ORDER_SUCCESS, TAKE_ORDER, TOrderActions} from "../actions/order-details";

type TOrderDetailsState = {
    orderDetailsRequest: boolean,
    orderDetailsFailed: boolean,
    orderDetails: any
}

const initialState: TOrderDetailsState = {
    orderDetailsRequest: false,
    orderDetailsFailed: false,
    orderDetails: null
}
export const orderDetailsReducer = (state = initialState, action:TOrderActions): TOrderDetailsState => {
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
