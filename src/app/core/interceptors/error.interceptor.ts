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
        console.log(err);
        if (err instanceof ErrorEvent) {
          errorDetail = {
            statusCode: 400,
            errorCode: 400,
            message: 'No se pudo realizar la acción, intente nuevamente'
          }
        } else if (err.error instanceof ProgressEvent) {
          errorDetail = {
            statusCode: 500, 
            errorCode: 500, 
            message: 'Ocurrió un error al registrarse'
          };
        } else {
          errorDetail = err.error;
        }

        return throwError(errorDetail);
      })
    );
  }
}
