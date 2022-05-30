import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserAtelierToken } from '../models/auth/user-atelier-token';
import { UserLogin } from '../models/auth/user-login';
import { PagedResponse } from '../models/generics/paged-response';
import { OrderQuery } from '../models/orders/order-query';
import { OrderRead } from '../models/orders/order-read';
import { UserOwnerCreate } from '../models/users/user-owner-create';
import { UserTechnicianCreate } from '../models/users/user-technician-create';
import { UserTechnicianRead } from '../models/users/user-technician-read';
import { UserDataService } from './user-data.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly AUTH_API: string = environment.apiAuthUrl
  private readonly uriSignUp: string = this.AUTH_API + '/sign-up';
  private readonly uriSignIn: string = this.AUTH_API + '/sign-in';
  private readonly uriUserTechnician: string = this.AUTH_API + '/user-atelier';
  private readonly uriProfiles: string = this.AUTH_API + '/profiles';

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

  signUpTechnicia(body: UserTechnicianCreate): Observable<void> {
    body.bossId = this.userDataService.userId;
    body.atelierId = this.userDataService.atelierId;

    return this.http.post<void>(`${this.uriSignUp}/users-technician`, body);
  }

  getAllByAtelierId(): Observable<Array<UserTechnicianRead>> {

    return this.http.get<Array<UserTechnicianRead>>(`${this.uriUserTechnician}/${this.userDataService.atelierId}`);
  }

  resetPassword(email: string): Observable<boolean> {
    let data = new FormData();
    data.append('userEmail', email);

    return this.http.post<boolean>(`${this.uriProfiles}/reset-password`, data);
  }


}
