import { User } from './../admin/shared/user';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(user: User) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      )
  }
  private setToken(responce: any) {
    if (responce) {
      const expData = new Date(new Date().getTime() + +responce.expiresIn * 1000)
      localStorage.setItem('fb-token-exp', expData.toString())
      localStorage.setItem('fb-token', responce.idToken)
    }
    else {
      localStorage.clear()
    }
  }
  get token(){
    const expDate = Number(localStorage.getItem('fb-token-exp'))
    if(Number(new Date) > expDate){
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }
  logout(){
    this.setToken(null)
  }
  isAuthenicated():boolean{
    return !!this.token
  }
}