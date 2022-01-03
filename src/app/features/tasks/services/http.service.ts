import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { GenericTask } from '../models/tasks.model';

@Injectable()
export class HttpService {
  private baseUrl: string = 'http://64.225.105.163:3000';

  constructor(private readonly httpClient: HttpClient) { }

  getTask(id: string): Observable<GenericTask> {
    return this.httpClient.get<GenericTask>(`${this.baseUrl}/tasks/${id}`);
  }

  getTasks(): Observable<GenericTask[]> {
    return this.httpClient.get<GenericTask[]>(`${this.baseUrl}/tasks`);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/tasks/${taskId}`);
  }
}
