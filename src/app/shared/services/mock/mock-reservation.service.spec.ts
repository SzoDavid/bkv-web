import { TestBed } from '@angular/core/testing';

import { MockReservationService } from './mock-reservation.service';

describe('MockReservationService', () => {
  let service: MockReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
