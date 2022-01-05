import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { exhaustMap, filter, takeUntil } from 'rxjs/operators';

import { HttpService } from '../services/http.service';
import { TaskDefinitionsService } from '../services/task-definitions.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { PortalService } from 'src/app/core/services/portal.service';
import { DestroyService } from 'src/app/core/services/destroy.service';

import { GenericTask } from '../models/tasks.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class TasksListComponent implements AfterViewInit, OnDestroy {
  @ViewChild('actionsRef') actionsRef!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = [ 'name', 'type', 'actions' ];
  public pageSizeOptions: number[] = [10, 25, 50, 100];
  public dataSource = new MatTableDataSource<GenericTask>([]);
  public loading: boolean = false;
  public tableFilter: FormGroup = this.fb.group({
    name: [''],
    type: [''],
  });
  public taskTypes: string[] = this.taskDefinitionsService.getListOfTasks();

  constructor(
    private readonly router: Router,
    private readonly vcr: ViewContainerRef,
    private readonly fb: FormBuilder,
    private readonly httpService: HttpService,
    private readonly dialogService: DialogService,
    private readonly portalService: PortalService,
    private readonly taskDefinitionsService: TaskDefinitionsService,
    private readonly destroy$: DestroyService,
  ) {
    this.httpService.getTasks()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((tasks: GenericTask[]) => {
        this.dataSource.data = tasks;
      });

    this.initializeFilter();
    this.setFilterPredicate();
  }

  ngAfterViewInit(): void  {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    this.portalService.setViewContainerRef(this.vcr);
    setTimeout(() => {
      this.portalService.setPanelContent(this.actionsRef);
    });
  }

  ngOnDestroy(): void {
    this.portalService.clearActionsPortal();
  }

  editTask(id: string | undefined): void {
    this.router.navigateByUrl(`/tasks/edit/${id}`);
  }

  deleteTask(id: string | undefined): void {
    const task: GenericTask | undefined = this.dataSource.data.find((task) => task._id === id);

    if (!task) {
      this.dialogService.openSnackBar(`This task could not be deleted`);
      return;
    }

    this.dialogService.openConfirmDialog({
      name: task.name,
      type: task.type,
    })
      .pipe(
        takeUntil(this.destroy$),
        filter((userChoice) => userChoice === true),
        exhaustMap(() => this.httpService.deleteTask(task._id!))
      )
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((task) => task._id !== id);
        this.dialogService.openSnackBar(`Task ${task.name} was successfully deleted!`);
      });
  }

  private initializeFilter(): void {
    this.tableFilter.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )  
      .subscribe((value) => {
        this.dataSource.filter = `${value.name}**|**${value.type}`;
      });
  }

  private setFilterPredicate(): void {
    this.dataSource.filterPredicate = (row: any, filter: string) => {
      const [name, type] = filter.split('**|**');
      const isNameMatch: boolean = (row.name as string).toLowerCase().includes(name);
      
      return type ? isNameMatch && row.type === type : isNameMatch;
    };
  }

}
