import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldBase } from '../field-definitions/field-base';

import { DynamicFormService } from '../services/dynamic-form.service';
import { DestroyService } from 'src/app/core/services/destroy.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class DynamicFormComponent implements OnChanges {
  @Input() formFields: FieldBase[] = [];
  @Output() onSubmitForm: EventEmitter<FormGroup> = new EventEmitter();

  form!: FormGroup;

  constructor(
    private readonly dynamicFormService: DynamicFormService,
  ) {}

  get hasFormControls(): boolean {
    return Object.keys(this.form.controls).length > 0;
  }
  
  ngOnChanges(): void {
    this.form = this.dynamicFormService.transformToFormGroup(this.formFields);
  }

  trackByKeyFn(index: number, item: FieldBase): string {
    return item.key;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
    this.onSubmitForm.emit(this.form);
  }

}
