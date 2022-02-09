export interface AuthState {
    isLogged: boolean;
    isLoading: boolean;
    username: string;
    userId: string;
    loggedAt?: Date;
    error: string;
}

export const initialState: AuthState = {
    isLogged: false,
    username: "",
    userId: "",
    loggedAt: undefined,
    error: "",
    isLoading: false
}