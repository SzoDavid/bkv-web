import { TestBed } from '@angular/core/testing';

import { MockStationService } from './mock-station.service';

describe('MockStationService', () => {
  let service: MockStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
