import {ingredientsReducer} from "./ingredients";
import {combineReducers} from "redux";
import {constructorReducer} from "./constructor-ingredients";
import {ingredientDetailsReducer} from "./ingredient-details";
import {orderDetailsReducer} from "./order-details";
import {authReducer} from "./auth";
import {profileReducer} from "./profile";
import {profileOrdersReducer} from "./profile-orders";
import {feedReducer} from "./feed";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    profileOrders: profileOrdersReducer,
    constructorIngredients: constructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    auth: authReducer,
    profile: profileReducer,
    feed: feedReducer
})