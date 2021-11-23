
import {SET_ACTIVE_INGREDIENT} from "../actions/ingredient-details";

const initialState = {}

export const ingredientDetailsReducer = (state = initialState, action:any) => {
    switch(action.type){
        case SET_ACTIVE_INGREDIENT: {
            return action.payload
        }
        default: {
            return state
        }
    }
}
