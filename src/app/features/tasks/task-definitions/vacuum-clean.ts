import { AngularValidators, InputTypes } from "src/app/shared/models/dynamic-form.model";
import { TaskDefinition } from "../models/tasks.model";

export const VaccumCleanDefinition: TaskDefinition = {
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
};