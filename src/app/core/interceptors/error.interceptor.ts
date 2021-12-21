import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDetail } from '../models/error-detail';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        let errorDetail: ErrorDetail;
        
        if (err instanceof ErrorEvent) {
          errorDetail = {
            statusCode: 400,
            errorCode: 400,
            message: 'No se pudo realizar la acción, intente nuevamente'
          }
        } else {
          errorDetail = err.error === null 
            ? err.error 
            : {
              statusCode: 500, 
              errorCode: 500, 
              message: 'Servidor no disponible'
            };
        }

        return throwError(errorDetail);
      })
    );
  }
}
