
import {SET_ACTIVE_INGREDIENT, TIngredientDetailsActions} from "../actions/ingredient-details";

const initialState = {}

export const ingredientDetailsReducer = (state = initialState, action:TIngredientDetailsActions) => {
    switch(action.type){
        case SET_ACTIVE_INGREDIENT: {
            return action.payload
        }
        default: {
            return state
        }
    }
}
