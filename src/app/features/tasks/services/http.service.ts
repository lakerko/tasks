import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { DialogService } from 'src/app/core/services/dialog.service';
import { LoadingService } from 'src/app/core/services/loading.service';

import { GenericTask, TaskPayload } from '../models/tasks.model';

@Injectable()
export class HttpService {
  private baseUrl: string = 'http://64.225.105.163:3000/tasks';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly dialogService: DialogService,
    private readonly loadingService: LoadingService,
  ) { }

  getTasks(): Observable<GenericTask[]> {
    this.loadingService.setLoading(true);

    return this.httpClient.get<GenericTask[]>(`${this.baseUrl}`).pipe(
      catchError((error) => {
        this.dialogService.openSnackBar(`List of tasks couldn't be loaded`);
        return throwError(() => new Error(error));
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  getTask(taskId: string): Observable<GenericTask> {
    this.loadingService.setLoading(true);

    return this.httpClient.get<GenericTask>(`${this.baseUrl}/${taskId}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          this.dialogService.openSnackBar(`The task with given id doesn't exist. Please refresh your view.`);
        }
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  deleteTask(taskId: string): Observable<any> {
    this.loadingService.setLoading(true);

    return this.httpClient.delete(`${this.baseUrl}/${taskId}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          this.dialogService.openSnackBar(`The task with given id doesn't exist. Please refresh your view.`);
        }
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  createTask(payload: TaskPayload): Observable<GenericTask> {
    this.loadingService.setLoading(true);

    return this.httpClient.post<GenericTask>(`${this.baseUrl}`, payload).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.dialogService.openSnackBar(`Invalid format of the task.`);
        }
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  editTask(taskId: string, payload: TaskPayload): Observable<GenericTask> {
    this.loadingService.setLoading(true);

    return this.httpClient.put<GenericTask>(`${this.baseUrl}/${taskId}`, payload).pipe(
      catchError((error) => {
        if (error.status === 404) {
          this.dialogService.openSnackBar(`The task with given id doesn't exist. Please refresh your view.`);
        }
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }
}
