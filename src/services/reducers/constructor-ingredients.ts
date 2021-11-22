import {
    ADD_CONSTRUCTOR_BUN,
    REPLACE_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_INGREDIENT, CHANGE_CONSTRUCTOR_INGREDIENT_POSITION,
    REMOVE_CONSTRUCTOR_INGREDIENT
} from "../actions/constructor-ingredients";

const initialState = {
    ingredients: [],
    bun: null
}

export const constructorReducer = (state = initialState, action: any) => {
    switch(action.type){
        case ADD_CONSTRUCTOR_INGREDIENT:{
            const item = {...action.payload, key:Math.floor(Math.random()*10000)}
            return{
                ...state,
                ingredients: [...state.ingredients, item]
            }
        }
        case ADD_CONSTRUCTOR_BUN:{
            return {
                ...state,
                bun: action.payload
            }
        }
        case REPLACE_CONSTRUCTOR_BUN:{
            return {
                ...state,
                bun: action.payload
            }
        }
        case REMOVE_CONSTRUCTOR_INGREDIENT :{
            return {
                ...state,
                ingredients: [...state.ingredients].filter(item => item['key'] !== action.payload)
            }
        }
        case CHANGE_CONSTRUCTOR_INGREDIENT_POSITION:{
            const ingredients = [...state.ingredients];
            ingredients.splice(action.payload.hoverIndex, 0, ingredients.splice(action.payload.dragIndex, 1)[0]);
            return {
                ...state,
                ingredients: ingredients
            }
        }
        default:{
            return state
        }
    }
}