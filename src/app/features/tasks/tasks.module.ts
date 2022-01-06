import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

import { HttpService } from './services/http.service';
import { TaskDetailResolverService } from './services/task-detail-resolver.service';
import { TaskDefinitionsService } from './services/task-definitions.service';
import { TaskTableFilterComponent } from './task-table-filter/task-table-filter.component';
import { TaskTableComponent } from './task-table/task-table.component';


@NgModule({
  declarations: [
    TasksListComponent,
    TaskDetailComponent,
    TaskTableFilterComponent,
    TaskTableComponent,
  ],
  imports: [
    SharedModule,

    TasksRoutingModule,
  ],
  providers: [
    HttpService,
    TaskDetailResolverService,
    TaskDefinitionsService,
  ],
})
export class TasksModule { }
