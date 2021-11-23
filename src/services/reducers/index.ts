import {ingredientsReducer} from "./ingredients";
import {combineReducers} from "redux";
import {constructorReducer} from "./constructor-ingredients";
import {ingredientDetailsReducer} from "./ingredient-details";
import {orderDetailsReducer} from "./order-details";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer
})