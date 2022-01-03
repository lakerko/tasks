import { TestBed } from '@angular/core/testing';

import { TaskDetailResolverService } from './task-detail-resolver.service';

describe('TaskDetailResolverService', () => {
  let service: TaskDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
