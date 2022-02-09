import { createAction, props } from "@ngrx/store";

export const login = createAction(
  '[Auth] Login',
  props<{ username: string, password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] On Login Success',
    props<{ userdata: any }>()
);

export const loginError = createAction(
    '[Auth] On Login Failure',
    props<{ error: string }>()
);

export const setUserInfo = createAction(
    '[Auth] Set User Information',
    props<{ username: string, userId: string }>()
);

export const setUserLoginStatus = createAction(
    '[Auth] Set Login Status',
    props<{ isLogged: boolean }>()
)

export const toggleLoading = createAction(
    '[Auth] Toggle Loading State',
    props<{ loading: boolean | undefined }>()
)

export const registerUser = createAction(
    '[AUTH] Register New User',
    props<{ username: string, password: string }>()
)

export const registerUserSuccess = createAction(
    '[AUTH] Register Success',
    props<{ userdata: any }>()
)

export const registerUserError = createAction(
    '[AUTH] Register Failed',
    props<{error: string}>()
)