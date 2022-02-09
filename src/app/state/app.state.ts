
// Avoid importing states in order to not break the lazy loading. Instead we extend 
// the interface in each state.

import { AuthState } from "../auth/state/auth.state";

export interface State {
    root: any;
    auth: AuthState;
}