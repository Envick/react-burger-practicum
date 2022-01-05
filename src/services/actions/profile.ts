import {getCookie,retriableFetch} from "../../utils/utils";
import {ROOT_URL} from "../../utils/constants";

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_OPTIONS_REQUEST'
export const UPDATE_PROFILE_REQUEST_SUCCESS = 'UPDATE_PROFILE_OPTIONS_REQUEST_SUCCESS'
export const UPDATE_PROFILE_REQUEST_FAILED = 'UPDATE_PROFILE_OPTIONS_REQUEST_FAILED'

export const GET_PROFILE_REQUEST = 'GET_PROFILE_OPTIONS_REQUEST'
export const GET_PROFILE_REQUEST_SUCCESS = 'GET_PROFILE_OPTIONS_REQUEST_SUCCESS'
export const GET_PROFILE_REQUEST_FAILED = 'GET_PROFILE_OPTIONS_REQUEST_FAILED'

export function getProfile(){
    return function(dispatch:any){
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
                        payload: res
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
export function updateProfile(form:any){
    return function(dispatch:any){
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
                        payload: res
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