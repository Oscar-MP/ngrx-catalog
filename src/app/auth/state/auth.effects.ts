import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { AuthServiceService } from "../shared/services/auth-service.service";

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    constructor (
        private actions$: Actions,
        private authService: AuthServiceService,
        private router: Router
    ) {}

    login$ = createEffect (() => {
        return this.actions$.pipe(
            ofType( AuthActions.login ),
            mergeMap( ( actions ) => this.authService.authenticate( actions.username, actions.password).pipe(
                map( data => AuthActions.loginSuccess({ userdata: data })),
                catchError( error => of(AuthActions.loginError({ error })))
            ))
        )
    })

    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType( AuthActions.registerUser ),
            mergeMap( (values: any ) => this.authService.registerUser( values.username, values.password ).pipe(
                map( data => AuthActions.registerUserSuccess({ userdata: data })),
                tap( () => { this.router.navigate(['/c'])}),
                catchError( err => of(AuthActions.registerUserError({ error: err })))
            ))
        )
    })


}