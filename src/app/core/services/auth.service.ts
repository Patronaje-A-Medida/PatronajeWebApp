import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAtelierToken } from '../models/user-atelier-token';
import { UserOwnerCreate } from '../models/user-owner-create';
import { AUTH_API } from '../utils/apis';
import { UserDataService } from './user-data.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly uri: string = AUTH_API + 'sign-up';

  constructor(
    private http: HttpClient,
    private userDataService: UserDataService
  ) {}

  signUpOwner(body: UserOwnerCreate): Observable<UserAtelierToken> {
    return this.http.post<UserAtelierToken>(`${this.uri}/test-sign-up`, body).pipe(
      map((res) => {
        const userData = res;
        this.userDataService.setValues(userData);
        return res;
      })
    );
  }
}
