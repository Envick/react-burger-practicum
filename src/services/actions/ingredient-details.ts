import {TIngredient} from "../../utils/constants";

export const SET_ACTIVE_INGREDIENT = 'SET_ACTIVE_INGREDIENT'

export interface ISET_ACTIVE_INGREDIENT {
    readonly type: typeof SET_ACTIVE_INGREDIENT
    payload: TIngredient
}

export type TIngredientDetailsActions = ISET_ACTIVE_INGREDIENT