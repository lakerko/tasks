import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { filter, takeUntil } from 'rxjs/operators';

import { DestroyService } from 'src/app/core/services/destroy.service';
import { PortalService } from 'src/app/core/services/portal.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { HttpService } from '../services/http.service';
import { TaskDefinitionsService } from '../services/task-definitions.service';

import { DynamicFormComponent } from 'src/app/shared/dynamic-form/dynamic-form.component';

import { FieldBase } from 'src/app/shared/field-definitions/field-base';

import { DialogMode, GenericTask, TaskPayload } from '../models/tasks.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class TaskDetailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('form') formRef!: TemplateRef<DynamicFormComponent>;
  @ViewChild('actionsRef') actionsRef!: TemplateRef<any>;

  public dynamicForm: FieldBase[] = [];
  public typeControl: FormControl = new FormControl('', [ Validators.required ]);
  public taskTypes: string[] = this.taskDefinitionsService.getListOfTasks();
  public task: GenericTask | null = null;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly vcr: ViewContainerRef,
    private readonly httpService: HttpService,
    private readonly portalService: PortalService,
    private readonly taskDefinitionsService: TaskDefinitionsService,
    private readonly dialogService: DialogService,
    private readonly destroy$: DestroyService,
  ) {

    this.typeControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((type) => {
        this.dynamicForm = this.taskDefinitionsService.getTaskFormFields(type, this.getTaskValues());
      });

    // namiesto tohoto
    this.activatedRoute.data
      .pipe(
        takeUntil(this.destroy$),
        filter((data) => data['task'])
      )
      .subscribe((data) => {
        this.task = data['task'];

        if (this.task) {
          this.typeControl.setValue((this.task).type);
        }
      });
    // tu mohlo byt radsej toto
    // this.task = this.activatedRoute.snapshot.data['task'];
    // if (this.task) {
    //   this.typeControl.setValue((this.task).type);
    // }
  }

  ngAfterViewInit(): void {
    this.portalService.setViewContainerRef(this.vcr);
    setTimeout(() => {
      this.portalService.setPanelContent(this.actionsRef);
    });
  }

  ngOnDestroy(): void {
    this.portalService.clearActionsPortal();
  }

  onSubmit(form: FormGroup): void {
    if (form.invalid) return;

    const payload = this.taskDefinitionsService.sanitizePayload(this.getPayload(form));

    if (this.task?._id) {
      this.httpService.editTask(this.task._id, payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.navigateOnSuccess(DialogMode.EDIT));
    } else {
      this.httpService.createTask(payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.navigateOnSuccess(DialogMode.CREATE));
    }
  }

  private getTaskValues(): { [key: string]: any } | undefined {
    return !this.task ? undefined : {
      name: this.task.name,
      ...this.task.fields,
    };
  }

  private getPayload(form: FormGroup): TaskPayload {
    const formValue = form.getRawValue();
    const name = formValue.name;

    const fields = {...formValue};
    delete fields.name;

    return {
      type: this.typeControl.value,
      name,
      fields,
    };
  }

  private navigateOnSuccess(mode: DialogMode): void {
    this.router.navigateByUrl('/tasks');
    this.dialogService.openSnackBar(this.getSuccessMessageBasedOnMode(mode));
  }

  private getSuccessMessageBasedOnMode(mode: DialogMode): string {
    return mode === DialogMode.CREATE
      ? 'The task was successfully created!'
      : 'The task was successfully edited!'; 
  }

}
