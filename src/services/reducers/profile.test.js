import {profileReducer} from "./profile";
import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_REQUEST_FAILED,
    GET_PROFILE_REQUEST_SUCCESS,
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_REQUEST_FAILED, UPDATE_PROFILE_REQUEST_SUCCESS
} from "../actions/profile";

const state = {
    profileRequest: false,
    profileFailed: false,
    profile: {
        name: '',
        email: ''
    }
}

describe('profile reducer', () => {
    it('should return initial value', function () {
        expect(profileReducer(undefined, {})).toEqual(state)
    })
    it('should work for GET_PROFILE_REQUEST', function () {
        expect(profileReducer(state, {
            type: GET_PROFILE_REQUEST
        })).toEqual({
            ...state,
            profileRequest: true,
            profileFailed: false
        })
    })
    it('should work for GET_PROFILE_REQUEST_SUCCESS', function () {
        expect(profileReducer(state, {
            type: GET_PROFILE_REQUEST_SUCCESS,
            payload: {
                name: 'Mayrbek',
                email: 'envick1@mail.ru'
            }
        })).toEqual({
            ...state,
            profile: {
                name: 'Mayrbek',
                email: 'envick1@mail.ru'
            },
            profileRequest: false
        })
    })
    it('should work for GET_PROFILE_REQUEST_FAILED', function () {
        expect(profileReducer(state, {
            type: GET_PROFILE_REQUEST_FAILED
        })).toEqual({
            ...state,
            profileFailed: true
        })
    })
    it('should work for UPDATE_PROFILE_REQUEST', function () {
        expect(profileReducer(state, {
            type: UPDATE_PROFILE_REQUEST
        })).toEqual({
            ...state,
            profileRequest: true,
            profileFailed: false
        })
    })
    it('should work for UPDATE_PROFILE_REQUEST_SUCCESS', function () {
        expect(profileReducer({
            ...state,
            profile: {
                name: 'amir',
                email: 'amir@bk.ru'
            }
        }, {
            type: UPDATE_PROFILE_REQUEST_SUCCESS,
            payload: {
                name: 'Mayrbek',
                email: 'envick1@mail.ru'
            }
        })).toEqual({
            ...state,
            profile: {
                name: 'Mayrbek',
                email: 'envick1@mail.ru'
            },
            profileRequest: false
        })
    })
    it('should work for UPDATE_PROFILE_REQUEST_FAILED', function () {
        expect(profileReducer(state, {
            type: UPDATE_PROFILE_REQUEST_FAILED
        })).toEqual({
            ...state,
            profileFailed: true
        })
    })

})