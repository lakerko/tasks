import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { HttpService } from './services/http.service';


@NgModule({
  declarations: [
    TasksListComponent,
    TaskDetailComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,

    MatTableModule,
    MatPaginatorModule,

    TasksRoutingModule,
  ],
  providers: [
    HttpService,
  ],
})
export class TasksModule { }
