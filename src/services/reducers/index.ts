import {ingredientsReducer} from "./ingredients";
import {combineReducers} from "redux";
import {constructorReducer} from "./constructor-ingredients";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorReducer,
})