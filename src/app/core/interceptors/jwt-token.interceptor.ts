import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDataService } from '../services/user-data.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private userDataService: UserDataService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isLogged: boolean = this.userDataService.isLogged;
    const isApiGestion: boolean = request.url.startsWith(environment.apiGestionUrl);

    if(isLogged && isApiGestion) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${this.userDataService.token}`}
      });
    }

    return next.handle(request);

  }
}
