import PropTypes from "prop-types";

export const GET_INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
export const TAKE_ORDER_URL = 'https://norma.nomoreparties.space/api/orders';
export const REGISTER_URL = 'https://norma.nomoreparties.space/api/auth/register';
export const LOGIN_URL = 'https://norma.nomoreparties.space/api/auth/login';
export const LOGOUT_URL = 'https://norma.nomoreparties.space/api/auth/logout';
export const TOKEN_URL = 'https://norma.nomoreparties.space/api/auth/token';
export const PROFILE_URL = 'https://norma.nomoreparties.space/api/auth/user';

export const menuItemPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
});

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