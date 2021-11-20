import {
    ADD_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_INGREDIENT,
    REMOVE_CONSTRUCTOR_INGREDIENT
} from "../actions/constructor-ingredients";

const initialState = {
    ingredients: [],
    bun: null
}

export const constructorReducer = (state = initialState, action: any) => {
    switch(action.type){
        case ADD_CONSTRUCTOR_INGREDIENT:{
            let item = {...action.payload, key:Math.floor(Math.random()*10000)}
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
        case REMOVE_CONSTRUCTOR_INGREDIENT :{
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item['key'] !== action.payload)
            }
        }
        default:{
            return {...state}
        }
    }
}