import { TestBed } from '@angular/core/testing';

import { MockRailLineService } from './mock-rail-line.service';

describe('MockRailLineService', () => {
  let service: MockRailLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockRailLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
