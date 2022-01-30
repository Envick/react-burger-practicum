import {profileOrdersReducer} from "./profile-orders";
import {
    WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_SUCCESS,
    WS_ORDERS_GET_MESSAGE
} from "../actions/profile-orders";

describe('profileOrdersReducer', () => {

    const initialState = {
        wsOrdersConnected: false,
        orders: [],
        totalSum: 0,
        totalTodaySum: 0,
    }

    it('should return the initial state feed', () => {
        expect(profileOrdersReducer(undefined, {})).toEqual(
            initialState
        )
    })
    it('should return the initial state WS_ORDERS_CONNECTION_SUCCESS', () => {
        expect(profileOrdersReducer(undefined, {
            type: WS_ORDERS_CONNECTION_SUCCESS
        })).toEqual(
            {
                ...initialState,
                wsOrdersConnected: true
            }
        )
    })
    it('should return the initial state WS_ORDERS_CONNECTION_ERROR', () => {
        expect(profileOrdersReducer(initialState, {
            type: WS_ORDERS_CONNECTION_ERROR
        })).toEqual(
            {
                ...initialState,
                wsOrdersConnected: false
            }
        )
    })
    it('should return the initial state WS_ORDERS_CONNECTION_CLOSED', () => {
        expect(profileOrdersReducer(initialState, {
            type: WS_ORDERS_CONNECTION_CLOSED
        })).toEqual(
            {
                ...initialState,
                wsOrdersConnected: false
            }
        )
    })
    it('should return the initial state WS_ORDERS_GET_MESSAGE', () => {
        expect(profileOrdersReducer({...initialState, wsOrdersConnected: true}, {
            type: WS_ORDERS_GET_MESSAGE,
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