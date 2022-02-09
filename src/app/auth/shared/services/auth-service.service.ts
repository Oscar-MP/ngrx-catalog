import { Injectable } from '@angular/core';
import {  Observable, of, throwError } from 'rxjs';
import { delay, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  readonly users = [ 
    { userId: 'fff8459f-0558-45a1-8b57-da099eb00065', username: 'test@test', password: 'test'}, 
    { userId: 'b91de111-8b37-4290-8628-61873ccd7677', username: 'osakr@test', password: 'test'}]

  constructor() {

   }

  authenticate( username: string, password: string ) {
    const users = this.getUsers();
    const user = users.filter( u => u.username === username)[0];

    if (!user || user.password !== password) {
      return of(false).pipe(
        delay(1500),
        switchMap(() => {
          return throwError(() => new Error('Invalid username/password'))
        })
      );
    } 
    
    return of( user ).pipe(
      delay(1500)
    )
  }

  getUsers(): any[] {
    // This is dummy! Just for testing 
    // Gets users from localstorage 

    const users: string = localStorage.getItem('users') || ""

    if (!users) {
      localStorage.setItem('users', JSON.stringify(this.users));
      return this.users;
    }

    return JSON.parse(users) || [];
  }


  registerUser( username: string, password: string ): Observable<any> {
    const users = this.getUsers();
    const uuid = 'b91de111-8b37-4290-8628-61873ccd' + Math.floor(Math.random()*4);
    const user  = { userId: uuid, username, password };

    try {

      if ( users.map(u => u.username).includes(username) ) {
        throw new Error('User already exists')
      }

      localStorage.setItem('users', JSON.stringify([
        ... users,
        user
      ]));

      return of(user).pipe(delay(1000))
      
    } catch ( err ) {
      return throwError(() => new Error('Could not register user'))
    }
  }
}
