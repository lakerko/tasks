import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

import { of } from 'rxjs';

import { DestroyService } from 'src/app/core/services/destroy.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { PortalService } from 'src/app/core/services/portal.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { HttpService } from '../services/http.service';
import { TaskDefinitionsService } from '../services/task-definitions.service';

import { DynamicFormComponent } from 'src/app/shared/dynamic-form/dynamic-form.component';
import { DynamicFormFieldComponent } from 'src/app/shared/dynamic-form-field/dynamic-form-field.component';
import { TaskDetailComponent } from './task-detail.component';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TaskDetailComponent,
        DynamicFormComponent,
        DynamicFormFieldComponent,
      ],
      imports: [
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      providers: [
        ViewContainerRef,
        HttpService,
        PortalService,
        TaskDefinitionsService,
        DialogService,
        DestroyService,
        DynamicFormService,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              task: {
                _id: 't3st1d',
                name: 'test task',
                type: 'wash-dishes',
                fields: {
                  durationInHours: 1,
                },
              },
            }),
          },
        },
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
