import {
  DynamicValidator,
  FieldBaseOption,
  FieldComponent,
  InputTypes,
} from "../models/dynamic-form.model";

export class FieldBase {
  public key: string;
  public value?: any;
  public label?: string;
  public componentType?: FieldComponent;
  public inputType: InputTypes;
  public options?: FieldBaseOption[];
  public validators?: DynamicValidator[];

  constructor(settings: {
    key?: string;
    value?: any;
    label?: string;
    componentType?: FieldComponent;
    inputType?: InputTypes;
    options?: { value: string | number, label: string }[];
    validators?: DynamicValidator[];
  } = {}) {
    if (!settings.key) {
      throw new Error('Key is required in Field definition!');
    }
    this.key = settings.key;
    this.value = settings.value;
    this.label = settings.label || '';
    this.componentType = settings.componentType || FieldComponent.INPUT;
    this.inputType = settings.inputType || InputTypes.TEXT;
    this.options = settings.options || [];
    this.validators = settings.validators || [];
  }
}