import {ROOT_URL, TAppDispatch, TUser} from "../../utils/constants";
import {TAppThunk} from "../../utils/hooks";

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS'
export const REGISTER_REQUEST_FAILED = 'REGISTER_REQUEST_FAILED'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS'
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS'
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED'

export interface IREGISTER_REQUEST {
    readonly type: typeof REGISTER_REQUEST;
}
export interface IREGISTER_REQUEST_SUCCESS {
    readonly type: typeof REGISTER_REQUEST_SUCCESS;
    payload: {
        accessToken: string,
        refreshToken: string,
        user: TUser
    }
}
export interface IREGISTER_REQUEST_FAILED {
    readonly type: typeof REGISTER_REQUEST_FAILED;
}
export interface ILOGIN_REQUEST {
    readonly type: typeof LOGIN_REQUEST;
}
export interface ILOGIN_REQUEST_SUCCESS {
    readonly type: typeof LOGIN_REQUEST_SUCCESS;
    payload: {
        accessToken: string,
        refreshToken: string,
        user: TUser
    }
}
export interface ILOGIN_REQUEST_FAILED {
    readonly type: typeof LOGIN_REQUEST_FAILED;
}
export interface ILOGOUT_REQUEST {
    readonly type: typeof LOGOUT_REQUEST;
}
export interface ILOGOUT_REQUEST_SUCCESS {
    readonly type: typeof LOGOUT_REQUEST_SUCCESS;
}
export interface ILOGOUT_REQUEST_FAILED {
    readonly type: typeof LOGOUT_REQUEST_FAILED;
}

export type TAuthActions =
    ILOGIN_REQUEST |
    ILOGIN_REQUEST_FAILED |
    ILOGIN_REQUEST_SUCCESS |
    ILOGOUT_REQUEST |
    ILOGOUT_REQUEST_FAILED |
    ILOGOUT_REQUEST_SUCCESS |
    IREGISTER_REQUEST |
    IREGISTER_REQUEST_FAILED |
    IREGISTER_REQUEST_SUCCESS


export function logout(form:{token: string}): TAppThunk{
    return function(dispatch: ){
        dispatch({type: LOGOUT_REQUEST})
        fetch(`${ROOT_URL}/auth/logout`, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                }
            })
            .then((res: any) => {
                if(res || res.success){
                    dispatch({
                        type: LOGOUT_REQUEST_SUCCESS,
                    })
                }
                else{
                    dispatch({
                        type: LOGOUT_REQUEST_FAILED
                    })
                }
            })
            .catch(e => {
                dispatch({
                    type: LOGOUT_REQUEST_FAILED
                })
            })
    }
}
export function login(form:{email: string, password: string}): TAppThunk{
    return function(dispatch:TAppDispatch){
        dispatch({type: LOGIN_REQUEST})

        fetch(`${ROOT_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                }
            })
            .then((res: any) => {
                if(res || res.success){
                    dispatch({
                        type: LOGIN_REQUEST_SUCCESS,
                        payload: res
                    })
                }
                else{
                    dispatch({
                        type: LOGIN_REQUEST_FAILED
                    })
                }
            })
            .catch(e => {
                dispatch({
                    type: LOGIN_REQUEST_FAILED
                })
            })
    }
}
export function register(form:{email: string, name: string, password: string}): TAppThunk{
    return function(dispatch:TAppDispatch){
        dispatch({type: REGISTER_REQUEST})

        fetch(`${ROOT_URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                }
            })
            .then((res: any) => {
                if(res || res.success){
                    dispatch({
                        type: REGISTER_REQUEST_SUCCESS,
                        payload: res
                    })
                }
                else{
                    dispatch({
                        type: REGISTER_REQUEST_FAILED
                    })
                }
            })
            .catch(e => {
                dispatch({
                    type: REGISTER_REQUEST_FAILED
                })
            })
    }
}