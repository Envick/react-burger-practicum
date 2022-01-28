import {feedReducer} from "./feed";
import {
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_GET_MESSAGE
} from "../actions/feed";

describe('feedReducer', () => {

    const initialState = {
        wsOrdersConnected: false,
        orders: [],
        totalSum: 0,
        totalTodaySum: 0,
    }

    it('should return the initial state feed', () => {
        expect(feedReducer(undefined, {})).toEqual(
            initialState
        )
    })
    it('should return the initial state WS_FEED_CONNECTION_SUCCESS', () => {
        expect(feedReducer(undefined, {
            type: WS_FEED_CONNECTION_SUCCESS
        })).toEqual(
            {
                ...initialState,
                wsOrdersConnected: true
            }
        )
    })
    it('should return the initial state WS_FEED_CONNECTION_ERROR', () => {
        expect(feedReducer(initialState, {
            type: WS_FEED_CONNECTION_ERROR
        })).toEqual(
            {
                ...initialState,
                wsOrdersConnected: false
            }
        )
    })
    it('should return the initial state WS_FEED_CONNECTION_CLOSED', () => {
        expect(feedReducer(initialState, {
            type: WS_FEED_CONNECTION_CLOSED
        })).toEqual(
            {
                ...initialState,
                wsOrdersConnected: false
            }
        )
    })
    it('should return the initial state WS_FEED_GET_MESSAGE', () => {
        expect(feedReducer({...initialState, wsOrdersConnected: true}, {
            type: WS_FEED_GET_MESSAGE,
            payload: {
                orders:[
                    {
                        ingredients: ['1', '2'],
                        "_id": "string",
                        status: "string",
                        name: "string",
                        number: 1,
                        createdAt: "string",
                        updatedAt: "string"
                    }],
                total: 200,
                totalToday: 20000
            }
        })).toEqual(
            {
                wsOrdersConnected: true,
                orders: [
                    {
                        ingredients: ['1', '2'],
                        "_id": "string",
                        status: "string",
                        name: "string",
                        number: 1,
                        createdAt: "string",
                        updatedAt: "string"
                    }
                ],
                totalSum: 200,
                totalTodaySum: 20000
            }
        )
    })
})