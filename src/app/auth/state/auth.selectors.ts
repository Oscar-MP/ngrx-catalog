import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getLoginStatus = createSelector(
    getAuthFeatureState,
    state => state.isLogged
);

export const getUsername = createSelector(
    getAuthFeatureState,
    state => state.username
);

export const getUserId = createSelector(
    getAuthFeatureState,
    state => state.userId
);

export const getLoginDate = createSelector(
    getAuthFeatureState,
    state => state.loggedAt
);

export const isLoading = createSelector(
    getAuthFeatureState,
    state => state.isLoading
)

export const getLoginError = createSelector(
    getAuthFeatureState,
    state => state.error
)

export const isLogged = createSelector(
    getAuthFeatureState,
    state => state.isLogged
)