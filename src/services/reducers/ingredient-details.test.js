import {ingredientDetailsReducer} from "./ingredient-details";
import {SET_ACTIVE_INGREDIENT} from "../actions/ingredient-details";

describe('ingredientDetailsReducer', () => {
    const initialState = {}

    it('should return initial value', function () {
        expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState)
    })

    it('should work for set active ingredient', function () {
        expect(ingredientDetailsReducer(initialState, {
            type: SET_ACTIVE_INGREDIENT,
            payload: {
                _id: 1,
                name: "string",
                type: "string",
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 1,
                price: 1,
                image: "string",
                image_mobile: "string",
                image_large: "string",
                __v: 2,
            }
        })).toEqual({
            _id: 1,
            name: "string",
            type: "string",
            proteins: 1,
            fat: 1,
            carbohydrates: 1,
            calories: 1,
            price: 1,
            image: "string",
            image_mobile: "string",
            image_large: "string",
            __v: 2,
        })
    })
})