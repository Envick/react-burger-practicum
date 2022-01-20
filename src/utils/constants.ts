import {store} from "../index";
import {TAppActions, TAppThunk} from "./hooks";

export const ROOT_URL = 'https://norma.nomoreparties.space/api';
export type TIngredient = {
    _id: string,
    key?: number,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
}

export type TClientRect = {
    top: number,
    left: number,
    bottom: number,
    right: number,
    width: number,
    height: number
}

export type TUser = {
    name: string,
    email: string,
}

export type TOrder = {
    name: string,
    order: {
        number: number
    },
    success: boolean
}

export type TFeed = {
    ingredients: string[],
    "_id": string,
    status: string,
    name: string,
    number: number,
    createdAt: string,
    updatedAt: string
}

export type TRootState = ReturnType<typeof store.getState>

export type TAppDispatch = <TReturnType>(action: TAppActions | TAppThunk) => TReturnType;
