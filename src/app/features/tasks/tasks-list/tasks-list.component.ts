import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { filter } from 'rxjs/operators';

import { HttpService } from '../services/http.service';
import { GenericTask } from '../models/tasks.model';

import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  public displayedColumns: string[] = [ 'name', 'type', 'actions' ];
  // public datasource$ = this.httpService.getTasks();
  public dataSource = new MatTableDataSource<GenericTask>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private readonly router: Router,
    private readonly httpService: HttpService,
    private readonly dialogService: DialogService,
  ) {
    this.httpService.getTasks().subscribe((tasks: GenericTask[]) => {
      this.dataSource.data = tasks;
    });
  }

  ngOnInit(): void {
  }

  editTask(id: string | undefined): void {
    this.router.navigateByUrl(`/tasks/edit/${id}`);
  }

  deleteTask(id: string | undefined): void {
    const task: GenericTask = this.dataSource.data.filter((task) => task._id === id)?.[0] || null;

    if (!task) {
      this.dialogService.openSnackBar(`This task couldn't be deleted`);
      return;
    }

    this.dialogService.openConfirmDialog({
      name: task.name,
      type: task.type,
    })
      .pipe(
        filter((userChoice) => userChoice === true)
      )
      .subscribe(() => {
        this.httpService.deleteTask('barco' + task._id!).subscribe((aha) => {
          console.log('aha', aha);
        })
      });
  }

}
