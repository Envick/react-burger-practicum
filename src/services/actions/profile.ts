import {getCookie,retriableFetch} from "../../utils/utils";
import {ROOT_URL, TAppDispatch, TUser} from "../../utils/constants";
import {TAppThunk} from "../../utils/hooks";

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_OPTIONS_REQUEST'
export const UPDATE_PROFILE_REQUEST_SUCCESS = 'UPDATE_PROFILE_OPTIONS_REQUEST_SUCCESS'
export const UPDATE_PROFILE_REQUEST_FAILED = 'UPDATE_PROFILE_OPTIONS_REQUEST_FAILED'

export const GET_PROFILE_REQUEST = 'GET_PROFILE_OPTIONS_REQUEST'
export const GET_PROFILE_REQUEST_SUCCESS = 'GET_PROFILE_OPTIONS_REQUEST_SUCCESS'
export const GET_PROFILE_REQUEST_FAILED = 'GET_PROFILE_OPTIONS_REQUEST_FAILED'

export interface IUPDATE_PROFILE_REQUEST {
    readonly type: typeof UPDATE_PROFILE_REQUEST
}
export interface IUPDATE_PROFILE_REQUEST_SUCCESS {
    readonly type: typeof UPDATE_PROFILE_REQUEST_SUCCESS
    payload: TUser
}
export interface IUPDATE_PROFILE_REQUEST_FAILED {
    readonly type: typeof UPDATE_PROFILE_REQUEST_FAILED
}
export interface IGET_PROFILE_REQUEST {
    readonly type: typeof GET_PROFILE_REQUEST
}
export interface IGET_PROFILE_REQUEST_SUCCESS {
    readonly type: typeof GET_PROFILE_REQUEST_SUCCESS
    payload: TUser
}
export interface IGET_PROFILE_REQUEST_FAILED {
    readonly type: typeof GET_PROFILE_REQUEST_FAILED
}

export type TProfileActions =
    IUPDATE_PROFILE_REQUEST |
    IUPDATE_PROFILE_REQUEST_FAILED |
    IUPDATE_PROFILE_REQUEST_SUCCESS |
    IGET_PROFILE_REQUEST |
    IGET_PROFILE_REQUEST_FAILED |
    IGET_PROFILE_REQUEST_SUCCESS


export function getProfile(){
    return function(dispatch:TAppDispatch){
        dispatch({type: GET_PROFILE_REQUEST})

        retriableFetch(`${ROOT_URL}/auth/user`, {
            headers: {
                authorization: `Bearer ${getCookie('accessToken')}`
            }
        })
        .then((res: any) => {
            if(res && res.success){
                dispatch({
                    type: GET_PROFILE_REQUEST_SUCCESS,
                    payload: res.user
                })
            }
            else{
                dispatch({
                    type: GET_PROFILE_REQUEST_FAILED
                })
            }
        })
        .catch(e => {
            dispatch({
                type: GET_PROFILE_REQUEST_FAILED
            })
        })
    }
}
export function updateProfile(form: {name: string, email: string, password: string }){
    return function(dispatch:TAppDispatch){
        dispatch({type: UPDATE_PROFILE_REQUEST})
        retriableFetch(`${ROOT_URL}/auth/user`, {
            method: "PATCH",
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${getCookie('accessToken')}`
            }
        })
        .then((res: any) => {
            if(res && res.success){
                dispatch({
                    type: UPDATE_PROFILE_REQUEST_SUCCESS,
                    payload: res.user
                })
            }
            else{
                dispatch({
                    type: UPDATE_PROFILE_REQUEST_FAILED
                })
            }
        })
        .catch(e => {
            dispatch({
                type: UPDATE_PROFILE_REQUEST_FAILED
            })
        })
    }
}