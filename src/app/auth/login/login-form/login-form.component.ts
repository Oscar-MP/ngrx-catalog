import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as AuthActions from '../../state/auth.actions';
import * as AuthSelectors from '../../state/auth.selectors';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: any;
  isLoading$!: Observable<boolean>;

  keepUserLogged: boolean = false;
  rememberUsername: boolean = false;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(AuthSelectors.isLoading);
  }

  submitLogin( values: any ) {
    this.store.dispatch(AuthActions.login({
      username: values.username || "",
      password: values.password || ""
    }));
    
  }
}
