import {ingredientsReducer} from "./ingredients";
import {combineReducers} from "redux";
import {constructorReducer} from "./constructor-ingredients";
import {ingredientDetailsReducer} from "./ingredient-details";
import {orderDetailsReducer} from "./order-details";
import {authReducer} from "./auth";
import {profileReducer} from "./profile";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    auth: authReducer,
    profile: profileReducer
})