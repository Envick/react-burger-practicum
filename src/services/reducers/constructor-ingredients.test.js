import {constructorReducer} from "./constructor-ingredients";
import {
    ADD_CONSTRUCTOR_INGREDIENT, CHANGE_CONSTRUCTOR_INGREDIENT_POSITION, CLEAR_CONSTRUCTOR,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    REPLACE_CONSTRUCTOR_BUN
} from "../actions/constructor-ingredients";

const initialState = {
    ingredients: [],
    bun: null
}

describe(' constructor ingredients reducer', () => {
    it('should return initial value', function () {
        expect(constructorReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle ADD_CONSTRUCTOR_INGREDIENT', function () {
        jest.spyOn(Math, 'floor').mockImplementationOnce(() => 1)
        expect(constructorReducer(initialState, {
            type: ADD_CONSTRUCTOR_INGREDIENT,
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
            ...initialState,
            ingredients: [
                {
                    key: 1,
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
            ]
        })
    })

    it('should handle ADD_CONSTRUCTOR_BUN', function () {
        jest.spyOn(Math, 'floor').mockImplementationOnce(() => 1)
        expect(constructorReducer(initialState, {
            type: REPLACE_CONSTRUCTOR_BUN,
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
            ...initialState,
            bun: {
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
        })
    })

    it('should handle REPLACE_CONSTRUCTOR_BUN', function () {
        jest.spyOn(Math, 'floor').mockImplementationOnce(() => 1)
        expect(constructorReducer({
            ...initialState,
            bun: {
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
        }, {
            type: REPLACE_CONSTRUCTOR_BUN,
            payload: {
                _id: 2,
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
            ...initialState,
            bun: {
                _id: 2,
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
        })
    })

    it('should handle REMOVE_CONSTRUCTOR_INGREDIENT', function () {

        jest.spyOn(global.Math, "floor").mockReturnValue(1);

        expect(constructorReducer({
            ...initialState,
            ingredients: [
                {
                    _id: 1,
                    key: 1,
                    name: "sauce",
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
                    key: 2,
                    name: "bun",
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
            ]
        }, {
            type: REMOVE_CONSTRUCTOR_INGREDIENT,
            payload: 2
        })).toEqual({
            ...initialState,
            ingredients: [
                {
                    _id: 1,
                    key: 1,
                    name: "sauce",
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
            ]
        })
        jest.spyOn(global.Math, "floor").mockRestore();
    })

    it('should handle CHANGE_CONSTRUCTOR_INGREDIENT_POSITION', function () {

        expect(constructorReducer({
            ...initialState,
            ingredients: [
                {
                    _id: 1,
                    key: 1,
                    name: "sauce",
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
                    key: 2,
                    name: "bun",
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
                    _id: 3,
                    key: 3,
                    name: "burger",
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
            ]
        }, {
            type: CHANGE_CONSTRUCTOR_INGREDIENT_POSITION,
            payload: {
                dragIndex: 2,
                hoverIndex: 0
            }
        })).toEqual({
            ...initialState,
            ingredients: [
                {
                    _id: 3,
                    key: 3,
                    name: "burger",
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
                    _id: 1,
                    key: 1,
                    name: "sauce",
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
                    key: 2,
                    name: "bun",
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

            ]
        })
    })

    it('should handle CLEAR_CONSTRUCTOR', function () {
        expect(constructorReducer({
            bun: null,
            ingredients: [
                {
                    _id: 3,
                    key: 3,
                    name: "burger",
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
                    _id: 1,
                    key: 1,
                    name: "sauce",
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
                    key: 2,
                    name: "bun",
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

            ]
        }, {
            type: CLEAR_CONSTRUCTOR,
        })).toEqual(initialState)
    })
})