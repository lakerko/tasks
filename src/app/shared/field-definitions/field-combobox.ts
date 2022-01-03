import { FieldBase } from "./field-base";
import { FieldComponent } from "../models/dynamic-form.model";

export class FieldCombobox extends FieldBase {
  override componentType = FieldComponent.COMBOBOX;
}