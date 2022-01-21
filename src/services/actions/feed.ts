
export const  WS_FEED_CONNECTION_CLOSED = 'WS_FEED_CONNECTION_CLOSED'
export const WS_FEED_CONNECTION_ERROR = 'WS_FEED_CONNECTION_ERROR'
export const  WS_FEED_CONNECTION_START = 'WS_FEED_CONNECTION_START'
export const   WS_FEED_CONNECTION_SUCCESS = 'WS_FEED_CONNECTION_SUCCESS'
export const WS_FEED_GET_MESSAGE = 'WS_FEED_GET_MESSAGE'
export const  WS_FEED_SEND_MESSAGE = 'WS_FEED_SEND_MESSAGE'

interface IWS_FEED_CONNECTION_CLOSED {
    readonly type: typeof WS_FEED_CONNECTION_CLOSED,
    payload: any
}
interface IWS_FEED_CONNECTION_ERROR {
    readonly type: typeof WS_FEED_CONNECTION_ERROR,
    payload: any
}
interface IWS_FEED_CONNECTION_START {
    readonly type: typeof WS_FEED_CONNECTION_START,
}
interface IWS_FEED_CONNECTION_SUCCESS {
    readonly type: typeof WS_FEED_CONNECTION_SUCCESS,
    payload: any
}
interface IWS_FEED_GET_MESSAGE {
    readonly type: typeof WS_FEED_GET_MESSAGE,
    payload: any
}
interface IWS_FEED_SEND_MESSAGE {
    readonly type: typeof WS_FEED_CONNECTION_CLOSED,
    payload: any
}





export type TFeedActions =
    IWS_FEED_CONNECTION_CLOSED |
    IWS_FEED_CONNECTION_ERROR |
    IWS_FEED_CONNECTION_START |
    IWS_FEED_GET_MESSAGE |
    IWS_FEED_SEND_MESSAGE |
    IWS_FEED_CONNECTION_SUCCESS
