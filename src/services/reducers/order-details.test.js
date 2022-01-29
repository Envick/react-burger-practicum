
import {ORDER_FAILED, ORDER_SUCCESS, TAKE_ORDER} from "../actions/order-details";
import {orderDetailsReducer} from "./order-details";

describe('orderDetailsReducer', () => {
    const state = {
        orderDetailsRequest: false,
        orderDetailsFailed: false,
        orderDetails: null
    }

    it('should return initial value', function () {
        expect(orderDetailsReducer(undefined, {})).toEqual(state)
    })

    it('should work TAKE_ORDER', function () {
        expect(orderDetailsReducer(state, {
            type: TAKE_ORDER,
        })).toEqual(
            {
                ...state,
                orderDetailsRequest: true,
                orderDetailsFailed: false
            }
        )
    })
    it('should work ORDER_SUCCESS', function () {
        expect(orderDetailsReducer(state, {
            type: ORDER_SUCCESS,
            payload: {
                createdAt: "2022-01-29T08:43:51.548Z",
                ingredients: [
                    {
                        calories: 14,
                        carbohydrates: 11,
                        fat: 22,
                        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
                        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                        name: "Соус фирменный Space Sauce",
                        price: 80,
                        proteins: 50,
                        type: "sauce",
                        __v: 0,
                        _id: "60d3b41abdacab0026a733cd",
                    }
                ],
                name: "Space бургер",
                number: 8938,
                owner: {
                    createdAt: "2021-11-29T10:56:54.675Z",
                    email: "envick1@mail.ru",
                    name: "Envick111132312",
                    updatedAt: "2021-12-20T09:24:11.019Z",
                },
                price: 80,
                status: "done",
                updatedAt: "2022-01-29T08:43:51.841Z",
                _id: "61f4fe476d7cd8001b2d2da7",
            }
        })).toEqual(
            {
                ...state,
                orderDetailsRequest: false,
                orderDetails: {
                    createdAt: "2022-01-29T08:43:51.548Z",
                    ingredients: [
                        {
                            calories: 14,
                            carbohydrates: 11,
                            fat: 22,
                            image: "https://code.s3.yandex.net/react/code/sauce-04.png",
                            image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                            image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                            name: "Соус фирменный Space Sauce",
                            price: 80,
                            proteins: 50,
                            type: "sauce",
                            __v: 0,
                            _id: "60d3b41abdacab0026a733cd",
                        }
                    ],
                    name: "Space бургер",
                    number: 8938,
                    owner: {
                        createdAt: "2021-11-29T10:56:54.675Z",
                        email: "envick1@mail.ru",
                        name: "Envick111132312",
                        updatedAt: "2021-12-20T09:24:11.019Z",
                    },
                    price: 80,
                    status: "done",
                    updatedAt: "2022-01-29T08:43:51.841Z",
                    _id: "61f4fe476d7cd8001b2d2da7",
                }
            }
        )
    })
    it('should work ORDER_FAILED', function () {
        expect(orderDetailsReducer(state, {
            type: ORDER_FAILED,
        })).toEqual(
            {
                ...state,
                orderDetailsRequest: false,
                orderDetailsFailed: true,
            }
        )
    })
})