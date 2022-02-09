import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../state/auth.actions';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  captchaResolved: boolean = false;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  submitRegistration( values: any ) {
    
    const { username, password, repeatedPassword } = values
    console.log(password, repeatedPassword, values)
    if ( password !== repeatedPassword ) {
      alert('Passwords must match!');
      return;
    }

    this.store.dispatch(AuthActions.registerUser({ username, password }));
  }

  afterCaptchaSolved( ev:any ) {
    this.captchaResolved = true;
  }
}
