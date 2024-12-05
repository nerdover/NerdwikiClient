import { TestBed } from '@angular/core/testing';

import { RelativeTimeService } from './relative-time.service';

describe('RelativeTimeService', () => {
  let service: RelativeTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelativeTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
