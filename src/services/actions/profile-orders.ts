import {TFeed} from "../../utils/constants";

export const  WS_ORDERS_CONNECTION_CLOSED = 'WS_ORDERS_CONNECTION_CLOSED'
export const WS_ORDERS_CONNECTION_ERROR = 'WS_ORDERS_CONNECTION_ERROR'
export const  WS_ORDERS_CONNECTION_START = 'WS_ORDERS_CONNECTION_START'
export const   WS_ORDERS_CONNECTION_SUCCESS = 'WS_ORDERS_CONNECTION_SUCCESS'
export const WS_ORDERS_GET_MESSAGE = 'WS_ORDERS_GET_MESSAGE'
export const  WS_ORDERS_SEND_MESSAGE = 'WS_ORDERS_SEND_MESSAGE'

interface IWS_ORDERS_CONNECTION_CLOSED {
    readonly type: typeof WS_ORDERS_CONNECTION_CLOSED,
    payload: any
}
interface IWS_ORDERS_CONNECTION_ERROR {
    readonly type: typeof WS_ORDERS_CONNECTION_ERROR,
    payload: any
}
interface IWS_ORDERS_CONNECTION_START {
    readonly type: typeof WS_ORDERS_CONNECTION_START,
}
interface IWS_ORDERS_CONNECTION_SUCCESS {
    readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS,
    payload: any
}
interface IWS_ORDERS_GET_MESSAGE {
    readonly type: typeof WS_ORDERS_GET_MESSAGE,
    payload: any
}
interface IWS_ORDERS_SEND_MESSAGE {
    readonly type: typeof WS_ORDERS_CONNECTION_CLOSED,
    payload: any
}





export type TProfileOrdersActions =
    IWS_ORDERS_CONNECTION_CLOSED |
    IWS_ORDERS_CONNECTION_ERROR |
    IWS_ORDERS_CONNECTION_START |
    IWS_ORDERS_GET_MESSAGE |
    IWS_ORDERS_SEND_MESSAGE |
    IWS_ORDERS_CONNECTION_SUCCESS