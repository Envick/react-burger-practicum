import {authReducer} from "./auth";
import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILED, LOGIN_REQUEST_SUCCESS, LOGOUT_REQUEST, LOGOUT_REQUEST_FAILED, LOGOUT_REQUEST_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_REQUEST_FAILED,
    REGISTER_REQUEST_SUCCESS
} from "../actions/auth";

describe('authReducer', () => {

    const initialState = {
        registerRequest: false,
        registerFailed: false,
        loginRequest: false,
        loginFailed: false,
        logoutFailed: false,
        logoutRequest: false,
        isAuth: false
    }

    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(
            initialState
        )
    })

    it('should handle register request', () => {
        expect(
            authReducer(initialState, {
                type: REGISTER_REQUEST,
            })
        ).toEqual(
            {
                ...initialState,
                registerRequest: true,
                registerFailed: false
            }
        )
        expect(
            authReducer(initialState, {
                type: REGISTER_REQUEST_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
                registerFailed: true
            }
        )
        expect(
            authReducer(initialState, {
                type: REGISTER_REQUEST_SUCCESS,
                payload: {
                    accessToken: 'Bearer 2132',
                    refreshToken: 'sadsad'
                }
            })
        ).toEqual(
            {
                ...initialState,
                isAuth: true,
                registerRequest: false
            }
        )
    })
    it('should handle login request', () => {
        expect(
            authReducer(initialState, {
                type: LOGIN_REQUEST,
            })
        ).toEqual(
            {
                ...initialState,
                loginRequest: true,
                loginFailed: false
            }
        )
        expect(
            authReducer(initialState, {
                type:   LOGIN_REQUEST_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
                loginFailed: true
            }
        )
        expect(
            authReducer(initialState, {
                type: LOGIN_REQUEST_SUCCESS,
                payload: {
                    accessToken: 'Bearer 2132',
                    refreshToken: 'sadsad'
                }
            })
        ).toEqual(
            {
                ...initialState,
                isAuth: true,
                loginRequest: false
            }
        )
    })
    it('should handle logout request', () => {
        expect(
            authReducer(initialState, {
                type: LOGOUT_REQUEST,
            })
        ).toEqual(
            {
                ...initialState,
                logoutRequest: true,
                logoutFailed: false
            }
        )
        expect(
            authReducer(initialState, {
                type: LOGOUT_REQUEST_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
                logoutFailed: true
            }
        )
        expect(
            authReducer(initialState, {
                type: LOGOUT_REQUEST_SUCCESS,
                payload: {
                    refreshToken: 'sadsad'
                }
            })
        ).toEqual(
            {
                ...initialState,
                isAuth: false,
                logoutRequest: false
            }
        )
    })
}) 