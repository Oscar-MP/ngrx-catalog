import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as AuthSelectors from '../state/auth.selectors'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  error$!: Observable<string>;
  sub!: Subscription;

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.error$ = this.store.select(AuthSelectors.getLoginError);

    this.sub = this.store.select(AuthSelectors.isLogged).subscribe(
      ( status ) => {
        if (status) {
          // The user is already logged
          this.router.navigate(['/c']);
        }
      }
    );

  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
