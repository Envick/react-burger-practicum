import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_REQUEST_FAILED,
    GET_PROFILE_REQUEST_SUCCESS, TProfileActions,
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_REQUEST_FAILED, UPDATE_PROFILE_REQUEST_SUCCESS
} from "../actions/profile";
import {TUser} from "../../utils/constants";

type TProfileState = {
    profileRequest: boolean,
    profileFailed: boolean,
    profile: TUser
}

const initialState: TProfileState = {
    profileRequest: false,
    profileFailed: false,
    profile: {}
}

export const profileReducer = (state= initialState, action:TProfileActions): TProfileState => {
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
                profile: action.payload,
                profileRequest: false
            }
        }
        case GET_PROFILE_REQUEST_FAILED:{
            return {
                ...initialState,
                profileFailed: true
            }
        }
        case UPDATE_PROFILE_REQUEST:{
            return {
                ...state,
                profileRequest: true,
                profileFailed: false
            }
        }
        case UPDATE_PROFILE_REQUEST_SUCCESS:{
            return {
                ...state,
                profile: action.payload,
                profileRequest: false
            }
        }
        case UPDATE_PROFILE_REQUEST_FAILED:{
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