import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { GenericTask } from '../models/tasks.model';

@Injectable()
export class HttpService {
  private baseUrl: string = 'http://64.225.105.163:3000';

  constructor(private readonly httpClient: HttpClient) { }

  getTasks(): Observable<GenericTask[]> {
    return this.httpClient.get<GenericTask[]>(`${this.baseUrl}/tasks`);
  }
}
