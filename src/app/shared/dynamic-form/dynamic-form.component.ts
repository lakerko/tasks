import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldBase } from '../field-definitions/field-base';

import { DynamicFormService } from '../services/dynamic-form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnChanges {
  @Input() formFields: FieldBase[] = [];

  form!: FormGroup;

  constructor(private readonly dynamicFormService: DynamicFormService) {
  }
  
  ngOnChanges() {
    this.form = this.dynamicFormService.transformToFormGroup(this.formFields);
    this.form.statusChanges.subscribe((status) => console.log('status', status));
  }

  get hasFormControls(): boolean {
    return Object.keys(this.form.controls).length > 0;
  } 

}
