import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldBase } from '../field-definitions/field-base';

import { AngularValidators, DynamicValidator, FieldBaseOption } from '../models/dynamic-form.model';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
})
export class DynamicFormFieldComponent {
  @Input() fieldSettings!: FieldBase;
  @Input() formParent!: FormGroup;
  
  get isInvalid(): boolean {
    return (
      this.formParent.controls[this.fieldSettings.key].invalid &&
      this.formParent.controls[this.fieldSettings.key].touched
    );
  }

  hasErrorProperty(validator: DynamicValidator): boolean {
    return this.formParent
      .controls[this.fieldSettings.key]
      .errors?.[validator.type.toLocaleLowerCase()];
  }

  trackByValueFn(index: number, item: FieldBaseOption): string | number {
    return item.value;
  }

  trackByTypeFn(index: number, item: DynamicValidator): AngularValidators {
    return item.type;
  }

}
