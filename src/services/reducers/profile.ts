import {GET_PROFILE_REQUEST, GET_PROFILE_REQUEST_FAILED, GET_PROFILE_REQUEST_SUCCESS} from "../actions/profile";

const initialState = {
    profileRequest: false,
    profileFailed: false,
    profile: {}
}

export const profileReducer = (state=initialState, action:any) => {
    switch (action.type){
        case GET_PROFILE_REQUEST:{
            return {
                ...state,
                profileRequest: true,
                profileFailed: false
            }
        }
        case GET_PROFILE_REQUEST_SUCCESS:{
            return {
                ...state,
                profile: action.payload.user,
                profileRequest: false
            }
        }
        case GET_PROFILE_REQUEST_FAILED:{
            return {
                ...initialState,
                profileFailed: true
            }
        }
        default:{
            return state
        }
    }
}