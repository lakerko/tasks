import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  exhaustMap,
  filter,
  takeUntil,
} from 'rxjs/operators';

import { HttpService } from '../services/http.service';
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

  public tasksData: GenericTask[] = [];
  public filterValue: string = '';

  public loading: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly vcr: ViewContainerRef,
    private readonly cdr: ChangeDetectorRef,
    private readonly httpService: HttpService,
    private readonly dialogService: DialogService,
    private readonly portalService: PortalService,
    private readonly destroy$: DestroyService,
  ) {
    this.httpService.getTasks()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((tasks: GenericTask[]) => {
        this.tasksData = [...tasks];
        this.cdr.markForCheck();
      });
  }

  ngAfterViewInit(): void  {
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
    const task: GenericTask | undefined = this.tasksData.find((task) => task._id === id);

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
        this.tasksData = this.tasksData.filter((task) => task._id !== id);
        this.cdr.markForCheck();
        this.dialogService.openSnackBar(`Task ${task.name} was successfully deleted!`);
      });
  }

  setFilter(filterValue: string): void {
    this.filterValue = filterValue;
  }

}
