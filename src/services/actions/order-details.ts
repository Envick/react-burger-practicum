import {ROOT_URL, TAppDispatch, TOrder} from "../../utils/constants";
import {CLEAR_CONSTRUCTOR} from "./constructor-ingredients";
import {TAppThunk} from "../../utils/hooks";
import {checkResponse, getCookie} from "../../utils/utils";

export const TAKE_ORDER = 'TAKE_ORDER'
export const ORDER_FAILED = 'ORDER_FAILED'
export const ORDER_SUCCESS = 'ORDER_SUCCESS'

export interface ITAKE_ORDER {
    readonly type: typeof TAKE_ORDER
}
export interface IORDER_FAILED {
    readonly type: typeof ORDER_FAILED
}
export interface IORDER_SUCCESS {
    readonly type: typeof ORDER_SUCCESS
    payload: TOrder
}

export type TOrderActions = ITAKE_ORDER | IORDER_FAILED | IORDER_SUCCESS

export function takeOrder(burgerOrder: {ingredients: string[]}, toggleModal:() => void){
    return function(dispatch:TAppDispatch){
        dispatch({type: TAKE_ORDER})

        fetch(`${ROOT_URL}/orders`, {
            method: 'POST',
            body: JSON.stringify(burgerOrder),
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + getCookie('accessToken')
            },
        })
            .then(checkResponse)
            .then(res => {
                if(res && res.success){
                    dispatch({
                        type: ORDER_SUCCESS,
                        payload: res
                    })
                    dispatch({type: CLEAR_CONSTRUCTOR})
                    toggleModal()
                }
                else{
                    dispatch({
                        type: ORDER_FAILED
                    })
                }
            })
            .catch(e => {
                dispatch({
                    type: ORDER_FAILED
                })
            })
    }
}