import { Injectable } from '@angular/core';
import { UserAtelierToken } from '../models/user-atelier-token';
import * as CryptoJS from 'crypto-js';  
import { USER_DATA_KEY } from '../utils/keys.constants';

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

  private SUPER_KEY: string = USER_DATA_KEY;
  

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

    const encrypt = CryptoJS.AES.encrypt(JSON.stringify(userData), this.SUPER_KEY).toString();
    sessionStorage.setItem('query', encrypt);
  }

  private getValues(): UserAtelierToken {
    const query = sessionStorage.getItem('query');
    if(query === null || query === undefined) return null;
    const bytes = CryptoJS.AES.decrypt(query, this.SUPER_KEY);
    const userData: UserAtelierToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return userData;
  }

  get token(): string {
    if(this._token === '') {
      const userData = this.getValues();
      if(userData === null) return this._token;
      return userData.userToken.token;
      // return userData?.userToken.token ?? this._token;
    }

    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get expiration(): Date {
    const userData = this.getValues();
    if(userData === null) return this._expiration;
    return userData.userToken.expiration;
  }

  set expiration(value: Date) {
    this._expiration = value;
  }

  get userNames(): string {
    if(this._userNames === '') {
      const userData = this.getValues();
      if(userData === null) return this._userNames;
      return userData.userInfo.nameUser + userData.userInfo.lastNameUser;
    }

    return this._userNames;
  }

  set userNames(value: string) {
    this._userNames = value;
  }

  get userEmail(): string {
    if(this._userEmail === '') {
      const userData = this.getValues();
      if(userData === null) return this._userEmail;
      return userData.userInfo.email;
    }

    return this._userEmail;
  }

  set userEmail(value: string) {
    this._userEmail = value;
  }

  get role(): string {
    if(this._role === '') {
      const userData = this.getValues();
      if(userData === null) return this._role;
      return userData.userInfo.role;
    }

    return this._role;
  }
  
  set role(value: string) {
    this._role = value;
  }

  get userId(): number {
    if(this._userId === 0) {
      const userData = this.getValues();
      if(userData === null) return this._userId;
      return userData.userInfo.id;
    }

    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get atelierId(): number {
    if(this._atelierId === 0) {
      const userData = this.getValues();
      if(userData === null) return this._atelierId;
      return userData.userInfo.atelierId;
    }

    return this._atelierId;
  }
  
  set atelierId(value: number) {
    this._atelierId = value;
  }
}
