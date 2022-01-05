import { ROOT_URL} from "../../utils/constants";

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS'
export const REGISTER_REQUEST_FAILED = 'REGISTER_REQUEST_FAILED'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS'
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS'
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED'

export function logout(form:{token: string}){
    return function(dispatch:any){
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