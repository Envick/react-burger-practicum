import {getCookie, PROFILE_URL} from "../../utils/constants";

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_OPTIONS_REQUEST'
export const UPDATE_PROFILE_REQUEST_SUCCESS = 'UPDATE_PROFILE_OPTIONS_REQUEST_SUCCESS'
export const UPDATE_PROFILE_REQUEST_FAILED = 'UPDATE_PROFILE_OPTIONS_REQUEST_FAILED'

export const GET_PROFILE_REQUEST = 'GET_PROFILE_OPTIONS_REQUEST'
export const GET_PROFILE_REQUEST_SUCCESS = 'GET_PROFILE_OPTIONS_REQUEST_SUCCESS'
export const GET_PROFILE_REQUEST_FAILED = 'GET_PROFILE_OPTIONS_REQUEST_FAILED'

export function getProfile(){
    return function(dispatch:any){
        dispatch({type: GET_PROFILE_REQUEST})

        fetch(PROFILE_URL, {
            headers: {
                authorization: `Bearer ${getCookie('accessToken')}`
            }
        })
            .then(res => {
                if(res.ok){
                    return res.json()
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