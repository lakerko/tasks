import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/core/services/dialog.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { HttpService } from './http.service';

import { TaskDetailResolverService } from './task-detail-resolver.service';

describe('TaskDetailResolverService', () => {
  let service: TaskDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      providers: [
        TaskDetailResolverService,
        HttpService,
        HttpClient,
        DialogService,
        LoadingService,
      ],
    });
    service = TestBed.inject(TaskDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
