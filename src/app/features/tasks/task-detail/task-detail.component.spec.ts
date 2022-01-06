// import { HttpClientModule } from '@angular/common/http';
// import { ViewContainerRef } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { DestroyService } from 'src/app/core/services/destroy.service';
// import { DialogService } from 'src/app/core/services/dialog.service';
// import { LoadingService } from 'src/app/core/services/loading.service';
// import { PortalService } from 'src/app/core/services/portal.service';
// import { DynamicFormComponent } from 'src/app/shared/dynamic-form/dynamic-form.component';
// import { HttpService } from '../services/http.service';
// import { TaskDefinitionsService } from '../services/task-definitions.service';

// import { TaskDetailComponent } from './task-detail.component';

// describe('TaskDetailComponent', () => {
//   let component: TaskDetailComponent;
//   let fixture: ComponentFixture<TaskDetailComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [
//         TaskDetailComponent,
//         DynamicFormComponent,
//       ],
//       imports: [
//         ReactiveFormsModule,
//         // RouterModule,
//         // HttpClientModule,
//         // MatCardModule,
//         // MatFormFieldModule,
//         // MatSelectModule,
//         // MatButtonModule,
//         // MatIconModule,
//         // MatDialogModule,
//         // MatSnackBarModule,
//       ],
//       providers: [
//         Router,
//         // ViewContainerRef,
//         // HttpService,
//         // PortalService,
//         // TaskDefinitionsService,
//         // DialogService,
//         // DestroyService,
//         // LoadingService,
//         // MatDialog,
//         // MatSnackBar,
//         // {
//         //   provide: ActivatedRoute,
//         //   useValue: {
//         //     data: {
//         //       task: {
//         //         _id: 't3st1d',
//         //         name: 'test task',
//         //         type: 'wash-dishes',
//         //         fields: {
//         //           durationInHours: 1,
//         //         },
//         //       },
//         //     },
//         //   },
//         // },
//       ],
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TaskDetailComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
