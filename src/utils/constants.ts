export const ROOT_URL = 'https://norma.nomoreparties.space/api';
export type TIngredient = {
    _id: string,
    key: string,
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
