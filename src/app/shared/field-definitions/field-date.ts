import { FieldBase } from "./field-base";
import { FieldComponent } from "../models/dynamic-form.model";

export class FieldDate extends FieldBase {
  override componentType = FieldComponent.DATE;
}