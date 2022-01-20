import {ROOT_URL, TAppDispatch, TIngredient} from "../../utils/constants";
import {TAppThunk} from "../../utils/hooks";

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

export interface IGET_INGREDIENTS {
    readonly type: typeof GET_INGREDIENTS
}
export interface IGET_INGREDIENTS_FAILED {
    readonly type: typeof GET_INGREDIENTS_FAILED
}
export interface IGET_INGREDIENTS_SUCCESS {
    readonly type: typeof GET_INGREDIENTS_SUCCESS
    payload: TIngredient[]
}

export type TIngredientActions = IGET_INGREDIENTS | IGET_INGREDIENTS_SUCCESS | IGET_INGREDIENTS_FAILED


export function getIngredients(){
    return function(dispatch:TAppDispatch){
        dispatch({type: GET_INGREDIENTS})

        fetch(`${ROOT_URL}/ingredients`)
            .then(res => {
                if(res.ok){
                    return res.json()
                }
            })
            .then((res: any) => {
                if(res && res.success){
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        payload: res.data
                    })
                }
                else{
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    })
                }
            })
            .catch(e => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            })
    }
}