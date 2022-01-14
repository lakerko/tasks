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
export class TaskDetailResolverService implements Resolve<GenericTask | null>{

  constructor(
    private readonly httpService: HttpService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GenericTask | Observable<GenericTask> | Promise<GenericTask> | Observable<null> {
    if (!route.params['id']) {
      return of(null);
    }
    return this.httpService.getTask(route.params['id']);
  }
}
