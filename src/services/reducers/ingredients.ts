import {
    DEC_INGREDIENT_COUNT,
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    INC_INGREDIENT_COUNT
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
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            }
        }
        case INC_INGREDIENT_COUNT:{
            return{
                ...state,
                ingredients: state.ingredients.map((item: any) => {
                    if(item['_id'] === action.payload){
                        if(item['type'] === 'bun' && item['count']){
                            return item
                        }
                        else{
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            item['count'] = item['count'] ? ++item['count'] : 1
                        }
                    }
                    return item
                })
            }
        }
        case DEC_INGREDIENT_COUNT:{
            return {
                ...state,
                ingredients: state.ingredients.map((item: any) => {
                    if(item['_id'] === action.payload){
                        item['count']--
                    }
                    return item
                })
            }
        }
        default:{
            return {
                ...state
            }
        }
    }
}