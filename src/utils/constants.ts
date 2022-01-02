
export const GET_INGREDIENTS_URL: string = 'https://norma.nomoreparties.space/api/ingredients';
export const TAKE_ORDER_URL: string = 'https://norma.nomoreparties.space/api/orders';
export const REGISTER_URL: string = 'https://norma.nomoreparties.space/api/auth/register';
export const LOGIN_URL: string = 'https://norma.nomoreparties.space/api/auth/login';
export const LOGOUT_URL: string = 'https://norma.nomoreparties.space/api/auth/logout';
export const TOKEN_URL: string = 'https://norma.nomoreparties.space/api/auth/token';
export const PROFILE_URL: string = 'https://norma.nomoreparties.space/api/auth/user';
export const SEND_EMAIL_URL: string = 'https://norma.nomoreparties.space/api/password-reset';
export const RESET_PASSWORD_URL: string = 'https://norma.nomoreparties.space/api/password-reset/reset';

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

export function setCookie(name:string, value:any, props?:any) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name:string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

const checkResponse = (res:any) => {
    return res.ok ? res.json() : res.json().then((err:any) => Promise.reject(err));
};

export const refreshToken = () => {
    return fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkResponse);
};

export const retriableFetch = async (url:string, options = {}) => {
    try {
        const res = await fetch(url, options);
        const result = await checkResponse(res);
        return result;
    } catch (err:any) {
        if (err.message === "jwt malformed") {
            const refreshData = await refreshToken(); // обновляем токен; пытаемся 1 раз, если не сложилось -- падаем с ошибкой
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            const authToken =   refreshData.accessToken.split('Bearer ')[1];
            setCookie("accessToken", authToken); // тут для примера accessToken храним в куке
            //@ts-ignore
            options.headers = options.headers ?? {} // если в переданных опциях не было хедеров, добавляем в options пустой объект по ключу headers
            //@ts-ignore
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); // повторяем оригинальный запрос с оригинальными options (+ дополнительным хедером)
            return await checkResponse(res); // если все равно проваливаемся -- значит не судьба :/
        } else {
            throw err;
        }
    }
};


export const sendResetEmail = (form:any) => {
    return fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form)
    }).then(checkResponse);
};

export const sendResetPasword = (form:any) => {
    return fetch(RESET_PASSWORD_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form)
    }).then(checkResponse);
};