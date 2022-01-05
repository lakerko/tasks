import { TestBed } from '@angular/core/testing';

import { TaskDefinitionsService } from './task-definitions.service';

describe('TaskDefinitionsService', () => {
  let service: TaskDefinitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDefinitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
