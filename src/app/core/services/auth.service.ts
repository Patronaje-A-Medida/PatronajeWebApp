import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAtelierToken } from '../models/user-atelier-token';
import { UserLogin } from '../models/user-login';
import { UserOwnerCreate } from '../models/user-owner-create';
import { AUTH_API } from '../utils/apis.constants';
import { UserDataService } from './user-data.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly uriSignUp: string = AUTH_API + '/sign-up';
  private readonly uriSignIn: string = AUTH_API + '/sign-in';

  constructor(
    private http: HttpClient,
    private userDataService: UserDataService
  ) {}

  signUpOwner(body: UserOwnerCreate): Observable<UserAtelierToken> {
    return this.http.post<UserAtelierToken>(`${this.uriSignUp}/users-owner`, body).pipe(
      map((res) => {
        const userData = res;
        this.userDataService.setValues(userData);
        return res;
      })
    );
  }

  signInUser(body: UserLogin): Observable<UserAtelierToken> {
    return this.http.post<UserAtelierToken>(`${this.uriSignIn}/users-atelier`, body).pipe(
      map((res) => {
        const userData = res;
        this.userDataService.setValues(userData);
        return res;
      })
    );
  }

  get isLogged(): boolean {
    return this.userDataService.isLogged;
  }

}
