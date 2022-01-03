import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskDetailResolverService } from './services/task-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: TasksListComponent,
  },
  {
    path: 'create',
    component: TaskDetailComponent,
  },
  {
    path: 'edit/:id',
    component: TaskDetailComponent,
    resolve: {
      task: TaskDetailResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule { }
