import {GET_INGREDIENTS_URL} from "../../utils/constants";

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const INC_INGREDIENT_COUNT = 'INC_INGREDIENT_COUNT';
export const DEC_INGREDIENT_COUNT = 'DEC_INGREDIENT_COUNT';

export function getIngredients(){
    return function(dispatch:any){
        dispatch({type: GET_INGREDIENTS})

        fetch(GET_INGREDIENTS_URL)
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