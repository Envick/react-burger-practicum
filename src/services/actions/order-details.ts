import {TAKE_ORDER_URL} from "../../utils/constants";

export const TAKE_ORDER = 'TAKE_ORDER'
export const ORDER_FAILED = 'ORDER_FAILED'
export const ORDER_SUCCESS = 'ORDER_SUCCESS'

export function take_order(data:any, toggleModal:any){
    return function(dispatch:any){
        dispatch({type: TAKE_ORDER})

        fetch(TAKE_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                }
            })
            .then((res: any) => {
                if(res && res.success){
                    dispatch({
                        type: ORDER_SUCCESS,
                        payload: res
                    })
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