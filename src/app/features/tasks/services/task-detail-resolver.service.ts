import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable, of } from 'rxjs';

import { GenericTask } from '../models/tasks.model';
import { HttpService } from './http.service';

@Injectable()
export class TaskDetailResolverService implements Resolve<GenericTask | undefined>{

  constructor(
    private readonly httpService: HttpService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GenericTask | Observable<GenericTask> | Promise<GenericTask> | Observable<undefined> {
    if (!route.params['id']) {
      return of();
    }
    return this.httpService.getTask(route.params['id']);
  }
}
