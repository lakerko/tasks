import { FieldBase } from "src/app/shared/field-definitions/field-base";
import { FieldCombobox } from "src/app/shared/field-definitions/field-combobox";
import { FieldInput } from "src/app/shared/field-definitions/field-input";
import { AngularValidators, FieldComponent, InputTypes } from "src/app/shared/models/dynamic-form.model";

export function getTaskFormFields(taskType: string, values?: { [key: string]: any }): FieldBase[] {
  const taskDefinition = tasks[taskType];
  if (!taskDefinition) {
    return [];
  }
  let formFields: FieldBase[] = [];

  Object.keys(taskDefinition).forEach((definition) => {
    console.warn('definition', definition);
    console.log('typeof definition', typeof taskDefinition[definition]);
    
    // for now it would be fields
    if (
      typeof taskDefinition[definition] === 'object' &&
      !Array.isArray(taskDefinition[definition]) &&
      taskDefinition[definition] !== null
    ) {
      if (definition === 'fields') {
        const objectProperties: string[] = Object.getOwnPropertyNames(taskDefinition[definition]);
        formFields = objectProperties.map((property) => {
          const task = taskDefinition[definition][property];
          const taskComponentType = task.componentType || FieldComponent.INPUT;

          const fieldConfig: FieldBase = {
            key: task.key || property,
            value: values?.[property] || undefined,
            label: task.label || '',
            componentType: taskComponentType,
            inputType: task.inputType as InputTypes,
            options: task.options,
            validators: task.validators,
          };

          switch(taskComponentType) {
            case FieldComponent.INPUT:  {
              return new FieldInput(fieldConfig);
            }
            case FieldComponent.COMBOBOX: {
              return new FieldCombobox(fieldConfig);
            }
          }
        });
        console.warn('fields', formFields);
      }
    }
    console.log('cize sem nie');
  });
  console.log('cize ani sem nie');
  return [
    new FieldInput({
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
    }),
    ...formFields
  ];
}

export interface TaskDefinitions {
  [key: string]: {
    fields: {
      [key: string]: Partial<FieldBase>;
    };
    [key: string]: any;
  }
}

const tasks: TaskDefinitions = {
  'wash-dishes': {
    fields: {
      durationInHours: {
        inputType: InputTypes.NUMBER,
        label: 'Duration (in hours)',
        validators: [
          {
            type: AngularValidators.REQUIRED,
            message: 'Field is required',
          },
        ],
      },
    },
  },
  'vacuum-clean': {
    fields: {
      who: {
        inputType: InputTypes.TEXT,
        label: 'Who',
        validators: [
          {
            type: AngularValidators.REQUIRED,
            message: 'Field is required',
          },
        ],
      },
      room: {
        inputType: InputTypes.TEXT,
        label: 'Room',
        validators: [
          {
            type: AngularValidators.REQUIRED,
            message: 'Field is required',
          },
        ],
      },
    },
  },
}