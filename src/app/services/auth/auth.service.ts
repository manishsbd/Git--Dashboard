import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticatedVar: boolean = false;
  get isAuth() {
    return this.isAuthenticatedVar;
  }
  setIsAuth(value: boolean) {
    this.isAuthenticatedVar = value;
  }
  constructor() { }
  // isAuthenticated(): boolean {
  //   return !!localStorage.getItem('loginData') ;
  // }
}
