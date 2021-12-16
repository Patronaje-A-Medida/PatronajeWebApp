import { Injectable } from '@angular/core';
import { UserAtelierToken } from '../models/user-atelier-token';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {

  private _token: string = '';
  private _expiration: Date = new Date();
  private _userNames: string = '';
  private _userEmail: string = '';
  private _role: string = '';
  private _userId: number = 0;
  private _atelierId: number = 0;
  

  constructor() {}

  setValues(userData: UserAtelierToken): void {
    const { token, expiration } = userData.userToken;
    const { nameUser, lastNameUser, email, role, id, atelierId } = userData.userInfo;
    
    this.token = token;
    this.expiration = expiration;
    this.userNames = nameUser + lastNameUser;
    this.userEmail = email;
    this.userId = id;
    this.role = role;
    this.atelierId = atelierId;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get expiration(): Date {
    return this._expiration;
  }

  set expiration(value: Date) {
    this._expiration = value;
  }

  get userNames(): string {
    return this._userNames;
  }

  set userNames(value: string) {
    this._userNames = value;
  }

  get userEmail(): string {
    return this._userEmail;
  }

  set userEmail(value: string) {
    this._userEmail = value;
  }

  get role(): string {
    return this._role;
  }
  
  set role(value: string) {
    this._role = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get atelierId(): number {
    return this._atelierId;
  }
  
  set atelierId(value: number) {
    this._atelierId = value;
  }
}
