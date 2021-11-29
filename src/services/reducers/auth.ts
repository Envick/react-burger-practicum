import {REGISTER_REQUEST, REGISTER_REQUEST_FAILED, REGISTER_REQUEST_SUCCESS} from "../actions/auth";
import {getCookie, setCookie} from "../../utils/constants";
import {LOGIN_REQUEST, LOGIN_REQUEST_FAILED, LOGIN_REQUEST_SUCCESS} from "../actions/auth";

const initialState = {
    registerRequest: false,
    registerFailed: false,
    loginRequest: false,
    loginFailed: false,
    isAuth: Boolean(getCookie('accessToken'))
}

export const authReducer = (state=initialState, action:any) => {
    switch (action.type){
        case REGISTER_REQUEST:{
            return {
                ...state,
                registerRequest: true,
                registerFailed: false
            }
        }
        case REGISTER_REQUEST_SUCCESS:{
            const authToken = action.payload.accessToken.split('Bearer ')[1];
            if (authToken) {
                // Сохраняем токен в куку token
                setCookie('accessToken', authToken, {expires: 1200});
            }
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            return {
                ...state,
                isAuth: true,
                registerRequest: false
            }
        }
        case REGISTER_REQUEST_FAILED:{
            return {
                ...initialState,
                registerFailed: true
            }
        }
        case LOGIN_REQUEST:{
            return {
                ...state,
                loginRequest: true,
                loginFailed: false
            }
        }
        case LOGIN_REQUEST_SUCCESS:{
            const authToken = action.payload.accessToken.split('Bearer ')[1];
            if (authToken) {
                // Сохраняем токен в куку token
                setCookie('accessToken', authToken, {expires: 1200});
            }
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            return {
                ...state,
                isAuth: true,
                loginRequest: false
            }
        }
        case LOGIN_REQUEST_FAILED:{
            return {
                ...initialState,
                loginFailed: true
            }
        }
        default:{
            return state
        }
    }
}