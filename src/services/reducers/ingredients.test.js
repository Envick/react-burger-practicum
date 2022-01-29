import {ingredientsReducer} from "./ingredients";
import {GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS} from "../actions/ingredients";

describe('ingredientReducer', () => {
    const initialState = {
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: []
    }

    it('should return initial value', function () {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState)
    })

    it('should work GET_INGREDIENTS', function () {
        expect(ingredientsReducer(initialState, {
            type: GET_INGREDIENTS,
        })).toEqual(
            {
                ...initialState,
                ingredientsRequest: true,
                ingredientsFailed: false
            }
        )
    })
    it('should work GET_INGREDIENTS_SUCCESS', function () {
        expect(ingredientsReducer(initialState, {
            type: GET_INGREDIENTS_SUCCESS,
            payload: [
                {
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
                },
                {
                    _id: 2,
                    name: "strin1g",
                    type: "string2",
                    proteins: 1,
                    fat: 1,
                    carbohydrates: 132,
                    calories: 1,
                    price: 13,
                    image: "string",
                    image_mobile: "string",
                    image_large: "string",
                    __v: 2,
                }
            ]
        })).toEqual(
            {
                ...initialState,
                ingredients: [
                    {
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
                    },
                        {
                            _id: 2,
                            name: "strin1g",
                            type: "string2",
                            proteins: 1,
                            fat: 1,
                            carbohydrates: 132,
                            calories: 1,
                            price: 13,
                            image: "string",
                            image_mobile: "string",
                            image_large: "string",
                            __v: 2,
                        }
                    ],
                ingredientsRequest: false
            }
        )
    })
    it('should work GET_INGREDIENTS_FAILED', function () {
        expect(ingredientsReducer(initialState, {
            type: GET_INGREDIENTS_FAILED,
        })).toEqual(
            {
                ...initialState,
                ingredientsFailed: true
            }
        )
    })
})