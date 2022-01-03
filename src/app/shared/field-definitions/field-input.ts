import { FieldBase } from "./field-base";
import { FieldComponent } from "../models/dynamic-form.model";

export class FieldInput extends FieldBase {
  override componentType = FieldComponent.INPUT;
}