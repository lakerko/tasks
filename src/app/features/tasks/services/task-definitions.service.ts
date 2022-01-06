import { Injectable } from '@angular/core';

import { FieldBase } from "src/app/shared/field-definitions/field-base";
import { FieldCombobox } from "src/app/shared/field-definitions/field-combobox";
import { FieldDate } from 'src/app/shared/field-definitions/field-date';
import { FieldInput } from "src/app/shared/field-definitions/field-input";

import { AngularValidators, FieldComponent, InputTypes } from "src/app/shared/models/dynamic-form.model";
import { TasksDefinitions, TaskFields, TaskPayload } from '../models/tasks.model';
import { CleanBathroomDefinition } from '../task-definitions/clean-bathroom';
import { VaccumCleanDefinition } from '../task-definitions/vacuum-clean';
import { WashDishesDefinition } from '../task-definitions/wash-dishes';

@Injectable()
export class TaskDefinitionsService {
  tasks: TasksDefinitions = {
    'wash-dishes': WashDishesDefinition,
    'vacuum-clean': VaccumCleanDefinition,
    'clean-bathroom': CleanBathroomDefinition,
  };

  getListOfTasks(): string[] {
    return Object.keys(this.tasks);
  }

  // sanitize payload values based on task type definitions
  sanitizePayload(payload: TaskPayload): TaskPayload {
    const taskDefinition = this.tasks[payload.type];

    if (!taskDefinition) return payload;
    
    const sanitizedPayload: TaskPayload = {...payload};

    Object.entries(taskDefinition.fields).forEach(([fieldKey, fieldDefinition]) => {
      const fieldValue = payload.fields[fieldKey];
      
      if (fieldValue === undefined || fieldValue === null) {
        return;
      }

      switch(fieldDefinition.inputType) {
        case InputTypes.NUMBER: {
          sanitizedPayload['fields'][fieldKey] = parseInt(fieldValue, 10);
          break;
        }
      }
    });

    return sanitizedPayload;
  }

  // generate form fields (FieldBase) for dynamic form based on task type
  getTaskFormFields(taskType: string, values?: { [key: string]: any }): FieldBase[] {
    const taskDefinition = this.tasks[taskType];

    if (!taskDefinition) {
      return [];
    }

    return [
      // name is always there
      new FieldInput(this.getNameFieldConfig(values)),
      ...this.createFormFieldsArray(taskDefinition.fields as TaskFields, values),
    ];
  }

  private createFormFieldsArray(fieldsDefinition: TaskFields, values?: { [key: string]: any }): FieldBase[] {
    if (!fieldsDefinition) return [];
    
    return Object.entries(fieldsDefinition).map(([property, task]: [ property: string, task: Partial<FieldBase>]) => {
      const fieldConfig: FieldBase = this.getGenericFieldConfig(task, property, values);

      switch(task.componentType) {
        case FieldComponent.INPUT:  {
          return new FieldInput(fieldConfig);
        }
        case FieldComponent.COMBOBOX: {
          return new FieldCombobox(fieldConfig);
        }
        case FieldComponent.DATE: {
          return new FieldDate(fieldConfig);
        }
        default: {
          return new FieldInput(fieldConfig);
        }
      }
    });
  }

  private getNameFieldConfig(values?: { [key: string]: any }): FieldBase {
    return {
      key: 'name',
      label: 'Name of the task',
      value: values?.['name'] || '',
      componentType: FieldComponent.INPUT,
      inputType: InputTypes.TEXT,
      validators: [
        {
          type: AngularValidators.REQUIRED,
          message: 'Field is required',
        },
      ],
    };
  }

  private getGenericFieldConfig(task: Partial<FieldBase>, property: string, values?: { [key: string]: any }): FieldBase {
    const value = values?.[property] ?? undefined;

    return {
      key: task.key || property,
      value: value,
      label: task.label || '',
      componentType: task.componentType || FieldComponent.INPUT,
      inputType: task.inputType as InputTypes,
      options: task.options,
      validators: task.validators,
    };
  }
}
