import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { FieldBase } from '../field-definitions/field-base';

import { DynamicValidator } from '../models/dynamic-form.model';

@Injectable()
export class DynamicFormService {

  transformToFormGroup(dynamicFields: FieldBase[] = []): FormGroup {
    const formGroup: { [key: string]: FormControl } = {};

    dynamicFields.forEach((field) => {
      formGroup[field.key] = new FormControl(field.value, this.getValidators(field.validators));
    });

    return new FormGroup(formGroup);
  }

  private getValidators(validators: DynamicValidator[] | undefined): ValidatorFn[] | [] {
    if (!validators) return [];

    return validators.map((validator) => validator.value
      ? Validators[validator.type](validator.value) as ValidatorFn[]
      : Validators[validator.type]) as ValidatorFn[];
  }
}