import { AngularValidators, InputTypes } from "src/app/shared/models/dynamic-form.model";
import { TaskDefinition } from "../models/tasks.model";

export const WashDishesDefinition: TaskDefinition = {
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
};