import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS, TIngredientActions,
} from "../actions/ingredients";
import {TIngredient} from "../../utils/constants";

type TIngredientsState = {
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    ingredients: TIngredient[]
}

const initialState: TIngredientsState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: []
}

export const ingredientsReducer = (state=initialState, action:TIngredientActions): TIngredientsState => {
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
                ingredientsFailed: true
            }
        }
        default:{
            return state
        }
    }
}