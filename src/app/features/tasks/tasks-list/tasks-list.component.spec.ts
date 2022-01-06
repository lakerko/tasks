import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewContainerRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { DestroyService } from 'src/app/core/services/destroy.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { PortalService } from 'src/app/core/services/portal.service';
import { HttpService } from '../services/http.service';
import { TaskDefinitionsService } from '../services/task-definitions.service';

import { TasksListComponent } from './tasks-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksListComponent ],
      imports: [
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
        FlexLayoutModule,
      ],
      providers: [
        HttpClient,
        ViewContainerRef,
        FormBuilder,
        BreakpointObserver,
        HttpService,
        DialogService,
        PortalService,
        TaskDefinitionsService,
        DestroyService,
        LoadingService,
        MatDialog,
        MatSnackBar,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          },
        },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
