import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { HttpService } from '../services/http.service';
import { GenericTask } from '../models/tasks.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  public displayedColumns: string[] = [ 'name', 'type', 'actions' ];
  public datasource$ = this.httpService.getTasks();
  public dataSource = new MatTableDataSource<GenericTask>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private readonly httpService: HttpService) {
    this.httpService.getTasks().subscribe((tasks: GenericTask[]) => {
      this.dataSource.data = tasks;
    });
  }

  ngOnInit(): void {
  }

}
