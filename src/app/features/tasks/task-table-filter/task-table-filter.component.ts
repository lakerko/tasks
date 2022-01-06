import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { DestroyService } from 'src/app/core/services/destroy.service';
import { TaskDefinitionsService } from '../services/task-definitions.service';

@Component({
  selector: 'app-task-table-filter',
  templateUrl: './task-table-filter.component.html',
  styleUrls: ['./task-table-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTableFilterComponent {
  @Output() onFilterChange: EventEmitter<string> = new EventEmitter();

  public tableFilter: FormGroup = this.fb.group({
    name: [''],
    type: [''],
  });
  public taskTypes: string[] = this.taskDefinitionsService.getListOfTasks();

  constructor(
    private readonly fb: FormBuilder,
    private readonly taskDefinitionsService: TaskDefinitionsService,
    private readonly destroy$: DestroyService,
  ) {
    this.initializeFilter();
  }

  private initializeFilter(): void {
    this.tableFilter.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )  
      .subscribe((value) => this.onFilterChange.emit(`${value.name}**|**${value.type}`));
  }

}
