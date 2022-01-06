import { AngularValidators, FieldComponent, InputTypes } from "src/app/shared/models/dynamic-form.model";
import { TaskDefinition } from "../models/tasks.model";

export const CleanBathroomDefinition: TaskDefinition = {
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
    durationInHours: {
      inputType: InputTypes.NUMBER,
      label: 'Duration (in hours)',
      validators: [
        {
          type: AngularValidators.REQUIRED,
          message: 'Field is required',
        },
        {
          type: AngularValidators.MIN,
          value: 2,
          message: 'It takes minimum of 2 hours to clean bathroom',
        },
      ],
    },
    date: {
      label: 'Date',
      componentType: FieldComponent.DATE,
    },
  },
};