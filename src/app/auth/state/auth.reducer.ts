import { createReducer, on } from "@ngrx/store";
import { initialState, AuthState } from "./auth.state";
import * as AuthActions from './auth.actions';

export const authReducer = createReducer<AuthState>(
    initialState,
    on(
        AuthActions.setUserLoginStatus,
        (state, action): AuthState => {
            return {
                ...state,
                isLogged: action.isLogged
            }
        }
    ),
    on(
        AuthActions.setUserInfo,
        (state, action): AuthState => {
            return {
                ...state,
                userId: action.userId,
                username: action.username
            }
        }
    ),
    on(
        AuthActions.login,
        (state) => {
            return {
                ...state,
                isLoading: true
            }
        }
    ),
    on(
        AuthActions.loginSuccess,
        AuthActions.registerUserSuccess,
        ( state, action ): AuthState => {
            return {
                ...state,
                userId: action.userdata.userId,
                username: action.userdata.username,
                loggedAt: new Date(),
                isLogged: true,
                error: "",
                isLoading: false
            }
        }
    ),
    on(
        AuthActions.loginError,
        (state, action): AuthState => {
            
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        }
    ),
    on(
        AuthActions.registerUserSuccess,
        (state, action): AuthState => {
            console.log(JSON.parse(localStorage.getItem('users') || ""))
            return {
                ...state
            }
        }
    )
);