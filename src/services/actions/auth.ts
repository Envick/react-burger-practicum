import {LOGIN_URL, LOGOUT_URL, REGISTER_URL} from "../../utils/constants";

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS'
export const REGISTER_REQUEST_FAILED = 'REGISTER_REQUEST_FAILED'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS'
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS'
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED'

export function logout(form:any){
    return function(dispatch:any){
        dispatch({type: LOGOUT_REQUEST})

        fetch(LOGOUT_URL, {
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
                if(res && res.success){
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
export function login(form:any){
    return function(dispatch:any){
        dispatch({type: LOGIN_REQUEST})

        fetch(LOGIN_URL, {
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
                if(res && res.success){
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
export function register(form:any){
    return function(dispatch:any){
        dispatch({type: REGISTER_REQUEST})

        fetch(REGISTER_URL, {
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
                if(res && res.success){
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