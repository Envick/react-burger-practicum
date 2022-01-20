import {TIngredient} from "../../utils/constants";

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT'
export const ADD_CONSTRUCTOR_BUN = 'ADD_CONSTRUCTOR_BUN'
export const REPLACE_CONSTRUCTOR_BUN = 'REPLACE_CONSTRUCTOR_BUN'
export const CHANGE_CONSTRUCTOR_INGREDIENT_POSITION = 'CHANGE_CONSTRUCTOR_INGREDIENT_POSITION'
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT'
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR'

export interface IADD_CONSTRUCTOR_INGREDIENT {
    readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
    payload: TIngredient
}
export interface IADD_CONSTRUCTOR_BUN {
    readonly type: typeof ADD_CONSTRUCTOR_BUN;
    payload: TIngredient
}
export interface IREPLACE_CONSTRUCTOR_BUN {
    readonly type: typeof REPLACE_CONSTRUCTOR_BUN;
    payload: TIngredient
}
export interface ICHANGE_CONSTRUCTOR_INGREDIENT_POSITION {
    readonly type: typeof CHANGE_CONSTRUCTOR_INGREDIENT_POSITION;
    payload: {
        hoverIndex: number,
        dragIndex: number
    }
}
export interface IREMOVE_CONSTRUCTOR_INGREDIENT {
    readonly type: typeof REMOVE_CONSTRUCTOR_INGREDIENT;
    payload: number
}
export interface ICLEAR_CONSTRUCTOR {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TConstructorIngredientsActions =
    IADD_CONSTRUCTOR_BUN |
    IADD_CONSTRUCTOR_INGREDIENT |
    IREMOVE_CONSTRUCTOR_INGREDIENT |
    IREPLACE_CONSTRUCTOR_BUN |
    ICHANGE_CONSTRUCTOR_INGREDIENT_POSITION |
    ICLEAR_CONSTRUCTOR


