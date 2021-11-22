import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
} from "../actions/ingredients";

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: []
}

export const ingredientsReducer = (state=initialState, action:any) => {
    switch (action.type){
        case GET_INGREDIENTS:{
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false
            }
        }
        case GET_INGREDIENTS_SUCCESS:{
            return {
                ...state,
                ingredients: action.payload,
                ingredientsRequest: false
            }
        }
        case GET_INGREDIENTS_FAILED:{
            return {
                ...initialState,
                ingredientsFailed: true,
                ingredientsRequest: false
            }
        }
        default:{
            return {
                ...state
            }
        }
    }
}