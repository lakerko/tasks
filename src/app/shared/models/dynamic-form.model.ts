export enum FieldComponent {
  INPUT = 'input',
  COMBOBOX = 'combobox',
}

export enum InputTypes {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  TEL = 'tel',
  URL = 'url',
  DATE = 'date',
}

export enum AngularValidators {
  MIN = 'min',
  MAX = 'max',
  REQUIRED = 'required',
  EMAIL = 'email',
  MINLENGTH = 'minLength',
  MAXLENGTH = 'maxLength',
  PATTERN = 'pattern',
}

export interface DynamicValidator {
  type: AngularValidators;
  value?: any;
  message?: string;
}