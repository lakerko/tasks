import { TestBed } from '@angular/core/testing';
import { FieldInput } from 'src/app/shared/field-definitions/field-input';
import { AngularValidators, FieldComponent, InputTypes } from 'src/app/shared/models/dynamic-form.model';
import { TaskPayload, TasksDefinitions } from '../models/tasks.model';
import { CleanBathroomDefinition } from '../task-definitions/clean-bathroom';
import { VaccumCleanDefinition } from '../task-definitions/vacuum-clean';
import { WashDishesDefinition } from '../task-definitions/wash-dishes';

import { TaskDefinitionsService } from './task-definitions.service';

describe('TaskDefinitionsService', () => {
  let service: TaskDefinitionsService;
  let tasks: TasksDefinitions = {
    'wash-dishes': WashDishesDefinition,
    'vacuum-clean': VaccumCleanDefinition,
    'clean-bathroom': CleanBathroomDefinition,
  };
  const nameFieldConfig = {
    key: 'name',
    label: 'Name of the task',
    value: '',
    componentType: FieldComponent.INPUT,
    inputType: InputTypes.TEXT,
    validators: [
      {
        type: AngularValidators.REQUIRED,
        message: 'Field is required',
      },
    ],
  };
  const durationInHoursFieldConfig = {
    key: 'durationInHours',
    label: 'Duration (in hours)',
    value: undefined,
    componentType: FieldComponent.INPUT,
    inputType: InputTypes.NUMBER,
    validators: [
      {
        type: AngularValidators.REQUIRED,
        message: 'Field is required',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskDefinitionsService,
      ]
    });
    service = TestBed.inject(TaskDefinitionsService);
    service.tasks = tasks;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of string when calling getListOfTasks', () => {
    const result = service.getListOfTasks();
    expect(result).toEqual(['wash-dishes', 'vacuum-clean', 'clean-bathroom']);
  });

  it('should return sanitized payload, with input type number parsed to number', () => {
    const payload: TaskPayload = {
      name: 'Test name',
      type: 'wash-dishes',
      fields: {
        durationInHours: '2'
      },
    };

    const result = service.sanitizePayload(payload);
    expect(result).toEqual({
      ...payload,
      fields: {
        durationInHours: 2,
      },
    });
  });

  it('should return empty array if taskType does not exist', () => {
    expect(service.getTaskFormFields('test-type')).toEqual([]);
  });

  it('should return array of name and durationInHours fields for taskType wash-dishes', () => {
    expect(service.getTaskFormFields('wash-dishes')).toEqual([
      new FieldInput(nameFieldConfig),
      new FieldInput(durationInHoursFieldConfig),
    ]);
  });

  
  it('should return array of name and durationInHours fields with values for taskType wash-dishes when values were provided', () => {
    const result = service.getTaskFormFields(
      'wash-dishes',
      {
        name: 'test',
        durationInHours: 3,
      },
    );
    const nameFieldConfigWithValue = {
      ...nameFieldConfig,
      value: 'test',
    };
    const durationInHoursFieldConfigWithValue = {
      ...durationInHoursFieldConfig,
      value: 3,
    };
    expect(result).toEqual([
      new FieldInput(nameFieldConfigWithValue),
      new FieldInput(durationInHoursFieldConfigWithValue),
    ]);
  });
});
