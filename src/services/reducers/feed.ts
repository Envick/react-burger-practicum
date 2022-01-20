import {TFeed} from "../../utils/constants";
import {
     WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_SUCCESS, WS_FEED_GET_MESSAGE
} from "../actions/feed";
import {TFeedActions} from "../actions/feed";

type TFeedState = {
    wsOrdersConnected: boolean,
    orders: TFeed[],
    totalSum: number,
    totalTodaySum: number
}

const initialState: TFeedState = {
    wsOrdersConnected: false,
    orders: [],
    totalSum: 0,
    totalTodaySum: 0,
}

export const feedReducer = (state= initialState, action:TFeedActions): TFeedState => {
    switch (action.type) {
        case WS_FEED_CONNECTION_SUCCESS:
            return {
                ...state,
                wsOrdersConnected: true
            };

        case WS_FEED_CONNECTION_ERROR:
            return {
                ...state,
                wsOrdersConnected: false
            };

        case WS_FEED_CONNECTION_CLOSED:
            return {
                ...state,
                wsOrdersConnected: false
            };

        case WS_FEED_GET_MESSAGE:
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