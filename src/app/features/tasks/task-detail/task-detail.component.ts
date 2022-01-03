import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from 'src/app/shared/dynamic-form/dynamic-form.component';

import { FieldBase } from 'src/app/shared/field-definitions/field-base';
import { GenericTask } from '../models/tasks.model';
import { HttpService } from '../services/http.service';
import { getTaskFormFields } from '../task-definitions';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  @ViewChild('form') formRef!: TemplateRef<DynamicFormComponent>;
  public dynamicForm: FieldBase[] = []; // toto krajsie, ze by ten subscribe isiel rovno sem?
  public typeControl: FormControl = new FormControl('', [ Validators.required ]);
  public taskTypes = [
    {
      value: 'wash-dishes',
      viewValue: 'wash-dishes',
    },
    {
      value: 'vacuum-clean',
      viewValue: 'vacuum-clean',
    },
  ];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly httpService: HttpService,
  ) {
    this.activatedRoute.data.subscribe((data) => {
      console.warn('hla', data['task']);
      const task = data['task'];
      this.typeControl.setValue(task.type);
      this.dynamicForm = getTaskFormFields(task.type, {
        name: task.name,
        ...task.fields,
      });
    });

    this.typeControl.valueChanges.subscribe((type) => {
      console.warn('!!!type', type);
      this.dynamicForm = getTaskFormFields(type);
      console.log('this.dynamicForm', this.dynamicForm);
    });

    setTimeout(() => {
      console.log('formRef', this.formRef);
    }, 5000);
  }

  ngOnInit(): void {
  }

}
