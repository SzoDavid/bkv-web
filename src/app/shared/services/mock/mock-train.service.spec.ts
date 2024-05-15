import { TestBed } from '@angular/core/testing';

import { MockTrainService } from './mock-train.service';

describe('MockTrainService', () => {
  let service: MockTrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockTrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
