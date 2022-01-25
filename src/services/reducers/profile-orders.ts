import {TFeed} from "../../utils/constants";
import {
    TProfileOrdersActions, WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_GET_MESSAGE
} from "../actions/profile-orders";

type TProfileOrdersState = {
    wsOrdersConnected: boolean,
    orders: TFeed[],
    totalSum: number,
    totalTodaySum: number
}

const initialState: TProfileOrdersState = {
    wsOrdersConnected: false,
    orders: [],
    totalSum: 0,
    totalTodaySum: 0,
}

export const profileOrdersReducer = (state= initialState, action:TProfileOrdersActions): TProfileOrdersState => {
    switch (action.type) {
        case WS_ORDERS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsOrdersConnected: true
            };

        case WS_ORDERS_CONNECTION_ERROR:
            return {
                ...state,
                wsOrdersConnected: false
            };

        case WS_ORDERS_CONNECTION_CLOSED:
            return {
                ...state,
                wsOrdersConnected: false
            };

        case WS_ORDERS_GET_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                totalSum: action.payload.total,
                totalTodaySum: action.payload.totalToday
            };
        default:
            return state;
    }
}