import { TestBed } from '@angular/core/testing';

import { DestroyService } from './destroy.service';

describe('DestroyService', () => {
  let service: DestroyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DestroyService,
      ],
    });
    service = TestBed.inject(DestroyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
