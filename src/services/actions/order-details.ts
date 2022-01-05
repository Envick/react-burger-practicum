import {ROOT_URL} from "../../utils/constants";
import {CLEAR_CONSTRUCTOR} from "./constructor-ingredients";

export const TAKE_ORDER = 'TAKE_ORDER'
export const ORDER_FAILED = 'ORDER_FAILED'
export const ORDER_SUCCESS = 'ORDER_SUCCESS'

export function takeOrder(burgerOrder: {ingredients: string[]}, toggleModal:() => void){
    return function(dispatch:any){
        dispatch({type: TAKE_ORDER})

        fetch(`${ROOT_URL}/orders`, {
            method: 'POST',
            body: JSON.stringify(burgerOrder),
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