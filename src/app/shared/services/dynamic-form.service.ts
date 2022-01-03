import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { FieldBase } from '../field-definitions/field-base';

import { DynamicValidator } from '../models/dynamic-form.model';

@Injectable()
export class DynamicFormService {

  transformToFormGroup(dynamicFields: FieldBase[] = []): FormGroup {
    const formGroup: { [key: string]: FormControl } = {};

    dynamicFields.forEach((field) => {
      const validators = (field.validators || []).map((validator: DynamicValidator) => validator.value
        ? Validators[validator.type](validator.value)
        : Validators[validator.type]);

      formGroup[field.key] = new FormControl(field.value, validators as ValidatorFn[]);
    });

    return new FormGroup(formGroup);
  }
}