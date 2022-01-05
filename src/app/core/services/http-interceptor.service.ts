import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private readonly dialogService: DialogService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error instanceof HttpErrorResponse && error.status >= 500) {
            this.dialogService.openSnackBar(`Server unavailable.`);
          }
          if (error.status === 404 && !error.error.statusCode) {
            this.dialogService.openSnackBar(`Network error, please check your connection.`);
          }
          return throwError(() => error);
        })
      );
  }

}
