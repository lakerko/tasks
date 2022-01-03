import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private readonly dialogService: DialogService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.warn('req', req);
    return next
      .handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error instanceof HttpErrorResponse) {
            switch(error.status) {
              case 404: {
                console.log('!!!!error', error);
                this.dialogService.openSnackBar(`Error occured. ${this.getErrorMessage(req.method)}`);
                return of(error as any);
              }
              default: {
                return of(error as any);
              }
            }
          }
          return of(error as any);
          // return throwError(error as HttpEvent<any>);
        })
      );
  }

  getErrorMessage(method: string): string {
    switch(method) {
      case 'DELETE': {
        return `Task couldn't be deleted`;
      }
      default: {
        return '';
      }
    }
  }

}
